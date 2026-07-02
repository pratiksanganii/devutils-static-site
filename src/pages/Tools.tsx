import React from 'react';
import { Link } from 'react-router-dom';
import { Braces, Key, Binary, ArrowRight, Shield } from 'lucide-react';

export const Tools: React.FC = () => {
  const toolsList = [
    {
      id: "json-formatter",
      name: "JSON Formatter",
      description: "Format raw JSON string blocks, minify content sizes, and validate structures with descriptive inline syntax warnings.",
      icon: <Braces className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      href: "/tools/json-formatter"
    },
    {
      id: "uuid-generator",
      name: "UUID Generator",
      description: "Generate single or bulk v4 cryptographically secure UUID arrays with config counts (1, 5, 10) and one-click copying.",
      icon: <Key className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      href: "/tools/uuid-generator"
    },
    {
      id: "base64",
      name: "Base64 Encoder/Decoder",
      description: "Secure client-side text encoder and decoder supporting input clearing, instant processing, and quick copying.",
      icon: <Binary className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      href: "/tools/base64"
    },
    {
      id: "jwt",
      name: "JWT Debugger",
      description: "Decode and inspect JSON Web Token header/payload, and verify HS256 signatures with custom secret keys.",
      icon: <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      href: "/tools/jwt"
    }
  ];

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Developer Tools Hub</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Select any of the client-side developer utilities below. All computations are private, runs instantly, and logs no records.
        </p>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolsList.map((tool) => (
          <Link
            key={tool.id}
            to={tool.href}
            className="group flex flex-col justify-between p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200 hover:shadow-md text-left"
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
              <span
                className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                Open Tool
                <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
