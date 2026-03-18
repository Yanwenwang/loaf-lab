import { httpClient } from '../lib/httpClient';

export type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
};

type StreamChatParams = {
  message: string
  history: ChatMessage[]
  onToken: (token: string) => void
};

const parseSSEEvents = (buffer: string) => {
  const events: Array<{ event: string; data: string }> = [];
  const chunks = buffer.split('\n\n');
  const remaining = chunks.pop() ?? '';

  for (const chunk of chunks) {
    const lines = chunk.split('\n');
    const eventLine = lines.find((line) => line.startsWith('event:'));
    const dataLine = lines.find((line) => line.startsWith('data:'));

    if (!eventLine || !dataLine) {
      continue;
    }

    const event = eventLine.replace('event:', '').trim();
    const data = dataLine.replace('data:', '').trim();

    events.push({ event, data });
  }

  return { events, remaining };
};

export const streamChat = async ({ message, history, onToken }: StreamChatParams) => {
  const response = await httpClient.post('/api/chat', {
    message,
    history,
  });

  if (!response.body) {
    throw new Error('No response body from chat API');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { value, done } = await reader.read();

    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const { events, remaining } = parseSSEEvents(buffer);
    buffer = remaining;

    for (const current of events) {
      if (current.event === 'token') {
        const parsed = JSON.parse(current.data) as { token?: string };
        const token = parsed.token ?? '';

        if (token) {
          onToken(token);
        }
      }

      if (current.event === 'error') {
        const parsed = JSON.parse(current.data) as { error?: string };
        throw new Error(parsed.error ?? 'Unknown streaming error');
      }
    }
  }
};
