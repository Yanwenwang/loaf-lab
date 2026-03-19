export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type StreamChatInput = {
  message: string;
  history: ChatMessage[];
  onToken: (token: string) => void;
  signal: AbortSignal;
};

export interface LLMService {
  streamChat: (args: StreamChatInput) => Promise<void>;
}
