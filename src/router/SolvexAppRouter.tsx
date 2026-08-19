// ==========================================
// SOLVEX FRONTEND ENTERPRISE ROUTER & DOMAIN ISOLATOR
// Architecture: Strict Frontend Separation for uarefake.com vs uarefake.space
// ==========================================

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from '../App';

// ==========================================
// 1. DOMAIN ISOLATION & ENCLAVE GUARD
// ==========================================
export const ALLOWED_STOREFRONT_DOMAIN = 'uarefake.com';
export const ALLOWED_ADMIN_DOMAIN = 'uarefake.space';

export function enforceDomainBoundary(expectedDomain: string): boolean {
  if (typeof window === 'undefined') return true;
  const currentHostname = window.location.hostname.toLowerCase();
  // Allow localhost, cloud run preview hosts during development/testing
  if (
    currentHostname === 'localhost' ||
    currentHostname === '127.0.0.1' ||
    currentHostname.includes('run.app') ||
    currentHostname.includes('ais-dev') ||
    currentHostname.includes('ais-pre')
  ) {
    return true;
  }
  return currentHostname.includes(expectedDomain.toLowerCase());
}

// ==========================================
// 2. ISOLATED STOREFRONT ENCLAVE (uarefake.com)
// ==========================================
export function StorefrontMarketplace() {
  const isAuthorized = enforceDomainBoundary(ALLOWED_STOREFRONT_DOMAIN);
  if (!isAuthorized) {
    return <Navigate to="https://uarefake.space/admin" replace />;
  }

  // Render the core SolveX application in sovereign storefront mode
  return <App forcedDomainMode="com" />;
}

// ==========================================
// 3. ISOLATED ADMIN COMMAND ENCLAVE (uarefake.space)
// ==========================================
export function AdminCommandEnclave() {
  const isAuthorized = enforceDomainBoundary(ALLOWED_ADMIN_DOMAIN);
  if (!isAuthorized) {
    return <Navigate to="https://uarefake.com" replace />;
  }

  // Render the core SolveX application in admin control plane mode
  return <App forcedDomainMode="space" />;
}

// ==========================================
// 4. ROOT ROUTER EXPORT
// ==========================================
export function SolvexAppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Storefront Routes */}
        <Route path="/" element={<StorefrontMarketplace />} />
        <Route path="/store/*" element={<StorefrontMarketplace />} />
        <Route path="/catalog/*" element={<StorefrontMarketplace />} />
        <Route path="/vault/*" element={<StorefrontMarketplace />} />

        {/* Administrative Command Enclave Routes */}
        <Route path="/admin/*" element={<AdminCommandEnclave />} />
        <Route path="/space/*" element={<AdminCommandEnclave />} />
        <Route path="/control/*" element={<AdminCommandEnclave />} />

        {/* Fallback Catch-All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default SolvexAppRouter;
