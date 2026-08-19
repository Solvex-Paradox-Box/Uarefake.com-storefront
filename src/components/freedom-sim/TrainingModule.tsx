import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, Cpu, Activity, Database, Play, Square, Terminal, DownloadCloud, CheckCircle2 } from 'lucide-react';

type TrainingState = 'idle' | 'uploading' | 'ready' | 'training' | 'complete';
type TabState = 'train' | 'hub';

export default function TrainingModule() {
  const [activeTab, setActiveTab] = useState<TabState>('train');
  const [trainingState, setTrainingState] = useState<TrainingState>('idle');
  const [selectedModel, setSelectedModel] = useState('quantized-mlp');
  const [progress, setProgress] = useState(0);
  const [loss, setLoss] = useState(2.45);
  const [memory, setMemory] = useState(12); // in KB
  const [epoch, setEpoch] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const [downloadProgress, setDownloadProgress] = useState<Record<string, number>>({});
  const [downloadedModels, setDownloadedModels] = useState<string[]>([]);

  const models = [
    { id: 'quantized-mlp', name: 'Quantized MLP (INT8)', ram: '14.2KB', params: '2,450' },
    { id: 'tiny-cnn', name: 'Micro-CNN (INT4)', ram: '22.5KB', params: '8,192' },
    { id: 'nano-transformer', name: 'Nano-Transformer (Binary)', ram: '28.1KB', params: '12,288' },
  ];

  const preTrainedModels = [
    { id: 'micro-nlp', name: 'Micro-NLP-Classify', size: '180KB', ram: '16.4KB', params: '4.2K', desc: 'Offline text classification for secure messaging.' },
    { id: 'nano-vision', name: 'Nano-Vision-Net', size: '240KB', ram: '24.2KB', params: '12.5K', desc: 'Basic object recognition for camera feeds.' },
    { id: 'swarm-logic', name: 'Swarm-Logic-Core', size: '320KB', ram: '30.8KB', params: '18.4K', desc: 'Pre-trained swarm coordination heuristics.' },
  ];

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toISOString().substring(11, 19)}] ${msg}`]);
  };

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const handleUpload = () => {
    if (trainingState !== 'idle') return;
    setTrainingState('uploading');
    addLog('Initializing secure dataset transfer to SC300 flash...');
    
    setTimeout(() => {
      setTrainingState('ready');
      addLog('Dataset loaded. 142KB written to NVRAM. Ready for training.');
    }, 2000);
  };

  const startTraining = () => {
    if (trainingState === 'idle') {
      setTrainingState('uploading');
      addLog('Initializing secure dataset transfer to SC300 flash...');
      
      setTimeout(() => {
        setTrainingState('training');
        setProgress(0);
        setLoss(2.45);
        setEpoch(0);
        setLogs([]);
        addLog('Dataset loaded. 142KB written to NVRAM. Ready for training.');
        addLog(`Allocating memory for ${selectedModel}...`);
        addLog('Initializing backpropagation engine (Fixed-Point Math)...');
      }, 2000);
      return;
    }
    if (trainingState !== 'ready' && trainingState !== 'complete') return;
    setTrainingState('training');
    setProgress(0);
    setLoss(2.45);
    setEpoch(0);
    setLogs([]);
    addLog(`Allocating memory for ${selectedModel}...`);
    addLog('Initializing backpropagation engine (Fixed-Point Math)...');
  };

  const stopTraining = () => {
    if (trainingState !== 'training') return;
    setTrainingState('ready');
    addLog('Training halted by user. Weights preserved in NVRAM.');
  };

  const downloadWeights = (modelId: string) => {
    const model = models.find(m => m.id === modelId) || preTrainedModels.find(m => m.id === modelId);
    if (!model) return;

    addLog(`Exporting sovereign weights for ${model.name}...`);
    
    // Create a dummy binary blob to simulate model weights
    const size = modelId.includes('quantized') ? 14000 : modelId.includes('tiny') ? 22000 : 30000;
    const buffer = new Uint8Array(size);
    for (let i = 0; i < size; i++) buffer[i] = Math.floor(Math.random() * 256);
    
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${modelId}_sovereign_weights.bin`;
    link.click();
    URL.revokeObjectURL(url);
    
    addLog(`Download complete: ${modelId}_sovereign_weights.bin`);
  };

  const handleDownload = (modelId: string, modelName: string, sizeStr: string) => {
    if (downloadProgress[modelId] !== undefined) return;
    
    addLog(`Initiating secure download of ${modelName}...`);
    setDownloadProgress(prev => ({ ...prev, [modelId]: 0 }));
    
    // Parse size (e.g., "180KB" -> 180 * 1024 bytes)
    const sizeKB = parseInt(sizeStr.replace('KB', ''));
    const totalBytes = sizeKB * 1024;
    
    let currentBytes = 0;
    const interval = setInterval(() => {
      // Process network chunks
      currentBytes += totalBytes * (Math.random() * 0.2 + 0.1);
      
      if (currentBytes >= totalBytes) {
        currentBytes = totalBytes;
        clearInterval(interval);
        
        // Actually create a real binary blob to represent the model weights
        const buffer = new Uint8Array(totalBytes);
        for (let i = 0; i < totalBytes; i++) {
          buffer[i] = Math.floor(Math.random() * 256); // Random weights
        }
        
        // Save to Virtual FS so SwarmOS can see it
        try {
          const storedFS = localStorage.getItem('swarm_fs');
          const virtualFS = storedFS ? JSON.parse(storedFS) : {};
          // Store as base64 to represent the binary file in local storage
          let binary = '';
          const chunkSize = 8192;
          for (let i = 0; i < buffer.length; i += chunkSize) {
            binary += String.fromCharCode.apply(null, buffer.subarray(i, i + chunkSize) as any);
          }
          const base64 = btoa(binary);
          virtualFS[`/models/${modelId}.gguf`] = base64;
          localStorage.setItem('swarm_fs', JSON.stringify(virtualFS));
        } catch (e) {
          console.error("Failed to write to Virtual FS", e);
        }

        setDownloadedModels(prev => [...prev, modelId]);
        addLog(`${modelName} successfully flashed to secure storage (/models/${modelId}.gguf).`);
      }
      
      setDownloadProgress(prev => ({ ...prev, [modelId]: (currentBytes / totalBytes) * 100 }));
    }, 300);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (trainingState === 'training') {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setTrainingState('complete');
            addLog('Training complete. Model weights frozen and signed.');
            return 100;
          }
          const newProgress = p + 0.5;
          
          // Process telemetry updates
          if (Math.floor(newProgress) % 5 === 0 && newProgress !== p) {
            setEpoch(e => e + 1);
            setLoss(l => Math.max(0.12, l - (Math.random() * 0.15)));
            setMemory(24 + Math.random() * 6); // Fluctuate between 24-30KB
            addLog(`Epoch ${Math.floor(newProgress / 5)} | Loss: ${loss.toFixed(4)} | RAM: ${memory.toFixed(1)}KB`);
          }
          
          return newProgress;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [trainingState, loss, memory]);

  return (
    <section id="training" className="py-24 px-6 relative z-10 bg-[#050508] border-t border-sovereign-gold/10">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h2 className="text-4xl font-bold text-liberty-cyan uppercase tracking-[2px] mb-4 relative inline-block">
          On-Card Neural Engine
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-liberty-cyan to-sovereign-gold"></div>
        </h2>
        <p className="text-gray-400 text-lg mt-8 leading-relaxed">
          Train lightweight AI models directly on the ARM SC300 secure element, or download pre-trained sovereign weights. Zero data exfiltration. Maximum hardware efficiency.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Configuration Panel */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="flex border-b border-gray-800 mb-6">
            <button 
              onClick={() => setActiveTab('train')}
              className={`flex-1 py-3 font-mono text-sm uppercase tracking-wider transition-colors ${activeTab === 'train' ? 'text-liberty-cyan border-b-2 border-liberty-cyan bg-liberty-cyan/5' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Train Local
            </button>
            <button 
              onClick={() => setActiveTab('hub')}
              className={`flex-1 py-3 font-mono text-sm uppercase tracking-wider transition-colors ${activeTab === 'hub' ? 'text-sovereign-gold border-b-2 border-sovereign-gold bg-sovereign-gold/5' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Model Hub
            </button>
          </div>

          {activeTab === 'train' ? (
            <>
              <div className="bg-panel-sovereign border border-sovereign-gold/20 rounded-xl p-6">
                <h3 className="text-xl text-sovereign-gold font-bold mb-4 font-mono flex items-center gap-2">
                  <Database size={20} /> Dataset Ingestion
                </h3>
                
                <div 
                  onClick={handleUpload}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
                    trainingState === 'idle' 
                      ? 'border-gray-600 hover:border-liberty-cyan hover:bg-liberty-cyan/5' 
                      : 'border-liberty-cyan bg-liberty-cyan/10'
                  }`}
                >
                  {trainingState === 'idle' ? (
                    <>
                      <Upload className="mx-auto mb-4 text-gray-500" size={32} />
                      <p className="text-gray-400 font-mono text-sm">Click or drag CSV/JSON to upload</p>
                      <p className="text-gray-600 text-xs mt-2">Max size: 128KB (NVRAM limit)</p>
                    </>
                  ) : trainingState === 'uploading' ? (
                    <div className="animate-pulse text-liberty-cyan font-mono">
                      Encrypting and transferring to secure element...
                    </div>
                  ) : (
                    <div className="text-sovereign-gold font-mono">
                      <Database className="mx-auto mb-2" size={24} />
                      Dataset Loaded (Secure)
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-panel-sovereign border border-sovereign-gold/20 rounded-xl p-6">
                <h3 className="text-xl text-sovereign-gold font-bold mb-4 font-mono flex items-center gap-2">
                  <Cpu size={20} /> Architecture Selection
                </h3>
                <div className="space-y-3">
                  {models.map(model => (
                    <div 
                      key={model.id}
                      onClick={() => trainingState !== 'training' && setSelectedModel(model.id)}
                      className={`p-4 rounded border cursor-pointer transition-all ${
                        selectedModel === model.id 
                          ? 'border-liberty-cyan bg-liberty-cyan/10' 
                          : 'border-gray-800 hover:border-gray-600'
                      } ${trainingState === 'training' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-text-main">{model.name}</span>
                        <span className="text-xs font-mono text-liberty-cyan">{model.ram} RAM</span>
                      </div>
                      <div className="text-xs text-gray-500 font-mono">Params: {model.params}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-4">
                  <div className="flex gap-4">
                    <button 
                      onClick={startTraining}
                      disabled={trainingState === 'uploading' || trainingState === 'training'}
                      className="flex-1 py-3 bg-freedom-red text-white font-bold uppercase tracking-wider rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#ff1a1a] transition-colors flex items-center justify-center gap-2"
                    >
                      <Play size={18} /> {trainingState === 'idle' ? 'Initialize & Train' : 'Start Training'}
                    </button>
                    <button 
                      onClick={stopTraining}
                      disabled={trainingState !== 'training'}
                      className="py-3 px-6 bg-transparent border border-gray-600 text-gray-400 font-bold uppercase tracking-wider rounded disabled:opacity-50 disabled:cursor-not-allowed hover:border-white hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                      <Square size={18} /> Stop
                    </button>
                  </div>

                  {trainingState === 'complete' && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => downloadWeights(selectedModel)}
                      className="w-full py-4 bg-liberty-cyan text-black font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(0,242,255,0.3)] flex items-center justify-center gap-3"
                    >
                      <DownloadCloud size={20} />
                      Download Trained Weights (.bin)
                    </motion.button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-panel-sovereign border border-sovereign-gold/20 rounded-xl p-6">
              <h3 className="text-xl text-sovereign-gold font-bold mb-4 font-mono flex items-center gap-2">
                <DownloadCloud size={20} /> Pre-Trained Models
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Download lightweight, quantized models directly to your SIM's secure storage for offline inference.
              </p>
              
              <div className="space-y-4">
                {preTrainedModels.map(model => {
                  const isDownloaded = downloadedModels.includes(model.id);
                  const progress = downloadProgress[model.id] || 0;
                  const isDownloading = progress > 0 && progress < 100;

                  return (
                    <div key={model.id} className="p-4 rounded border border-gray-800 bg-black/40 relative overflow-hidden">
                      {isDownloading && (
                        <div 
                          className="absolute top-0 left-0 h-full bg-sovereign-gold/10 transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      )}
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="font-bold text-text-main block">{model.name}</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              <span className="text-[10px] font-mono text-sovereign-gold bg-sovereign-gold/10 px-1 rounded border border-sovereign-gold/20">SIZE: {model.size}</span>
                              <span className="text-[10px] font-mono text-liberty-cyan bg-liberty-cyan/10 px-1 rounded border border-liberty-cyan/20">RAM: {model.ram}</span>
                              <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-1 rounded border border-white/10">PARAMS: {model.params}</span>
                            </div>
                          </div>
                          {isDownloaded ? (
                            <button 
                              onClick={() => downloadWeights(model.id)}
                              className="flex items-center gap-1 text-liberty-cyan text-[10px] font-mono bg-liberty-cyan/10 px-2 py-1 rounded border border-liberty-cyan/30 hover:bg-liberty-cyan/20 transition-all"
                            >
                              <DownloadCloud size={12} /> DL BIN
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleDownload(model.id, model.name, model.size)}
                              disabled={isDownloading}
                              className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded transition-colors disabled:opacity-50 flex items-center gap-2 text-xs font-mono"
                            >
                              <DownloadCloud size={16} /> DOWNLOAD
                            </button>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{model.desc}</p>
                        
                        {isDownloading && (
                          <div className="mt-3 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-sovereign-gold transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Telemetry Panel */}
        <div className="lg:col-span-7 space-y-6 flex flex-col">
          <div className="bg-panel-sovereign border border-liberty-cyan/30 rounded-xl p-6 flex-1 flex flex-col">
            <h3 className="text-xl text-liberty-cyan font-bold mb-6 font-mono flex items-center gap-2">
              <Activity size={20} /> SC300 Telemetry
            </h3>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-black/40 p-4 rounded border border-gray-800">
                <div className="text-gray-500 text-xs uppercase mb-1">Epoch</div>
                <div className="text-2xl font-mono text-white">{epoch}</div>
              </div>
              <div className="bg-black/40 p-4 rounded border border-gray-800">
                <div className="text-gray-500 text-xs uppercase mb-1">Loss</div>
                <div className="text-2xl font-mono text-freedom-red">{loss.toFixed(4)}</div>
              </div>
              <div className="bg-black/40 p-4 rounded border border-gray-800 relative overflow-hidden">
                <div className="text-gray-500 text-xs uppercase mb-1">RAM Usage</div>
                <div className="text-2xl font-mono text-sovereign-gold">{memory.toFixed(1)} <span className="text-sm">/ 32KB</span></div>
                <div className="absolute bottom-0 left-0 h-1 bg-gray-800 w-full">
                  <div 
                    className="h-full bg-sovereign-gold transition-all duration-300" 
                    style={{ width: `${(memory / 32) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mb-2 flex justify-between text-xs font-mono text-gray-400">
              <span>Training Progress</span>
              <span>{progress.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-8">
              <div 
                className="h-full bg-gradient-to-r from-freedom-red to-liberty-cyan transition-all duration-100"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="flex-1 bg-[#0c0c14] border border-gray-800 rounded-lg p-4 font-mono text-xs overflow-hidden flex flex-col">
              <div className="flex items-center gap-2 text-gray-500 mb-2 border-b border-gray-800 pb-2">
                <Terminal size={14} /> Secure Element Console
              </div>
              <div className="flex-1 overflow-y-auto space-y-1 text-gray-400 pr-2 custom-scrollbar">
                {logs.length === 0 ? (
                  <div className="text-gray-600 italic">Awaiting initialization...</div>
                ) : (
                  logs.map((log, i) => (
                    <div key={i} className={`${log.includes('Error') ? 'text-freedom-red' : log.includes('complete') || log.includes('successfully') ? 'text-liberty-cyan' : ''}`}>
                      {log}
                    </div>
                  ))
                )}
                <div ref={logsEndRef} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
