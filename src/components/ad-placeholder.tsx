
import React from 'react';
import { cn } from '@/lib/utils';

interface AdPlaceholderProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  label?: string;
  variant?: 'banner' | 'leaderboard' | 'small' | 'inline';
}

export function AdPlaceholder({ className, width, height, label = "Advertisement", variant }: AdPlaceholderProps) {
  const dimensions = {
    banner: { width: '100%', height: '90px' },
    leaderboard: { width: '100%', height: '90px' },
    small: { width: 'auto', height: '60px' },
    inline: { width: '300px', height: '250px' },
  };

  const style: React.CSSProperties = {
    width: width ?? (variant ? dimensions[variant].width : '100%'),
    height: height ?? (variant ? dimensions[variant].height : '100px'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px dashed hsl(var(--border))',
    backgroundColor: 'hsl(var(--muted)/0.5)',
    color: 'hsl(var(--muted-foreground))',
    fontSize: '0.875rem',
    textAlign: 'center',
    borderRadius: 'var(--radius)',
    margin: '1rem 0', // Default margin
  };

  if (variant === 'small') {
    style.padding = '0 0.5rem';
    style.margin = '0'; 
  }
   if (variant === 'inline') {
    style.margin = '1rem auto'; 
  }


  return (
    <div style={style} className={cn("ad-placeholder", className)}>
      {label}
    </div>
  );
}
