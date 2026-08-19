import crypto from 'crypto';
import { UserAccount } from '../types/index';

export interface StoredUser extends UserAccount {
  passwordHash: string;
  salt: string;
  resetToken?: string;
  resetTokenExpiry?: number;
  lastLogin?: string;
}

// In-memory persistent user store with seed demo accounts
const usersStore: Map<string, StoredUser> = new Map();

// Helper to hash password with PBKDF2
export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const generatedSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, generatedSalt, 10000, 64, 'sha512').toString('hex');
  return { hash, salt: generatedSalt };
}

// Helper to verify password
export function verifyPassword(password: string, storedHash: string, salt: string): boolean {
  const { hash } = hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(storedHash, 'hex'));
}

// Generate simple secure session token
export function generateSessionToken(userId: string): string {
  const timestamp = Date.now();
  const raw = `${userId}:${timestamp}:${crypto.randomBytes(16).toString('hex')}`;
  return Buffer.from(raw).toString('base64');
}

// Verify and extract userId from token
export function verifySessionToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [userId, timestamp] = decoded.split(':');
    if (!userId || !timestamp) return null;
    // Tokens valid for 30 days
    const age = Date.now() - Number(timestamp);
    if (age > 30 * 24 * 60 * 60 * 1000) return null;
    return userId;
  } catch {
    return null;
  }
}

// Initialize seed users
function initializeSeedUsers() {
  if (usersStore.size > 0) return;

  // Demo User 1: Enterprise Buyer
  const buyerPass = hashPassword('Enterprise2026!');
  const buyerUser: StoredUser = {
    id: 'usr-buyer-01',
    name: 'Sarah Chen',
    email: 'buyer@solvex.com',
    company: 'Apex Global Logistics & Quantum Mesh',
    role: 'Enterprise Buyer',
    accountType: 'Corporate B2B',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    createdAt: new Date(Date.now() - 60 * 24 * 3600 * 1000).toISOString(),
    phone: '+1 (415) 890-2341',
    passwordHash: buyerPass.hash,
    salt: buyerPass.salt,
    billingAddress: {
      street: '450 Mission Street, Suite 1800',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'United States'
    },
    preferences: {
      emailNotifications: true,
      twoFactorEnabled: false
    }
  };
  usersStore.set(buyerUser.email.toLowerCase(), buyerUser);

  // Demo User 2: Sovereign Trustee Admin
  const adminPass = hashPassword('Sovereign88!');
  const adminUser: StoredUser = {
    id: 'usr-admin-88',
    name: 'Alexander Vane',
    email: 'admin@uarefake.space',
    company: 'Solvex Paradox Core Foundation',
    role: 'Sovereign Administrator',
    accountType: 'Corporate B2B',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: new Date(Date.now() - 120 * 24 * 3600 * 1000).toISOString(),
    phone: '+1 (212) 555-0199',
    passwordHash: adminPass.hash,
    salt: adminPass.salt,
    billingAddress: {
      street: '1 World Trade Center, Floor 72',
      city: 'New York',
      state: 'NY',
      postalCode: '10007',
      country: 'United States'
    },
    preferences: {
      emailNotifications: true,
      twoFactorEnabled: true
    }
  };
  usersStore.set(adminUser.email.toLowerCase(), adminUser);

  // Demo User 3: Procurement Specialist
  const procPass = hashPassword('Procure2026!');
  const procUser: StoredUser = {
    id: 'usr-proc-03',
    name: 'Marcus Vance',
    email: 'marcus@quantumprocure.io',
    company: 'Quantum Trade & Autonomous Supply',
    role: 'Procurement Specialist',
    accountType: 'Individual',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString(),
    phone: '+1 (312) 777-4488',
    passwordHash: procPass.hash,
    salt: procPass.salt,
    billingAddress: {
      street: '200 E Randolph St',
      city: 'Chicago',
      state: 'IL',
      postalCode: '60601',
      country: 'United States'
    }
  };
  usersStore.set(procUser.email.toLowerCase(), procUser);
}

// Initialize immediately
initializeSeedUsers();

// Auth Store Methods
export class AuthStore {
  public static getAllUsers(): UserAccount[] {
    return Array.from(usersStore.values()).map(u => this.sanitizeUser(u));
  }

  public static findByEmail(email: string): StoredUser | null {
    if (!email) return null;
    return usersStore.get(email.trim().toLowerCase()) || null;
  }

  public static findById(id: string): StoredUser | null {
    if (!id) return null;
    for (const user of usersStore.values()) {
      if (user.id === id) return user;
    }
    return null;
  }

  public static sanitizeUser(user: StoredUser): UserAccount {
    const { passwordHash, salt, resetToken, resetTokenExpiry, ...safeUser } = user;
    return safeUser;
  }

  public static registerUser(data: {
    name: string;
    email: string;
    password: string;
    company?: string;
    role?: UserAccount['role'];
    accountType?: UserAccount['accountType'];
    phone?: string;
    billingAddress?: UserAccount['billingAddress'];
  }): { success: boolean; user?: UserAccount; token?: string; error?: string } {
    const cleanEmail = data.email.trim().toLowerCase();

    if (usersStore.has(cleanEmail)) {
      return { success: false, error: 'An account with this email already exists in the Solvex Registry.' };
    }

    if (data.password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    const { hash, salt } = hashPassword(data.password);
    const userId = `usr-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newUser: StoredUser = {
      id: userId,
      name: data.name.trim(),
      email: cleanEmail,
      company: data.company?.trim() || 'Sovereign Organization',
      role: data.role || 'Customer',
      accountType: data.accountType || 'Corporate B2B',
      createdAt: new Date().toISOString(),
      phone: data.phone?.trim(),
      billingAddress: data.billingAddress || {
        street: '100 Sovereign Way',
        city: 'Metropolis',
        state: 'CA',
        postalCode: '90210',
        country: 'United States'
      },
      passwordHash: hash,
      salt: salt,
      lastLogin: new Date().toISOString()
    };

    usersStore.set(cleanEmail, newUser);
    const token = generateSessionToken(newUser.id);

    return {
      success: true,
      user: this.sanitizeUser(newUser),
      token
    };
  }

  public static authenticateUser(email: string, password: string): {
    success: boolean;
    user?: UserAccount;
    token?: string;
    error?: string;
  } {
    const cleanEmail = email.trim().toLowerCase();
    const user = usersStore.get(cleanEmail);

    if (!user) {
      return { success: false, error: 'No account found with this email address.' };
    }

    const isValid = verifyPassword(password, user.passwordHash, user.salt);
    if (!isValid) {
      return { success: false, error: 'Invalid password. Please check your credentials.' };
    }

    user.lastLogin = new Date().toISOString();
    const token = generateSessionToken(user.id);

    return {
      success: true,
      user: this.sanitizeUser(user),
      token
    };
  }

  public static generatePasswordReset(email: string): {
    success: boolean;
    resetCode?: string;
    resetToken?: string;
    error?: string;
  } {
    const cleanEmail = email.trim().toLowerCase();
    const user = usersStore.get(cleanEmail);

    if (!user) {
      return { success: false, error: 'No account registered with this email address.' };
    }

    // Generate 6-digit numeric verification code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetToken = crypto.randomBytes(24).toString('hex');
    const resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

    user.resetToken = `${resetCode}:${resetToken}`;
    user.resetTokenExpiry = resetTokenExpiry;

    return {
      success: true,
      resetCode,
      resetToken
    };
  }

  public static resetPasswordWithCode(email: string, codeOrToken: string, newPassword: string): {
    success: boolean;
    user?: UserAccount;
    token?: string;
    error?: string;
  } {
    const cleanEmail = email.trim().toLowerCase();
    const user = usersStore.get(cleanEmail);

    if (!user) {
      return { success: false, error: 'User not found.' };
    }

    if (!user.resetToken || !user.resetTokenExpiry) {
      return { success: false, error: 'No password reset was requested for this account.' };
    }

    if (Date.now() > user.resetTokenExpiry) {
      return { success: false, error: 'Password reset code has expired. Please request a new one.' };
    }

    const [storedCode, storedToken] = user.resetToken.split(':');
    const inputClean = codeOrToken.trim();

    if (inputClean !== storedCode && inputClean !== storedToken) {
      return { success: false, error: 'Invalid verification code. Please check and try again.' };
    }

    if (newPassword.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters long.' };
    }

    const { hash, salt } = hashPassword(newPassword);
    user.passwordHash = hash;
    user.salt = salt;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    user.lastLogin = new Date().toISOString();

    const token = generateSessionToken(user.id);

    return {
      success: true,
      user: this.sanitizeUser(user),
      token
    };
  }

  public static updateUserProfile(userId: string, update: Partial<UserAccount>): {
    success: boolean;
    user?: UserAccount;
    error?: string;
  } {
    const user = this.findById(userId);
    if (!user) {
      return { success: false, error: 'User not found.' };
    }

    if (update.name) user.name = update.name.trim();
    if (update.company) user.company = update.company.trim();
    if (update.role) user.role = update.role;
    if (update.accountType) user.accountType = update.accountType;
    if (update.phone) user.phone = update.phone.trim();
    if (update.billingAddress) user.billingAddress = { ...user.billingAddress, ...update.billingAddress };
    if (update.avatarUrl) user.avatarUrl = update.avatarUrl;
    if (update.preferences) user.preferences = { ...user.preferences, ...update.preferences };

    return {
      success: true,
      user: this.sanitizeUser(user)
    };
  }
}
