
import React, { useState } from 'react';
import { Upload, FileText, Sparkles, Download, Share2, AlertCircle } from 'lucide-react';
import { getSummary } from '../geminiService';

const Summarizer: React.FC = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [level, setLevel] = useState<'short' | 'medium' | 'detailed'>('medium');
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    try {
      const res = await getSummary(text, level);
      setSummary(res);
    } catch (e) {
      alert('خطا در خلاصه‌سازی');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black flex items-center gap-3">
          <FileText className="text-emerald-500" size={32} /> خلاصه‌ساز هوشمند
        </h2>
        <p className="text-slate-500 font-bold">متن‌های طولانی رو در چند ثانیه به چکیده تبدیل کن.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Area */}
        <div className="glass p-6 rounded-3xl border dark:border-slate-800 space-y-4 shadow-xl">
          <div className="flex justify-between items-center">
            <span className="font-black text-sm text-slate-600 dark:text-slate-400">متن ورودی</span>
            <button 
              onClick={() => setText('')}
              className="text-xs text-red-500 font-bold hover:underline"
            >
              پاک کردن
            </button>
          </div>
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="متن جزوه یا مقاله را اینجا وارد کنید..."
            className="w-full h-80 bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 outline-none focus:ring-4 ring-emerald-500/10 text-sm leading-relaxed border dark:border-slate-800 transition-all no-scrollbar"
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex gap-2">
              {(['short', 'medium', 'detailed'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all ${
                    level === l 
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20' 
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {l === 'short' ? 'کوتاه' : l === 'medium' ? 'متوسط' : 'مفصل'}
                </button>
              ))}
            </div>
            <button 
              onClick={handleSummarize}
              disabled={!text.trim() || isLoading}
              className={`px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                isLoading || !text.trim()
                  ? 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                  : 'bg-emerald-500 text-white hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20'
              }`}
            >
              {isLoading ? 'در حال پردازش...' : <><Sparkles size={18} /> شروع خلاصه‌سازی</>}
            </button>
          </div>
        </div>

        {/* Output Area */}
        <div className="glass p-6 rounded-3xl border dark:border-slate-800 flex flex-col shadow-xl bg-slate-50/50 dark:bg-slate-900/30">
          <div className="flex justify-between items-center mb-4">
            <span className="font-black text-sm text-slate-600 dark:text-slate-400">نتیجه هوش مصنوعی</span>
            <div className="flex gap-2">
              <button className="p-2 bg-white dark:bg-slate-800 rounded-xl hover:scale-110 transition-transform"><Download size={18} /></button>
              <button className="p-2 bg-white dark:bg-slate-800 rounded-xl hover:scale-110 transition-transform"><Share2 size={18} /></button>
            </div>
          </div>
          
          <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-dashed border-slate-300 dark:border-slate-700 overflow-y-auto no-scrollbar min-h-[400px]">
            {summary ? (
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200 animate-in fade-in duration-700">
                {summary}
              </p>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4 opacity-50">
                <AlertCircle size={48} />
                <p className="font-bold text-center">هنوز خلاصه‌ای تولید نشده است.<br/>متن را وارد کرده و دکمه را بزنید.</p>
              </div>
            )}
          </div>
          
          {summary && (
            <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">✨</div>
              <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">
                خلاصه با موفقیت توسط هوش مصنوعی ایجاد شد. این چکیده شامل کلیدی‌ترین نکات متن شماست.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summarizer;
