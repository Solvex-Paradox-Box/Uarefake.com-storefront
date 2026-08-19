import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Folder, 
  File, 
  ChevronRight, 
  ChevronLeft, 
  Trash2, 
  Plus, 
  X, 
  FileCode, 
  FileText,
  Search,
  ArrowLeft
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface FileSystemBrowserProps {
  fs: Record<string, string>;
  onDelete: (path: string) => void;
  onMkdir: (path: string) => void;
  onWrite?: (path: string, content: string) => void;
  onRename?: (oldPath: string, newPath: string) => void;
  onClose: () => void;
}

export default function FileSystemBrowser({ fs, onDelete, onMkdir, onWrite, onClose }: FileSystemBrowserProps) {
  const [currentPath, setCurrentPath] = useState('/');
  const [viewingFile, setViewingFile] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatingDir, setIsCreatingDir] = useState(false);
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [newDirName, setNewDirName] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Normalize path to always end with / except for root
  const normalizedCurrentPath = currentPath.endsWith('/') ? currentPath : `${currentPath}/`;

  const items = useMemo(() => {
    const contents = new Set<string>();
    const files: { name: string; path: string }[] = [];
    const dirs: { name: string; path: string }[] = [];

    Object.keys(fs).forEach(path => {
      if (path.startsWith(normalizedCurrentPath)) {
        const relativePath = path.slice(normalizedCurrentPath.length);
        if (!relativePath) return;

        const parts = relativePath.split('/');
        const name = parts[0];
        
        if (parts.length > 1) {
          // It's a directory
          if (!contents.has(`dir:${name}`)) {
            dirs.push({ name, path: `${normalizedCurrentPath}${name}/` });
            contents.add(`dir:${name}`);
          }
        } else {
          // It's a file
          if (name !== '.keep') {
            files.push({ name, path });
          }
        }
      }
    });

    return {
      dirs: dirs.sort((a, b) => a.name.localeCompare(b.name)),
      files: files.sort((a, b) => a.name.localeCompare(b.name))
    };
  }, [fs, normalizedCurrentPath]);

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;
    const query = searchQuery.toLowerCase();
    return {
      dirs: items.dirs.filter(d => d.name.toLowerCase().includes(query)),
      files: items.files.filter(f => f.name.toLowerCase().includes(query))
    };
  }, [items, searchQuery]);

  const handleNavigateUp = () => {
    if (currentPath === '/') return;
    const parts = currentPath.split('/').filter(Boolean);
    parts.pop();
    setCurrentPath(`/${parts.join('/')}${parts.length > 0 ? '/' : ''}`);
  };

  const handleCreateDir = () => {
    if (!newDirName) return;
    const path = `${normalizedCurrentPath}${newDirName}/.keep`;
    onMkdir(path);
    setNewDirName('');
    setIsCreatingDir(false);
  };

  const handleCreateFile = () => {
    if (!newFileName || !onWrite) return;
    const path = `${normalizedCurrentPath}${newFileName}`;
    onWrite(path, '');
    setNewFileName('');
    setIsCreatingFile(false);
    setViewingFile(path);
    setEditingContent('');
    setIsEditing(true);
  };

  const handleSaveFile = () => {
    if (viewingFile && onWrite) {
      onWrite(viewingFile, editingContent);
      setIsEditing(false);
    }
  };

  const toggleEdit = () => {
    if (!isEditing) {
      setEditingContent(fs[viewingFile!] || '');
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  };

  const getFileIcon = (name: string) => {
    const ext = name.split('.').pop()?.toLowerCase();
    if (['js', 'ts', 'tsx', 'jsx', 'json'].includes(ext || '')) {
      return <FileCode size={18} className="text-liberty-cyan" />;
    }
    if (['py', 'sh', 'bat', 'go', 'rs', 'c', 'cpp', 'java'].includes(ext || '')) {
      return <FileCode size={18} className="text-sovereign-gold" />;
    }
    if (['html', 'css', 'xml', 'svg'].includes(ext || '')) {
      return <FileCode size={18} className="text-freedom-red" />;
    }
    return <FileText size={18} className="text-gray-400" />;
  };

  const getLanguage = (name: string) => {
    const ext = name.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'js': case 'jsx': return 'javascript';
      case 'ts': case 'tsx': return 'typescript';
      case 'html': return 'html';
      case 'css': return 'css';
      case 'json': return 'json';
      case 'py': return 'python';
      case 'sh': case 'bash': return 'bash';
      case 'md': return 'markdown';
      case 'c': case 'cpp': case 'h': case 'hpp': return 'cpp';
      case 'go': return 'go';
      case 'rs': return 'rust';
      case 'java': return 'java';
      case 'sql': return 'sql';
      case 'xml': case 'svg': return 'xml';
      case 'yml': case 'yaml': return 'yaml';
      case 'bat': return 'batch';
      default: return 'text';
    }
  };

  return (
    <div className="flex flex-col h-full bg-panel-sovereign border border-sovereign-gold/30 rounded-xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/40">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sovereign-gold/10 rounded-lg border border-sovereign-gold/20">
            <Folder size={20} className="text-sovereign-gold" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Sovereign_File_System</h3>
            <div className="text-[10px] font-mono text-gray-500 flex items-center gap-1">
              <span className="text-liberty-cyan">PATH:</span> {currentPath}
            </div>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 p-3 bg-black/20 border-b border-white/5">
        <button 
          onClick={handleNavigateUp}
          disabled={currentPath === '/'}
          className="p-2 rounded hover:bg-white/5 disabled:opacity-30 transition-all"
          title="Go Up"
        >
          <ArrowLeft size={18} className="text-gray-400" />
        </button>
        
        <div className="flex-1 relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-xs font-mono text-gray-300 focus:border-liberty-cyan/50 focus:outline-none transition-all"
          />
        </div>

        <button 
          onClick={() => { setIsCreatingDir(false); setIsCreatingFile(true); }}
          className="flex items-center gap-2 px-3 py-1.5 bg-liberty-cyan/10 border border-liberty-cyan/30 text-liberty-cyan rounded-lg hover:bg-liberty-cyan hover:text-black transition-all text-[10px] font-bold uppercase tracking-widest"
        >
          <Plus size={14} />
          New_File
        </button>

        <button 
          onClick={() => { setIsCreatingFile(false); setIsCreatingDir(true); }}
          className="flex items-center gap-2 px-3 py-1.5 bg-sovereign-gold/10 border border-sovereign-gold/30 text-sovereign-gold rounded-lg hover:bg-sovereign-gold hover:text-black transition-all text-[10px] font-bold uppercase tracking-widest"
        >
          <Plus size={14} />
          New_Dir
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
        <AnimatePresence mode="wait">
              {viewingFile ? (
                <motion.div 
                  key="viewer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full flex flex-col"
                >
                  <div className="flex items-center justify-between mb-2 px-2">
                    <button 
                      onClick={() => { setViewingFile(null); setIsEditing(false); }}
                      className="flex items-center gap-2 text-xs font-mono text-liberty-cyan hover:text-white transition-colors"
                    >
                      <ChevronLeft size={14} /> Back to Files
                    </button>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          const content = fs[viewingFile!] || '';
                          navigator.clipboard.writeText(content);
                        }}
                        className="p-1 px-2 rounded text-[10px] font-bold uppercase tracking-widest bg-white/5 text-gray-400 hover:text-liberty-cyan transition-all border border-white/5"
                        title="Copy to Clipboard"
                      >
                        Copy
                      </button>
                      {onWrite && (
                        <button 
                          onClick={isEditing ? handleSaveFile : toggleEdit}
                          className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest transition-all ${
                            isEditing ? 'bg-green-500 text-black hover:bg-white' : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          {isEditing ? 'Save_Changes' : 'Edit_Resource'}
                        </button>
                      )}
                      <div className="text-[10px] font-mono text-gray-500 uppercase">
                        {viewingFile.split('/').pop()}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 bg-black/60 rounded-lg border border-white/5 overflow-auto text-xs custom-scrollbar">
                    {isEditing ? (
                      <textarea 
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        className="w-full h-full bg-transparent p-4 font-mono text-sovereign-gold focus:outline-none resize-none"
                        spellCheck={false}
                        autoFocus
                      />
                    ) : (
                      <SyntaxHighlighter 
                        language={getLanguage(viewingFile)} 
                        style={vscDarkPlus}
                        showLineNumbers={true}
                        lineNumberStyle={{ 
                          minWidth: '3em', 
                          paddingRight: '1em', 
                          color: 'rgba(255,255,255,0.15)', 
                          textAlign: 'right',
                          userSelect: 'none',
                          borderRight: '1px solid rgba(255,255,255,0.05)',
                          marginRight: '1em'
                        }}
                        customStyle={{ 
                          margin: 0, 
                          padding: '1rem', 
                          background: 'transparent', 
                          cursor: 'text',
                          fontSize: '11px',
                          lineHeight: '1.6'
                        }}
                      >
                        {fs[viewingFile] || ''}
                      </SyntaxHighlighter>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="browser"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-1"
                >
                  {isCreatingFile && (
                    <div className="flex items-center gap-2 p-2 bg-liberty-cyan/5 border border-liberty-cyan/20 rounded-lg mb-2">
                      <FileText size={18} className="text-liberty-cyan" />
                      <input 
                        autoFocus
                        type="text"
                        placeholder="File name (e.g. core.sh)..."
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCreateFile()}
                        className="flex-1 bg-transparent border-none focus:ring-0 text-xs font-mono text-white"
                      />
                      <button onClick={handleCreateFile} className="text-liberty-cyan hover:text-white"><Plus size={16} /></button>
                      <button onClick={() => setIsCreatingFile(false)} className="text-gray-500 hover:text-white"><X size={16} /></button>
                    </div>
                  )}

                  {isCreatingDir && (
                <div className="flex items-center gap-2 p-2 bg-sovereign-gold/5 border border-sovereign-gold/20 rounded-lg mb-2">
                  <Folder size={18} className="text-sovereign-gold" />
                  <input 
                    autoFocus
                    type="text"
                    placeholder="Directory name..."
                    value={newDirName}
                    onChange={(e) => setNewDirName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreateDir()}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-xs font-mono text-white"
                  />
                  <button onClick={handleCreateDir} className="text-liberty-cyan hover:text-white"><Plus size={16} /></button>
                  <button onClick={() => setIsCreatingDir(false)} className="text-gray-500 hover:text-white"><X size={16} /></button>
                </div>
              )}

              {filteredItems.dirs.map(dir => (
                <div 
                  key={dir.path}
                  className="group flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
                  onClick={() => setCurrentPath(dir.path)}
                >
                  <div className="flex items-center gap-3">
                    <Folder size={18} className="text-sovereign-gold" />
                    <span className="text-xs font-mono text-gray-300 group-hover:text-white">{dir.name}</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(dir.path);
                      }}
                      className="p-1.5 text-gray-500 hover:text-freedom-red transition-colors"
                      title="Delete Directory"
                    >
                      <Trash2 size={14} />
                    </button>
                    <ChevronRight size={14} className="text-gray-600 group-hover:text-sovereign-gold transition-colors" />
                  </div>
                </div>
              ))}

              {filteredItems.files.map(file => (
                <div 
                  key={file.path}
                  className="group flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
                  onClick={() => setViewingFile(file.path)}
                >
                  <div className="flex items-center gap-3">
                    {getFileIcon(file.name)}
                    <span className="text-xs font-mono text-gray-300 group-hover:text-white">{file.name}</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(file.path);
                      }}
                      className="p-1.5 text-gray-500 hover:text-freedom-red transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}

              {filteredItems.dirs.length === 0 && filteredItems.files.length === 0 && !isCreatingDir && (
                <div className="py-12 text-center">
                  <div className="text-gray-600 font-mono text-xs uppercase tracking-widest">Directory_Empty</div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="p-3 bg-black/40 border-t border-white/5 flex justify-between items-center">
        <div className="text-[10px] font-mono text-gray-500 uppercase">
          {Object.keys(fs).length} Files Total
        </div>
        <div className="text-[10px] font-mono text-liberty-cyan uppercase animate-pulse">
          Secure_Storage_Active
        </div>
      </div>
    </div>
  );
}
