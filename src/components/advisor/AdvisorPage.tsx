import { useEffect, useMemo, useRef, useState } from 'react';
import './advisor.css';

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const STARTER_PROMPTS = [
  { label: 'Gummy crumb', question: 'My crumb is gummy near the base. What should I change?' },
  { label: 'Starter health', question: 'How do I know if my starter is ready to bake with?' },
  { label: 'Fresh milled flour', question: 'What hydration should I use for 30% fresh milled flour?' },
  { label: 'Oven spring', question: 'My loaf has no ear and flat oven spring. What went wrong?' },
  { label: 'Bulk fermentation', question: 'How long should bulk fermentation be at 76°F?' },
  { label: 'Scoring & shaping', question: "What's the best scoring pattern for a batard?" },
] as const;

const ADVISOR_REPLY = {
  reply:
    'Your gummy lower crumb suggests slight underproofing and a short uncovered bake. Next bake, extend final proof by 20–30 minutes and add 5–8 minutes uncovered at the end.',
  quickActions: [
    'Extend final proof by 20-30 minutes',
    'Increase uncovered bake time by 5-8 minutes',
    'Check internal loaf temp before cooling',
  ],
  disclaimer: 'Advisory guidance only; adjust based on your flour, oven, and starter behavior.',
};

export const AdvisorPage = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const replyTimeoutRef = useRef<number | null>(null);

  const hasConversation = messages.length > 0;

  const sendQuestion = (question: string) => {
    const trimmed = question.trim();

    if (!trimmed || isTyping) {
      return;
    }

    setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);
    setInput('');
    setIsTyping(true);

    replyTimeoutRef.current = window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', content: ADVISOR_REPLY.reply }]);
      setIsTyping(false);
      replyTimeoutRef.current = null;
    }, 350);
  };

  useEffect(() => {
    if (messagesEndRef.current && typeof messagesEndRef.current.scrollIntoView === 'function') {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if (replyTimeoutRef.current !== null) {
        window.clearTimeout(replyTimeoutRef.current);
      }
    };
  }, []);

  const showQuickActions = useMemo(() => messages.some((message) => message.role === 'assistant'), [messages]);

  return (
    <main className="grid h-[calc(100vh-73px)] grid-cols-1 lg:grid-cols-2">
      <section className="advisor-info-border relative flex flex-col justify-center bg-[#1C1A17] px-8 py-16 text-[#F5F0E8] md:px-16 md:py-20">
        <h1 className="mb-5 text-[40px] leading-tight tracking-tight" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
          Real answers from <em className="italic text-[#E8C98A]">real knowledge</em>
        </h1>
        <p className="text-[15px] leading-loose text-[#f5f0e8a6]">
          Not a generic chatbot. The advisor is built on a curated knowledge base from years of baking — fresh milled whole wheat,
          starter hydration, fermentation timing, and practical next-bake adjustments.
        </p>
      </section>

      <section className="flex h-full flex-col bg-[#EDE8DF]">
        {!hasConversation ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 p-10">
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
                  onClick={() => sendQuestion(prompt.question)}
                  className="border border-[#C4813A33] bg-[#FAF7F2] px-4 py-2.5 text-[11px] tracking-[0.02em] text-[#6B6560] transition-all duration-200 hover:border-[#C4813A] hover:bg-white hover:text-[#8B5A2B]"
                  style={{ fontFamily: 'DM Mono, monospace' }}
                >
                  {prompt.label}
                </button>
              ))}
            </div>
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
                {message.content}
              </div>
            ))}

            {isTyping && (
              <div aria-label="Advisor typing" className="self-start rounded-sm rounded-tl-none border-l-[3px] border-[#C4813A] bg-[#FAF7F2] px-[18px] py-3.5">
                <div className="flex gap-1">
                  <span className="typing-dot-1 h-1.5 w-1.5 rounded-full bg-[#C4813A] opacity-40" />
                  <span className="typing-dot-2 h-1.5 w-1.5 rounded-full bg-[#C4813A] opacity-40" />
                  <span className="typing-dot-3 h-1.5 w-1.5 rounded-full bg-[#C4813A] opacity-40" />
                </div>
              </div>
            )}

            {showQuickActions && !isTyping && (
              <div className="max-w-[85%] self-start rounded-sm border border-[#C4813A26] bg-[#FAF7F2] px-[22px] py-[18px]">
                <p className="mb-3 text-[9px] uppercase tracking-[0.15em] text-[#C4813A]" style={{ fontFamily: 'DM Mono, monospace' }}>
                  Quick Actions
                </p>
                <div className="flex flex-col">
                  {ADVISOR_REPLY.quickActions.map((action) => (
                    <button
                      key={action}
                      type="button"
                      className="quick-action-item flex items-center gap-2.5 border-b border-[#C4813A1a] py-2 text-left text-[13px] text-[#1C1A17] transition-colors duration-150 last:border-b-0 hover:text-[#8B5A2B]"
                      onClick={() => sendQuestion(action)}
                    >
                      {action}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-[10px] leading-relaxed text-[#6B6560b3]" style={{ fontFamily: 'DM Mono, monospace' }}>
                  {ADVISOR_REPLY.disclaimer}
                </p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}

        <div className="flex shrink-0 bg-[#EDE8DF] px-10 pb-8">
          <input
            className="flex-1 border border-r-0 border-[#C4813A40] bg-[#FAF7F2] px-5 py-4 text-sm text-[#1C1A17] outline-none transition-colors duration-200 focus:border-[#C4813A]"
            placeholder="Ask about your bake..."
            aria-label="Advisor input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                sendQuestion(input);
              }
            }}
          />
          <button
            type="button"
            className="bg-[#8B5A2B] px-[22px] py-4 text-base text-[#F5F0E8] transition-colors duration-200 hover:bg-[#1C1A17]"
            onClick={() => sendQuestion(input)}
          >
            →
          </button>
        </div>
      </section>
    </main>
  );
};
