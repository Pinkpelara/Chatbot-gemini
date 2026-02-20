
import React from 'react';
import { ChatSession, PuterUser } from '../types';

interface SidebarProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewSession: () => void;
  onDeleteSession: (id: string) => void;
  user: PuterUser | null;
  isOpen: boolean;
}

declare const puter: any;

export const Sidebar: React.FC<SidebarProps> = ({ 
  sessions, 
  activeSessionId, 
  onSelectSession, 
  onNewSession,
  onDeleteSession,
  user,
  isOpen
}) => {
  const handleSignIn = async () => {
    await puter.auth.signIn();
    window.location.reload();
  };

  return (
    <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} fixed md:relative md:translate-x-0 transition-transform duration-300 z-40 w-72 h-full bg-slate-900 flex flex-col text-slate-300 border-r border-slate-800`}>
      <div className="p-4 flex flex-col h-full">
        <button 
          onClick={onNewSession}
          className="flex items-center gap-3 px-3 py-3 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors mb-6 text-white"
        >
          <i className="fas fa-plus"></i>
          <span className="font-medium">New Chat</span>
        </button>

        <div className="flex-1 overflow-y-auto hide-scrollbar space-y-2 mb-4">
          <div className="text-xs font-semibold text-slate-500 uppercase px-2 mb-2">History</div>
          {sessions.map(session => (
            <div 
              key={session.id}
              className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${activeSessionId === session.id ? 'bg-slate-800 text-white' : 'hover:bg-slate-800/50'}`}
              onClick={() => onSelectSession(session.id)}
            >
              <div className="flex items-center gap-3 min-w-0">
                <i className="far fa-comment-alt text-slate-500"></i>
                <span className="truncate text-sm">{session.title}</span>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); onDeleteSession(session.id); }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-opacity"
              >
                <i className="fas fa-trash-alt text-xs"></i>
              </button>
            </div>
          ))}
          {sessions.length === 0 && (
            <div className="text-sm text-slate-600 px-2 italic">No conversations yet.</div>
          )}
        </div>

        <div className="pt-4 border-t border-slate-800">
          {user ? (
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">{user.username}</div>
                <div className="text-xs text-slate-500">Free Account</div>
              </div>
              <button onClick={() => { puter.auth.signOut(); window.location.reload(); }} className="text-slate-500 hover:text-white">
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          ) : (
            <button 
              onClick={handleSignIn}
              className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
            >
              Sign in with Puter
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
