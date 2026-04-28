import { beforeEach, describe, expect, it, vi } from 'vitest';

// ── Mocks ──────────────────────────────────────────────────────────────────

const mockInit = vi.fn().mockResolvedValue(undefined);
const mockUse = vi.fn();

const mockI18n = {
  use: mockUse,
  init: mockInit,
  language: 'en-US',
};

mockUse.mockReturnValue(mockI18n);

vi.mock('i18next', () => ({ default: mockI18n }));
vi.mock('react-i18next', () => ({ initReactI18next: {} }));

// ── Tests ──────────────────────────────────────────────────────────────────

describe('i18n bootstrap (nexploring-shell)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    mockUse.mockReturnValue(mockI18n);
    mockInit.mockResolvedValue(undefined);
  });

  it('always initialises with en-US so SSR and client first-render match', async () => {
    await import('@/lib/i18n');

    expect(mockInit).toHaveBeenCalledWith(
      expect.objectContaining({ lng: 'en-US', fallbackLng: 'en-US' }),
    );
  });

  it('bundles all three locales in resources', async () => {
    await import('@/lib/i18n');

    const call = mockInit.mock.calls[0][0] as { resources: Record<string, unknown> };
    expect(Object.keys(call.resources)).toEqual(
      expect.arrayContaining(['en-US', 'pt-BR', 'es-ES']),
    );
  });
});
