import React, { useState, useEffect } from 'react';

// 將所有用到的圖標轉換為輕量化的 SVG 渲染，完全移除對 lucide-react 的依賴以解決加載錯誤
const iconPaths = {
  Sparkles: <><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></>,
  Home: <><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
  Users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
  DollarSign: <><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
  HelpCircle: <><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/></>,
  MessageSquare: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>,
  Calendar: <><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></>,
  Instagram: <><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16.11 7.66a1.5 1.5 0 1 1-1.18-1.18 1.5 1.5 0 0 1 1.18 1.18Z"/><circle cx="12" cy="12" r="4"/></>,
  X: <><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></>,
  Menu: <><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></>,
  Brain: <><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.002 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></>,
  HardDrive: <><line x1="22" x2="2" y1="12" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" x2="6.01" y1="16" y2="16"/><line x1="10" x2="10.01" y1="16" y2="16"/></>,
  Milestone: <><path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"/><path d="M12 13v8"/><path d="M12 3v3"/></>,
  Quote: <><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></>,
  Activity: <><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></>,
  Radio: <><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/></>,
  RefreshCw: <><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></>,
  Heart: <><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></>,
  Target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
  Stethoscope: <><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></>,
  HeartPulse: <><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></>,
  Zap: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
  ShieldCheck: <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 3 0 5 1 7 2a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></>,
  CheckCircle: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
  ChevronRight: <><path d="m9 18 6-6-6-6"/></>
};

const Icon = ({ name, size = 24, className = "" }) => {
  if (!iconPaths[name]) return null;
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      {iconPaths[name]}
    </svg>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 業務設定 - 執行師聯繫號碼
  const joannePhone = "85260850118"; 
  const joycePhone = "85296302032";
  const igHandle = "@the.soul_islet";
  const igUrl = "https://www.instagram.com/the.soul_islet/";

  // 品牌 Logo 組件，使用 Imgur 直連圖片
  const Logo = ({ className = "w-14 h-14", isStamp = false }) => (
    <div className={`${className} ${isStamp ? '' : 'rounded-2xl overflow-hidden'} aspect-square flex items-center justify-center shrink-0`}>
      <img 
        src="https://i.imgur.com/tTgwHUD.jpeg" 
        alt="Soul Islet Logo" 
        className={`w-full h-full ${isStamp ? 'object-contain mix-blend-multiply opacity-95' : 'object-cover'}`}
        onError={(e) => {
           // 預防附檔名錯誤的後備選項
           e.target.onerror = null; 
           e.target.src="https://i.imgur.com/tTgwHUD.png";
        }}
      />
    </div>
  );

  const navigation = [
    { id: 'home', name: '首頁', icon: 'Home' },
    { id: 'psychk', name: '關於 Psych-K', icon: 'Sparkles' },
    { id: 'about', name: '執行師團隊', icon: 'Users' },
    { id: 'price', name: '服務價目', icon: 'DollarSign' },
    { id: 'qa', name: '新手問答', icon: 'HelpCircle' },
    { id: 'testimonials', name: '心靈迴響', icon: 'MessageSquare' },
    { id: 'appointment', name: '預約諮詢', icon: 'Calendar' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- UI Components ---

  const Header = () => (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('home')}>
          <Logo className="w-12 h-12 shadow-sm bg-white" />
          <div className="flex flex-col">
            <h1 className="text-base font-bold text-slate-800 tracking-tighter leading-none">靈魂小島</h1>
            <span className="text-[9px] text-orange-500 font-bold uppercase tracking-[0.2em] mt-0.5">Soul Islet</span>
          </div>
        </div>
        <nav className="hidden xl:flex items-center space-x-6">
          {navigation.map((item) => (
            <button 
              key={item.id} 
              onClick={() => handleNavClick(item.id)} 
              className={`text-xs font-medium transition-all ${activeTab === item.id ? 'text-orange-600 border-b-2 border-orange-500' : 'text-slate-500 hover:text-orange-400'} pb-1 px-1`}
            >
              {item.name}
            </button>
          ))}
          <a href={igUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-pink-500 transition-colors">
            <Icon name="Instagram" size={18} />
          </a>
        </nav>
        <button className="xl:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <Icon name="X" size={24} /> : <Icon name="Menu" size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="xl:hidden bg-white border-b border-orange-100 px-6 py-4 space-y-3 shadow-xl animate-in slide-in-from-top duration-300">
          {navigation.map((item) => (
            <button key={item.id} onClick={() => handleNavClick(item.id)} className="flex items-center space-x-4 w-full text-left py-2 px-4 hover:bg-orange-50 rounded-xl transition-colors">
              <Icon name={item.icon} size={18} className="text-orange-400" />
              <span className="text-slate-700 font-bold text-sm">{item.name}</span>
            </button>
          ))}
          <a href={igUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 w-full py-2 px-4 text-pink-500 font-bold text-sm">
            <Icon name="Instagram" size={18} /> <span>關注我們的 IG</span>
          </a>
        </div>
      )}
    </header>
  );

  const Hero = () => (
    <section className="pt-28 pb-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="flex justify-center mb-6 animate-in fade-in zoom-in-95 duration-1000">
          <Logo className="w-80 h-80 md:w-[32rem] md:h-[32rem] -rotate-2 transform" isStamp={true} />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-800 leading-tight tracking-tight px-4">
            在<span className="text-orange-500">靈魂小島</span>，透過 Psych-K® 遇見最高版本的自己
          </h2>
          <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto font-light px-6">
            不再受困於舊有的思維慣性。我們運用 <strong>Psych-K® 快速轉化潛意識信念</strong>，陪你撤除內在的自我限制，讓身心回歸全腦平衡狀態，親手重塑你渴望的生命實相。
          </p>
          <div className="flex justify-center pt-2">
            <a href={igUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-xs font-bold text-pink-500/80 hover:text-pink-600 transition-all bg-pink-50 px-4 py-2 rounded-full border border-pink-100 shadow-sm">
              <Icon name="Instagram" size={14} />
              <span>追蹤日常：{igHandle}</span>
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-4 pt-4">
          <button onClick={() => handleNavClick('appointment')} className="px-8 py-3 bg-orange-500 text-white rounded-2xl shadow-xl shadow-orange-200 hover:bg-orange-600 transition-all font-bold text-sm">預約轉化諮詢</button>
          <button onClick={() => handleNavClick('psychk')} className="px-8 py-3 bg-white text-slate-700 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-bold text-sm">深入了解 Psych-K</button>
        </div>
      </div>
    </section>
  );

  const PsychKSection = () => (
    <div className="pt-24 pb-20 animate-in fade-in duration-1000">
      {/* 概念核心：潛意識 */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-block px-4 py-1 bg-orange-50 text-orange-600 rounded-full text-[10px] font-bold tracking-widest border border-orange-100 uppercase">The Power of Subconscious</div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">認識你的內在「自動駕駛儀」</h2>
            <p className="text-lg text-slate-600 leading-relaxed font-light">
              科學研究顯示，人類每天約有 <strong>95% 的行為與決策</strong>是由潛意識控制的。
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center"><Icon name="Brain" className="mr-2 text-orange-500" size={20}/> 5% 意識 (Conscious)</h4>
              <p className="text-sm text-slate-500 leading-relaxed">負責邏輯分析、設定目標、判斷是非。雖然我們以為自己在掌控人生，但意識的力量其實非常有限且容易疲倦。</p>
            </div>
            <div className="bg-orange-50/50 p-8 rounded-[2.5rem] border border-orange-100">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center"><Icon name="HardDrive" className="mr-2 text-orange-600" size={20}/> 95% 潛意識 (Subconscious)</h4>
              <p className="text-sm text-slate-500 leading-relaxed">如同電腦硬碟，儲存了出生至今的所有記憶、信念與習慣。它處理速度比意識快上數萬倍，是不知疲倦的執行機器。</p>
            </div>
          </div>
          <p className="text-center text-slate-500 italic text-sm">當意識想往東（我想減肥），潛意識卻往西（我覺得不吃東西很危險）時，這種拉扯就是你感到「卡住」的原因。</p>
        </div>
      </section>

      {/* 歷史背景 */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold tracking-widest border border-blue-100 uppercase">Our Roots</div>
            <h3 className="text-3xl font-bold text-slate-800">Psych-K® 的起源</h3>
            <div className="space-y-4 text-slate-600 leading-relaxed font-light">
              <p>Psych-K® 由羅伯·威廉姆斯（Rob Williams）於 1988 年創立。Rob 曾是一位成功的企業主管，在接觸心理學與能量醫學後，他發現傳統談話療法往往耗時過長，且難以觸及心靈深處的根源。</p>
              <p>結合了<strong>現代神經科學</strong>的「分裂大腦」理論與<strong>古老的能量智慧</strong>，Rob 開發出這套旨在「改寫內在程式」的工具，幫助人們在數分鐘內完成過去可能需要數月甚至數年的轉變。</p>
            </div>
            <div className="flex items-center space-x-4 text-sm font-bold text-slate-400">
              <Icon name="Milestone" size={24} className="text-orange-300" />
              <span>這是一套經過 30 年驗證、享譽全球的心靈優化系統。</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-orange-100/50 rounded-[4rem] blur-2xl"></div>
            <div className="relative bg-white p-10 rounded-[3.5rem] border border-orange-50 shadow-xl text-center space-y-6">
               <Icon name="Quote" className="text-orange-200 mx-auto" size={40} />
               <p className="text-slate-700 font-serif italic text-lg leading-relaxed">
                 「你的信念並非由事實組成，而是由你對事實的詮釋組成。改寫詮釋，就能改寫命運。」
               </p>
               <p className="text-xs text-orange-500 font-bold uppercase tracking-widest">— Rob Williams, Originator</p>
            </div>
          </div>
        </div>
      </section>

      {/* 運作原理 */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold text-slate-800">Psych-K® 是如何運作的？</h3>
            <p className="text-slate-500 font-light">透過以下三個核心步驟，我們能與潛意識建立高效對話：</p>
          </div>

          <div className="space-y-12">
            {[
              { 
                title: "肌肉測試 (Muscle Testing)", 
                icon: 'Activity', 
                desc: "作為與潛意識溝通的橋樑。當你說出與潛意識一致的話時，肌肉會維持強韌；反之則會瞬間弱化。這讓我們能直接跳過意識的干擾，找出真正的根源。" 
              },
              { 
                title: "全腦狀態 (Whole-Brain State)", 
                icon: 'Radio', 
                desc: "透過特定的姿勢或動作，引導大腦左右半球同時運作。在這種狀態下，神經系統的阻力最小，就像開啟了最高權限的後台介面。" 
              },
              { 
                title: "平衡程序 (Balancing)", 
                icon: 'RefreshCw', 
                desc: "在全腦狀態中，將你渴望的新信念（如：我是值得被愛的）植入潛意識。過程快速、穩定且持久，能瞬間中和過去累積的壓力與創傷。" 
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-8 group">
                <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 shadow-sm">
                  <Icon name={item.icon} size={32} />
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 適用對象與解決範圍 */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold text-slate-800">誰適合 Psych-K®？</h3>
            <p className="text-slate-500 font-light max-w-xl mx-auto">不論你目前的起點在哪，只要你渴望改變，Psych-K® 都能為你導航。</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[3rem] border border-orange-100 shadow-sm space-y-6">
              <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-2xl flex items-center justify-center"><Icon name="Heart" size={24} /></div>
              <h4 className="font-bold text-slate-800">情緒與自我價值</h4>
              <ul className="text-xs text-slate-500 space-y-3 font-light">
                <li className="flex items-center"><Icon name="ChevronRight" size={14} className="text-orange-400 mr-1" /> 化解長期焦慮與壓力</li>
                <li className="flex items-center"><Icon name="ChevronRight" size={14} className="text-orange-400 mr-1" /> 重建自信心與配得感</li>
                <li className="flex items-center"><Icon name="ChevronRight" size={14} className="text-orange-400 mr-1" /> 釋放童年創傷或負面記憶</li>
              </ul>
            </div>
            <div className="bg-white p-10 rounded-[3rem] border border-orange-100 shadow-sm space-y-6">
              <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center"><Icon name="Target" size={24} /></div>
              <h4 className="font-bold text-slate-800">事業與財務豐盛</h4>
              <ul className="text-xs text-slate-500 space-y-3 font-light">
                <li className="flex items-center"><Icon name="ChevronRight" size={14} className="text-orange-400 mr-1" /> 掃除賺錢的內在匱乏感</li>
                <li className="flex items-center"><Icon name="ChevronRight" size={14} className="text-orange-400 mr-1" /> 克服社交恐懼與公開發言</li>
                <li className="flex items-center"><Icon name="ChevronRight" size={14} className="text-orange-400 mr-1" /> 提升行動力，終結拖延症</li>
              </ul>
            </div>
            <div className="bg-white p-10 rounded-[3rem] border border-orange-100 shadow-sm space-y-6">
              <div className="w-12 h-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center"><Icon name="Stethoscope" size={24} /></div>
              <h4 className="font-bold text-slate-800">身心健康平衡</h4>
              <ul className="text-xs text-slate-500 space-y-3 font-light">
                <li className="flex items-center"><Icon name="ChevronRight" size={14} className="text-orange-400 mr-1" /> 釋放生理疼痛的心理源頭</li>
                <li className="flex items-center"><Icon name="ChevronRight" size={14} className="text-orange-400 mr-1" /> 優化自癒力，改善睡眠</li>
                <li className="flex items-center"><Icon name="ChevronRight" size={14} className="text-orange-400 mr-1" /> 建立對身體的接納與愛</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-slate-900 p-12 rounded-[3.5rem] text-center space-y-6 shadow-2xl">
            <h4 className="text-white text-xl font-bold">準備好遇見最高版本的自己了嗎？</h4>
            <p className="text-slate-400 text-sm font-light">轉化就在一念之間，讓我們陪你跨出這一步。</p>
            <button onClick={() => handleNavClick('appointment')} className="px-10 py-4 bg-orange-500 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all">立即預約轉化會面</button>
          </div>
        </div>
      </section>
    </div>
  );

  const AboutSection = () => (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 space-y-20">
        <div className="text-center space-y-6">
          <div className="inline-block px-4 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-bold mb-2 tracking-widest border border-orange-100 uppercase">Professional Facilitators</div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800">護理專業與心靈轉化的執行師團隊</h2>
          <div className="max-w-3xl mx-auto space-y-6 text-slate-600 text-base md:text-lg leading-relaxed font-light">
            <p>
              靈魂小島的創立，源於兩位<strong>香港註冊護士</strong>的深刻洞察。在多年的臨床護理生涯中，我們見證了無數身體的病痛，其根源往往來自於心靈長期承受的壓力、恐懼與被壓抑的限制性信念。
            </p>
            <p>
              我們深信，真正的康復不應僅止於生理數據的平穩，更應包含內在心靈的自由與平安。為此，我們將<strong>護理專業的嚴謹與守護</strong>，與 <strong>Psych-K® 高效的潛意識轉化技術</strong>結合，成立了專業執行師團隊，致力於協助每一位踏上小島的個案，從神經系統底層撤除阻礙，開啟生命的自癒與轉化。
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Joanne Card */}
          <div className="bg-orange-50/30 p-12 rounded-[4rem] border border-orange-100 shadow-sm group hover:shadow-2xl hover:-translate-y-2 transition-all relative overflow-hidden flex flex-col h-full">
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-110 transition-transform"><Icon name="Stethoscope" size={180} /></div>
            <div className="flex items-center space-x-6 relative z-10 mb-8">
              <div className="w-24 h-24 shadow-md bg-white rounded-2xl overflow-hidden shrink-0">
                <img src="https://i.imgur.com/ZyrcKhS.jpeg" alt="Joanne" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">Joanne</h3>
                <div className="flex space-x-2 mt-2">
                  <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full uppercase">Psych-K Facilitator</span>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-200 px-3 py-1 rounded-full uppercase">Registered Nurse</span>
                </div>
              </div>
            </div>
            <div className="space-y-4 text-slate-600 text-sm font-light leading-relaxed relative z-10 flex-grow">
              <p>
                在快節奏的醫療體系中深耕多年，Joanne 深刻體會到「情緒壓力」如何具體轉化為身體的負擔。她擁有一種與生俱來的安定力量，擅長在諮詢中營造極具安全感的場域。
              </p>
              <p>
                作為專業執行師，Joanne 能敏銳地察覺個案話語背後的潛意識阻力。她不僅陪你面對情緒，更陪你運用全腦平衡（Whole-Brain State）重新校準內在頻率，讓曾經沉重的包袱化為前行的養分。
              </p>
            </div>
            <div className="pt-8 border-t border-orange-200/50 mt-8 relative z-10">
              <span className="text-xs font-bold text-orange-400 italic">「當你有一個明確的願景時，萬象皆信息，一切發生皆有利於你，整個世界都是你的圖書館。」</span>
            </div>
          </div>

          {/* Joyce Card */}
          <div className="bg-blue-50/20 p-12 rounded-[4rem] border border-blue-100 shadow-sm group hover:shadow-2xl hover:-translate-y-2 transition-all relative overflow-hidden flex flex-col h-full">
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-110 transition-transform"><Icon name="HeartPulse" size={180} /></div>
            <div className="flex items-center space-x-6 relative z-10 mb-8">
              <div className="w-24 h-24 shadow-md bg-white rounded-2xl overflow-hidden shrink-0">
                <img src="https://i.imgur.com/IjgsU8M.jpeg" alt="Joyce" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">Joyce</h3>
                <div className="flex space-x-2 mt-2">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full uppercase">Psych-K Facilitator</span>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-200 px-3 py-1 rounded-full uppercase">Registered Nurse</span>
                </div>
              </div>
            </div>
            <div className="space-y-4 text-slate-600 text-sm font-light leading-relaxed relative z-10 flex-grow">
              <p>
                Joyce 始於對護理專業和科學的熱愛，並延伸至對人類意識研究的執著。她深信每個人的身體內都內建了完美的自癒程式，只是常被潛意識中的負面錄音帶給干擾了。
              </p>
              <p>
                她擅長以清晰的視角拆解複雜的心理機制，協助個案精確定義渴望轉化的目標。在她的引導下，轉化不再是漫長的自我搏鬥，而是一次次快速的軟體更新，讓你以最輕盈的姿態邁向最高版本的自己。
              </p>
            </div>
            <div className="pt-8 border-t border-blue-200/50 mt-8 relative z-10">
              <span className="text-xs font-bold text-blue-400 italic">「你的成就取決於你有多愛這個世界。」</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-50 rounded-[3rem] p-10 text-center border border-slate-100 shadow-inner">
          <p className="text-slate-500 text-sm font-light italic">
            我們在這裡，不是為了「治癒」你，而是為了「協助」你撤除那些阻擋你展現光芒的障礙。在靈魂小島，你才是自己生命最強大的創造者。
          </p>
        </div>
      </div>
    </section>
  );

  const TestimonialsSection = () => {
    const list = [
      { text: "以前我總是覺得自己不夠好，在關係裡習慣性地委屈求全。和 Joanne 做完深度轉化後，我第一次在心底真正感受到『我是值得被愛的』。那種不需要向外討愛的平靜感，讓我終於能好好呼吸了。", author: "溫柔重生的林小姐" },
      { text: "長期的職場高壓讓我的肩膀硬得像石頭，連呼吸都覺得卡卡的。Joyce 陪我一層層剝開對『失敗』的恐懼，那天結束後，走在回家的路上，我突然發現肩膀鬆開了，看著夕陽竟然感動得想哭。這是我送給自己最棒的禮物。", author: "找回生活節奏的陳先生" },
      { text: "我帶著對金錢深深的焦慮來到靈魂小島。過程中才發現，原來那是小時候看著父母爭吵留下的傷痕。釋放掉那些不屬於我的信念後，現在的我不再對每一筆花費感到罪惡，生活也開始迎來意想不到的豐盛。", author: "擁抱豐盛的張小姐" }
    ];
    return (
      <section className="py-24 bg-orange-50/20 text-center">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-bold mb-6 tracking-widest border border-orange-200 uppercase">Heartfelt Feedback</div>
          <h2 className="text-3xl font-bold text-slate-800 mb-16">心靈的迴響</h2>
          <div className="grid lg:grid-cols-3 gap-8 text-left italic">
            {list.map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] border border-orange-100 shadow-sm flex flex-col hover:shadow-xl transition-all duration-500">
                <Icon name="Quote" className="text-orange-200 mb-6 w-10 h-10 opacity-60" size={40} />
                <p className="text-slate-700 text-sm md:text-base leading-relaxed font-light mb-8 flex-grow">"{item.text}"</p>
                <div className="font-bold text-slate-800 text-sm pt-6 border-t border-slate-50">— {item.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const PriceSection = () => (
    <section className="py-24 bg-white text-center">
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        <h2 className="text-3xl font-bold text-slate-800">專業諮詢服務與方案</h2>
        <div className="grid md:grid-cols-3 gap-8 text-sm">
          {[
            { title: '單次啟動會面', price: '$1,400 / 節', target: '適合體驗效果，或針對單一煩惱。', desc: '60–90 分鐘 1對1 深度諮詢。', icon: 'Zap' },
            { title: '深度轉化方案', price: '$4,000 / 3節', highlight: true, target: '針對金錢、關係或自信的系統性調整。', desc: '建議三個月內完成，確保護理能量穩固。', icon: 'Sparkles' },
            { title: '人生更新計畫', price: '$7,800 / 6節', target: '準備大規模轉型，優化自我核心價值。', desc: '全方位保持理想的全腦狀態與內在平安。', icon: 'ShieldCheck' }
          ].map((item, i) => (
            <div key={i} className={`p-10 rounded-[3.5rem] border flex flex-col shadow-sm hover:-translate-y-2 transition-all ${item.highlight ? 'bg-orange-50/50 border-orange-200 ring-4 ring-orange-50' : 'bg-slate-50 border-slate-100'}`}>
              <Icon name={item.icon} size={36} className="mx-auto mb-6 text-orange-500" />
              <h4 className="font-bold text-slate-800 mb-1">{item.title}</h4>
              <div className="text-2xl font-bold text-orange-600 mb-6">{item.price}</div>
              <p className="text-slate-700 text-xs font-semibold mb-4 leading-relaxed">{item.target}</p>
              <p className="text-slate-500 text-[11px] leading-relaxed font-light flex-grow">{item.desc}</p>
              <button onClick={() => handleNavClick('appointment')} className="w-full py-4 mt-6 bg-orange-500 text-white rounded-2xl font-bold text-xs shadow-lg">立即預約諮詢</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const QASection = () => (
    <section className="py-24 bg-slate-50 text-center">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        <h2 className="text-3xl font-bold text-slate-800">新手問答：解開心中的疑慮</h2>
        <div className="space-y-6 text-left">
          {[
            { 
              q: '我完全沒聽過 Psych-K®，它到底是在做什麼？', 
              a: '簡而言之，它是一套基於腦科學與能量心理學的「信念轉化工具」。我們不是只停留在邏輯層面的「聊聊」問題，而是透過特定的肢體平衡動作，直接進入你的潛意識「後台」，把舊有的負面信念（如：我不夠好）換成正面的支持力量。' 
            },
            { 
              q: '這跟一般的心理諮詢、談話療法有什麼不同？', 
              a: '傳統對談主要作用於「意識」（佔 5%），往往需要很長時間來理解問題，但不一定能改變感受。Psych-K® 則直接作用於「潛意識」（佔 95%），我們不需過度挖掘痛苦往事，而是專注於「你想變成什麼樣子」，通常在數分鐘內就能感覺到內在壓力的釋放與轉化。' 
            },
            { 
              q: '這跟每天對自己唸「正向肯定句 (Affirmations)」有什麼不同？', 
              a: '肯定句是「意識」層面的努力，如果潛意識裡仍存有反對聲音（如：肯定句說「我很富有」，潛意識卻覺得「我很窮」），肯定句往往會失效甚至造成內在衝突。Psych-K® 則是先建立「全腦狀態」，像是在電腦解鎖後直接修改源碼，讓新信念與潛意識達成 100% 一致。' 
            },
            { 
              q: '我需要「相信」它才會有效嗎？', 
              a: '不需要。這正是 Psych-K® 的魅力所在。只要你的潛意識透過肌肉測試表達了改變的意願，程序就能運作。這不是宗教或魔法，而是透過神經系統的校準來達成結果。當然，保持開放的心態會讓過程更加流暢。' 
            },
            { 
              q: '進行平衡程序時，我會有什麼特別的感覺？', 
              a: '每個人的感受都不同。有些人會感到身體微微發熱、有能量流動感，或者呼吸突然變得深長舒暢；有些人則會感到情緒的釋放或豁然開朗。即使過程中沒有明顯體感，潛意識的重塑依然在運作中。' 
            },
            { 
              q: '我需要進行多少次諮詢才能看到效果？', 
              a: 'Psych-K® 以高效著稱，許多個案在第一次平衡後就能感受到顯著的情緒轉變。對於較複雜或長期的課題（如金錢觀念、重度焦慮），我們通常建議 3 到 6 次的深度諮詢，以確保新信念在生活的各個層面都能穩固扎根。' 
            },
            { 
              q: '一次諮詢的具體流程是怎樣的？', 
              a: '我們首先會透過對談，精確定義你想解決的困擾或渴望的目標。接著，執行師會指導你進行「肌肉測試」來確認潛意識的真實想法，最後引導你進入「全腦狀態」完成平衡程序。過程非常輕鬆、安全，且全程你都是清醒且自主的。' 
            },
            { 
              q: '轉化後的改變是永久的嗎？', 
              a: '絕大部分的轉化是持久的。一旦潛意識改寫了基礎程式，就像你的電腦系統更新了核心指令。除非未來你遇到了全新的極端生活衝突需要再次調整，否則新的支撐性信念會持續運作在你的日常生活中。' 
            },
            { 
              q: 'Psych-K® 可以取代醫療行為嗎？', 
              a: '這是一個非常重要的問題。作為註冊護士執行師，我們強調 Psych-K® 是「輔助性」的心理轉化工具，旨在釋放壓力與優化信念。它不能取代專業的醫療診斷、藥物治療或傳統心理疾病的醫療方案。如果你的狀況涉及重度精神疾病，請務必諮詢專科醫療團隊。' 
            },
            { 
              q: '小朋友或長輩也可以進行 Psych-K® 嗎？', 
              a: '絕對可以。只要對方具備基本的溝通能力並願意嘗試即可。對於不方便進行肢體測試的幼童或長輩，我們可以使用「替代程序 (Surrogation)」，由執行師擔任媒介進行，安全且溫和。' 
            },
            { 
              q: '網上（遠端視訊）諮詢真的跟實體一樣有效嗎？', 
              a: '是的！我們使用名為「替代程序 (Surrogation)」的專業技術。根據量子糾幫與能量場理論，執行師可以擔任能量媒介來完成測試與平衡。許多身處海外或行動不便的個案，透過視訊獲得了與實體面談完全一致的轉化效果。' 
            }
          ].map((item, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm group hover:border-orange-200 transition-colors">
              <h4 className="font-bold text-slate-800 mb-3 text-lg leading-tight flex items-start">
                <Icon name="HelpCircle" className="mr-3 mt-1 text-orange-400 flex-shrink-0" size={20} />
                {item.q}
              </h4>
              <div className="text-slate-600 text-sm leading-relaxed font-light pl-8 whitespace-pre-wrap">{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const AppointmentSection = () => {
    const [step, setStep] = useState(1);
    const [bookingData, setBookingData] = useState({ plan: '', healer: '', format: '實體面談', date: '', time: '', name: '', phone: '', note: '' });
    
    // 取得今天的日期，用於限制不可選擇過去的日期
    const today = new Date().toISOString().split('T')[0];

    // 安全地驗證是否為週末，避免時區問題
    const checkIsWeekend = (dateString) => {
      if (!dateString) return false;
      const [y, m, d] = dateString.split('-');
      const day = new Date(y, m - 1, d).getDay();
      return day === 0 || day === 6;
    };

    const isStepValid = () => {
      if (step === 1) return bookingData.plan !== '';
      if (step === 2) return bookingData.healer !== '';
      if (step === 3) {
        if (!bookingData.date || !bookingData.time) return false;
        const isWeekend = checkIsWeekend(bookingData.date);
        const t = bookingData.time;
        const isTimeValid = t >= "09:00" && t <= "19:00";
        return isWeekend && isTimeValid;
      }
      if (step === 4) return bookingData.name !== '' && bookingData.phone !== '';
      return false;
    };

    const getMessage = () => {
      return `您好，我想預約 Psych-K 諮詢：\n方案：${bookingData.plan}\n指定執行師：${bookingData.healer}\n形式：${bookingData.format}\n預約日期：${bookingData.date}\n預約時間：${bookingData.time}\n客戶姓名：${bookingData.name}\nWhatsApp：${bookingData.phone}\n想聊的主題：${bookingData.note}\n(訊息發自靈魂小島網頁)`;
    };

    const handleSubmit = () => {
      const message = getMessage();
      // 依據選擇的執行師決定發送對象，"由團隊安排"統一發給 Joanne
      const targetPhone = bookingData.healer === 'Joyce' ? joycePhone : joannePhone;
      
      window.open(`https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`, '_blank');
      
      setStep(5); // 進入最後完成頁面
    };

    // 明確的方案列表
    const planOptions = [
      { id: 'start', title: '單次啟動會面', subtitle: '1 節深度諮詢', price: '$1,400', value: '單次啟動會面 (1節)' },
      { id: 'transform', title: '深度轉化方案', subtitle: '3 節深度諮詢', price: '$4,000', value: '深度轉化方案 (3節)' },
      { id: 'renew', title: '人生更新計畫', subtitle: '6 節深度諮詢', price: '$7,800', value: '人生更新計畫 (6節)' }
    ];

    return (
      <section className="py-24 bg-white min-h-[900px]">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <h2 className="text-3xl font-bold text-slate-800">{step === 5 ? "預約最後確認" : "開啟你的轉化旅程"}</h2>
          <div className="bg-slate-50 border border-orange-100 rounded-[3rem] p-10 shadow-2xl flex flex-col min-h-[500px]">
            
            {step < 5 && (
              <div className="flex justify-center mb-8 space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold ${step >= i ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-400'}`}>{i}</div>
                ))}
              </div>
            )}
            
            {step === 1 && ( 
              <div className="space-y-6 w-full animate-in fade-in slide-in-from-bottom-2">
                <h3 className="font-bold text-lg text-slate-800">第一步：選擇預約方案</h3>
                <div className="grid gap-4">
                  {planOptions.map(p => (
                    <button 
                      key={p.id} 
                      onClick={() => setBookingData({...bookingData, plan: p.value})} 
                      className={`p-6 rounded-2xl border-2 transition-all text-left flex justify-between items-center group ${bookingData.plan === p.value ? 'border-orange-500 bg-orange-50/50 shadow-sm' : 'border-slate-100 bg-white hover:border-orange-200'}`}
                    >
                      <div className="flex flex-col space-y-1">
                        <span className={`font-bold text-lg ${bookingData.plan === p.value ? 'text-orange-700' : 'text-slate-700'}`}>{p.title}</span>
                        <span className="text-sm text-slate-500">{p.subtitle} · <span className="font-medium text-orange-600">{p.price}</span></span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        {bookingData.plan === p.value ? (
                          <Icon name="CheckCircle" size={24} className="text-orange-500" />
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-orange-300 transition-colors"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div> 
            )}
            
            {step === 2 && ( 
              <div className="space-y-6 w-full animate-in fade-in slide-in-from-bottom-2">
                <h3 className="font-bold">第二步：指定執行師與形式</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['Joanne', 'Joyce', '由團隊安排'].map(h => (
                    <button key={h} onClick={() => setBookingData({...bookingData, healer: h})} className={`p-4 rounded-xl border-2 ${bookingData.healer === h ? 'border-orange-500 bg-orange-50' : 'border-slate-100 bg-white'} ${h === '由團隊安排' ? 'col-span-2' : ''}`}>{h}</button>
                  ))}
                </div>
                <div className="flex justify-center space-x-4 pt-4">
                  {['實體面談', '遠端視訊'].map(f => (
                    <button key={f} onClick={() => setBookingData({...bookingData, format: f})} className={`px-6 py-2 rounded-xl border-2 ${bookingData.format === f ? 'bg-orange-500 text-white border-orange-500' : 'bg-white border-slate-100'}`}>{f}</button>
                  ))}
                </div>
              </div> 
            )}
            
            {step === 3 && ( 
              <div className="space-y-6 w-full animate-in fade-in slide-in-from-bottom-2">
                <h3 className="font-bold">第三步：預約時段</h3>
                <div className="space-y-4">
                  <div className="text-left text-xs text-slate-400 pl-2">日期 (僅限週末)</div>
                  <input 
                    type="date" 
                    min={today}
                    className={`p-4 rounded-xl border w-full bg-white ${bookingData.date && !checkIsWeekend(bookingData.date) ? 'border-red-300 focus:outline-none focus:ring-1 focus:ring-red-500' : 'border-slate-200'}`} 
                    onChange={(e) => setBookingData({...bookingData, date: e.target.value})} 
                    value={bookingData.date}
                  />
                  {bookingData.date && !checkIsWeekend(bookingData.date) && (
                    <p className="text-xs text-red-500 text-left pl-2 mt-1">請選擇週末 (週六或週日) 的日期</p>
                  )}
                  
                  <div className="text-left text-xs text-slate-400 pl-2 mt-2">偏好時間 (09:00 - 19:00)</div>
                  <input 
                    type="time" 
                    min="09:00"
                    max="19:00"
                    className={`p-4 rounded-xl border w-full bg-white ${bookingData.time && (bookingData.time < "09:00" || bookingData.time > "19:00") ? 'border-red-300 focus:outline-none focus:ring-1 focus:ring-red-500' : 'border-slate-200'}`} 
                    onChange={(e) => setBookingData({...bookingData, time: e.target.value})} 
                    value={bookingData.time}
                  />
                  {bookingData.time && (bookingData.time < "09:00" || bookingData.time > "19:00") && (
                    <p className="text-xs text-red-500 text-left pl-2 mt-1">請選擇 09:00 至 19:00 之間的時間</p>
                  )}
                </div>
              </div> 
            )}
            
            {step === 4 && ( 
              <div className="space-y-6 w-full animate-in fade-in slide-in-from-bottom-2">
                <h3 className="font-bold">第四步：聯繫資料</h3>
                <input type="text" className="p-4 rounded-xl border w-full bg-white" placeholder="您的姓名" onChange={(e) => setBookingData({...bookingData, name: e.target.value})} />
                <input type="text" className="p-4 rounded-xl border w-full mt-4 bg-white" placeholder="WhatsApp 電話" onChange={(e) => setBookingData({...bookingData, phone: e.target.value})} />
                <textarea className="p-4 rounded-xl border w-full mt-4 h-24 bg-white" placeholder="想聊的主題或困惑... (選填)" onChange={(e) => setBookingData({...bookingData, note: e.target.value})}></textarea>
              </div> 
            )}

            {step === 5 && (
              <div className="space-y-8 w-full animate-in zoom-in duration-500 py-10">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="CheckCircle" size={48} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">預約訊息已準備發送</h3>
                <p className="text-slate-500 font-light leading-relaxed">
                  系統已為您開啟 WhatsApp，準備將資訊發送給 {bookingData.healer === 'Joyce' ? 'Joyce' : 'Joanne'}。<br/>
                  <strong>發送完成後，我們會盡快與您聯繫。</strong>
                </p>
                <button onClick={() => handleNavClick('home')} className="w-full py-5 bg-orange-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-orange-700 transition-all flex items-center justify-center space-x-2">
                  <Icon name="Home" size={20} />
                  <span>返回首頁</span>
                </button>
              </div>
            )}
            
            {step < 5 && (
              <div className="mt-auto pt-10 flex space-x-4 w-full">
                {step > 1 && <button onClick={() => setStep(step - 1)} className="px-8 py-4 rounded-2xl border-2 border-slate-200 text-slate-500">返回上一步</button>}
                <button 
                  onClick={step === 4 ? handleSubmit : () => setStep(step + 1)} 
                  disabled={!isStepValid()} 
                  className={`flex-grow py-4 rounded-2xl font-bold text-white transition-all ${isStepValid() ? 'bg-orange-500 shadow-lg shadow-orange-200' : 'bg-slate-200 cursor-not-allowed'}`}
                >
                  {step === 4 ? "確認預約，透過 WhatsApp 送出" : "繼續下一步"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };

  const Footer = () => (
    <footer className="py-24 bg-slate-900 text-slate-400 text-center text-xs mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center space-y-8">
        <Logo className="w-24 h-24 bg-white/10 border border-white/20 rounded-3xl" />
        <div className="space-y-2">
          <span className="text-white font-bold tracking-[0.3em] uppercase text-xl block">Soul Islet</span>
          <span className="text-orange-500 font-bold uppercase tracking-widest text-[10px]">靈魂小島 ‧ 陪你重塑潛意識</span>
        </div>
        <p className="max-w-md mx-auto text-slate-500 text-sm font-light leading-relaxed">不必背負沉重的過去，我們在這裡陪你換個角度，遇見全新的可能。</p>
        <div className="flex space-x-4">
           <a href={igUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-slate-300 hover:text-pink-500 transition-colors bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
             <Icon name="Instagram" size={18} /> <span className="font-bold tracking-tight">{igHandle}</span>
           </a>
        </div>
        <div className="h-px w-24 bg-white/10 my-6"></div>
        <p className="text-[10px] text-slate-700 uppercase tracking-widest px-4">
          © 2024 Soul Islet - Joanne & Joyce | 專業 Psych-K 執行師團隊
        </p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-orange-100 selection:text-orange-800 flex flex-col">
      <Header />
      <main className="flex-grow">
        {activeTab === 'home' && (
          <div className="animate-in fade-in duration-700">
            <Hero />
            <section className="py-10 flex flex-col items-center">
               <div className="text-slate-300 flex items-center space-x-6">
                  <div className="h-px w-20 bg-slate-200"></div>
                  <Logo className="w-16 h-16 opacity-40 grayscale mix-blend-multiply" isStamp={true} />
                  <div className="h-px w-20 bg-slate-200"></div>
               </div>
            </section>
            <AboutSection />
            <PriceSection />
            <TestimonialsSection />
          </div>
        )}
        {activeTab === 'psychk' && <PsychKSection />}
        {activeTab === 'about' && <AboutSection />}
        {activeTab === 'qa' && <QASection />}
        {activeTab === 'price' && <PriceSection />}
        {activeTab === 'testimonials' && <TestimonialsSection />}
        {activeTab === 'appointment' && <AppointmentSection />}
      </main>
      <Footer />
    </div>
  );
};

export default App;