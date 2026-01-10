import React from 'react';

const SkeletonLoader = ({ className = '', width, height }: { className?: string, width?: string | number, height?: string | number }) => (
    <div
      className={`relative overflow-hidden bg-neutral-200/80 dark:bg-neutral-800/80 rounded-md ${className} animate-pulse`}
      style={{ width, height }}
    >
        {/* Striped Background Animation */}
      <div 
        className="absolute inset-0 animate-shimmer"
        style={{
            backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)',
            backgroundSize: '40px 40px'
        }}
      ></div>
    </div>
);

export default SkeletonLoader;
