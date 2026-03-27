import type { ReactNode } from 'react';
import { useInView } from '../hooks/use-in-view';

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  role?: string;
}

export function FadeUp({ children, delay = 0, className = '', role }: FadeUpProps) {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      role={role}
      className={`fade-up${inView ? ' in-view' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
