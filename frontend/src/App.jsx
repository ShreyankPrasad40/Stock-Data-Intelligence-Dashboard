import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState(null)

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-inter">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/20 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-accent/20 blur-[120px] pointer-events-none rounded-full" />
      
      <Sidebar 
          selectedSymbol={selectedSymbol} 
          onSelect={setSelectedSymbol} 
      />
      
      <main className="flex-1 relative z-10 flex flex-col min-h-screen overflow-hidden">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-10 bg-slate-900/50 backdrop-blur-md">
           <div className="flex items-center gap-3">
              <span className="text-white/60 font-bold tracking-widest text-[10px] uppercase">Dashboard</span>
              <div className="w-1 h-3 bg-white/20 rounded-full" />
              <span className="text-white font-bold tracking-tight text-xs uppercase">{selectedSymbol || 'Select Symbol'}</span>
           </div>
           <div className="flex gap-4">
              <button className="text-xs font-bold text-white/40 hover:text-white transition-all px-3 py-1">Support</button>
              <button className="text-xs font-bold bg-white text-black px-4 py-1.5 rounded-full hover:bg-white/90 transition-all active:scale-95">Upgrade</button>
           </div>
        </header>

        <Dashboard symbol={selectedSymbol} />
      </main>
    </div>
  )
}

export default App
