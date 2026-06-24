import React, { useState } from 'react';
import { formatJson, minifyJson } from '../utils/json';
import { CopyButton } from '../components/CopyButton';
import { Trash2, Settings2, Play } from 'lucide-react';

export const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [spaces, setSpaces] = useState(2);

  const handleFormat = () => {
    setError(null);
    const result = formatJson(input, spaces);
    if (result.success) {
      setOutput(result.data);
    } else {
      setError(result.error || 'Failed to parse JSON.');
    }
  };

  const handleMinify = () => {
    setError(null);
    const result = minifyJson(input);
    if (result.success) {
      setOutput(result.data);
    } else {
      setError(result.error || 'Failed to parse JSON.');
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
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">JSON Formatter</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Validate, format, and minify JSON data instantly.
        </p>
      </div>

      {/* Control panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleFormat}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Play className="h-4 w-4 mr-1.5" />
            Format
          </button>
          <button
            onClick={handleMinify}
            className="inline-flex items-center px-4 py-2 border border-slate-200 dark:border-slate-700 text-sm font-semibold rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Settings2 className="h-4 w-4 mr-1.5" />
            Minify
          </button>
          <button
            onClick={handleClear}
            className="inline-flex items-center px-4 py-2 border border-slate-200 dark:border-slate-700 text-sm font-semibold rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
          >
            <Trash2 className="h-4 w-4 mr-1.5" />
            Clear
          </button>
        </div>

        <div className="flex items-center space-x-3 text-sm">
          <label htmlFor="tab-size" className="text-slate-600 dark:text-slate-400 font-medium">
            Tab size:
          </label>
          <select
            id="tab-size"
            value={spaces}
            onChange={(e) => setSpaces(Number(e.target.value))}
            className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-1.5 text-slate-700 dark:text-slate-300"
          >
            <option value={2}>2 Spaces</option>
            <option value={4}>4 Spaces</option>
            <option value={8}>8 Spaces</option>
          </select>
        </div>
      </div>

      {/* Editor panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="flex flex-col h-[500px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/20">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Input Raw JSON</span>
            <button
              onClick={() => {
                setInput(JSON.stringify({ name: "DevTools", features: ["Fast", "Private", "Static"], version: 1.0, active: true }, null, 2));
              }}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              Load Sample
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON raw text here..."
            className="flex-grow p-4 font-mono text-sm border-0 focus:ring-0 bg-transparent text-slate-800 dark:text-slate-200 resize-none outline-none overflow-auto"
          />
        </div>

        {/* Output Panel */}
        <div className="flex flex-col h-[500px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/20">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Formatted Output</span>
            {output && !error && <CopyButton value={output} />}
          </div>
          
          <div className="flex-grow p-4 font-mono text-sm bg-slate-50 dark:bg-slate-950/20 overflow-auto select-text">
            {error ? (
              <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/50 rounded-lg text-red-700 dark:text-red-400 space-y-2">
                <div className="font-bold flex items-center">
                  <span>Validation Error</span>
                </div>
                <p className="text-xs leading-relaxed font-mono whitespace-pre-wrap">{error}</p>
              </div>
            ) : output ? (
              <pre className="text-slate-800 dark:text-slate-200 whitespace-pre">{output}</pre>
            ) : (
              <span className="text-slate-400 dark:text-slate-500 italic">No output yet. Click Format or Minify to process.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
