
import { ModelOption } from './types';

export const MODELS: ModelOption[] = [
  // OpenAI
  { id: 'openai/gpt-5.2-pro', name: 'GPT-5.2 Pro', provider: 'OpenAI', description: 'Flagship reasoning model (High Effort)' },
  { id: 'openai/gpt-5.2-codex', name: 'GPT-5.2 Codex', provider: 'OpenAI', description: 'Best for coding & cybersecurity' },
  { id: 'openai/gpt-5.2-chat', name: 'GPT-5.2 Chat', provider: 'OpenAI', description: 'Optimized for conversation' },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', description: 'Versatile multimodal model' },
  { id: 'o1-pro', name: 'OpenAI o1 Pro', provider: 'OpenAI', description: 'Advanced reasoning' },

  // Anthropic
  { id: 'anthropic/claude-opus-4-6', name: 'Claude Opus 4.6', provider: 'Anthropic', description: 'Maximum capability flagship' },
  { id: 'anthropic/claude-sonnet-4-6', name: 'Claude Sonnet 4.6', provider: 'Anthropic', description: 'High performance & speed' },
  { id: 'anthropic/claude-3.7-sonnet:thinking', name: 'Claude 3.7 Sonnet (Thinking)', provider: 'Anthropic', description: 'Visible step-by-step reasoning' },
  { id: 'anthropic/claude-3-7-sonnet', name: 'Claude 3.7 Sonnet', provider: 'Anthropic', description: 'Hybrid reasoning model' },

  // Google
  { id: 'google/gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro', provider: 'Google', description: 'Advanced reasoning & agentic workflows' },
  { id: 'google/gemini-3-pro-image-preview', name: 'Gemini 3 Pro Image', provider: 'Google', description: '2K/4K image generation & editing' },
  { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash', provider: 'Google', description: 'Ultra-fast multimodal' },

  // DeepSeek
  { id: 'deepseek/deepseek-v3.2-speciale', name: 'DeepSeek V3.2 Speciale', provider: 'DeepSeek', description: 'Maximum reasoning accuracy' },
  { id: 'deepseek/deepseek-v3.2', name: 'DeepSeek V3.2', provider: 'DeepSeek', description: 'Flagship general purpose' },
  { id: 'deepseek-reasoner', name: 'DeepSeek R1', provider: 'DeepSeek', description: 'Open-weights reasoning powerhouse' },

  // xAI (Grok)
  { id: 'x-ai/grok-4-1-fast', name: 'Grok 4.1 Fast', provider: 'xAI', description: 'Best tool-calling & agentic model' },
  { id: 'x-ai/grok-4-1-fast-non-reasoning', name: 'Grok 4.1 Fast (Instant)', provider: 'xAI', description: 'Low latency, no reasoning overhead' },

  // Qwen (Alibaba)
  { id: 'qwen/qwen3.5-397b-a17b', name: 'Qwen 3.5 397B', provider: 'Qwen', description: 'Massive open-weight multimodal' },
  { id: 'qwen/qwen3-max-thinking', name: 'Qwen 3 Max Thinking', provider: 'Qwen', description: 'Flagship reasoning with tools' },

  // MiniMax
  { id: 'minimax/minimax-m2.5', name: 'MiniMax M2.5', provider: 'MiniMax', description: 'Productivity & coding powerhouse' },

  // Z.AI (Zhipu)
  { id: 'z-ai/glm-5', name: 'GLM-5', provider: 'Z.AI', description: 'Agentic engineering & systems' },

  // Meta
  { id: 'meta-llama/llama-4-maverick', name: 'Llama 4 Maverick', provider: 'Meta', description: 'Frontier open model' },
  { id: 'meta-llama/llama-3.1-405b-instruct', name: 'Llama 3.1 405B', provider: 'Meta', description: 'Massive open model' },

  // Mistral
  { id: 'mistralai/mistral-large-2512', name: 'Mistral Large 3', provider: 'Mistral', description: 'European flagship' },

  // Amazon
  { id: 'amazon/nova-2-lite-v1', name: 'Nova 2 Lite', provider: 'Amazon', description: 'Cost-effective multimodal reasoning' },

  // Perplexity
  { id: 'perplexity/sonar', name: 'Sonar', provider: 'Perplexity', description: 'Real-time search optimized' },

  // Inception
  { id: 'inception/mercury', name: 'Mercury', provider: 'Inception', description: 'Ultra-low latency diffusion LLM' }
];

export const SYSTEM_INSTRUCTION = "You are OmniChat, a helpful AI assistant powered by Puter.js. You have access to the world's most advanced AI models. You can browse the web, analyze images, and remember details across conversations.";
