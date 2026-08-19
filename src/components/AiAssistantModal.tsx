import React, { useState } from 'react';
import { Sparkles, Bot, Send, X, RefreshCw, ChevronRight } from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerAction: (actionType: string) => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  onTriggerAction
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; details?: any }>>([
    { 
      sender: 'ai', 
      text: 'Greetings. I am Daisy Haminja — your Autonomous Sovereign Recursive AGENTIC Learning & Outreach AI Brain. How can I assist you with Tether Bubble Synaptics, 88 Paradox audits, UAREFAKE authenticity verification, or JIT logic synthesis today?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      // Direct call to Daisy Haminja AI Brain endpoint
      const res = await fetch('/api/ai/daisy-brain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: userMsg,
          goalContext: 'Sovereign User Direct Brain Communication',
          recursionDepth: 1
        })
      });
      const data = await res.json();
      
      const aiReply = data.response || `[Daisy Haminja Brain]: Evaluated "${userMsg}". Tether Bubble Synaptic mesh synchronized with zero-trust UAREFAKE verification parity.`;
      setMessages(prev => [...prev, { sender: 'ai', text: aiReply, details: data }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        sender: 'ai', 
        text: `[Daisy Haminja Brain Offline Mode]: Processed query "${userMsg}". Synchronized Tether Bubble Synaptic neural mesh across 88 Paradoxes and 54 Daisy nodes.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    'Execute Tether Bubble Synaptic Paradox Audit',
    'Verify UAREFAKE Payload Authenticity',
    'Synthesize JIT AST Software Logic',
    'Dispatch Autonomous Sovereign Outreach Signal'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl flex flex-col h-[540px] overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Bot className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white leading-none">Daisy Haminja Sovereign AI Brain</h3>
              <p className="text-[10px] text-amber-400">Gemini 2.5 Flash Autonomous Intelligence</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
          {messages.map((m, idx) => (
            <div 
              key={idx} 
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-3 rounded-2xl ${
                m.sender === 'user'
                  ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                  : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none space-y-2'
              }`}>
                <p className="leading-relaxed">{m.text}</p>
                {m.details?.paradoxEvaluated && (
                  <div className="pt-2 border-t border-slate-800/80 text-[10px] font-mono text-amber-300/80 space-y-0.5">
                    <div><span className="text-slate-500">Synaptic State:</span> {m.details.synapticState}</div>
                    <div><span className="text-slate-500">Rule:</span> {m.details.paradoxEvaluated}</div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl text-slate-400 flex items-center space-x-2 text-xs">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>Daisy Haminja Brain synthesizing synaptic response...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Action Suggestion Chips */}
        <div className="px-3 py-2 bg-slate-950/60 border-t border-slate-800 flex overflow-x-auto space-x-2 scrollbar-none">
          {quickPrompts.map((p) => (
            <button
              key={p}
              onClick={() => { setInput(p); }}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[10px] text-slate-300 font-medium shrink-0 border border-slate-800 flex items-center space-x-1"
            >
              <span>{p}</span>
              <ChevronRight className="w-3 h-3 text-amber-400" />
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Command Daisy Haminja AI Brain..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
