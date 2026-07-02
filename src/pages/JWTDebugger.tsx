import React, { useState, useEffect } from 'react';
import { decodeJwtPart, verifyHmacSignature } from '../utils/jwt';
import { ShieldCheck, ShieldAlert, Shield, Trash2 } from 'lucide-react';

export const JWTDebugger: React.FC = () => {
  const [token, setToken] = useState('');
  const [secret, setSecret] = useState('');
  const [decodedHeader, setDecodedHeader] = useState<any>(null);
  const [decodedPayload, setDecodedPayload] = useState<any>(null);
  const [headerError, setHeaderError] = useState<string | null>(null);
  const [payloadError, setPayloadError] = useState<string | null>(null);
  const [sigStatus, setSigStatus] = useState<'unverified' | 'verified' | 'invalid'>('unverified');

  const SAMPLE_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  const SAMPLE_SECRET = "your-256-bit-secret";

  const handleLoadSample = () => {
    setToken(SAMPLE_JWT);
    setSecret(SAMPLE_SECRET);
  };

  const handleClear = () => {
    setToken('');
    setSecret('');
    setDecodedHeader(null);
    setDecodedPayload(null);
    setHeaderError(null);
    setPayloadError(null);
    setSigStatus('unverified');
  };

  useEffect(() => {
    if (!token.trim()) {
      setDecodedHeader(null);
      setDecodedPayload(null);
      setHeaderError(null);
      setPayloadError(null);
      setSigStatus('unverified');
      return;
    }

    const parts = token.split('.');
    
    if (parts[0]) {
      const res = decodeJwtPart(parts[0]);
      if (res.success) {
        setDecodedHeader(res.data);
        setHeaderError(null);
      } else {
        setDecodedHeader(null);
        setHeaderError(res.error || 'Failed to decode header');
      }
    } else {
      setDecodedHeader(null);
      setHeaderError('Missing header segment');
    }

    if (parts[1]) {
      const res = decodeJwtPart(parts[1]);
      if (res.success) {
        setDecodedPayload(res.data);
        setPayloadError(null);
      } else {
        setDecodedPayload(null);
        setPayloadError(res.error || 'Failed to decode payload');
      }
    } else {
      setDecodedPayload(null);
      setPayloadError('Missing payload segment');
    }

    if (parts.length === 3 && secret.trim()) {
      verifyHmacSignature(token, secret).then((isValid) => {
        setSigStatus(isValid ? 'verified' : 'invalid');
      });
    } else {
      setSigStatus('unverified');
    }
  }, [token, secret]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">JWT Debugger</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Decode and verify JSON Web Tokens (JWT) locally and securely in your browser.
        </p>
      </div>

      {/* Control Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleClear}
            className="inline-flex items-center px-4 py-2 border border-slate-200 dark:border-slate-700 text-sm font-semibold rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
          >
            <Trash2 className="h-4 w-4 mr-1.5" />
            Clear
          </button>
        </div>
        <button
          onClick={handleLoadSample}
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          Load Sample HS256 Token
        </button>
      </div>

      {/* Main Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: Input & Verification */}
        <div className="space-y-6 flex flex-col">
          {/* Token Textarea */}
          <div className="flex flex-col h-[320px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/20 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Encoded Token (Paste JWT)
            </div>
            <textarea
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste your encoded JWT token here..."
              className="flex-grow p-4 font-mono text-sm border-0 focus:ring-0 bg-transparent text-slate-800 dark:text-slate-200 resize-none outline-none overflow-auto"
            />
          </div>

          {/* Secret Key Verification Input */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-4">
            <div className="space-y-2">
              <label htmlFor="jwt-secret" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                HMAC-SHA256 Secret Key (Optional)
              </label>
              <input
                id="jwt-secret"
                type="text"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Enter secret key to verify signature..."
                className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-slate-700 dark:text-slate-300 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Signature Status Alerts */}
            {sigStatus === 'unverified' && (
              <div className="flex items-center space-x-2.5 p-3.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">Signature Unverified (Secret not provided)</span>
              </div>
            )}
            {sigStatus === 'verified' && (
              <div className="flex items-center space-x-2.5 p-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 dark:border-emerald-900/50 rounded-lg text-emerald-800 dark:text-emerald-400">
                <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-semibold">Signature Verified Successfully!</span>
              </div>
            )}
            {sigStatus === 'invalid' && (
              <div className="flex items-center space-x-2.5 p-3.5 bg-red-50 dark:bg-red-950/20 border border-red-250 dark:border-red-900/50 rounded-lg text-red-800 dark:text-red-400">
                <ShieldAlert className="h-5 w-5 text-red-650 dark:text-red-400" />
                <span className="text-sm font-semibold">Invalid Signature. Secret key does not match.</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Decoded Monospace Outputs */}
        <div className="space-y-6">
          {/* Header Panel */}
          <div className="flex flex-col h-[230px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/20 text-sm font-semibold text-pink-600 dark:text-pink-400">
              Decoded Header (ALGORITHM & TOKEN TYPE)
            </div>
            <div className="flex-grow p-4 font-mono text-sm bg-slate-50/50 dark:bg-slate-950/10 overflow-auto">
              {headerError ? (
                <span className="text-red-500 dark:text-red-400">{headerError}</span>
              ) : decodedHeader ? (
                <pre className="text-pink-600 dark:text-pink-400 whitespace-pre-wrap">
                  {JSON.stringify(decodedHeader, null, 2)}
                </pre>
              ) : (
                <span className="text-slate-400 dark:text-slate-500 italic">Paste a token to inspect the header.</span>
              )}
            </div>
          </div>

          {/* Payload Panel */}
          <div className="flex flex-col h-[320px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/20 text-sm font-semibold text-blue-650 dark:text-blue-400">
              Decoded Payload (DATA CLAIMS)
            </div>
            <div className="flex-grow p-4 font-mono text-sm bg-slate-50/50 dark:bg-slate-950/10 overflow-auto">
              {payloadError ? (
                <span className="text-red-500 dark:text-red-400">{payloadError}</span>
              ) : decodedPayload ? (
                <pre className="text-blue-600 dark:text-blue-400 whitespace-pre-wrap">
                  {JSON.stringify(decodedPayload, null, 2)}
                </pre>
              ) : (
                <span className="text-slate-400 dark:text-slate-500 italic">Paste a token to inspect the payload.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
