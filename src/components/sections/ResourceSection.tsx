import React from 'react';

interface Resource {
  resource: string;
  description?: string;
}

interface ResourceSectionProps {
  resources: Resource[];
  className?: string;
}

const ResourceSection: React.FC<ResourceSectionProps> = ({ resources, className = '' }) => {
  if (!resources || resources.length === 0) {
    return null;
  }

  return (
    <div className={`mb-8 ${className}`}>
      <div className="space-y-2">
        {resources.map((res, index) => (
          <a
            key={index}
            href={res.resource}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-6 py-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-800 font-medium break-all">
                {res.description || 'スライド概要'}
              </span>
              <svg 
                className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0 ml-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                />
              </svg>
            </div>
            <span className="text-xs text-gray-500 mt-1 block break-all">
              {res.resource}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ResourceSection;