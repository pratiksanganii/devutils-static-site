import React, { useState, useEffect } from 'react';
import { CopyButton } from '../components/CopyButton';
import { RotateCcw } from 'lucide-react';

export const UUIDGenerator: React.FC = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState<number>(5);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [braces, setBraces] = useState<boolean>(false);
  const [hyphens, setHyphens] = useState<boolean>(true);

  const generateUUIDs = (qty: number) => {
    const list: string[] = [];
    for (let i = 0; i < qty; i++) {
      let uuid: string = crypto.randomUUID();
      
      if (!hyphens) {
        uuid = uuid.replace(/-/g, '');
      }
      if (uppercase) {
        uuid = uuid.toUpperCase();
      }
      if (braces) {
        uuid = `{${uuid}}`;
      }
      
      list.push(uuid);
    }
    setUuids(list);
  };

  useEffect(() => {
    const list: string[] = [];
    for (let i = 0; i < 5; i++) {
      list.push(crypto.randomUUID());
    }
    setUuids(list);
  }, []);

  const handleGenerate = () => {
    generateUUIDs(count);
  };

  const getCopyAllValue = () => {
    return uuids.join('\n');
  };

  return (
    <div className="space-y-6">
      {/* Title section */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">UUID Generator</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Generate secure, random UUID v4 tokens locally in your browser.
        </p>
      </div>

      {/* Configurations panel */}
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Quantity Selector */}
          <div className="space-y-2">
            <label htmlFor="uuid-qty" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Quantity
            </label>
            <div className="flex items-center space-x-2">
              <input
                id="uuid-qty"
                type="number"
                min={1}
                max={100}
                value={count}
                onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
                className="w-20 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-1.5 text-slate-700 dark:text-slate-300 text-sm focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-800">
                {[1, 5, 10].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      setCount(num);
                      generateUUIDs(num);
                    }}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                      count === num
                        ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Toggle Uppercase */}
          <div className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/10 rounded-lg">
            <div className="flex flex-col">
              <label htmlFor="toggle-uppercase" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Uppercase</label>
              <span className="text-xs text-slate-400">e.g. AF4D...</span>
            </div>
            <input
              id="toggle-uppercase"
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="h-4.5 w-4.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
            />
          </div>

          {/* Toggle Hyphens */}
          <div className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/10 rounded-lg">
            <div className="flex flex-col">
              <label htmlFor="toggle-hyphens" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Hyphens</label>
              <span className="text-xs text-slate-400">Include separators</span>
            </div>
            <input
              id="toggle-hyphens"
              type="checkbox"
              checked={hyphens}
              onChange={(e) => setHyphens(e.target.checked)}
              className="h-4.5 w-4.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
            />
          </div>

          {/* Toggle Braces */}
          <div className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/10 rounded-lg">
            <div className="flex flex-col">
              <label htmlFor="toggle-braces" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Braces</label>
              <span className="text-xs text-slate-400">Wrap with {"{}"}</span>
            </div>
            <input
              id="toggle-braces"
              type="checkbox"
              checked={braces}
              onChange={(e) => setBraces(e.target.checked)}
              className="h-4.5 w-4.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
            />
          </div>
        </div>

        {/* Generate Action Button */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={handleGenerate}
            className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-semibold rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Generate UUIDs
          </button>
        </div>
      </div>

      {/* Results Display */}
      {uuids.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
          {/* Output Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/20">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Generated Tokens ({uuids.length})
            </h3>
            <CopyButton value={getCopyAllValue()} />
          </div>

          {/* Tokens list */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[400px] overflow-auto">
            {uuids.map((uuid, idx) => (
              <div key={idx} className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-950/20 transition-colors">
                <span className="font-mono text-sm text-slate-800 dark:text-slate-200 select-all">
                  {uuid}
                </span>
                <CopyButton value={uuid} className="bg-transparent border-0 hover:bg-slate-100 dark:hover:bg-slate-800 py-1" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
