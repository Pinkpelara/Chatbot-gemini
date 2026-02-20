
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import { MODELS } from './constants';
import { ChatSession, Message, PuterUser, ModelOption } from './types';

// Declare Puter global
declare const puter: any;

const App: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [user, setUser] = useState<PuterUser | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>(MODELS[0].id);
  const [availableModels, setAvailableModels] = useState<ModelOption[]>(MODELS);
  const [useWebSearch, setUseWebSearch] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Load user profile, models, and sessions from Puter KV
  useEffect(() => {
    const init = async () => {
      try {
        // Fetch models from Puter API
        try {
          const fetchedModels = await puter.ai.listModels();
          if (fetchedModels && Array.isArray(fetchedModels) && fetchedModels.length > 0) {
            setAvailableModels(fetchedModels);
            // If currently selected model is not in the new list, select the first one
            if (!fetchedModels.find((m: any) => m.id === selectedModel)) {
              setSelectedModel(fetchedModels[0].id);
            }
          }
        } catch (modelErr) {
          console.error("Failed to fetch models:", modelErr);
          // Fallback to constants is already handled by initial state
        }

        if (!puter.auth.isSignedIn()) {
          // Just set state, don't force login immediately to show landing
          // but Puter functions will trigger it if called.
        } else {
          const userData = await puter.auth.getUser();
          setUser(userData);
        }

        const savedSessions = await puter.kv.get('omnichat_sessions');
        if (savedSessions) {
          const parsed = JSON.parse(savedSessions);
          setSessions(parsed);
          if (parsed.length > 0) setActiveSessionId(parsed[0].id);
        } else {
          createNewSession();
        }
      } catch (err) {
        console.error("Initialization error:", err);
      }
    };
    init();
  }, []);

  // Persist sessions whenever they change
  useEffect(() => {
    if (sessions.length > 0) {
      puter.kv.set('omnichat_sessions', JSON.stringify(sessions));
    }
  }, [sessions]);

  const createNewSession = useCallback(() => {
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title: 'New Conversation',
      messages: [],
      createdAt: Date.now(),
      lastModified: Date.now(),
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  }, []);

  const deleteSession = useCallback((id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    if (activeSessionId === id) {
      setActiveSessionId(sessions.length > 1 ? sessions[0].id : null);
    }
  }, [activeSessionId, sessions]);

  const updateMessages = useCallback((sessionId: string, newMessages: Message[]) => {
    setSessions(prev => prev.map(s => {
      if (s.id === sessionId) {
        const title = s.title === 'New Conversation' && newMessages.length > 0 
          ? newMessages[0].content.slice(0, 30) + '...'
          : s.title;
        return { ...s, messages: newMessages, title, lastModified: Date.now() };
      }
      return s;
    }));
  }, []);

  const activeSession = sessions.find(s => s.id === activeSessionId) || null;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white text-slate-900">
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white border rounded-md shadow-sm md:hidden"
      >
        <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>

      <Sidebar 
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={setActiveSessionId}
        onNewSession={createNewSession}
        onDeleteSession={deleteSession}
        user={user}
        isOpen={isSidebarOpen}
      />

      <main className="flex-1 flex flex-col min-w-0 relative">
        <ChatWindow 
          session={activeSession}
          onUpdateMessages={(msgs) => activeSessionId && updateMessages(activeSessionId, msgs)}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          availableModels={availableModels}
          useWebSearch={useWebSearch}
          onToggleWebSearch={() => setUseWebSearch(!useWebSearch)}
        />
      </main>
    </div>
  );
};

export default App;
