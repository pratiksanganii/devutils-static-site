import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Shield, Zap, Code, Braces, Key, Binary } from 'lucide-react';

export const Home: React.FC = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      title: "Fast",
      description: "No server roundtrips. All operations run instantly in your browser."
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      title: "Privacy-Friendly",
      description: "Your data never leaves your machine. Processing happens strictly client-side."
    },
    {
      icon: <Cpu className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      title: "Client-Side",
      description: "Built with pure React + TypeScript and compiled to fully static assets."
    },
    {
      icon: <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      title: "Open Source",
      description: "Hosted transparently on GitHub, built for developers by developers."
    }
  ];

  const tools = [
    {
      id: "json-formatter",
      name: "JSON Formatter",
      description: "Format, minify, and validate raw JSON with clean syntax parsing.",
      icon: <Braces className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      href: "/tools/json-formatter"
    },
    {
      id: "uuid-generator",
      name: "UUID Generator",
      description: "Generate single or bulk cryptographically secure UUID v4 tokens.",
      icon: <Key className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      href: "/tools/uuid-generator"
    },
    {
      id: "base64",
      name: "Base64 Encoder/Decoder",
      description: "Quickly encode plain text to Base64 format or decode back to text.",
      icon: <Binary className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      href: "/tools/base64"
    }
  ];

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Simple Developer Utilities
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
          A collection of lightweight, high-performance developer tools built with React and compiled for fast, secure client-side execution.
        </p>
        <div className="flex justify-center">
          <Link
            to="/tools"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Browse Tools
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Why use DevTools?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
              <div className="inline-flex p-3 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools Preview Grid */}
      <section className="space-y-8">
        <div className="flex justify-between items-end border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Available Tools</h2>
          <Link to="/tools" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center">
            View all tools
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="group flex flex-col justify-between p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200 hover:shadow-md"
            >
              <div className="space-y-4">
                <div className="inline-flex p-3 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                  {tool.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  to={tool.href}
                  className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  Open Tool
                  <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
