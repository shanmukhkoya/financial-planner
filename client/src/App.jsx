import React from 'react';
import Dashboard from './components/features/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-500/20">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">FP</div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                Financial Planner
              </h1>
            </div>
            <div className="flex items-center">
              {/* Profile or Settings could go here */}
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
