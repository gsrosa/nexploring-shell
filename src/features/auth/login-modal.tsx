import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@gsrosa/atlas-ui';

import { useAuthUiStore } from '@/features/auth/auth-ui-store';
import { LoginForm } from '@/features/auth/login-form';

export const LoginModal = () => {
  const open = useAuthUiStore((s) => s.loginOpen);
  const closeLogin = useAuthUiStore((s) => s.closeLogin);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) closeLogin();
      }}
    >
      <DialogContent className="max-w-[420px] border-neutral-200 bg-neutral-50 text-neutral-700">
        <DialogHeader>
          <DialogTitle className="text-neutral-800">
            Sign in to Atlas
          </DialogTitle>
          <DialogDescription className="text-neutral-500">
            Use the email and password for your Atlas account. Your session is
            stored securely in the browser.
          </DialogDescription>
        </DialogHeader>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
};
