
import { ModelOption } from './types';

export const MODELS: ModelOption[] = [
  // Reasoning Models
  { id: 'o1-preview', name: 'OpenAI o1 Preview', provider: 'OpenAI', description: 'Advanced reasoning capabilities' },
  { id: 'o1-mini', name: 'OpenAI o1 Mini', provider: 'OpenAI', description: 'Fast, cost-effective reasoning' },
  { id: 'deepseek-reasoner', name: 'DeepSeek R1', provider: 'DeepSeek', description: 'Open-weights reasoning powerhouse' },
  
  // Flagship Models
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', description: 'Most advanced multimodal model' },
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', description: 'Exceptional coding and nuance' },
  { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic', description: 'Highest capability Claude model' },
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', provider: 'Google', description: 'Massive context window (2M+)' },
  { id: 'meta-llama/llama-3.1-405b-instruct', name: 'Llama 3.1 405B', provider: 'Meta', description: 'Largest open-source frontier model' },
  
  // Fast/Efficient Models
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', description: 'Fast and affordable' },
  { id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic', description: 'Lightning fast' },
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', provider: 'Google', description: 'High speed, low latency' },
  { id: 'meta-llama/llama-3.1-70b-instruct', name: 'Llama 3.1 70B', provider: 'Meta', description: 'Balanced performance' },

  // Experimental / Preview / Other (Preserving some user requests if supported)
  { id: 'gpt-5-nano', name: 'GPT-5 Nano (Preview)', provider: 'OpenAI', description: 'Experimental next-gen preview' },
  { id: 'claude-3-7-sonnet', name: 'Claude 3.7 Sonnet (Preview)', provider: 'Anthropic', description: 'Future release preview' },
  { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash (Preview)', provider: 'Google', description: 'Next-gen multimodal preview' },
  { id: 'mistralai/mistral-large-latest', name: 'Mistral Large 2', provider: 'Mistral', description: 'Top-tier European model' },
  { id: 'x-ai/grok-beta', name: 'Grok Beta', provider: 'xAI', description: 'Real-time knowledge access' }
];

export const SYSTEM_INSTRUCTION = "You are OmniChat, a helpful AI assistant powered by Puter.js. You have access to a wide range of models including reasoning models like o1 and DeepSeek R1. You can browse the web, analyze images, and remember details across conversations.";
