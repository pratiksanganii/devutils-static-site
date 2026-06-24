import React from 'react';
import { Server, ShieldCheck, GitBranch, Terminal, Globe, User } from 'lucide-react';

export const About: React.FC = () => {
  const steps = [
    {
      icon: <Terminal className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      label: "Developer",
      desc: "Writes React + TS code locally"
    },
    {
      icon: <GitBranch className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      label: "GitHub",
      desc: "Triggers CI/CD on git push"
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      label: "GitHub Actions",
      desc: "Builds, lints, and syncs static dist"
    },
    {
      icon: <Server className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      label: "Amazon S3",
      desc: "Secure private static file host"
    },
    {
      icon: <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      label: "CloudFront (CDN)",
      desc: "Edge-caching delivery with HTTPS via ACM"
    },
    {
      icon: <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      label: "End User",
      desc: "Requests tools.yourdomain.com"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-4">
      {/* Page Header */}
      <section className="space-y-4">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">About DevTools</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          DevTools is a collection of client-side utility applications built to make daily development tasks simple, fast, and completely secure.
        </p>
      </section>

      {/* Why the Project Exists */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Why DevTools?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Many online developer utilities send your formatted JSON, base64 data, or tokens to third-party servers. 
            This poses severe security risks, especially when dealing with production configurations, API responses, or sensitive data.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <strong>DevTools processes everything in the browser.</strong> Your input content never leaves your browser, 
            providing instant performance and 100% data privacy.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Core Technology Stack</h2>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              <span><strong>React 19 + TypeScript:</strong> Modern component architectures with strict typing.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              <span><strong>Vite:</strong> Ultra-fast developer tooling and static code compilation.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              <span><strong>Tailwind CSS:</strong> Standard utility-first utility classes for clean custom interfaces.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              <span><strong>React Router & Lucide:</strong> High performance routing and iconography.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Deployment Diagram Section */}
      <section className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">AWS Infrastructure & CI/CD Pipeline</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Below is the lifecycle of code deployment, representing the serverless static AWS architecture.
          </p>
        </div>

        {/* Text Diagram Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, idx) => (
            <div key={idx} className="relative p-4 border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 rounded-lg flex items-start space-x-3">
              <div className="flex-shrink-0 p-2 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
                {step.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
                  <span className="text-xs text-slate-400 mr-1">0{idx + 1}.</span> {step.label}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Text Flow Diagram */}
        <div className="hidden lg:flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 p-4 rounded-lg bg-slate-50 dark:bg-slate-950/40 overflow-x-auto">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Dev</span>
          <span>&rarr;</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">GitHub</span>
          <span>&rarr;</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">GitHub Actions</span>
          <span>&rarr;</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">AWS S3</span>
          <span>&rarr;</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">CloudFront</span>
          <span>&rarr;</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">User</span>
        </div>
      </section>
    </div>
  );
};
