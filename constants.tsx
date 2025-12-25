
import React from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  Heart, 
  FileText, 
  Calendar, 
  Wrench, 
  Users, 
  Brain, 
  UserCircle 
} from 'lucide-react';
import { AppSection } from './types';

export const NAVIGATION_ITEMS = [
  { id: AppSection.DASHBOARD, label: 'داشبورد', icon: <LayoutDashboard size={20} /> },
  { id: AppSection.DANA, label: 'دانا (آموزشی)', icon: <Bot size={20} /> },
  { id: AppSection.PARVANEH, label: 'پروانه (دلنوشته)', icon: <Heart size={20} /> },
  { id: AppSection.SUMMARIZER, label: 'خلاصه‌ساز', icon: <FileText size={20} /> },
  { id: AppSection.PLANNER, label: 'برنامه‌ریز', icon: <Calendar size={20} /> },
  { id: AppSection.TOOLS, label: 'ابزارها', icon: <Wrench size={20} /> },
  { id: AppSection.VIRTUAL_CLASS, label: 'کلاس مجازی', icon: <Users size={20} /> },
  { id: AppSection.AI_ASSISTANT, label: 'دستیار VIP', icon: <Brain size={20} /> },
  { id: AppSection.PROFILE, label: 'پروفایل', icon: <UserCircle size={20} /> },
];

export const INITIAL_PROFILE = {
  name: 'دانشجوی عزیز',
  university: 'دانشگاه تهران',
  major: 'مهندسی کامپیوتر',
  semester: 'ترم ۴',
  level: 15,
  exp: 65
};
