'use client';

import React from 'react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Input,
  Label,
} from '@gsrosa/nexploring-ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isTRPCClientError } from '@trpc/client';
import { useTranslation } from 'react-i18next';

import { useAuthUiStore } from '@/features/auth/auth-ui-store';

import { useTrpc } from '@/trpc/client';

export const LoginForm = () => {
  const { t } = useTranslation('common');
  const closeLogin = useAuthUiStore((s) => s.closeLogin);
  const trpc = useTrpc();
  const queryClient = useQueryClient();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const signIn = useMutation(
    trpc.auth.signIn.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.users.me.queryFilter());
        closeLogin();
        setPassword('');
      },
    }),
  );

  const errorMessage =
    signIn.isError && isTRPCClientError(signIn.error)
      ? signIn.error.message
      : signIn.isError
        ? t('auth.signInFailed')
        : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn.mutate({ email: email.trim(), password });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {errorMessage ? (
        <Alert variant="danger">
          <AlertTitle>{t('auth.couldNotSignIn')}</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      ) : null}

      <div className="flex flex-col gap-2">
        <Label htmlFor="atlas-login-email">{t('auth.emailLabel')}</Label>
        <Input
          id="atlas-login-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          required
          placeholder="you@example.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="atlas-login-password">{t('auth.passwordLabel')}</Label>
        <Input
          id="atlas-login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          required
          placeholder="••••••••••••"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={signIn.isPending}
      >
        {signIn.isPending ? t('auth.signingIn') : t('nav.signIn')}
      </Button>
    </form>
  );
};
