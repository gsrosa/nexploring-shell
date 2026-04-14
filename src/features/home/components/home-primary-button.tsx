import { Button, cn, type ButtonProps } from '@gsrosa/atlas-ui';
import { forwardRef } from 'react';

/** Primary CTA: white label on brand gradient (shell marketing overrides atlas-ui primary text color). */
export const HomePrimaryButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function HomePrimaryButton({ className, size = 'lg', ...props }, ref) {
    return (
      <Button
        ref={ref}
        variant="primary"
        size={size}
        className={cn(
          'border-0 font-bold !text-white shadow-[0_12px_40px_rgba(255,87,34,0.32)]',
          'bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600',
          'hover:!text-white hover:opacity-[0.96] active:opacity-90',
          className,
        )}
        {...props}
      />
    );
  },
);
