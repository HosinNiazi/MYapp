
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, CheckCircle2, Circle, Clock, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Task } from '../types';

const Planner: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'تمرین هوش مصنوعی فصل ۳', isDone: false, time: '۱۰:۰۰' },
    { id: '2', title: 'مطالعه پایگاه داده', isDone: true, time: '۱۴:۳۰' },
    { id: '3', title: 'کلاس آنلاین ریاضیات', isDone: false, time: '۱۷:۰۰' },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      isDone: false,
      time: '۱۲:۰۰'
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, isDone: !t.isDone } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black flex items-center gap-3">
            <CalendarIcon className="text-amber-500" size={32} /> برنامه‌ریز هوشمند
          </h2>
          <p className="text-slate-500 font-bold">مدیریت زمان، کلید موفقیت تحصیلی توست.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar Side */}
        <div className="lg:col-span-1 glass p-6 rounded-3xl border dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex justify-between items-center mb-4">
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"><ArrowRight size={18} /></button>
            <h3 className="font-black">اسفند ۱۴۰۳</h3>
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"><ArrowLeft size={18} /></button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'].map(d => (
              <div key={d} className="text-[10px] font-black text-slate-400 py-2">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={i} 
                className={`py-3 text-xs font-bold rounded-xl cursor-pointer transition-all ${
                  i + 1 === 15 ? 'bg-amber-500 text-white shadow-lg' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="pt-6 border-t dark:border-slate-800 space-y-4">
            <h4 className="font-black text-sm">رویدادهای پیش رو</h4>
            {[
              { title: 'امتحان میان ترم', date: '۲۰ اسفند', color: 'bg-red-500' },
              { title: 'تحویل پروژه نهایی', date: '۲۵ اسفند', color: 'bg-blue-500' },
            ].map((ev, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <div className={`w-2 h-8 rounded-full ${ev.color}`} />
                <div>
                  <div className="text-xs font-black">{ev.title}</div>
                  <div className="text-[10px] text-slate-500">{ev.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task List Side */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-6 rounded-3xl border dark:border-slate-800 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
              <input 
                type="text" 
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                placeholder="تکلیف جدید رو اینجا بنویس..."
                className="flex-1 bg-slate-100 dark:bg-slate-900 p-4 rounded-2xl outline-none focus:ring-4 ring-amber-500/10 font-bold text-sm"
              />
              <button 
                onClick={addTask}
                className="bg-amber-500 text-white p-4 rounded-2xl shadow-lg hover:scale-110 active:scale-95 transition-all"
              >
                <Plus />
              </button>
            </div>

            <div className="space-y-4">
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
                    task.isDone ? 'bg-slate-50 dark:bg-slate-800/30 opacity-60 border-transparent' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <button onClick={() => toggleTask(task.id)} className="transition-transform active:scale-90">
                      {task.isDone ? <CheckCircle2 className="text-emerald-500" /> : <Circle className="text-slate-300" />}
                    </button>
                    <div>
                      <h4 className={`font-black text-sm ${task.isDone ? 'line-through' : ''}`}>{task.title}</h4>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                        <Clock size={10} /> {task.time}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              {tasks.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                  <p className="font-bold">آفرین! تمام کارها انجام شدن. 🥳</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="glass p-6 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 font-black">۸۵٪</div>
                <div>
                  <div className="text-xs font-black">بازدهی امروز</div>
                  <div className="text-[10px] text-slate-500">نسبت به دیروز +۵٪</div>
                </div>
             </div>
             <div className="glass p-6 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 font-black">۴.۵</div>
                <div>
                  <div className="text-xs font-black">ساعت مطالعه امروز</div>
                  <div className="text-[10px] text-slate-500">هدف: ۶ ساعت</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;
