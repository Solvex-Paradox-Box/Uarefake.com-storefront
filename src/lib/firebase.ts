export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

export const auth: any = {
  currentUser: {
    uid: 'sovereign-trustee-0001',
    email: 'trustee@sovereign-freedom.ai',
    emailVerified: true,
    isAnonymous: false,
    providerData: []
  }
};

export const db: any = {};

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  console.warn(`[Firebase Fallback] Operation: ${operationType} on path: ${path}`, error);
}
