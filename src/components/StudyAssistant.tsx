import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Trash2, X, RefreshCw } from 'lucide-react';
import { Message } from '../types';
import MathJaxRenderer from './MathJaxRenderer';

interface StudyAssistantProps {
  currentContextText?: string | null;
  isOpen?: boolean;
  onClose?: () => void;
  initialQuestion?: string | null;
}

export const StudyAssistant: React.FC<StudyAssistantProps> = ({
  currentContextText,
  isOpen = true,
  onClose,
  initialQuestion,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I am your UPSC ISS Statistics Assistant. Ask me any questions about Probability, Statistical Inference, Linear Models, Sampling, Demography, or Official Statistics. I can write step-by-step mathematical proofs and explain exam shortcuts!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const processedInitialQuestion = useRef<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Prefill and send question context if requested
  useEffect(() => {
    if (initialQuestion && processedInitialQuestion.current !== initialQuestion) {
      processedInitialQuestion.current = initialQuestion;
      const userMsgId = `init-user-${Date.now()}`;
      const userMsg: Message = {
        id: userMsgId,
        role: 'user',
        content: `Could you explain this exam question step-by-step and show how to solve it?\n\n"${initialQuestion}"`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages((prev) => {
        if (prev.some((m) => m.content.includes(initialQuestion))) {
          return prev;
        }
        return [...prev, userMsg];
      });
      sendMessageStream([...messages, userMsg], initialQuestion);
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, [initialQuestion]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Simple caching helpers
  const getCachedResponse = (prompt: string, context?: string | null): string | null => {
    try {
      const cacheData = localStorage.getItem('statika_chat_cache');
      if (cacheData) {
        const cache = JSON.parse(cacheData);
        const cacheKey = `${prompt.trim()}||${(context || currentContextText || '').trim()}`;
        return cache[cacheKey] || null;
      }
    } catch (e) {
      console.error('Failed to read chat cache', e);
    }
    return null;
  };

  const setCachedResponse = (prompt: string, response: string, context?: string | null) => {
    try {
      const cacheData = localStorage.getItem('statika_chat_cache') || '{}';
      const cache = JSON.parse(cacheData);
      const cacheKey = `${prompt.trim()}||${(context || currentContextText || '').trim()}`;
      cache[cacheKey] = response;
      localStorage.setItem('statika_chat_cache', JSON.stringify(cache));
    } catch (e) {
      console.error('Failed to write chat cache', e);
    }
  };

  const sendMessageStream = async (history: Message[], contextStr?: string | null) => {
    const lastUserMsg = history[history.length - 1];
    const promptText = lastUserMsg ? lastUserMsg.content : '';
    const ctx = contextStr || currentContextText;

    const cached = getCachedResponse(promptText, ctx);
    if (cached) {
      setIsLoading(true);
      const assistantMsgId = `assistant-chunk-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMsgId,
          role: 'assistant',
          content: cached,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsLoading(false);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsLoading(true);
    const assistantMsgId = `assistant-chunk-${Date.now()}`;
    
    // Add an empty assistant bubble first
    setMessages((prev) => [
      ...prev,
      {
        id: assistantMsgId,
        role: 'assistant',
        content: '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, content: m.content })),
          context: contextStr || currentContextText,
        }),
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch streaming response from server');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');
      let assistantText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataText = line.slice(6).trim();
              if (dataText === '[DONE]') continue;

              try {
                const parsed = JSON.parse(dataText);
                if (parsed.text) {
                  assistantText += parsed.text;
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantMsgId ? { ...msg, content: assistantText } : msg
                    )
                  );
                }
              } catch (e) {
                // Keep partial text parsing robust in case of split chunks
              }
            }
          }
        }
      }
      if (assistantText) {
        setCachedResponse(promptText, assistantText, ctx);
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        // Intentionally aborted stream, do not write error logs or updates
        return;
      }
      console.error(err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? { ...msg, content: `⚠️ Error: Could not connect to Gemini AI. Please check that GEMINI_API_KEY is configured correctly in the Secrets panel.\n\nTechnical details: ${err.message}` }
            : msg
        )
      );
    } finally {
      if (abortControllerRef.current === abortController) {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInput('');
    await sendMessageStream(updatedHistory);
  };

  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear your conversation history?')) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: 'Chat history cleared. How can I help you in your UPSC ISS statistics preparation today?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  const presetPrompts = [
    'Explain MVUE & Cramér-Rao Inequality',
    'Explain the Gauss-Markov Theorem with proof',
    'Tips for descriptive Papers III & IV',
  ];

  const handlePresetClick = (prompt: string) => {
    setInput(prompt);
  };

  if (!isOpen) return null;

  return (
    <div className="flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl shadow-lg overflow-hidden backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold font-display text-white">ISS Study Assistant</h3>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Powered by Gemini 3.5
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={clearChat}
            className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
            title="Clear Chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/5">
        {messages.map((m) => (
          <div
            key={m.id}
            className="w-full flex flex-col gap-1.5"
          >
            {/* Sender header */}
            <div className={`flex items-center gap-1.5 text-xs font-semibold ${
              m.role === 'user' ? 'justify-end text-indigo-400' : 'text-emerald-400'
            }`}>
              {m.role === 'user' ? (
                <>
                  <span>You</span>
                  <User className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <Bot className="w-3.5 h-3.5 animate-pulse" />
                  <span>Study AI</span>
                </>
              )}
            </div>

            {/* Bubble content */}
            <div
              className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed w-full overflow-x-auto shadow-md ${
                m.role === 'user'
                  ? 'bg-indigo-600/25 border border-indigo-500/30 text-white whitespace-pre-wrap break-words rounded-tr-none'
                  : 'bg-white/5 border border-white/10 text-slate-100 rounded-tl-none'
              }`}
            >
              {m.role === 'user' ? (
                <p className="whitespace-pre-wrap break-words">{m.content}</p>
              ) : (
                <MathJaxRenderer
                  html={m.content}
                  className="markdown-body"
                />
              )}
            </div>

            <span className={`block text-[10px] text-slate-500 px-1 ${
              m.role === 'user' ? 'text-right' : 'text-left'
            }`}>
              {m.timestamp}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 w-full max-w-full">
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 animate-spin border border-emerald-500/20">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none shadow-md text-sm text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]"></span>
              Gemini is typesetting proofs...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Preset Suggestions */}
      {messages.length <= 1 && (
        <div className="px-4 py-2 bg-white/5 border-t border-white/10">
          <p className="text-[11px] text-slate-400 mb-1.5 font-medium">Try asking:</p>
          <div className="flex flex-wrap gap-1.5">
            {presetPrompts.map((p) => (
              <button
                key={p}
                onClick={() => handlePresetClick(p)}
                className="text-[11px] bg-white/5 hover:bg-white/10 hover:text-emerald-300 text-slate-300 px-2.5 py-1 rounded-full border border-white/10 hover:border-emerald-500/30 transition-all font-sans cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Context indicator if any */}
      {currentContextText && (
        <div className="px-4 py-1.5 bg-indigo-500/10 border-t border-white/10 flex items-center justify-between text-[11px] text-indigo-300">
          <span className="truncate">📎 Active question context attached</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSend} className="p-3 border-t border-white/10 flex gap-2 bg-white/5">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about formulas, concepts, or proofs..."
          disabled={isLoading}
          className="flex-1 bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-hidden text-sm px-4 py-2 rounded-xl transition-all"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-white/5 text-white disabled:text-slate-600 p-2.5 rounded-xl flex items-center justify-center transition-colors shrink-0 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
export default StudyAssistant;
