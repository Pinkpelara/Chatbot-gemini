
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  model?: string;
  attachments?: string[];
  isError?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  lastModified: number;
}

export interface ModelOption {
  id: string;
  name: string;
  provider: string;
  description: string;
}

export interface PuterUser {
  username: string;
  uid: string;
}
