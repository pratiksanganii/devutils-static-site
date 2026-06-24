import React, { useState } from 'react';
import { encodeBase64, decodeBase64 } from '../utils/base64';
import { CopyButton } from '../components/CopyButton';
import { Trash2, ShieldAlert } from 'lucide-react';

export const Base64Tool: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleEncode = () => {
    setError(null);
    const result = encodeBase64(input);
    if (result.success) {
      setOutput(result.data);
    } else {
      setError(result.error || 'Failed to encode text.');
    }
  };

  const handleDecode = () => {
    setError(null);
    const result = decodeBase64(input);
    if (result.success) {
      setOutput(result.data);
    } else {
      setError(result.error || 'Failed to decode Base64.');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Title section */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Base64 Encoder/Decoder</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Encode plain text to Base64 format or decode Base64 strings back safely.
        </p>
      </div>

      {/* Control panel */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
        <button
          onClick={handleEncode}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Encode
        </button>
        <button
          onClick={handleDecode}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
        >
          Decode
        </button>
        <button
          onClick={handleClear}
          className="inline-flex items-center px-4 py-2 border border-slate-200 dark:border-slate-700 text-sm font-semibold rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
        >
          <Trash2 className="h-4 w-4 mr-1.5" />
          Clear
        </button>
      </div>

      {/* Editor panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="flex flex-col h-[400px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/20">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Input Text</span>
            <button
              onClick={() => {
                setInput("Hello developer! 🚀 Unicode check: 🍩,日本語,中文,Español");
              }}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              Load Sample
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste your text/Base64 string here..."
            className="flex-grow p-4 font-mono text-sm border-0 focus:ring-0 bg-transparent text-slate-800 dark:text-slate-200 resize-none outline-none overflow-auto"
          />
        </div>

        {/* Output Panel */}
        <div className="flex flex-col h-[400px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/20">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Output Result</span>
            {output && !error && <CopyButton value={output} />}
          </div>
          
          <div className="flex-grow p-4 font-mono text-sm bg-slate-50 dark:bg-slate-950/20 overflow-auto select-text">
            {error ? (
              <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/50 rounded-lg text-red-700 dark:text-red-400 space-y-2">
                <div className="font-bold flex items-center">
                  <ShieldAlert className="h-4 w-4 mr-1.5" />
                  <span>Decoding Error</span>
                </div>
                <p className="text-xs leading-relaxed font-mono whitespace-pre-wrap">{error}</p>
              </div>
            ) : output ? (
              <pre className="text-slate-800 dark:text-slate-200 whitespace-pre-wrap break-all">{output}</pre>
            ) : (
              <span className="text-slate-400 dark:text-slate-500 italic">No output yet. Click Encode or Decode to process.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
