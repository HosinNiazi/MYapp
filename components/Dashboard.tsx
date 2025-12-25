
import React from 'react';
import { 
  Zap, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  ChevronLeft,
  Star,
  Trophy,
  Activity
} from 'lucide-react';
import { UserProfile, AppSection } from '../types';

interface DashboardProps {
  profile: UserProfile;
  onNavigate: (section: AppSection) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ profile, onNavigate }) => {
  const cards = [
    { id: AppSection.DANA, title: 'دستیار دانا', desc: 'سوالات درسی‌ت رو بپرس', color: 'bg-blue-500', icon: '🤖' },
    { id: AppSection.PARVANEH, title: 'مشاور پروانه', desc: 'یه گوش شنوا برای دلت', color: 'bg-pink-500', icon: '🦋' },
    { id: AppSection.SUMMARIZER, title: 'خلاصه‌ساز', desc: 'جزوه طولانی رو کوتاه کن', color: 'bg-emerald-500', icon: '📝' },
    { id: AppSection.PLANNER, title: 'برنامه‌ریز', desc: 'برنامه مطالعه هفتگی', color: 'bg-amber-500', icon: '📅' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Card */}
      <section className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,1),transparent)]" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl font-black mb-2">سلام، {profile.name}! 👋</h1>
            <p className="text-indigo-100 text-lg">امروز نوبت درخشش توئه. آماده‌ای برای یادگیری؟</p>
            <div className="mt-6 flex gap-4">
              <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-sm font-bold flex items-center gap-2">
                <Trophy size={16} /> امتیاز: ۱۲۴۰
              </div>
              <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-sm font-bold flex items-center gap-2">
                <Star size={16} /> رتبه: ۸
              </div>
            </div>
          </div>
          <div className="w-32 h-32 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center text-6xl animate-float">
            🚀
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'ساعت مطالعه', value: '۱۲.۵', icon: <Clock className="text-blue-500" />, sub: 'این هفته' },
          { label: 'تکالیف تکمیل شده', value: '۱۸', icon: <Activity className="text-emerald-500" />, sub: '+۳ امروز' },
          { label: 'معدل کل', value: '۱۸.۷', icon: <TrendingUp className="text-purple-500" />, sub: 'رتبه ممتاز' },
          { label: 'روزهای متوالی', value: '۱۵', icon: <Zap className="text-amber-500" />, sub: 'آفرین قهرمان!' },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:scale-105 transition-transform">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">{stat.icon}</div>
            </div>
            <h3 className="text-2xl font-black">{stat.value}</h3>
            <p className="text-xs text-slate-500 mt-1 font-bold">{stat.label}</p>
            <p className="text-[10px] text-slate-400 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black flex items-center gap-2">
            <Zap className="text-yellow-500" /> دسترسی سریع
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div 
              key={card.id}
              onClick={() => onNavigate(card.id)}
              className="group cursor-pointer glass p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-all relative overflow-hidden"
            >
              <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 ${card.color} group-hover:scale-150 transition-transform`} />
              <div className="text-4xl mb-6">{card.icon}</div>
              <h3 className="text-lg font-black mb-2">{card.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-bold">{card.desc}</p>
              <div className="mt-6 flex items-center gap-2 text-purple-600 font-bold text-sm group-hover:gap-4 transition-all">
                بزن بریم <ChevronLeft size={16} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Progress Section */}
      <section className="glass rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-black mb-8 flex items-center gap-2">
          <BookOpen className="text-indigo-500" /> پیشرفت دروس این ترم
        </h2>
        <div className="space-y-6">
          {[
            { name: 'هوش مصنوعی', prog: 85, color: 'bg-blue-500' },
            { name: 'پایگاه داده', prog: 70, color: 'bg-emerald-500' },
            { name: 'مهندسی نرم‌افزار', prog: 45, color: 'bg-purple-500' },
            { name: 'شبکه‌های کامپیوتری', prog: 92, color: 'bg-amber-500' },
          ].map((subj, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-sm font-bold">
                <span>{subj.name}</span>
                <span>{subj.prog}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                <div 
                  className={`${subj.color} h-full transition-all duration-1000`} 
                  style={{ width: `${subj.prog}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
