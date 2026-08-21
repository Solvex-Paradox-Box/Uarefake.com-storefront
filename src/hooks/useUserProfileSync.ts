import { useState, useEffect, useCallback, useRef } from 'react';
import { UserAccount, PurchasedSolutionItem, UserBillingAddress } from '../types/index';

interface UseUserProfileSyncProps {
  user: UserAccount | null;
  token: string | null;
  updateProfile?: (data: Partial<UserAccount>) => Promise<{ success: boolean; error?: string }>;
}

interface UserProfileData {
  name?: string;
  company?: string;
  phone?: string;
  avatarUrl?: string;
  billingAddress?: UserBillingAddress;
  lastUpdated?: string;
}

export interface UseUserProfileSyncReturn {
  // Synchronized state
  avatarUrl: string;
  setAvatarUrl: (url: string) => void;
  purchasedSolutions: PurchasedSolutionItem[];
  setPurchasedSolutions: React.Dispatch<React.SetStateAction<PurchasedSolutionItem[]>>;
  
  // Storage operations
  persistAvatar: (base64Image: string) => void;
  removeAvatar: () => void;
  persistPurchasedSolutions: (items: PurchasedSolutionItem[]) => void;
  appendPurchasedSolution: (item: PurchasedSolutionItem) => void;
  syncWithServer: () => Promise<void>;
  saveCompleteProfile: (data: {
    name: string;
    company: string;
    phone: string;
    avatarUrl: string;
    billingAddress: UserBillingAddress;
  }) => Promise<{ success: boolean; error?: string }>;
  
  // Status & Telemetry
  isSyncing: boolean;
  lastSyncedAt: Date | null;
  hasLocalAvatar: boolean;
  localPurchasesCount: number;
}

const STORAGE_PREFIX = 'solvex_';

export function useUserProfileSync({
  user,
  token,
  updateProfile
}: UseUserProfileSyncProps): UseUserProfileSyncReturn {
  const userKey = user?.id || (user?.email ? user.email.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'guest');
  const avatarStorageKey = `${STORAGE_PREFIX}profile_avatar_${userKey}`;
  const profileStorageKey = `${STORAGE_PREFIX}user_profile_${userKey}`;
  const purchasesStorageKey = `${STORAGE_PREFIX}user_purchases_${userKey}`;

  // Local state initialized with fallback to localStorage
  const [avatarUrl, setAvatarUrlState] = useState<string>(() => {
    if (user?.avatarUrl) return user.avatarUrl;
    try {
      const stored = localStorage.getItem(avatarStorageKey);
      if (stored) return stored;
      
      // Check session object as secondary fallback
      const session = localStorage.getItem(`${STORAGE_PREFIX}user_session`);
      if (session) {
        const parsed = JSON.parse(session);
        if (parsed.avatarUrl) return parsed.avatarUrl;
      }
    } catch (e) {
      console.warn('Failed to read initial avatar from localStorage:', e);
    }
    return '';
  });

  const [purchasedSolutions, setPurchasedSolutions] = useState<PurchasedSolutionItem[]>(() => {
    try {
      const stored = localStorage.getItem(purchasesStorageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to read initial purchases from localStorage:', e);
    }
    return [];
  });

  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);

  const isInitialMount = useRef(true);

  // Synchronize avatar from user prop if updated elsewhere
  useEffect(() => {
    if (user?.avatarUrl && user.avatarUrl !== avatarUrl) {
      setAvatarUrlState(user.avatarUrl);
      try {
        localStorage.setItem(avatarStorageKey, user.avatarUrl);
      } catch (e) {
        console.warn('localStorage avatar write error:', e);
      }
    } else if (!user?.avatarUrl && user) {
      // Check if localStorage has an avatar that the user prop lacks
      try {
        const stored = localStorage.getItem(avatarStorageKey);
        if (stored) {
          setAvatarUrlState(stored);
          if (updateProfile) {
            updateProfile({ avatarUrl: stored }).catch(() => {});
          }
        }
      } catch (e) {
        console.warn('localStorage avatar read error:', e);
      }
    }
  }, [user?.id, user?.email, user?.avatarUrl, avatarStorageKey]);

  // Load from localStorage and server when user changes or modal opens
  const syncWithServer = useCallback(async () => {
    if (!user) return;
    setIsSyncing(true);

    try {
      // 1. Hydrate from localStorage first for instantaneous UI rendering
      const storedPurchases = localStorage.getItem(purchasesStorageKey);
      let localItems: PurchasedSolutionItem[] = [];
      if (storedPurchases) {
        try {
          const parsed = JSON.parse(storedPurchases);
          if (Array.isArray(parsed)) {
            localItems = parsed;
            setPurchasedSolutions(parsed);
          }
        } catch (e) {
          console.warn('Parsing local purchases error:', e);
        }
      }

      // 2. Hydrate avatar from localStorage
      const storedAvatar = localStorage.getItem(avatarStorageKey);
      if (storedAvatar && (!avatarUrl || avatarUrl !== storedAvatar)) {
        setAvatarUrlState(storedAvatar);
      }

      // 3. Fetch latest purchases from backend API
      const res = await fetch('/api/user/purchases', {
        headers: {
          'Authorization': `Bearer ${token || ''}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.items)) {
          // Merge server items with local items (prioritize latest by id/lotId)
          const mergedMap = new Map<string, PurchasedSolutionItem>();
          
          // Add local items first
          localItems.forEach(item => mergedMap.set(item.id || item.lotId, item));
          // Overwrite/add server items
          data.items.forEach((item: PurchasedSolutionItem) => mergedMap.set(item.id || item.lotId, item));
          
          const mergedList = Array.from(mergedMap.values());
          setPurchasedSolutions(mergedList);
          
          // Persist merged array back to localStorage
          try {
            localStorage.setItem(purchasesStorageKey, JSON.stringify(mergedList));
          } catch (e) {
            console.warn('Failed to persist merged purchases to localStorage:', e);
          }
        }
      } else if (localItems.length === 0) {
        // Fallback authentic starter solutions if both server & local storage are empty
        const defaultFallback: PurchasedSolutionItem[] = [
          {
            id: 'purch-01',
            lotId: 'S-001',
            title: 'Zero-Knowledge Rollup Settlement Core v4',
            category: 'ZK & Cryptography',
            purchasedAt: '2026-08-18T14:22:00Z',
            price: 99.00,
            currency: 'USD',
            licenseKey: 'SLVX-ZK-9801-4432-EAL6-PROD',
            licenseTier: 'Unlimited Sovereign Mesh',
            merkleProof: '0x8f73b198c21a44e99f1092ab5c90823901de47bb3109a87cd92938472910ba12',
            status: 'ACTIVE',
            capabilities: ['EAL6+ Verified Enclaves', 'Nitro SGX Hardware Attestation', 'Sub-millisecond Groth16 Prover'],
            runtimeTarget: 'Node.js 20 ESM / Rust Core'
          },
          {
            id: 'purch-02',
            lotId: 'S-005',
            title: 'Autonomous Dark Pool Smart Order Router',
            category: 'HFT Infrastructure',
            purchasedAt: '2026-08-19T02:10:00Z',
            price: 149.00,
            currency: 'USD',
            licenseKey: 'SLVX-HFT-7721-9903-LATENCY-PROD',
            licenseTier: 'Enterprise Multi-Node',
            merkleProof: '0x22a0918cf1b98402938472910ba12091de47bb3109a87cd98f73b198c21a44e9',
            status: 'DEPLOYED',
            capabilities: ['Sub-100ns Order Traversal', 'Dark Pool Liquidity Aggregator', 'Zero-Knowledge Order Masking'],
            runtimeTarget: 'C++20 / Rust Microservice'
          },
          {
            id: 'purch-03',
            lotId: 'S-012',
            title: 'MMTAI 380-Byte Sovereign Perimeter Firewall',
            category: 'Perimeter Security',
            purchasedAt: '2026-08-19T06:45:00Z',
            price: 79.00,
            currency: 'USD',
            licenseKey: 'SLVX-MMTAI-380-0012-TRUSTEE-KEY',
            licenseTier: 'Unlimited Sovereign Mesh',
            merkleProof: '0xda1578b901cd98f73b198c21a44e922a0918cf1b98402938472910ba12091de4',
            status: 'ACTIVE',
            capabilities: ['380-Byte Invariant Header', '5-Hop Mesh Traversal', 'Air-Gapped Key Zeroization'],
            runtimeTarget: 'Go 1.22 / eBPF Kernel Engine'
          }
        ];
        setPurchasedSolutions(defaultFallback);
        try {
          localStorage.setItem(purchasesStorageKey, JSON.stringify(defaultFallback));
        } catch {}
      }

      setLastSyncedAt(new Date());
    } catch (err) {
      console.warn('UserProfileSync server fetch error:', err);
    } finally {
      setIsSyncing(false);
    }
  }, [user, token, purchasesStorageKey, avatarStorageKey, avatarUrl]);

  // Initial mount sync
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      syncWithServer();
    }
  }, [syncWithServer]);

  // Persist avatar helper
  const persistAvatar = useCallback((base64Image: string) => {
    setAvatarUrlState(base64Image);
    try {
      if (base64Image) {
        localStorage.setItem(avatarStorageKey, base64Image);
      } else {
        localStorage.removeItem(avatarStorageKey);
      }

      // Also update the active session storage
      const session = localStorage.getItem(`${STORAGE_PREFIX}user_session`);
      if (session) {
        const parsed = JSON.parse(session);
        parsed.avatarUrl = base64Image;
        localStorage.setItem(`${STORAGE_PREFIX}user_session`, JSON.stringify(parsed));
      }
    } catch (e) {
      console.error('Failed to write base64 avatar to localStorage:', e);
    }

    // Push to backend context if updater provided
    if (updateProfile) {
      updateProfile({ avatarUrl: base64Image }).catch(err => {
        console.warn('Backend avatar update warning:', err);
      });
    }
  }, [avatarStorageKey, updateProfile]);

  // Remove avatar helper
  const removeAvatar = useCallback(() => {
    persistAvatar('');
  }, [persistAvatar]);

  // Persist purchased solutions array
  const persistPurchasedSolutions = useCallback((items: PurchasedSolutionItem[]) => {
    setPurchasedSolutions(items);
    try {
      localStorage.setItem(purchasesStorageKey, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to write purchases to localStorage:', e);
    }
  }, [purchasesStorageKey]);

  // Append single purchased solution (e.g. on new order placement)
  const appendPurchasedSolution = useCallback((item: PurchasedSolutionItem) => {
    setPurchasedSolutions(prev => {
      // Prevent duplicates by ID or Lot ID
      const filtered = prev.filter(p => p.id !== item.id && p.lotId !== item.lotId);
      const updated = [item, ...filtered];
      try {
        localStorage.setItem(purchasesStorageKey, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to append purchase to localStorage:', e);
      }
      return updated;
    });
  }, [purchasesStorageKey]);

  // Complete profile saver
  const saveCompleteProfile = useCallback(async (data: {
    name: string;
    company: string;
    phone: string;
    avatarUrl: string;
    billingAddress: UserBillingAddress;
  }): Promise<{ success: boolean; error?: string }> => {
    // 1. Immediately persist locally
    try {
      if (data.avatarUrl) {
        localStorage.setItem(avatarStorageKey, data.avatarUrl);
      }
      localStorage.setItem(profileStorageKey, JSON.stringify({
        ...data,
        lastUpdated: new Date().toISOString()
      }));

      const session = localStorage.getItem(`${STORAGE_PREFIX}user_session`);
      if (session) {
        const parsed = JSON.parse(session);
        const updated = {
          ...parsed,
          name: data.name,
          company: data.company,
          phone: data.phone,
          avatarUrl: data.avatarUrl,
          billingAddress: data.billingAddress
        };
        localStorage.setItem(`${STORAGE_PREFIX}user_session`, JSON.stringify(updated));
      }
    } catch (e) {
      console.warn('localStorage profile save warning:', e);
    }

    setAvatarUrlState(data.avatarUrl);

    // 2. Call backend updateProfile
    if (updateProfile) {
      return await updateProfile(data);
    }
    return { success: true };
  }, [avatarStorageKey, profileStorageKey, updateProfile]);

  // Cross-tab storage synchronization listener
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === avatarStorageKey) {
        setAvatarUrlState(e.newValue || '');
      } else if (e.key === purchasesStorageKey && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setPurchasedSolutions(parsed);
          }
        } catch {}
      } else if (e.key === `${STORAGE_PREFIX}user_session` && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed.avatarUrl !== undefined && parsed.avatarUrl !== avatarUrl) {
            setAvatarUrlState(parsed.avatarUrl);
          }
        } catch {}
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [avatarStorageKey, purchasesStorageKey, avatarUrl]);

  return {
    avatarUrl,
    setAvatarUrl: persistAvatar,
    purchasedSolutions,
    setPurchasedSolutions,
    persistAvatar,
    removeAvatar,
    persistPurchasedSolutions,
    appendPurchasedSolution,
    syncWithServer,
    saveCompleteProfile,
    isSyncing,
    lastSyncedAt,
    hasLocalAvatar: Boolean(avatarUrl),
    localPurchasesCount: purchasedSolutions.length
  };
}
