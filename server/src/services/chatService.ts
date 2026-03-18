import OpenAI from 'openai';
import { SYSTEM_PROMPT } from '../config/prompts.js';

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
};

type StreamChatInput = {
  message: string
  history: ChatMessage[]
  onToken: (token: string) => void
  signal: AbortSignal
};

const MAX_HISTORY_MESSAGES = 12;

const normalizeHistory = (history: unknown): ChatMessage[] => {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter(
      (item): item is ChatMessage =>
        !!item &&
        (item as ChatMessage).role !== undefined &&
        ((item as ChatMessage).role === 'user' || (item as ChatMessage).role === 'assistant') &&
        typeof (item as ChatMessage).content === 'string' &&
        (item as ChatMessage).content.trim().length > 0,
    )
    .slice(-MAX_HISTORY_MESSAGES);
};

export const createChatService = ({ apiKey, model }: { apiKey: string; model: string }) => {
  const openai = new OpenAI({ apiKey });

  const streamChat = async ({ message, history, onToken, signal }: StreamChatInput): Promise<void> => {
    const messages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...normalizeHistory(history),
      { role: 'user' as const, content: message.trim() },
    ];

    const stream = await openai.chat.completions.create(
      {
        model,
        messages,
        stream: true,
      },
      { signal },
    );

    for await (const chunk of stream) {
      const token = chunk.choices?.[0]?.delta?.content;

      if (token) {
        onToken(token);
      }
    }
  };

  return {
    streamChat,
  };
};
