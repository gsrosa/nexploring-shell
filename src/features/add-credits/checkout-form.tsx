'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { Button, cn, Input, Label } from '@gsrosa/nexploring-ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CheckCircle2Icon,
  CreditCardIcon,
  LockIcon,
  PlusIcon,
  QrCodeIcon,
  ShieldCheckIcon,
  Trash2Icon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useSession } from '@/features/auth/use-session';

import type { CreditBundle } from '@/shared/constants/credits';
import { ROUTES } from '@/shared/constants/shell-routes';
import { useTrpc } from '@/trpc/client';

type CardBrand = 'visa' | 'mastercard' | 'amex' | 'unknown';

const detectBrand = (num: string): CardBrand => {
  const clean = num.replace(/\s/g, '');
  if (/^4/.test(clean)) return 'visa';
  if (/^5[1-5]/.test(clean)) return 'mastercard';
  if (/^3[47]/.test(clean)) return 'amex';
  return 'unknown';
};

const formatCardNumber = (value: string): string => {
  const clean = value.replace(/\D/g, '').slice(0, 16);
  return clean.replace(/(.{4})/g, '$1 ').trim();
};

const formatExpiry = (value: string): string => {
  const clean = value.replace(/\D/g, '').slice(0, 4);
  if (clean.length >= 3) return `${clean.slice(0, 2)} / ${clean.slice(2)}`;
  return clean;
};

const formatPrice = (cents: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    cents / 100,
  );

const CardBrandBadge = ({ brand }: { brand: CardBrand }) => {
  if (brand === 'visa')
    return (
      <span className="rounded bg-white px-1.5 py-0.5 text-[10px] font-black italic tracking-widest text-blue-700">
        VISA
      </span>
    );
  if (brand === 'mastercard')
    return (
      <span className="flex items-center">
        <span className="size-4 rounded-full bg-red-500 opacity-90" />
        <span className="-ml-2 size-4 rounded-full bg-yellow-400 opacity-90" />
      </span>
    );
  if (brand === 'amex')
    return (
      <span className="rounded bg-blue-600 px-1.5 py-0.5 text-[9px] font-bold tracking-widest text-white">
        AMEX
      </span>
    );
  return (
    <CreditCardIcon className="size-4 text-neutral-500" strokeWidth={1.5} />
  );
};

// ─── Saved cards (mock — would come from payment processor) ───────────────

type SavedCard = {
  id: string;
  brand: CardBrand;
  last4: string;
  expiry: string;
  holder: string;
};

const MOCK_SAVED_CARDS: SavedCard[] = [
  {
    id: 'card_1',
    brand: 'visa',
    last4: '4242',
    expiry: '12/26',
    holder: 'Jane Doe',
  },
  {
    id: 'card_2',
    brand: 'mastercard',
    last4: '5555',
    expiry: '08/25',
    holder: 'Jane Doe',
  },
];

const SavedCardRow = ({
  card,
  selected,
  onSelect,
  onDelete,
}: {
  card: SavedCard;
  selected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}) => (
  <div
    className={cn(
      'flex w-full items-center gap-3 rounded-lg border px-4 py-3 transition-all',
      selected
        ? 'border-primary-500/50 bg-primary-500/8'
        : 'border-white/8 bg-neutral-900/40',
    )}
  >
    <button
      type="button"
      onClick={onSelect}
      className="flex min-w-0 flex-1 items-center gap-3 text-left focus-visible:outline-none"
    >
      <div className="w-10 shrink-0">
        <CardBrandBadge brand={card.brand} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-neutral-100">
          •••• {card.last4}
        </p>
        <p className="text-xs text-neutral-500">
          {card.holder} · {card.expiry}
        </p>
      </div>
      {selected && (
        <div className="size-2 shrink-0 rounded-full bg-primary-500" />
      )}
    </button>
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }}
      aria-label="Remove card"
      className="ml-1 shrink-0 rounded-md p-1.5 text-neutral-600 transition-colors hover:bg-danger-500/10 hover:text-danger-400"
    >
      <Trash2Icon className="size-3.5" strokeWidth={2} />
    </button>
  </div>
);

// ─── Payment method type selector ─────────────────────────────────────────

type PaymentType = 'credit' | 'debit' | 'pix';

const METHOD_LABELS: Record<PaymentType, string> = {
  credit: 'checkout.method.credit',
  debit: 'checkout.method.debit',
  pix: 'checkout.method.pix',
};

// ─── Order Summary ─────────────────────────────────────────────────────────

type OrderSummaryProps = {
  bundle: CreditBundle;
  className?: string;
};

export const OrderSummary = ({ bundle, className }: OrderSummaryProps) => {
  const { t } = useTranslation('payment');

  return (
    <div
      className={cn(
        'rounded-2xl border border-white/8 bg-neutral-800/60',
        className,
      )}
    >
      <div className="p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
            {t('checkout.orderSummary')}
          </p>
          <h3 className="mt-1.5 text-xl font-bold text-neutral-50">
            {t(`bundle.${bundle.id}.label`)}
          </h3>
          <p className="mt-0.5 text-sm text-neutral-400">
            {t(`bundle.${bundle.id}.description`)}
          </p>
        </div>

        <div className="my-5 border-t border-white/6" />

        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-400">
            {t('checkout.credits')}
          </span>
          <span className="font-semibold text-neutral-100">
            {bundle.credits} {t('bundle.creditsUnit')}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-neutral-400">
            {t('checkout.total')}
          </span>
          <span className="text-2xl font-bold tracking-tight text-neutral-50">
            {formatPrice(bundle.priceCents)}
          </span>
        </div>

        <div className="mt-5 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <ShieldCheckIcon
              className="size-3.5 shrink-0 text-success-500"
              strokeWidth={2}
            />
            {t('checkout.trust.noExpiry')}
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <ShieldCheckIcon
              className="size-3.5 shrink-0 text-success-500"
              strokeWidth={2}
            />
            {t('checkout.trust.noSubscription')}
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <LockIcon
              className="size-3.5 shrink-0 text-neutral-400"
              strokeWidth={2}
            />
            {t('checkout.trust.secure')}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Form section card ─────────────────────────────────────────────────────

const FormCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl border border-white/8 bg-neutral-800/40 p-5">
    <h3 className="mb-4 text-sm font-semibold text-neutral-200">{title}</h3>
    {children}
  </div>
);

// ─── Main checkout form ────────────────────────────────────────────────────

type Props = {
  bundle: CreditBundle;
  onBack: () => void;
};

type BillingForm = {
  fullName: string;
  email: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

type CardForm = {
  cardNumber: string;
  expiry: string;
  cvv: string;
  holderName: string;
};

export const CheckoutForm = ({ bundle, onBack }: Props) => {
  const { t } = useTranslation(['payment', 'common']);
  const router = useRouter();
  const { profile } = useSession();
  const trpc = useTrpc();
  const queryClient = useQueryClient();
  const [success, setSuccess] = React.useState(false);

  const addFunds = useMutation(
    trpc.credits.addFunds.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.users.me.queryFilter());
        setSuccess(true);
      },
    }),
  );

  const displayName = [profile?.first_name, profile?.last_name]
    .filter(Boolean)
    .join(' ');

  const [billing, setBilling] = React.useState<BillingForm>({
    fullName: displayName,
    email: profile?.email ?? '',
    street: '',
    number: '',
    complement: '',
    city: '',
    state: '',
    zip: '',
    country: profile?.country ?? '',
  });

  const [paymentType, setPaymentType] = React.useState<PaymentType>('credit');
  const [selectedSavedCard, setSelectedSavedCard] = React.useState<
    string | null
  >(null);
  const [addingNewCard, setAddingNewCard] = React.useState(
    MOCK_SAVED_CARDS.length === 0,
  );

  const [card, setCard] = React.useState<CardForm>({
    cardNumber: '',
    expiry: '',
    cvv: '',
    holderName: displayName,
  });

  const setBillingField =
    (key: keyof BillingForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setBilling((p) => ({ ...p, [key]: e.target.value }));

  const setCardField =
    (key: keyof CardForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setCard((p) => ({ ...p, [key]: e.target.value }));

  const handleCardNumber = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCard((p) => ({ ...p, cardNumber: formatCardNumber(e.target.value) }));

  const handleExpiry = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCard((p) => ({ ...p, expiry: formatExpiry(e.target.value) }));

  const brand = detectBrand(card.cardNumber);

  const billingValid =
    billing.fullName.trim() &&
    billing.email.trim() &&
    billing.street.trim() &&
    billing.number.trim() &&
    billing.city.trim() &&
    billing.zip.trim() &&
    billing.country.trim();

  const cardPaymentValid =
    selectedSavedCard ||
    (addingNewCard &&
      card.holderName.trim() &&
      card.cardNumber.replace(/\s/g, '').length >= 15 &&
      card.expiry.length >= 7 &&
      card.cvv.length >= 3);

  const isFormValid =
    billingValid && (paymentType === 'pix' ? true : cardPaymentValid);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addFunds.mutate({ amount: bundle.credits, reason: 'purchase' });
  };

  // ── Success ──────────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center gap-5 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-success-500/15">
          <CheckCircle2Icon
            className="size-8 text-success-400"
            strokeWidth={1.5}
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-neutral-50">
            {t('checkout.success.title')}
          </h2>
          <p className="mt-1 text-sm text-neutral-400">
            {t('checkout.success.body', { count: bundle.credits })}
          </p>
        </div>
        <Button
          type="button"
          variant="primary"
          className="mt-2"
          onClick={() => router.push(ROUTES.ASSISTANT)}
        >
          {t('checkout.success.cta')}
        </Button>
      </div>
    );
  }

  const errorMsg = addFunds.isError
    ? ((addFunds.error as unknown as { message?: string })?.message ??
      t('error.generic', { ns: 'common' }))
    : null;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* ── Billing information ──────────────────────────────────────────── */}
      <FormCard title={t('checkout.billingInfo')}>
        <div className="flex flex-col gap-3">
          {/* Name + email */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="co-name">{t('checkout.fullName')}</Label>
              <Input
                id="co-name"
                type="text"
                autoComplete="name"
                value={billing.fullName}
                onChange={setBillingField('fullName')}
                required
                placeholder="Jane Doe"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="co-email">{t('checkout.email')}</Label>
              <Input
                id="co-email"
                type="email"
                autoComplete="email"
                value={billing.email}
                onChange={setBillingField('email')}
                required
                placeholder="jane@example.com"
              />
            </div>
          </div>

          {/* Street + number */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 flex flex-col gap-1.5">
              <Label htmlFor="co-street">{t('checkout.street')}</Label>
              <Input
                id="co-street"
                type="text"
                autoComplete="address-line1"
                value={billing.street}
                onChange={setBillingField('street')}
                required
                placeholder="Main St"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="co-number">{t('checkout.number')}</Label>
              <Input
                id="co-number"
                type="text"
                value={billing.number}
                onChange={setBillingField('number')}
                required
                placeholder="42"
              />
            </div>
          </div>

          {/* Complement */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="co-complement">
              {t('checkout.complement')}{' '}
              <span className="text-neutral-500">
                ({t('checkout.optional')})
              </span>
            </Label>
            <Input
              id="co-complement"
              type="text"
              autoComplete="address-line2"
              value={billing.complement}
              onChange={setBillingField('complement')}
              placeholder="Apt 3B, Suite 100…"
            />
          </div>

          {/* City + state + zip */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1 flex flex-col gap-1.5">
              <Label htmlFor="co-city">{t('checkout.city')}</Label>
              <Input
                id="co-city"
                type="text"
                autoComplete="address-level2"
                value={billing.city}
                onChange={setBillingField('city')}
                required
                placeholder="New York"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="co-state">{t('checkout.state')}</Label>
              <Input
                id="co-state"
                type="text"
                autoComplete="address-level1"
                value={billing.state}
                onChange={setBillingField('state')}
                placeholder="NY"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="co-zip">{t('checkout.zip')}</Label>
              <Input
                id="co-zip"
                type="text"
                autoComplete="postal-code"
                value={billing.zip}
                onChange={setBillingField('zip')}
                required
                placeholder="10001"
              />
            </div>
          </div>

          {/* Country */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="co-country">{t('checkout.country')}</Label>
            <Input
              id="co-country"
              type="text"
              autoComplete="country"
              maxLength={2}
              value={billing.country}
              onChange={(e) =>
                setBilling((p) => ({
                  ...p,
                  country: e.target.value.toUpperCase().slice(0, 2),
                }))
              }
              required
              placeholder="US"
              className="uppercase"
            />
          </div>
        </div>
      </FormCard>

      {/* ── Payment method ───────────────────────────────────────────────── */}
      <FormCard title={t('checkout.paymentMethod')}>
        {/* Method type tabs */}
        <div className="mb-4 flex gap-1 rounded-lg bg-neutral-900/60 p-1">
          {(['credit', 'debit', 'pix'] as PaymentType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                setPaymentType(type);
                setSelectedSavedCard(null);
                setAddingNewCard(MOCK_SAVED_CARDS.length === 0);
              }}
              className={cn(
                'flex-1 rounded-md py-1.5 text-xs font-medium transition-all',
                paymentType === type
                  ? 'bg-neutral-700 text-neutral-100 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-300',
              )}
            >
              {t(METHOD_LABELS[type])}
            </button>
          ))}
        </div>

        {/* ── Credit / Debit card ────────────────────────────────────────── */}
        {(paymentType === 'credit' || paymentType === 'debit') && (
          <div className="flex flex-col gap-3">
            {/* Saved cards */}
            {MOCK_SAVED_CARDS.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-xs font-medium text-neutral-500">
                  {t('checkout.savedCards')}
                </p>
                {MOCK_SAVED_CARDS.map((sc) => (
                  <SavedCardRow
                    key={sc.id}
                    card={sc}
                    selected={selectedSavedCard === sc.id && !addingNewCard}
                    onSelect={() => {
                      setSelectedSavedCard(sc.id);
                      setAddingNewCard(false);
                    }}
                    onDelete={() => {}}
                  />
                ))}
              </div>
            )}

            {/* Add new card toggle */}
            {MOCK_SAVED_CARDS.length > 0 && !addingNewCard && (
              <button
                type="button"
                onClick={() => {
                  setAddingNewCard(true);
                  setSelectedSavedCard(null);
                }}
                className="flex items-center gap-2 text-xs font-medium text-primary-400 transition-colors hover:text-primary-300"
              >
                <PlusIcon className="size-3.5" strokeWidth={2.5} />
                {t('checkout.addNewCard')}
              </button>
            )}

            {/* New card form */}
            {addingNewCard && (
              <div className="flex flex-col gap-3">
                {MOCK_SAVED_CARDS.length > 0 && (
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-neutral-400">
                      {t('checkout.newCard')}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setAddingNewCard(false);
                        setSelectedSavedCard(MOCK_SAVED_CARDS[0]?.id ?? null);
                      }}
                      className="text-xs text-neutral-500 hover:text-neutral-300"
                    >
                      {t('checkout.useSaved')}
                    </button>
                  </div>
                )}

                {/* Holder name */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="co-holder">{t('checkout.cardHolder')}</Label>
                  <Input
                    id="co-holder"
                    type="text"
                    autoComplete="cc-name"
                    value={card.holderName}
                    onChange={setCardField('holderName')}
                    required={addingNewCard}
                    placeholder="Jane Doe"
                  />
                </div>

                {/* Card number */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="co-card">{t('checkout.cardNumber')}</Label>
                  <div className="relative">
                    <Input
                      id="co-card"
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      value={card.cardNumber}
                      onChange={handleCardNumber}
                      required={addingNewCard}
                      placeholder="0000 0000 0000 0000"
                      className="pr-12"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <CardBrandBadge brand={brand} />
                    </div>
                  </div>
                </div>

                {/* Expiry + CVV */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="co-expiry">{t('checkout.expiry')}</Label>
                    <Input
                      id="co-expiry"
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      value={card.expiry}
                      onChange={handleExpiry}
                      required={addingNewCard}
                      placeholder="MM / YY"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="co-cvv">{t('checkout.cvv')}</Label>
                    <div className="relative">
                      <Input
                        id="co-cvv"
                        type="password"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        maxLength={4}
                        value={card.cvv}
                        onChange={(e) =>
                          setCard((p) => ({
                            ...p,
                            cvv: e.target.value.replace(/\D/g, '').slice(0, 4),
                          }))
                        }
                        required={addingNewCard}
                        placeholder="•••"
                      />
                      <LockIcon className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-neutral-500" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Pix ───────────────────────────────────────────────────────── */}
        {paymentType === 'pix' && (
          <div className="flex flex-col items-center gap-4 py-2">
            <div className="flex size-32 items-center justify-center rounded-xl border border-white/10 bg-neutral-900/60">
              <QrCodeIcon
                className="size-16 text-neutral-500"
                strokeWidth={1}
              />
            </div>
            <div className="w-full text-center">
              <p className="text-sm text-neutral-300">
                {t('checkout.pix.instruction')}
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                {t('checkout.pix.expiry')}
              </p>
            </div>
            <div className="w-full rounded-lg border border-white/8 bg-neutral-900/40 px-4 py-2.5">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
                {t('checkout.pix.keyLabel')}
              </p>
              <div className="flex items-center justify-between gap-3">
                <code className="truncate text-xs font-mono text-neutral-300">
                  nexploring@pagamentos.com.br
                </code>
                <button
                  type="button"
                  className="shrink-0 text-xs font-medium text-primary-400 hover:text-primary-300 transition-colors"
                  onClick={() =>
                    void navigator.clipboard.writeText(
                      'nexploring@pagamentos.com.br',
                    )
                  }
                >
                  {t('checkout.pix.copy')}
                </button>
              </div>
            </div>
            <p className="text-center text-xs text-neutral-500">
              {t('checkout.pix.note')}
            </p>
          </div>
        )}
      </FormCard>

      {/* Error */}
      {errorMsg && (
        <p className="rounded-lg border border-danger-500/30 bg-danger-500/10 px-4 py-3 text-sm text-danger-400">
          {errorMsg}
        </p>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-2 pt-1">
        <Button
          type="submit"
          variant="primary"
          className="w-full gap-2 font-semibold"
          disabled={!isFormValid || addFunds.isPending}
        >
          <LockIcon className="size-3.5" />
          {addFunds.isPending
            ? t('checkout.processing')
            : t('checkout.pay', { price: formatPrice(bundle.priceCents) })}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="w-full"
          onClick={onBack}
          disabled={addFunds.isPending}
        >
          {t('action.back', { ns: 'common' })}
        </Button>
      </div>
    </form>
  );
};
