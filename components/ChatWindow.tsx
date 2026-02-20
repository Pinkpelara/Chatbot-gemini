
import React, { useState, useRef, useEffect } from 'react';
import { SYSTEM_INSTRUCTION } from '../constants';
import { ChatSession, Message, ModelOption } from '../types';

interface ChatWindowProps {
  session: ChatSession | null;
  onUpdateMessages: (msgs: Message[]) => void;
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  availableModels: ModelOption[];
  useWebSearch: boolean;
  onToggleWebSearch: () => void;
}

declare const puter: any;

export const ChatWindow: React.FC<ChatWindowProps> = ({
  session,
  onUpdateMessages,
  selectedModel,
  onModelChange,
  availableModels,
  useWebSearch,
  onToggleWebSearch
}) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [session?.messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || !session || isTyping) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    const updatedMessages = [...session.messages, userMessage];
    onUpdateMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      const chatOptions: any = {
        model: selectedModel,
        stream: true
      };

      if (useWebSearch) {
        chatOptions.tools = [{ type: 'web_search' }];
      }

      // Convert conversation for Puter.ai.chat
      const conversation = updatedMessages.map(m => ({
        role: m.role,
        content: m.content
      }));

      // System instruction
      conversation.unshift({ role: 'system', content: SYSTEM_INSTRUCTION });

      const assistantId = crypto.randomUUID();
      let assistantContent = '';

      const response = await puter.ai.chat(conversation, chatOptions);

      for await (const part of response) {
        if (part?.text) {
          assistantContent += part.text;
          // Optimistic update of the last message in current state
          // To keep it simple, we'll finalize the message at the end of stream
          // but for a better UX we update state in chunks
        }
      }

      const assistantMessage: Message = {
        id: assistantId,
        role: 'assistant',
        content: assistantContent,
        timestamp: Date.now(),
        model: selectedModel
      };

      onUpdateMessages([...updatedMessages, assistantMessage]);

    } catch (err: any) {
      console.error("Chat error:", err);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `Error: ${err.message || 'Something went wrong. Please check your connection or sign in.'}`,
        timestamp: Date.now(),
        isError: true
      };
      onUpdateMessages([...updatedMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !session) return;

    setIsProcessingFile(true);
    try {
      // Step 1: Upload to Puter FS
      await puter.fs.write(`omnichat/uploads/${file.name}`, file, { createMissingParents: true });
      
      // Step 2: Use OCR if it's an image
      let extractedText = '';
      if (file.type.startsWith('image/')) {
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        extractedText = await puter.ai.img2txt(dataUrl);
      } else {
        // Just read as text for simplicity
        const blob = await puter.fs.read(`omnichat/uploads/${file.name}`);
        extractedText = await blob.text();
      }

      // Append to input or send immediately
      const filePrompt = `I've uploaded a file "${file.name}". Content:\n\n${extractedText.slice(0, 2000)}${extractedText.length > 2000 ? '...' : ''}\n\nPlease analyze this.`;
      setInput(filePrompt);
    } catch (err) {
      console.error("File processing error:", err);
      alert("Could not process file. Please ensure you are signed in.");
    } finally {
      setIsProcessingFile(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (!session) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-robot text-3xl text-indigo-600"></i>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">OmniChat System</h2>
          <p className="text-slate-500 max-w-md">Select a conversation or start a new one to begin exploring the power of serverless AI.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold text-slate-800 truncate max-w-[200px]">{session.title}</h1>
          <div className="h-4 w-px bg-slate-200"></div>
          <select 
            value={selectedModel}
            onChange={(e) => onModelChange(e.target.value)}
            className="text-xs font-medium bg-slate-100 border-none rounded-full px-3 py-1 text-slate-600 focus:ring-2 focus:ring-indigo-500 cursor-pointer outline-none max-w-[150px] md:max-w-none"
          >
            {Array.from(new Set(availableModels.map(m => m.provider))).map(provider => (
              <optgroup key={provider} label={provider}>
                {availableModels.filter(m => m.provider === provider).map(m => (
                  <option key={m.id} value={m.id}>{m.name || m.id}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleWebSearch}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${useWebSearch ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}
          >
            <i className="fas fa-search"></i>
            <span>Web Search</span>
          </button>
        </div>
      </header>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth"
      >
        {session.messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-20">
            <i className="fas fa-comments text-5xl mb-4 text-slate-200"></i>
            <p className="text-lg">What's on your mind?</p>
          </div>
        ) : (
          session.messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 md:gap-6 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center text-white shadow-sm">
                  <i className="fas fa-robot text-sm"></i>
                </div>
              )}
              <div className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 md:px-6 md:py-4 shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : msg.isError ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-slate-50 border rounded-tl-none text-slate-800'}`}>
                <div className="prose prose-slate max-w-none break-words whitespace-pre-wrap text-sm md:text-base leading-relaxed">
                  {msg.content}
                </div>
                <div className={`text-[10px] mt-2 opacity-50 flex items-center gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  {msg.model && <span>• {msg.model}</span>}
                </div>
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center text-indigo-600 shadow-sm font-bold">
                  U
                </div>
              )}
            </div>
          ))
        )}
        {isTyping && (
          <div className="flex gap-4 md:gap-6 items-center">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
              <i className="fas fa-robot text-sm animate-pulse"></i>
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 md:p-6 bg-white border-t">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-end gap-2 bg-slate-100 p-2 rounded-2xl border border-slate-200 focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-100 transition-all">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
          />
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessingFile}
            className={`p-2 w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${isProcessingFile ? 'text-slate-400' : 'text-slate-500 hover:bg-slate-200 hover:text-indigo-600'}`}
          >
            {isProcessingFile ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-paperclip"></i>}
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Type a message or drop a file..."
            rows={1}
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-2 px-1 text-slate-800 placeholder-slate-400 scrollbar-hide min-h-[40px] max-h-48 overflow-y-auto"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className={`p-2 w-10 h-10 flex items-center justify-center rounded-xl transition-all ${!input.trim() || isTyping ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md transform hover:scale-105 active:scale-95'}`}
          >
            <i className="fas fa-paper-plane text-sm"></i>
          </button>
        </form>
        <p className="text-[10px] text-center mt-3 text-slate-400">
          Powered by Puter.js User-Pays Model. {availableModels.find(m => m.id === selectedModel)?.name || selectedModel} selected.
        </p>
      </div>
    </div>
  );
};
