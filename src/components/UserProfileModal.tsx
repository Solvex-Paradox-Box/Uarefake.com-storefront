import React, { useState, useEffect, useRef } from 'react';
import { 
  X, User, Building, Mail, Phone, MapPin, Shield, Key, Download, ExternalLink, 
  Copy, CheckCircle2, Terminal, Server, Cpu, Clock, RefreshCw, LogOut, Lock,
  ChevronRight, Sparkles, FileCode, Check, AlertCircle, ShoppingBag, Eye,
  Camera, CameraOff, RotateCcw, Trash2, Upload, Video, CheckCheck, Aperture,
  HardDrive
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PurchasedSolutionItem, UserAccount } from '../types/index';
import { useUserProfileSync } from '../hooks/useUserProfileSync';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSpaceAdmin?: () => void;
  onNavigateToCatalog?: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  onNavigateToSpaceAdmin,
  onNavigateToCatalog
}) => {
  const { user, token, logout, updateProfile } = useAuth();

  // Integrated LocalStorage & Backend Profile State Hook
  const {
    avatarUrl,
    setAvatarUrl,
    purchasedSolutions,
    setPurchasedSolutions,
    persistAvatar,
    removeAvatar,
    persistPurchasedSolutions,
    syncWithServer,
    saveCompleteProfile,
    isSyncing,
    lastSyncedAt,
    hasLocalAvatar,
    localPurchasesCount
  } = useUserProfileSync({
    user,
    token,
    updateProfile
  });

  const [activeTab, setActiveTab] = useState<'profile' | 'solutions' | 'orders' | 'admin-gateway'>('profile');
  
  // Profile edit states
  const [name, setName] = useState(user?.name || '');
  const [company, setCompany] = useState(user?.company || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [street, setStreet] = useState(user?.billingAddress?.street || '');
  const [city, setCity] = useState(user?.billingAddress?.city || '');
  const [state, setState] = useState(user?.billingAddress?.state || '');
  const [postalCode, setPostalCode] = useState(user?.billingAddress?.postalCode || '');
  const [country, setCountry] = useState(user?.billingAddress?.country || 'United States');
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Camera & Photo capture states
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync state with user
  useEffect(() => {
    if (user) {
      setName(user.name);
      setCompany(user.company);
      setPhone(user.phone || '');
      setStreet(user.billingAddress?.street || '');
      setCity(user.billingAddress?.city || '');
      setState(user.billingAddress?.state || '');
      setPostalCode(user.billingAddress?.postalCode || '');
      setCountry(user.billingAddress?.country || 'United States');
    }
  }, [user]);

  // Clean up camera stream on unmount or when modal closes
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
    } else if (user) {
      syncWithServer();
    }
  }, [isOpen, user, syncWithServer]);

  // Handle camera activation & video streaming
  const startCamera = async (targetFacing: 'user' | 'environment' = facingMode) => {
    setCameraError(null);
    setIsCameraActive(true);

    // Stop any existing stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access API is not supported in this browser environment.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: targetFacing,
          width: { ideal: 640 },
          height: { ideal: 640 }
        },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(err => {
          console.warn('Video play caught:', err);
        });
      }
    } catch (err: any) {
      console.error('Camera stream error:', err);
      let msg = 'Failed to access camera. Please verify camera permissions in your browser.';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        msg = 'Camera permission was denied. Please allow camera access in your browser settings.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        msg = 'No video capture device was detected on your system.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        msg = 'Camera is currently in use by another application or tab.';
      }
      setCameraError(msg);
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setCountdown(null);
    setIsCapturing(false);
  };

  const toggleCameraFacing = () => {
    const nextMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  // Immediate or countdown snapshot capture
  const triggerSnapshot = (useCountdown = false) => {
    if (useCountdown) {
      setCountdown(3);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(interval);
            executeCapture();
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      executeCapture();
    }
  };

  const executeCapture = () => {
    if (!videoRef.current) return;
    setIsCapturing(true);

    try {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      
      // Determine square dimensions from video stream
      const minDim = Math.min(video.videoWidth || 480, video.videoHeight || 480);
      const targetSize = Math.min(minDim, 400); // 400x400 max for crisp, compact base64 size
      canvas.width = targetSize;
      canvas.height = targetSize;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        const sx = ((video.videoWidth || 480) - minDim) / 2;
        const sy = ((video.videoHeight || 480) - minDim) / 2;

        // If user-facing mode, mirror horizontally for natural selfie appearance
        if (facingMode === 'user') {
          ctx.translate(targetSize, 0);
          ctx.scale(-1, 1);
        }

        ctx.drawImage(video, sx, sy, minDim, minDim, 0, 0, targetSize, targetSize);

        // Convert to high-quality base64 image
        const base64Data = canvas.toDataURL('image/jpeg', 0.88);
        persistAvatar(base64Data);
      }
    } catch (err) {
      console.error('Snapshot capture error:', err);
    } finally {
      setIsCapturing(false);
      stopCamera();
    }
  };

  // Optional manual file upload to base64 fallback
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      persistAvatar(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    removeAvatar();
  };

  const handleCopyKey = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2500);
  };

  const handleDownloadSourcePackage = async (item: PurchasedSolutionItem) => {
    setDownloadingId(item.id);
    try {
      const zip = new JSZip();
      const folderName = `solvex-${item.lotId.toLowerCase()}-${item.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      const root = zip.folder(folderName) || zip;

      // 1. Root Manifest
      root.file('manifest.json', JSON.stringify({
        lotId: item.lotId,
        title: item.title,
        category: item.category,
        licenseKey: item.licenseKey,
        licenseTier: item.licenseTier,
        merkleProof: item.merkleProof,
        runtime: item.runtimeTarget,
        purchasedBy: user?.email || 'sovereign-buyer@solvex.network',
        timestamp: new Date().toISOString(),
        verifiedEnclave: 'uarefake.space Sovereign Registry'
      }, null, 2));

      // 2. Core Engine Entrypoint
      root.file('index.ts', `/**
 * SolveX Autonomous Business Solution: ${item.title} (${item.lotId})
 * License Key: ${item.licenseKey}
 * Merkle Root: ${item.merkleProof}
 * Target Runtime: ${item.runtimeTarget}
 */

export interface SystemCapabilities {
  lotId: string;
  license: string;
  enclaveReady: boolean;
}

export class AutonomousCoreEngine {
  private isInitialized = false;

  constructor(private readonly config: { licenseKey: string }) {
    if (config.licenseKey !== '${item.licenseKey}') {
      throw new Error('UNAUTHORIZED_LICENSE_EXCEPTION');
    }
  }

  public async initialize(): Promise<{ status: string; timestamp: string }> {
    this.isInitialized = true;
    console.log('[SolveX Core] Node initialised with sovereign capabilities: ${item.capabilities.join(', ')}');
    return {
      status: 'ONLINE_OPTIMAL',
      timestamp: new Date().toISOString()
    };
  }

  public async executeWorkload(payload: Record<string, any>): Promise<{ processed: boolean; proof: string }> {
    if (!this.isInitialized) throw new Error('Engine not initialized');
    return {
      processed: true,
      proof: '${item.merkleProof}'
    };
  }
}

// Default instance boot
const engine = new AutonomousCoreEngine({ licenseKey: '${item.licenseKey}' });
engine.initialize().then(() => console.log('SolveX Autonomous Node Ready.'));
`);

      // 3. Security Attestation & README
      root.file('README.md', `# ${item.title} (${item.lotId})

## Sovereign Enterprise Autonomous Module
- **License Tier:** ${item.licenseTier}
- **License Key:** \`${item.licenseKey}\`
- **Merkle Proof:** \`${item.merkleProof}\`
- **Runtime:** ${item.runtimeTarget}

### Capabilities
${item.capabilities.map(c => `- ${c}`).join('\n')}

### Quick Start
\`\`\`bash
npm install
npm run build
npm start
\`\`\`

Generated and attested by **SolveX Sovereign Vault** (uarefake.com / uarefake.space).
`);

      // 4. package.json
      root.file('package.json', JSON.stringify({
        name: `solvex-${item.lotId.toLowerCase()}`,
        version: '1.0.0',
        description: item.title,
        main: 'dist/index.js',
        scripts: {
          build: 'tsc',
          start: 'node dist/index.js'
        },
        dependencies: {
          dotenv: '^16.4.5',
          ethers: '^6.13.2'
        },
        devDependencies: {
          typescript: '^5.4.5',
          '@types/node': '^20.12.7'
        }
      }, null, 2));

      // Generate ZIP blob
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `SolveX_${item.lotId}_${item.title.replace(/[^a-zA-Z0-9]/g, '_')}_Source.zip`);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    const res = await saveCompleteProfile({
      name,
      company,
      phone,
      avatarUrl,
      billingAddress: {
        street,
        city,
        state,
        postalCode,
        country
      }
    });

    setIsSaving(false);
    if (res.success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  if (!isOpen || !user) return null;

  const isAdministrator = user.role === 'Sovereign Administrator' || user.email.includes('admin') || user.email.includes('daisy.haminja');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-950 border border-cyan-500/40 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl shadow-cyan-950/60 overflow-hidden font-sans text-slate-100">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/50">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={user.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-cyan-400/80 shadow-lg shadow-cyan-500/30"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-cyan-500/30">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <button
                onClick={() => {
                  setActiveTab('profile');
                  startCamera();
                }}
                className="absolute -bottom-1 -right-1 p-1.5 rounded-xl bg-slate-900 border border-cyan-400 text-cyan-300 hover:bg-cyan-500 hover:text-black transition-all shadow-md"
                title="Capture or Update Profile Photo"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-white tracking-wide">{user.name}</h2>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-bold border ${
                  isAdministrator 
                    ? 'bg-purple-950/90 text-purple-300 border-purple-400/60 shadow-sm shadow-purple-500/20'
                    : 'bg-emerald-950/90 text-emerald-300 border-emerald-400/60 shadow-sm shadow-emerald-500/20'
                }`}>
                  {user.role}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {user.accountType}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{user.company} • {user.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={logout}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 border border-rose-900/40 transition-all"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
            <button
              onClick={() => {
                stopCamera();
                onClose();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-800 px-6 bg-slate-900/50 overflow-x-auto gap-2">
          <button
            onClick={() => {
              stopCamera();
              setActiveTab('profile');
            }}
            className={`flex items-center space-x-2 py-3 px-3 text-xs sm:text-sm font-mono font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4 text-blue-400" />
            <span>Profile & Photo</span>
          </button>

          <button
            onClick={() => {
              stopCamera();
              setActiveTab('solutions');
            }}
            className={`flex items-center space-x-2 py-3 px-3 text-xs sm:text-sm font-mono font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'solutions'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Purchased Solutions ({purchasedSolutions.length})</span>
          </button>

          <button
            onClick={() => {
              stopCamera();
              setActiveTab('orders');
            }}
            className={`flex items-center space-x-2 py-3 px-3 text-xs sm:text-sm font-mono font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <span>Invoices & Order Receipts</span>
          </button>

          <button
            onClick={() => {
              stopCamera();
              setActiveTab('admin-gateway');
            }}
            className={`flex items-center space-x-2 py-3 px-3 text-xs sm:text-sm font-mono font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'admin-gateway'
                ? 'border-purple-400 text-purple-300 bg-purple-950/30'
                : 'border-transparent text-purple-400/80 hover:text-purple-300'
            }`}
          >
            <Shield className="w-4 h-4 text-purple-400" />
            <span>Site Admin Control (uarefake.space)</span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: PROFILE & PHOTO CAPTURE */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              
              {/* SECTION: PROFILE PHOTO & CAMERA CAPTURE HUB */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Camera className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                      Secure Profile Photo (Base64 Encoded)
                    </h4>
                  </div>
                  {avatarUrl && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 flex items-center space-x-1">
                      <CheckCheck className="w-3 h-3" />
                      <span>Photo Synchronized</span>
                    </span>
                  )}
                </div>

                {/* Camera Viewfinder Box or Photo Preview */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  
                  {/* Left: Avatar Display / Live Camera Stream */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center">
                    {isCameraActive ? (
                      <div className="relative w-56 h-56 rounded-2xl overflow-hidden bg-black border-2 border-cyan-400 shadow-2xl shadow-cyan-950 flex items-center justify-center">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
                        />

                        {/* Viewfinder Grid Overlay */}
                        <div className="absolute inset-0 border-2 border-cyan-400/40 pointer-events-none rounded-2xl">
                          <div className="absolute inset-4 border border-dashed border-cyan-300/50 rounded-full animate-pulse" />
                        </div>

                        {/* Countdown Overlay */}
                        {countdown !== null && (
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10 animate-scaleUp">
                            <span className="text-6xl font-black text-cyan-300 font-mono drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]">
                              {countdown}
                            </span>
                          </div>
                        )}

                        {/* Live Recording Indicator */}
                        <div className="absolute top-2 left-2 flex items-center space-x-1 bg-black/70 px-2 py-0.5 rounded-md border border-cyan-500/40 text-[10px] font-mono text-cyan-300">
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                          <span>LIVE FEED</span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative group w-44 h-44 rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-700 hover:border-cyan-400/60 shadow-xl flex items-center justify-center transition-all">
                        {avatarUrl ? (
                          <img
                            src={avatarUrl}
                            alt="Profile Avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-slate-500 space-y-2 p-4 text-center">
                            <User className="w-12 h-12 text-slate-600" />
                            <span className="text-xs font-mono">No profile photo</span>
                          </div>
                        )}

                        {avatarUrl && (
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity space-x-2">
                            <button
                              type="button"
                              onClick={() => startCamera()}
                              className="p-2 rounded-xl bg-cyan-500 text-black hover:scale-110 transition-transform shadow-lg"
                              title="Retake with Camera"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={handleRemovePhoto}
                              className="p-2 rounded-xl bg-rose-500 text-white hover:scale-110 transition-transform shadow-lg"
                              title="Remove Photo"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right: Camera Action Controls & Telemetry */}
                  <div className="md:col-span-7 space-y-3">
                    {cameraError && (
                      <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-mono flex items-start space-x-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                        <div>{cameraError}</div>
                      </div>
                    )}

                    {isCameraActive ? (
                      <div className="space-y-3">
                        <p className="text-xs text-slate-300 font-mono">
                          Position your face within the viewfinder circle. Photos are encoded directly to compact base64 strings and stored in your profile state.
                        </p>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => triggerSnapshot(false)}
                            disabled={isCapturing}
                            className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs font-mono rounded-xl shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                          >
                            <Aperture className="w-4 h-4" />
                            <span>Capture Photo Now</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => triggerSnapshot(true)}
                            disabled={isCapturing || countdown !== null}
                            className="flex items-center space-x-2 px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs font-mono rounded-xl border border-slate-700 transition-all"
                            title="3-Second Shutter Timer"
                          >
                            <Clock className="w-4 h-4 text-cyan-400" />
                            <span>3s Timer</span>
                          </button>

                          <button
                            type="button"
                            onClick={toggleCameraFacing}
                            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-all"
                            title="Switch Camera (Front / Back)"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={stopCamera}
                            className="flex items-center space-x-1.5 px-3 py-2.5 bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 font-mono text-xs rounded-xl border border-rose-900/60 transition-all"
                          >
                            <CameraOff className="w-4 h-4" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-xs text-slate-400 font-mono">
                          Capture a high-definition photo using your web camera or mobile sensor. Your image data is encoded locally as a secure base64 string.
                        </p>

                        <div className="flex flex-wrap items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => startCamera()}
                            className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs font-mono rounded-xl shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95"
                          >
                            <Camera className="w-4 h-4" />
                            <span>{avatarUrl ? 'Retake Photo with Camera' : 'Take Profile Photo with Camera'}</span>
                          </button>

                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept="image/*"
                            className="hidden"
                          />

                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center space-x-1.5 px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs rounded-xl border border-slate-700 transition-all"
                          >
                            <Upload className="w-3.5 h-3.5 text-slate-400" />
                            <span>Upload Image</span>
                          </button>

                          {avatarUrl && (
                            <button
                              type="button"
                              onClick={handleRemovePhoto}
                              className="flex items-center space-x-1.5 px-3 py-2.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 font-mono text-xs rounded-xl border border-rose-900/40 transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Remove</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* FORM: CORPORATE IDENTITY FIELDS */}
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white font-mono flex items-center space-x-2">
                      <User className="w-4 h-4 text-blue-400" />
                      <span>Corporate B2B Account Profile</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Manage legal name, enterprise organization, and billing credentials.</p>
                  </div>
                  {saveSuccess && (
                    <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-mono bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/40">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Profile & Photo Saved!</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:border-cyan-400 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">Company / Organization</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:border-cyan-400 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">Email Address (Immutable)</label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-400 cursor-not-allowed font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">Telephone / Secure Contact</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:border-cyan-400 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Billing Address Section */}
                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Corporate Billing Address</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">Street Address</label>
                      <input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="100 Sovereign Way, Suite 400"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="San Francisco"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">State / Province</label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="CA"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">Postal / ZIP Code</label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="94105"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">Country</label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="United States"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs font-mono rounded-xl shadow-lg shadow-blue-900/40 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSaving ? 'animate-spin' : ''}`} />
                    <span>{isSaving ? 'Saving Changes...' : 'Save Profile & Settings'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: PURCHASED SOLUTIONS */}
          {activeTab === 'solutions' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-bold text-white font-mono flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <span>Unlocked Autonomous Software & Vault Licenses</span>
                    </h3>
                    <span className="hidden sm:inline-flex items-center space-x-1 px-2 py-0.5 text-[10px] font-mono rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                      <HardDrive className="w-3 h-3 text-cyan-400" />
                      <span>LocalStorage Sync</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Your authenticated digital licenses, JIT compilable source bundles, and hardware attestation keys.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {lastSyncedAt && (
                    <span className="text-[10px] font-mono text-slate-400">
                      Synced {lastSyncedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                  <button
                    onClick={syncWithServer}
                    className="p-1.5 text-slate-400 hover:text-cyan-300 rounded-lg hover:bg-slate-900 border border-slate-800 transition-colors"
                    title="Refresh & Re-sync Licenses"
                  >
                    <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-cyan-400' : ''}`} />
                  </button>
                </div>
              </div>

              {purchasedSolutions.length === 0 ? (
                <div className="p-8 text-center bg-slate-900/40 border border-slate-800/80 rounded-2xl">
                  <Sparkles className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <p className="text-sm text-slate-300 font-medium">No purchased solutions detected in active session.</p>
                  <p className="text-xs text-slate-500 mt-1">Browse the Sovereign Vault or Marketplace to acquire autonomous business templates.</p>
                  {onNavigateToCatalog && (
                    <button
                      onClick={() => {
                        stopCamera();
                        onClose();
                        onNavigateToCatalog();
                      }}
                      className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs font-mono rounded-xl shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Browse Sovereign 105 Lots Vault</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {purchasedSolutions.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 transition-all shadow-md shadow-black/40 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-mono font-extrabold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                              {item.lotId}
                            </span>
                            <h4 className="text-base font-bold text-white tracking-wide">{item.title}</h4>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 flex items-center space-x-3 font-mono">
                            <span>Category: <strong className="text-slate-200">{item.category}</strong></span>
                            <span>•</span>
                            <span>Runtime: <strong className="text-slate-200">{item.runtimeTarget}</strong></span>
                            <span>•</span>
                            <span>Acquired: <strong className="text-slate-300">{new Date(item.purchasedAt).toLocaleDateString()}</strong></span>
                          </p>
                        </div>

                        <div className="flex items-center space-x-2 self-start sm:self-center">
                          <span className="text-[10px] font-mono font-bold px-2 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                            {item.status}
                          </span>
                          <span className="text-xs font-mono text-slate-300 font-bold bg-slate-800 px-2 py-1 rounded">
                            ${item.price.toFixed(2)} {item.currency}
                          </span>
                        </div>
                      </div>

                      {/* License Key & Cryptographic Proof */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-xs font-mono">
                        <div className="bg-black/60 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between">
                          <div className="overflow-hidden mr-2">
                            <span className="text-[10px] text-slate-500 uppercase block font-bold">Cryptographic License Key</span>
                            <span className="text-cyan-300 font-bold tracking-wider truncate block">{item.licenseKey}</span>
                          </div>
                          <button
                            onClick={() => handleCopyKey(item.licenseKey, `key-${item.id}`)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 transition-colors shrink-0"
                            title="Copy License Key"
                          >
                            {copiedKeyId === `key-${item.id}` ? (
                              <Check className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        <div className="bg-black/60 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between">
                          <div className="overflow-hidden mr-2">
                            <span className="text-[10px] text-slate-500 uppercase block font-bold">Merkle Proof Commitment</span>
                            <span className="text-slate-400 text-[11px] truncate block font-mono">{item.merkleProof}</span>
                          </div>
                          <button
                            onClick={() => handleCopyKey(item.merkleProof, `merkle-${item.id}`)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 transition-colors shrink-0"
                            title="Copy Merkle Proof"
                          >
                            {copiedKeyId === `merkle-${item.id}` ? (
                              <Check className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Capabilities pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {item.capabilities.map((cap, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60"
                          >
                            ✓ {cap}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-slate-800/60">
                        <button
                          onClick={() => handleDownloadSourcePackage(item)}
                          disabled={downloadingId === item.id}
                          className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs font-mono rounded-xl shadow-md shadow-cyan-950 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{downloadingId === item.id ? 'Packaging Source ZIP...' : 'Download Full Source Bundle (ZIP)'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ORDERS & RECEIPTS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white font-mono flex items-center space-x-2">
                    <ShoppingBag className="w-4 h-4 text-emerald-400" />
                    <span>Purchase Orders & Payment Receipts</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Immutable audit trail of PayPal and crypto escrow settlements.</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-sm">PO-2026-9842</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                        SETTLED
                      </span>
                    </div>
                    <p className="text-slate-400 mt-1 text-[11px]">
                      Items: Zero-Knowledge Rollup Settlement Core v4 + Autonomous Dark Pool Router
                    </p>
                    <p className="text-slate-500 text-[10px] mt-0.5">
                      Settled via PayPal REST V2 • Transaction ID: CAP-PP-88219034-US
                    </p>
                  </div>
                  <div className="text-right self-end sm:self-center">
                    <span className="text-sm font-bold text-white block">$248.00 USD</span>
                    <span className="text-[10px] text-slate-400">2026-08-19 06:38 UTC</span>
                  </div>
                </div>

                <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-sm">PO-2026-5519</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                        SETTLED
                      </span>
                    </div>
                    <p className="text-slate-400 mt-1 text-[11px]">
                      Items: MMTAI 380-Byte Sovereign Perimeter Firewall
                    </p>
                    <p className="text-slate-500 text-[10px] mt-0.5">
                      Settled via Corporate B2B Escrow • Transaction ID: TX-MMTAI-4412-ZKP
                    </p>
                  </div>
                  <div className="text-right self-end sm:self-center">
                    <span className="text-sm font-bold text-white block">$79.00 USD</span>
                    <span className="text-[10px] text-slate-400">2026-08-19 04:15 UTC</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SITE ADMIN CONTROL GATEWAY (uarefake.space) */}
          {activeTab === 'admin-gateway' && (
            <div className="bg-gradient-to-br from-purple-950/40 via-slate-900/60 to-black border border-purple-500/40 rounded-2xl p-6 space-y-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-500/50 flex items-center justify-center text-purple-300 shadow-lg shadow-purple-500/20">
                    <Shield className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-mono flex items-center space-x-2">
                      <span>uarefake.space AI Registry & Control Board</span>
                    </h3>
                    <p className="text-xs text-purple-300/80 font-mono mt-0.5">
                      Backend Sovereign Admin Enclave • dAIsy haMINJA Autonomous Brain Engine
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-400/50 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  <span>SOVEREIGN CLUSTER</span>
                </span>
              </div>

              <div className="bg-black/60 border border-purple-900/40 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-2">
                <div className="flex items-center justify-between text-purple-200">
                  <span>Administrative Identity:</span>
                  <span className="font-bold">{user.email}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Enclave Domain Target:</span>
                  <span className="text-emerald-400 font-bold">uarefake.space / AIRegistry</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Security Perimeter:</span>
                  <span className="text-amber-400">380-Byte MMTAI Quantum Guard</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Telemetry Streams:</span>
                  <span className="text-cyan-400">178 Active Leads • 88 Paradoxes • Neon PostgreSQL</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Click below to authenticate sovereign trustee permissions and launch directly into the <strong>uarefake.space</strong> AI Registry, dAIsy haMINJA outreach command center, node mesh tracker, and cryptographic test suite.
              </p>

              <div className="flex items-center justify-end pt-2">
                <button
                  onClick={() => {
                    stopCamera();
                    onClose();
                    if (onNavigateToSpaceAdmin) {
                      onNavigateToSpaceAdmin();
                    }
                  }}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-500 hover:from-purple-500 hover:to-emerald-400 text-white font-extrabold text-xs sm:text-sm font-mono rounded-xl shadow-xl shadow-purple-950/60 transition-all hover:scale-105 active:scale-95"
                >
                  <Shield className="w-4 h-4 text-emerald-300" />
                  <span>Launch uarefake.space AI Registry & Control Board</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
