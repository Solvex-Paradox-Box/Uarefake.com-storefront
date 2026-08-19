import React from 'react';
import { CheckCircle2, Info, AlertTriangle, X, ShieldCheck, Zap } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  nodeHeader?: string;
  nodeNumber?: string;
  timestamp: string;
}

interface ToastNotificationProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col space-y-3 max-w-md w-full px-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex flex-col bg-slate-900 border rounded-2xl p-4 shadow-2xl transition-all duration-300 backdrop-blur-md animate-fade-in ${
            toast.type === 'success'
              ? 'border-emerald-500/60 shadow-emerald-950/50'
              : toast.type === 'warning'
              ? 'border-amber-500/60 shadow-amber-950/50'
              : 'border-indigo-500/60 shadow-indigo-950/50'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              {toast.type === 'success' && (
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
              )}
              {toast.type === 'warning' && (
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                </div>
              )}
              {toast.type === 'info' && (
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0">
                  <Info className="w-5 h-5 text-indigo-400" />
                </div>
              )}

              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-bold text-white leading-snug">{toast.title}</h4>
                  {toast.nodeNumber && (
                    <span className="text-[10px] font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-700/60 px-1.5 py-0.5 rounded">
                      {toast.nodeNumber}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{toast.message}</p>
              </div>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors shrink-0"
              title="Dismiss Notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {toast.nodeHeader && (
            <div className="mt-3 pt-2.5 border-t border-slate-800 text-[10px] font-mono text-slate-300 bg-slate-950/90 p-2.5 rounded-xl border border-slate-800/80">
              <div className="flex items-center justify-between text-emerald-400 font-semibold mb-1">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>380-Char Company Header Assigned</span>
                </span>
                <span className="text-indigo-300 font-bold bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-800/80">
                  {toast.nodeHeader.length} CHARS
                </span>
              </div>
              <div className="text-slate-300 font-mono select-all break-all line-clamp-2 hover:line-clamp-none transition-all cursor-pointer">
                {toast.nodeHeader}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
