import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// ── Mocks ──────────────────────────────────────────────────────────────────

const mockChangeLanguage = vi.fn().mockResolvedValue(undefined);
let currentLang = 'en-US';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      get language() {
        return currentLang;
      },
      changeLanguage: mockChangeLanguage,
    },
  }),
}));

vi.mock('@gsrosa/nexploring-ui', async (importOriginal) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const actual = await importOriginal<typeof import('@gsrosa/nexploring-ui')>();
  return {
    ...actual,
    cn: (...args: unknown[]) => args.filter(Boolean).join(' '),
  };
});

const mockMutate = vi.fn();
vi.mock('@/trpc/client', () => ({
  useTrpc: () => ({
    users: {
      updateMe: {
        mutationOptions: () => ({
          mutationKey: ['mock', 'users', 'updateMe'],
          mutationFn: async () => ({}),
        }),
      },
    },
  }),
}));

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-query')>();
  return {
    ...actual,
    useMutation: () => ({
      mutate: mockMutate,
      isPending: false,
      isError: false,
      error: null,
    }),
  };
});

vi.mock('@/features/auth/use-session', () => ({
  useSession: () => ({ isAuthenticated: false }),
}));

vi.mock('@/lib/i18n', () => ({
  SUPPORTED: ['en-US', 'pt-BR', 'es-ES'],
  persistLocale: vi.fn(),
  getPersistedLocale: vi.fn().mockReturnValue('en-US'),
  default: {},
}));

import { LocaleSwitcher } from '../locale-switcher';

// ── Tests ──────────────────────────────────────────────────────────────────

describe('LocaleSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    currentLang = 'en-US';
  });

  it('renders EN, PT, ES buttons', () => {
    render(<LocaleSwitcher />);
    expect(
      screen.getByRole('button', { name: /switch to en/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /switch to pt/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /switch to es/i }),
    ).toBeInTheDocument();
  });

  it('marks current locale as pressed', () => {
    currentLang = 'en-US';
    render(<LocaleSwitcher />);
    expect(
      screen.getByRole('button', { name: /switch to en/i }),
    ).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.getByRole('button', { name: /switch to pt/i }),
    ).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls i18n.changeLanguage and persists locale when PT is clicked', async () => {
    const user = userEvent.setup();
    currentLang = 'en-US';
    render(<LocaleSwitcher />);

    await user.click(screen.getByRole('button', { name: /switch to pt/i }));

    expect(mockChangeLanguage).toHaveBeenCalledWith('pt-BR');
  });

  it('dispatches nexploring:locale-changed with the selected locale', async () => {
    const user = userEvent.setup();
    currentLang = 'en-US';
    const dispatched: CustomEvent[] = [];
    window.addEventListener('nexploring:locale-changed', (e) =>
      dispatched.push(e as CustomEvent),
    );
    render(<LocaleSwitcher />);

    await user.click(screen.getByRole('button', { name: /switch to es/i }));

    expect(dispatched).toHaveLength(1);
    expect(dispatched[0].detail).toEqual({ locale: 'es-ES' });
  });

  it('does not call changeLanguage when the current locale is clicked again', async () => {
    const user = userEvent.setup();
    currentLang = 'pt-BR';
    render(<LocaleSwitcher />);

    await user.click(screen.getByRole('button', { name: /switch to pt/i }));

    expect(mockChangeLanguage).not.toHaveBeenCalled();
  });
});
