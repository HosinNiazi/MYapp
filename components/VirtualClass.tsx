
import React, { useState, useRef, useEffect } from 'react';
import { Users, Video, Plus, Eraser, Save, Download, Users2 } from 'lucide-react';
import { StudyRoom } from '../types';

const VirtualClass: React.FC = () => {
  const [rooms, setRooms] = useState<StudyRoom[]>([
    { id: '1', name: 'گروه مطالعه هوش مصنوعی', members: 12, isActive: true },
    { id: '2', name: 'تمرین الگوریتم‌ها', members: 5, isActive: true },
    { id: '3', name: 'حل سوالات پایگاه داده', members: 0, isActive: false },
  ]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.lineCap = 'round';
        context.lineWidth = 3;
        context.strokeStyle = '#7209b7';
        setCtx(context);
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || !ctx) return;
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !ctx) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const clearCanvas = () => {
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black flex items-center gap-3">
          <Users2 className="text-blue-500" size={32} /> کلاس مجازی و وایت‌برد
        </h2>
        <p className="text-slate-500 font-bold">به صورت گروهی مطالعه کنید و ایده‌های خود را روی تخته ترسیم کنید.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rooms Sidebar */}
        <div className="lg:col-span-1 glass p-6 rounded-3xl border dark:border-slate-800 shadow-xl flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h3 className="font-black">اتاق‌های مطالعه</h3>
            <button className="p-2 bg-blue-500 text-white rounded-xl shadow-lg hover:scale-110 active:scale-95 transition-all"><Plus size={18} /></button>
          </div>
          <div className="space-y-4">
            {rooms.map((room) => (
              <div 
                key={room.id}
                className="group cursor-pointer p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-blue-500 transition-all shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-black text-sm">{room.name}</h4>
                  {room.isActive && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold">
                    <Users size={12} /> {room.members} نفر در حال مطالعه
                  </div>
                  <button className="text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-3 py-1 rounded-full font-black group-hover:bg-blue-500 group-hover:text-white transition-all">ورود</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl text-white">
            <Video className="mb-2" />
            <h4 className="font-black text-sm">کلاس‌های زنده</h4>
            <p className="text-[10px] opacity-80 mt-1">امروز ساعت ۱۸:۳۰ - دکتر علوی</p>
          </div>
        </div>

        {/* Whiteboard */}
        <div className="lg:col-span-2 glass p-6 rounded-3xl border dark:border-slate-800 shadow-xl flex flex-col gap-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h3 className="font-black">وایت‌برد تعاملی</h3>
            <div className="flex gap-2">
              <button onClick={clearCanvas} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors" title="پاک کردن"><Eraser size={20} /></button>
              <button className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl hover:text-blue-500 transition-colors" title="ذخیره"><Save size={20} /></button>
              <button className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl hover:text-emerald-500 transition-colors" title="دانلود"><Download size={20} /></button>
            </div>
          </div>
          
          <div className="flex-1 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 h-[500px] cursor-crosshair overflow-hidden relative">
            <canvas 
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={() => setIsDrawing(false)}
              onMouseLeave={() => setIsDrawing(false)}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={() => setIsDrawing(false)}
              className="w-full h-full"
            />
            {!isDrawing && !ctx?.canvas.getContext('2d')?.getImageData(0,0,1,1).data[3] && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-300 dark:text-slate-700 font-black text-2xl uppercase tracking-widest opacity-30 select-none">
                وایت‌برد دیجیتال
              </div>
            )}
          </div>

          <div className="flex gap-3 justify-center">
            {['#7209b7', '#4361ee', '#06d6a0', '#ef476f', '#000000'].map(color => (
              <button 
                key={color}
                onClick={() => ctx && (ctx.strokeStyle = color)}
                className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 shadow-md transition-transform hover:scale-125"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualClass;
