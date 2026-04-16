import type { ReactNode } from 'react';

import { cn } from '@gsrosa/atlas-ui';

import { useInView } from '../hooks/use-in-view';

type FadeUpProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  role?: string;
};

export const FadeUp = ({ children, delay = 0, className, role }: FadeUpProps) => {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      role={role}
      className={cn(
        'opacity-0 translate-y-7 transition-all duration-[550ms] ease-out',
        inView && 'opacity-100 translate-y-0',
        className,
      )}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};
