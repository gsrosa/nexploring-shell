import { create } from 'zustand';

type AuthUiState = {
  loginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  signUpOpen: boolean;
  openSignUp: () => void;
  closeSignUp: () => void;
};

export const useAuthUiStore = create<AuthUiState>((set) => ({
  loginOpen: false,
  openLogin: () => set({ loginOpen: true, signUpOpen: false }),
  closeLogin: () => set({ loginOpen: false }),
  signUpOpen: false,
  openSignUp: () => set({ signUpOpen: true, loginOpen: false }),
  closeSignUp: () => set({ signUpOpen: false }),
}));

/** Works across microfrontends: shell listens on `nexploring:request-login`. */
export const requestLogin = (): void => {
  window.dispatchEvent(new CustomEvent('nexploring:request-login'));
};
