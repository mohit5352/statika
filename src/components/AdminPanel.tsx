import React, { useState } from 'react';
import { Lock, Unlock, LogOut, Shield, KeyRound, Check, AlertTriangle } from 'lucide-react';

interface AdminPanelProps {
  isAdmin: boolean;
  onAdminChange: (isAdmin: boolean) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isAdmin, onAdminChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem('iss_admin_token', data.token);
        onAdminChange(true);
        setIsOpen(false);
        setUsername('');
        setPassword('');
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (err: any) {
      setError('Connection to auth server failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('iss_admin_token');
    onAdminChange(false);
  };

  return (
    <div className="relative font-sans">
      {isAdmin ? (
        <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-xl border border-emerald-500/30">
          <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold font-display">Admin Mode Active</span>
          <button
            onClick={handleLogout}
            className="ml-2 hover:bg-emerald-500/30 p-1 rounded-lg text-emerald-400 transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 px-3 py-1.5 rounded-xl transition-all text-xs font-semibold cursor-pointer"
        >
          <Lock className="w-3.5 h-3.5" />
          Admin Login
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/15 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-slate-100">
            <div className="p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 border border-indigo-500/20">
                  <KeyRound className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold font-display text-white">UPSC ISS Administrator</h3>
                  <p className="text-[11px] text-slate-400">Log in to update answers, notes & explanations</p>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/20 text-red-300 text-xs px-3.5 py-2.5 rounded-xl border border-red-500/30 flex gap-2 mb-4">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. admin"
                    className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-hidden text-sm px-3.5 py-2 rounded-xl transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-hidden text-sm px-3.5 py-2 rounded-xl transition-all"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 py-2 rounded-xl text-xs font-semibold transition-colors border border-white/10 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {isLoggingIn ? 'Verifying...' : 'Sign In'}
                  </button>
                </div>
              </form>

              <div className="mt-4 text-[10px] text-slate-500 text-center">
                Configure credentials in `.env` using ADMIN_USERNAME and ADMIN_PASSWORD (default: admin / password)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminPanel;
