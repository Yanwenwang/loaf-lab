import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useAdvisorChat } from '../../hooks/useAdvisorChat';
import './advisor.css';

const STARTER_PROMPTS = [
  { label: 'Gummy crumb', question: 'My crumb is gummy near the base. What should I change?' },
  { label: 'Starter health', question: 'How do I know if my starter is ready to bake with?' },
  { label: 'Fresh milled flour', question: 'What hydration should I use for 30% fresh milled flour?' },
  { label: 'Oven spring', question: 'My loaf has no ear and flat oven spring. What went wrong?' },
  { label: 'Bulk fermentation', question: 'How long should bulk fermentation be at 76°F?' },
  { label: 'Scoring & shaping', question: "What's the best scoring pattern for a batard?" },
] as const;

const MAX_INPUT_HEIGHT = 200;

export const AdvisorPage = () => {
  const [input, setInput] = useState('');
  const { messages, isTyping, error, sendQuestion } = useAdvisorChat();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const hasConversation = messages.length > 0;

  const resizeTextarea = (el: HTMLTextAreaElement) => {
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, MAX_INPUT_HEIGHT)}px`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    resizeTextarea(e.target);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSend(input);
    }
  };

  const handleSend = async (question: string) => {
    await sendQuestion(question);
    setInput('');
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
  };

  useEffect(() => {
    if (messagesEndRef.current && typeof messagesEndRef.current.scrollIntoView === 'function') {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const inputBox = (
    <div className="flex flex-col rounded-2xl border border-[#C4813A40] bg-[#FAF7F2] transition-colors duration-200 focus-within:border-[#C4813A]">
      <textarea
        ref={inputRef}
        rows={1}
        className="w-full resize-none overflow-y-auto bg-transparent px-5 pt-4 pr-4 pb-2 text-sm leading-relaxed text-[#1C1A17] outline-none placeholder:text-[#6B6560]"
        style={{ maxHeight: MAX_INPUT_HEIGHT }}
        placeholder="Ask about your bake..."
        aria-label="Advisor input"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <div className="flex justify-end px-3 pb-3">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8B5A2B] text-base text-[#F5F0E8] transition-colors duration-200 hover:bg-[#1C1A17] disabled:cursor-not-allowed disabled:opacity-60"
          onClick={() => void handleSend(input)}
          disabled={isTyping}
        >
          {isTyping ? '…' : '→'}
        </button>
      </div>
    </div>
  );

  return (
    <main className="grid h-[calc(100vh-73px)] grid-cols-1 lg:grid-cols-2">
      <section className="advisor-info-border relative flex flex-col justify-center bg-[#1C1A17] px-8 py-16 text-[#F5F0E8] md:px-16 md:py-20">
        <h1 className="mb-5 text-[40px] leading-tight tracking-tight" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
          Real answers from <em className="italic text-[#E8C98A]">real knowledge</em>
        </h1>
        <p className="text-[15px] leading-loose text-[#f5f0e8a6]">
          Ask your sourdough question and get practical next-bake advice in real time.
        </p>
      </section>

      <section className="flex h-full flex-col bg-[#EDE8DF]">
        {!hasConversation ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 p-10 -mt-16">
            <span className="text-[56px] leading-none opacity-30">🌾</span>
            <h2 className="text-center text-[24px] text-[#1C1A17] opacity-45" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              What are you baking?
            </h2>
            <p className="mb-2 max-w-[300px] text-center text-sm leading-relaxed text-[#6B6560]">
              Ask anything about your sourdough — or pick a topic to get started.
            </p>
            <div className="flex max-w-[440px] flex-wrap justify-center gap-2.5">
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt.label}
                  type="button"
                  onClick={() => {
                    void handleSend(prompt.question);
                  }}
                  className="border border-[#C4813A33] bg-[#FAF7F2] px-4 py-2.5 text-[11px] tracking-[0.02em] text-[#6B6560] transition-all duration-200 hover:border-[#C4813A] hover:bg-white hover:text-[#8B5A2B]"
                  style={{ fontFamily: 'DM Mono, monospace' }}
                >
                  {prompt.label}
                </button>
              ))}
            </div>
            <div className="w-full max-w-[600px]">{inputBox}</div>
          </div>
        ) : (
          <div className="chat-messages-scroll flex flex-1 flex-col gap-4 overflow-y-auto px-10 pb-5 pt-8">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`chat-fade-up max-w-[85%] px-[18px] py-3.5 text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'self-end rounded-sm rounded-br-none bg-[#8B5A2B] text-[#F5F0E8]'
                    : 'self-start rounded-sm rounded-tl-none border-l-[3px] border-[#C4813A] bg-[#FAF7F2] text-[#1C1A17]'
                }`}
              >
                {message.role === 'assistant' && (
                  <p className="mb-1.5 text-[9px] uppercase tracking-[0.15em] text-[#C4813A]" style={{ fontFamily: 'DM Mono, monospace' }}>
                    Loaf Lab Advisor
                  </p>
                )}
                {message.role === 'assistant' ? (
                  <div className="advisor-markdown">
                    <ReactMarkdown>{message.content || '…'}</ReactMarkdown>
                  </div>
                ) : (
                  message.content || '…'
                )}
              </div>
            ))}

            {error && (
              <p className="max-w-[85%] self-start text-xs text-[#9A4D4D]" style={{ fontFamily: 'DM Mono, monospace' }}>
                {error}
              </p>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}

        {hasConversation && (
          <div className="shrink-0 bg-[#EDE8DF] px-10 pb-8">
            <div className="mx-auto w-full max-w-[600px]">{inputBox}</div>
          </div>
        )}
      </section>
    </main>
  );
};
