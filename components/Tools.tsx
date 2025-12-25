
import React, { useState } from 'react';
import { 
  Calculator, 
  Languages, 
  ArrowRightLeft, 
  Quote, 
  Hash,
  Copy,
  Check
} from 'lucide-react';

const Tools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calc' | 'translate' | 'convert' | 'cite'>('calc');
  const [calcInput, setCalcInput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderTool = () => {
    switch (activeTab) {
      case 'calc':
        return (
          <div className="glass p-8 rounded-3xl space-y-6 max-w-md mx-auto shadow-2xl">
            <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-2xl text-right text-3xl font-mono min-h-[80px] break-all border dark:border-slate-800">
              {calcInput || '0'}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {['7','8','9','/','4','5','6','*','1','2','3','-','C','0','=','+'].map((btn) => (
                <button 
                  key={btn}
                  onClick={() => {
                    if (btn === 'C') setCalcInput('');
                    else if (btn === '=') {
                      try { setCalcInput(eval(calcInput).toString()); } catch { setCalcInput('Error'); }
                    } else setCalcInput(prev => prev + btn);
                  }}
                  className={`p-5 rounded-2xl font-black transition-all active:scale-90 ${
                    ['/','*','-','+','='].includes(btn) 
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' 
                      : btn === 'C' ? 'bg-red-500 text-white' : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border dark:border-slate-700'
                  }`}
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>
        );
      case 'translate':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass p-6 rounded-3xl space-y-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-black">فارسی</span>
                <Languages size={18} className="text-purple-500" />
              </div>
              <textarea placeholder="متن رو اینجا بنویس..." className="w-full h-48 bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 outline-none border dark:border-slate-800 text-sm no-scrollbar" />
            </div>
            <div className="glass p-6 rounded-3xl space-y-4 bg-slate-50/50 dark:bg-slate-900/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-black">انگلیسی</span>
                <button onClick={handleCopy} className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all">
                  {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                </button>
              </div>
              <div className="w-full h-48 rounded-2xl p-4 text-sm leading-relaxed text-slate-500">
                Translation results will appear here...
              </div>
            </div>
          </div>
        );
      case 'convert':
        return (
          <div className="glass p-8 rounded-3xl max-w-2xl mx-auto space-y-8">
            <h3 className="font-black text-center text-xl mb-4">مبدل واحدها</h3>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 space-y-2 w-full">
                <label className="text-xs font-bold text-slate-500">از واحد</label>
                <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden">
                  <input type="number" className="flex-1 bg-transparent p-4 outline-none text-center font-bold" defaultValue="1" />
                  <select className="bg-purple-600 text-white p-4 outline-none font-bold">
                    <option>سانتی‌متر</option>
                    <option>متر</option>
                    <option>کیلومتر</option>
                  </select>
                </div>
              </div>
              <ArrowRightLeft className="text-purple-500 mt-6 rotate-90 md:rotate-0" />
              <div className="flex-1 space-y-2 w-full">
                <label className="text-xs font-bold text-slate-500">به واحد</label>
                <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden">
                  <div className="flex-1 p-4 text-center font-bold">۰.۰۱</div>
                  <select className="bg-purple-600 text-white p-4 outline-none font-bold">
                    <option>متر</option>
                    <option>سانتی‌متر</option>
                    <option>کیلومتر</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      case 'cite':
        return (
          <div className="glass p-8 rounded-3xl max-w-2xl mx-auto space-y-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Quote className="text-purple-500" />
              <h3 className="font-black">منابع‌نویسی (APA)</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input placeholder="نام نویسنده" className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl outline-none border dark:border-slate-800 text-sm font-bold" />
              <input placeholder="سال انتشار" className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl outline-none border dark:border-slate-800 text-sm font-bold" />
              <input placeholder="عنوان مقاله" className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl outline-none border dark:border-slate-800 text-sm font-bold col-span-1 sm:col-span-2" />
            </div>
            <button className="w-full py-4 bg-purple-600 text-white rounded-2xl font-black shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">تولید رفرنس</button>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black flex items-center gap-3">
          <Hash className="text-purple-500" size={32} /> جعبه ابزار دانشجویی
        </h2>
        <p className="text-slate-500 font-bold">هر چی که برای محاسبات و نگارش لازم داری، اینجاست.</p>
      </div>

      <div className="flex flex-wrap gap-4 p-2 glass rounded-3xl justify-center">
        {[
          { id: 'calc', label: 'ماشین حساب', icon: <Calculator size={18} /> },
          { id: 'translate', label: 'مترجم', icon: <Languages size={18} /> },
          { id: 'convert', label: 'مبدل واحد', icon: <ArrowRightLeft size={18} /> },
          { id: 'cite', label: 'رفرنس‌دهی', icon: <Quote size={18} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black transition-all ${
              activeTab === tab.id 
                ? 'bg-purple-600 text-white shadow-xl shadow-purple-500/30 scale-105' 
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="pt-4">
        {renderTool()}
      </div>
    </div>
  );
};

export default Tools;
