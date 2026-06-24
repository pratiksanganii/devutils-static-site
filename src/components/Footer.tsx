import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>&copy; {new Date().getFullYear()} DevTools. Client-side & privacy-friendly.</p>
      </div>
    </footer>
  );
};
