/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_REMOTE_SEARCH_APP_URL?: string;
  readonly VITE_REMOTE_AI_ASSISTANT_URL?: string;
  readonly VITE_REMOTE_USER_APP_URL?: string;
  readonly VITE_REMOTE_PAYMENT_APP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '@gsrosa/atlas-ui/styles';
declare module '@gsrosa/atlas-ui/tokens';
declare module '@gsrosa/atlas-ui/theme';

declare module 'searchApp/App' {
  import type { ComponentType } from 'react';
  const Component: ComponentType;
  export default Component;
}

declare module 'searchApp/SearchWidget' {
  import type { ComponentType } from 'react';
  const Component: ComponentType;
  export default Component;
}

declare module 'aiAssistant/App' {
  import type { ComponentType } from 'react';
  const Component: ComponentType;
  export default Component;
}

declare module 'aiAssistant/ChatWidget' {
  import type { ComponentType } from 'react';
  const Component: ComponentType;
  export default Component;
}

declare module 'userApp/App' {
  import type { ComponentType } from 'react';
  const Component: ComponentType;
  export default Component;
}

declare module 'aiAssistant/Skeleton' {
  import type { ComponentType } from 'react';
  const Component: ComponentType;
  export default Component;
}

declare module 'aiAssistant/MyTripsApp' {
  import type { ComponentType } from 'react';
  const Component: ComponentType;
  export default Component;
}

declare module 'aiAssistant/MyTripsSkeleton' {
  import type { ComponentType } from 'react';
  const Component: ComponentType;
  export default Component;
}

declare module 'userApp/Skeleton' {
  import type { ComponentType } from 'react';
  const Component: ComponentType;
  export default Component;
}

declare module 'paymentApp/App' {
  import type { ComponentType } from 'react';
  const Component: ComponentType;
  export default Component;
}

declare module 'paymentApp/Skeleton' {
  import type { ComponentType } from 'react';
  const Component: ComponentType;
  export default Component;
}

declare module 'paymentApp/BillingPage' {
  import type { ComponentType } from 'react';
  const Component: ComponentType;
  export default Component;
}

declare module 'userApp/ProfileLayout' {
  import type { ComponentType } from 'react';
  const Component: ComponentType;
  export default Component;
}

declare module 'userApp/ProfileAboutPage' {
  import type { ComponentType } from 'react';
  const Component: ComponentType;
  export default Component;
}

declare module 'userApp/ProfilePasswordPage' {
  import type { ComponentType } from 'react';
  const Component: ComponentType;
  export default Component;
}

declare module 'userApp/ProfilePreferencesPage' {
  import type { ComponentType } from 'react';
  const Component: ComponentType;
  export default Component;
}
