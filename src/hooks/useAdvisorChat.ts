import { useState } from 'react';
import { streamChat, type ChatMessage } from '../api/chat';

export const useAdvisorChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendQuestion = async (question: string) => {
    const trimmed = question.trim();

    if (!trimmed || isTyping) {
      return;
    }

    const nextMessages = [...messages, { role: 'user' as const, content: trimmed }];
    setMessages(nextMessages);
    setError(null);
    setIsTyping(true);

    const assistantIndex = nextMessages.length;
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      await streamChat({
        message: trimmed,
        history: nextMessages,
        onToken: (token) => {
          setMessages((prev) =>
            prev.map((message, index) =>
              index === assistantIndex ? { ...message, content: message.content + token } : message,
            ),
          );
        },
      });
    } catch (err) {
      const messageText = err instanceof Error ? err.message : 'Something went wrong';
      setError(messageText);
      setMessages((prev) =>
        prev.map((message, index) =>
          index === assistantIndex
            ? { ...message, content: 'Sorry — I hit an API error. Please try again.' }
            : message,
        ),
      );
    } finally {
      setIsTyping(false);
    }
  };

  return {
    messages,
    isTyping,
    error,
    sendQuestion,
  };
};
