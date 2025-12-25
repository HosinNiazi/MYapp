
import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  Search,
  ChevronLeft,
  ArrowRight,
  Send
} from 'lucide-react';
import { AppSection, UserProfile, Message } from './types';
import { NAVIGATION_ITEMS, INITIAL_PROFILE } from './constants';
import Dashboard from './components/Dashboard';
import ChatSystem from './components/ChatSystem';
import Summarizer from './components/Summarizer';
import Planner from './components/Planner';
import Tools from './components/Tools';
import VirtualClass from './components/VirtualClass';
import Profile from './components/Profile';
import { getDanaResponse, getParvanehResponse } from './geminiService';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case AppSection.DASHBOARD:
        return <Dashboard profile={profile} onNavigate={setActiveSection} />;
      case AppSection.DANA:
        return <ChatSystem type="dana" getResponse={getDanaResponse} />;
      case AppSection.PARVANEH:
        return <ChatSystem type="parvaneh" getResponse={getParvanehResponse} />;
      case AppSection.SUMMARIZER:
        return <Summarizer />;
      case AppSection.PLANNER:
        return <Planner />;
      case AppSection.TOOLS:
        return <Tools />;
      case AppSection.VIRTUAL_CLASS:
        return <VirtualClass />;
      case AppSection.AI_ASSISTANT:
        return <ChatSystem type="ai" getResponse={getDanaResponse} />; // Reusing Dana for now
      case AppSection.PROFILE:
        return <Profile profile={profile} setProfile={setProfile} />;
      default:
        return <Dashboard profile={profile} onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 glass z-50 flex items-center justify-between px-4 lg:px-8 border-b dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl lg:hidden"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveSection(AppSection.DASHBOARD)}>
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg animate-pulse">
              🎓
            </div>
            <span className="font-black text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">دانشجویار</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer hover:scale-110 transition-transform">
            <Bell size={24} />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                {notifications}
              </span>
            )}
          </div>
          <button 
            onClick={toggleTheme}
            className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl hover:rotate-12 transition-all"
          >
            {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
          </button>
          <div 
            onClick={() => setActiveSection(AppSection.PROFILE)}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold cursor-pointer hover:ring-4 ring-purple-200 dark:ring-purple-900/30 transition-all"
          >
            {profile.name.charAt(0)}
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 right-0 w-72 bg-white dark:bg-slate-900 z-[70] border-r dark:border-slate-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} lg:right-auto lg:left-0 lg:border-r-0 lg:border-l`}>
        <div className="h-full flex flex-col p-6">
          <div className="flex justify-between items-center mb-8 lg:hidden">
            <span className="font-bold">منوی دسترسی</span>
            <button onClick={() => setIsSidebarOpen(false)}><X /></button>
          </div>

          <div className="mb-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border dark:border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center text-white text-xl font-bold">
                {profile.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-sm truncate w-32">{profile.name}</h4>
                <p className="text-xs text-slate-500">سطح {profile.level}</p>
              </div>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div className="bg-purple-600 h-full w-[65%] transition-all" />
            </div>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
            {NAVIGATION_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all group ${
                  activeSection === item.id 
                    ? 'bg-gradient-to-l from-indigo-600 to-purple-600 text-white shadow-lg shadow-purple-500/20' 
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span className={activeSection === item.id ? 'text-white' : 'text-purple-600 group-hover:scale-110 transition-transform'}>
                  {item.icon}
                </span>
                <span className="font-bold text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:pl-72 pt-16 pb-24 lg:pb-0">
        <div className="container mx-auto p-4 lg:p-8 max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          {renderSection()}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 glass border-t dark:border-slate-800 lg:hidden flex items-center justify-around px-2 z-50">
        {NAVIGATION_ITEMS.slice(0, 5).map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
              activeSection === item.id ? 'text-purple-600' : 'text-slate-400'
            }`}
          >
            <div className={`p-2 rounded-xl ${activeSection === item.id ? 'bg-purple-100 dark:bg-purple-900/30' : ''}`}>
              {item.icon}
            </div>
            <span className="text-[10px] font-bold">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
