
import { ModelOption } from './types';

export const MODELS: ModelOption[] = [
  // OpenAI & Compatible
  { id: 'gpt-5.2-pro', name: 'GPT-5.2 Pro', provider: 'OpenAI', description: 'Next-gen flagship model' },
  { id: 'gpt-5.1-codex-max', name: 'GPT-5.1 Codex Max', provider: 'OpenAI', description: 'Ultimate coding capability' },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', description: 'Versatile flagship multimodal' },
  { id: 'o1-pro', name: 'OpenAI o1 Pro', provider: 'OpenAI', description: 'Advanced reasoning' },
  { id: 'o3-mini', name: 'OpenAI o3 Mini', provider: 'OpenAI', description: 'Fast reasoning' },

  // Anthropic
  { id: 'claude-3-7-sonnet', name: 'Claude 3.7 Sonnet', provider: 'Anthropic', description: 'Latest intelligent workhorse' },
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', description: 'High capability & speed' },
  { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic', description: 'Maximum nuance' },

  // Google Gemini
  { id: 'gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro', provider: 'Google', description: 'Latest multimodal flagship' },
  { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash', provider: 'Google', description: 'Ultra-fast multimodal' },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: 'Google', description: 'Stable high-performance' },

  // xAI Grok
  { id: 'x-ai/grok-3', name: 'Grok 3', provider: 'xAI', description: 'Latest witty flagship' },
  { id: 'x-ai/grok-3-mini', name: 'Grok 3 Mini', provider: 'xAI', description: 'Efficient & capable' },
  { id: 'x-ai/grok-2-vision', name: 'Grok 2 Vision', provider: 'xAI', description: 'Strong vision capabilities' },

  // DeepSeek
  { id: 'deepseek/deepseek-r1', name: 'DeepSeek R1', provider: 'DeepSeek', description: 'Top-tier reasoning' },
  { id: 'deepseek/deepseek-v3.2', name: 'DeepSeek v3.2', provider: 'DeepSeek', description: 'Latest general purpose' },

  // Meta Llama
  { id: 'meta-llama/llama-4-maverick', name: 'Llama 4 Maverick', provider: 'Meta', description: 'Frontier open model' },
  { id: 'meta-llama/llama-3.1-405b-instruct', name: 'Llama 3.1 405B', provider: 'Meta', description: 'Massive open model' },

  // Mistral
  { id: 'mistralai/mistral-large-2512', name: 'Mistral Large 3', provider: 'Mistral', description: 'European flagship' },
  { id: 'mistralai/codestral-2508', name: 'Codestral', provider: 'Mistral', description: 'Specialized for code' },

  // MiniMax
  { id: 'minimax/minimax-01', name: 'MiniMax 01', provider: 'MiniMax', description: 'Multimodal powerhouse' },
  { id: 'minimax/minimax-m2.5', name: 'MiniMax M2.5', provider: 'MiniMax', description: 'Latest text generation' },

  // Microsoft
  { id: 'microsoft/phi-4', name: 'Phi-4', provider: 'Microsoft', description: 'Powerful small model' }
];

export const SYSTEM_INSTRUCTION = "You are OmniChat, a helpful AI assistant powered by Puter.js. You have access to the world's most advanced AI models. You can browse the web, analyze images, and remember details across conversations.";
