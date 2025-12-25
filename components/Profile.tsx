
import React from 'react';
// Added Bell and ChevronLeft to the imports from lucide-react
import { User, School, Book, GraduationCap, Save, Shield, Settings, LogOut, Bell, ChevronLeft } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileProps {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
}

const Profile: React.FC<ProfileProps> = ({ profile, setProfile }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto pb-12">
      <div className="flex flex-col items-center gap-6">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 p-1">
            <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-4xl font-black text-purple-600 border-4 border-slate-50 dark:border-slate-800">
              {profile.name.charAt(0)}
            </div>
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-110 transition-all">
            📸
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-black">{profile.name}</h2>
          <p className="text-slate-500 font-bold">{profile.university} - {profile.major}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Info Form */}
        <div className="glass p-8 rounded-3xl border dark:border-slate-800 space-y-6 shadow-xl">
          <h3 className="font-black flex items-center gap-2 mb-4">
            <User className="text-purple-500" size={20} /> اطلاعات تحصیلی
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 pr-2">نام نمایشی</label>
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border dark:border-slate-800">
                <User size={18} className="text-slate-400" />
                <input 
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="bg-transparent flex-1 outline-none text-sm font-bold"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 pr-2">نام دانشگاه</label>
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border dark:border-slate-800">
                <School size={18} className="text-slate-400" />
                <input 
                  name="university"
                  value={profile.university}
                  onChange={handleChange}
                  className="bg-transparent flex-1 outline-none text-sm font-bold"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 pr-2">رشته</label>
                <input 
                  name="major"
                  value={profile.major}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border dark:border-slate-800 outline-none text-sm font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 pr-2">ترم</label>
                <select 
                  name="semester"
                  value={profile.semester}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border dark:border-slate-800 outline-none text-sm font-bold"
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <option key={i} value={`ترم ${i+1}`}>ترم {i+1}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <button className="w-full py-4 bg-purple-600 text-white rounded-2xl font-black shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all">
            <Save size={20} /> ذخیره تغییرات
          </button>
        </div>

        {/* Settings & Stats */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-3xl border dark:border-slate-800 shadow-xl space-y-6">
            <h3 className="font-black flex items-center gap-2">
              <Settings className="text-blue-500" size={20} /> تنظیمات حساب
            </h3>
            <div className="space-y-3">
              {[
                { label: 'اعلان‌های سیستم', icon: <Bell size={18} />, active: true },
                { label: 'حالت محرمانه (پروانه)', icon: <Shield size={18} />, active: true },
                { label: 'پشتیبان‌گیری خودکار', icon: <Save size={18} />, active: false },
              ].map((s, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">{s.icon}</span>
                    <span className="text-sm font-bold">{s.label}</span>
                  </div>
                  <div className={`w-12 h-6 rounded-full relative transition-colors ${s.active ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${s.active ? 'left-1' : 'left-7'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-8 rounded-3xl border dark:border-slate-800 shadow-xl flex items-center justify-between group cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-500"><LogOut size={20} /></div>
              <span className="font-black text-red-500">خروج از حساب</span>
            </div>
            <ChevronLeft className="text-red-500 group-hover:-translate-x-2 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
