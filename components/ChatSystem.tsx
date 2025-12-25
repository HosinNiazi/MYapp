
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Heart, Brain, Trash2, Clock, Sparkles } from 'lucide-react';
import { Message } from '../types';

interface ChatSystemProps {
  type: 'dana' | 'parvaneh' | 'ai';
  getResponse: (msg: string) => Promise<string>;
}

const ChatSystem: React.FC<ChatSystemProps> = ({ type, getResponse }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const config = {
    dana: { 
      name: 'دانا', 
      desc: 'دستیار آموزشی هوشمند', 
      icon: <Bot className="text-white" />, 
      color: 'from-blue-600 to-indigo-600',
      initial: 'سلام! من دانا هستم. توی چه مبحث درسی‌ای امروز کمک می‌خوای؟'
    },
    parvaneh: { 
      name: 'پروانه', 
      desc: 'مشاور احساسی و همدل', 
      icon: <Heart className="text-white" />, 
      color: 'from-pink-500 to-rose-600',
      initial: 'سلام عزیز دلم. من پروانه‌ام. هر چی تو دلت هست رو می‌تونی اینجا بهم بگی. همه‌چیز بین خودمون می‌مونه.'
    },
    ai: { 
      name: 'دستیار VIP', 
      desc: 'هوش مصنوعی پیشرفته', 
      icon: <Brain className="text-white" />, 
      color: 'from-purple-600 to-fuchsia-600',
      initial: 'سلام! من دستیار هوشمند VIP هستم. مقاله‌نویسی، کدنویسی یا تحلیل داده؟ در خدمتم.'
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem(`chat_${type}`);
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([{
        id: 'initial',
        role: 'model',
        content: config[type].initial,
        timestamp: new Date()
      }]);
    }
  }, [type]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`chat_${type}`, JSON.stringify(messages));
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, type]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getResponse(input);
      const modelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (confirm('آیا می‌خواهید تمام گفتگو را پاک کنید؟')) {
      setMessages([{
        id: 'initial',
        role: 'model',
        content: config[type].initial,
        timestamp: new Date()
      }]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-h-[800px] glass rounded-3xl overflow-hidden shadow-2xl border dark:border-slate-800">
      {/* Chat Header */}
      <div className={`p-4 bg-gradient-to-l ${config[type].color} text-white flex justify-between items-center shadow-lg relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 animate-pulse">
            {config[type].icon}
          </div>
          <div>
            <h3 className="font-black text-lg">{config[type].name}</h3>
            <p className="text-xs opacity-80 font-bold">{config[type].desc}</p>
          </div>
        </div>
        <button 
          onClick={clearChat}
          className="p-2 hover:bg-white/20 rounded-xl transition-colors relative z-10"
          title="پاک کردن گفتگو"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 no-scrollbar bg-slate-50/50 dark:bg-slate-900/30">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2`}
          >
            <div 
              className={`max-w-[85%] p-4 rounded-3xl shadow-sm text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? `bg-gradient-to-r ${config[type].color} text-white rounded-br-none` 
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-100 dark:border-slate-700'
              }`}
            >
              {msg.content}
              <div className={`mt-2 text-[10px] flex items-center gap-1 opacity-60 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <Clock size={10} /> {new Date(msg.timestamp).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-2 animate-pulse">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-l ${config[type].color} flex items-center justify-center`}>
              <Sparkles size={16} className="text-white" />
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl rounded-bl-none shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <span className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t dark:border-slate-800">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="پیامت رو اینجا بنویس..."
            className="flex-1 bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl outline-none focus:ring-2 ring-purple-500/20 dark:text-white transition-all text-sm"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-4 rounded-2xl transition-all shadow-lg ${
              !input.trim() || isLoading 
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed' 
                : `bg-gradient-to-l ${config[type].color} text-white hover:scale-110 active:scale-95`
            }`}
          >
            <Send size={24} className="transform rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSystem;
