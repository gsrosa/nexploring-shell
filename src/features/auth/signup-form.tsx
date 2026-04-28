'use client';

import React from 'react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@gsrosa/nexploring-ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isTRPCClientError } from '@trpc/client';
import { useTranslation } from 'react-i18next';

import { useAuthUiStore } from '@/features/auth/auth-ui-store';

import { useTrpc } from '@/trpc/client';

type Step = 'account' | 'profile';

type AccountFields = {
  email: string;
  password: string;
  confirmPassword: string;
};

type ProfileFields = {
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say' | '';
  country: string;
  phone: string;
};

export const SignUpForm = () => {
  const { t } = useTranslation('common');
  const closeSignUp = useAuthUiStore((s) => s.closeSignUp);
  const trpc = useTrpc();
  const queryClient = useQueryClient();

  const [step, setStep] = React.useState<Step>('account');
  const [account, setAccount] = React.useState<AccountFields>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [profile, setProfile] = React.useState<ProfileFields>({
    firstName: '',
    lastName: '',
    gender: '',
    country: '',
    phone: '',
  });
  const [accountError, setAccountError] = React.useState<string | null>(null);

  const signUp = useMutation(
    trpc.auth.signUp.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.users.me.queryFilter());
        closeSignUp();
      },
    }),
  );

  const errorMessage =
    signUp.isError && isTRPCClientError(signUp.error)
      ? signUp.error.message
      : signUp.isError
        ? t('auth.signUpFailed')
        : null;

  const handleAccountNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (account.password.length < 8) {
      setAccountError(t('auth.passwordTooShort'));
      return;
    }
    if (account.password !== account.confirmPassword) {
      setAccountError(t('auth.passwordsMismatch'));
      return;
    }
    setAccountError(null);
    setStep('profile');
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (account.password.length < 8) {
      setStep('account');
      setAccountError(t('auth.passwordTooShort'));
      return;
    }
    signUp.mutate({
      email: account.email.trim(),
      password: account.password,
      firstName: profile.firstName.trim(),
      lastName: profile.lastName.trim(),
      gender: profile.gender as 'male' | 'female' | 'other' | 'prefer_not_to_say',
      country: profile.country,
      phone: profile.phone.trim() || undefined,
    });
  };

  if (step === 'account') {
    return (
      <form onSubmit={handleAccountNext} className="flex flex-col gap-4">
        {accountError ? (
          <Alert variant="danger">
            <AlertTitle>{t('auth.couldNotSignUp')}</AlertTitle>
            <AlertDescription>{accountError}</AlertDescription>
          </Alert>
        ) : null}

        <div className="flex flex-col gap-2">
          <Label htmlFor="nexploring-signup-email">{t('auth.emailLabel')}</Label>
          <Input
            id="nexploring-signup-email"
            name="email"
            type="email"
            autoComplete="email"
            value={account.email}
            onChange={(e) => setAccount((p) => ({ ...p, email: e.target.value }))}
            required
            placeholder="you@example.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="nexploring-signup-password">{t('auth.passwordLabel')}</Label>
          <Input
            id="nexploring-signup-password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={account.password}
            onChange={(e) => setAccount((p) => ({ ...p, password: e.target.value }))}
            required
            minLength={8}
            maxLength={128}
            placeholder="••••••••••••"
          />
          <p className="text-xs text-neutral-500">{t('auth.passwordHint')}</p>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="nexploring-signup-confirm">{t('auth.confirmPasswordLabel')}</Label>
          <Input
            id="nexploring-signup-confirm"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={account.confirmPassword}
            onChange={(e) =>
              setAccount((p) => ({ ...p, confirmPassword: e.target.value }))
            }
            required
            minLength={8}
            maxLength={128}
            placeholder="••••••••••••"
          />
        </div>

        <Button type="submit" variant="primary" className="w-full">
          {t('action.continue')}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
      {errorMessage ? (
        <Alert variant="danger">
          <AlertTitle>{t('auth.couldNotSignUp')}</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      ) : null}

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="nexploring-signup-first">{t('auth.firstNameLabel')}</Label>
          <Input
            id="nexploring-signup-first"
            name="firstName"
            type="text"
            autoComplete="given-name"
            value={profile.firstName}
            onChange={(e) => setProfile((p) => ({ ...p, firstName: e.target.value }))}
            required
            placeholder={t('auth.firstNamePlaceholder')}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="nexploring-signup-last">{t('auth.lastNameLabel')}</Label>
          <Input
            id="nexploring-signup-last"
            name="lastName"
            type="text"
            autoComplete="family-name"
            value={profile.lastName}
            onChange={(e) => setProfile((p) => ({ ...p, lastName: e.target.value }))}
            required
            placeholder={t('auth.lastNamePlaceholder')}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="nexploring-signup-gender">{t('auth.genderLabel')}</Label>
        <Select
          value={profile.gender}
          onValueChange={(v) =>
            setProfile((p) => ({
              ...p,
              gender: v as ProfileFields['gender'],
            }))
          }
          required
        >
          <SelectTrigger id="nexploring-signup-gender">
            <SelectValue placeholder={t('auth.genderPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">{t('auth.gender.male')}</SelectItem>
            <SelectItem value="female">{t('auth.gender.female')}</SelectItem>
            <SelectItem value="other">{t('auth.gender.other')}</SelectItem>
            <SelectItem value="prefer_not_to_say">
              {t('auth.gender.preferNotToSay')}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="nexploring-signup-country">{t('auth.countryLabel')}</Label>
        <Input
          id="nexploring-signup-country"
          name="country"
          type="text"
          maxLength={2}
          value={profile.country}
          onChange={(e) =>
            setProfile((p) => ({ ...p, country: e.target.value.toUpperCase().slice(0, 2) }))
          }
          required
          placeholder="US"
          className="uppercase"
        />
        <p className="text-xs text-neutral-500">{t('auth.countryHint')}</p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="nexploring-signup-phone">
          {t('auth.phoneLabel')}{' '}
          <span className="text-neutral-500">({t('auth.optional')})</span>
        </Label>
        <Input
          id="nexploring-signup-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={profile.phone}
          onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
          placeholder="+1 555 000 0000"
        />
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="ghost"
          className="flex-1"
          onClick={() => setStep('account')}
          disabled={signUp.isPending}
        >
          {t('action.back')}
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="flex-1"
          disabled={signUp.isPending || !profile.gender}
        >
          {signUp.isPending ? t('auth.creatingAccount') : t('auth.createAccount')}
        </Button>
      </div>

      <p className="text-center text-xs text-neutral-500">{t('auth.signUpAgreement')}</p>
    </form>
  );
};
