import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import PCModel from './components/PCModel';
import UINodes from './components/UINodes';

export default function App() {
  const [activeNode, setActiveNode] = useState(null);

  return (
    <div className="h-screen w-screen selection:bg-secondary selection:text-surface-container-lowest bg-black text-white">
      
      {/* Background Decoration */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0b1426] via-[#040812] to-black">
        <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,1)] mix-blend-multiply z-10"></div>
        <div className="absolute inset-0 opacity-[0.03] z-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-sm flex justify-between items-center px-8 py-6 pointer-events-auto">
        <div className="text-xl font-black tracking-tighter text-white font-inter opacity-90 cursor-default">
          RITVIK // PORTFOLIO
        </div>
        <nav className="hidden md:flex gap-8 items-center cursor-default">
          <a href="#" onClick={(e) => { e.preventDefault(); alert('Documentation Module: Offline'); }} className="text-zinc-400 hover:text-cyan-400 transition-colors duration-300 cursor-pointer text-[10px] uppercase tracking-widest font-bold">Documentation</a>
          <a href="#" onClick={(e) => { e.preventDefault(); alert('Network Module: Online'); }} className="text-zinc-400 hover:text-cyan-400 transition-colors duration-300 cursor-pointer text-[10px] uppercase tracking-widest font-bold">Network</a>
          <div className="flex gap-4">
            <button onClick={() => alert('Terminal Access Denied.')} className="flex items-center justify-center">
              <span className="material-symbols-outlined text-zinc-400 cursor-pointer hover:text-cyan-400 transition-colors text-xl">terminal</span>
            </button>
            <button onClick={() => window.location.reload()} className="flex items-center justify-center">
              <span className="material-symbols-outlined text-zinc-400 cursor-pointer hover:text-red-500 transition-colors text-xl">power_settings_new</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Side Navigation */}
      <aside className="fixed right-0 h-full w-72 border-l border-white/5 bg-[#0a0a0a]/40 backdrop-blur-xl z-40 hidden xl:flex flex-col py-10 pointer-events-auto">
        <div className="px-8 mb-12 mt-16">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 rounded-lg bg-surface-variant/30 flex items-center justify-center border border-white/10">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 0" }}>settings_input_component</span>
            </div>
            <div>
              <h2 className="text-zinc-50 text-sm font-bold">System Manifest</h2>
              <p className="text-zinc-500 text-[9px] uppercase tracking-widest">Hardware Mapping</p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto w-full custom-scrollbar">
          {[
            { id: 'cpu', icon: 'person', label: 'About Me' },
            { id: 'mobo', icon: 'developer_board', label: 'Tech Stack' },
            { id: 'gpu', icon: 'rocket_launch', label: 'Projects' },
            { id: 'ssd', icon: 'workspace_premium', label: 'Certifications' },
            { id: 'ram', icon: 'fitness_center', label: 'Hobbies' },
            { id: 'psu', icon: 'bolt', label: 'Career Vision' }
          ].map((item) => (
          <div key={item.id} onClick={() => setActiveNode(item.id)} className={`px-8 py-4 flex items-center justify-between cursor-pointer transition-all group ${activeNode === item.id ? 'text-cyan-400 border-r-2 border-cyan-400 bg-cyan-400/5' : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5'}`}>
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-sm">{item.icon}</span>
                <span className="font-inter text-[10px] uppercase tracking-[0.2em] font-bold">{item.label}</span>
              </div>
              <span className="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Canvas Area */}
      <main className="relative h-screen w-screen flex items-center justify-center xl:pr-72">
        <div className="absolute inset-0 z-10 select-none pointer-events-auto">
          <Canvas camera={{ position: [-15, 5, 20], fov: 45 }}>
            <PCModel setActiveNode={setActiveNode} />
          </Canvas>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden fixed bottom-0 left-0 w-full p-6 z-50 bg-gradient-to-t from-black to-transparent pointer-events-auto">
          <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
            {[
              { id: 'cpu', icon: 'person', label: 'About' },
              { id: 'mobo', icon: 'developer_board', label: 'Stack' },
              { id: 'gpu', icon: 'rocket_launch', label: 'Projects' },
              { id: 'ssd', icon: 'workspace_premium', label: 'Certs' },
              { id: 'ram', icon: 'fitness_center', label: 'Hobbies' },
              { id: 'psu', icon: 'bolt', label: 'Vision' }
            ].map((item) => (
              <button key={item.id} className={`min-w-[90px] p-4 rounded-lg flex flex-col items-center justify-center gap-2 ${activeNode === item.id ? 'bg-secondary/20 shadow-[0_0_15px_#00f1fe] border border-secondary/50' : 'glass-panel'}`} onClick={() => setActiveNode(item.id)}>
                <span className={`material-symbols-outlined text-sm ${activeNode === item.id ? 'text-secondary' : 'text-zinc-500'}`}>{item.icon}</span>
                <span className={`text-[9px] uppercase font-bold tracking-widest ${activeNode === item.id ? 'text-white' : 'text-zinc-400'}`}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Slide-in Detail Panel */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        <UINodes activeNode={activeNode} setActiveNode={setActiveNode} />
      </div>

    </div>
  );
}
