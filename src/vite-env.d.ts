/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_REMOTE_SEARCH_APP_URL?: string;
  readonly VITE_REMOTE_AI_ASSISTANT_URL?: string;
  readonly VITE_REMOTE_USER_APP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '@gsrosa/atlas-ui/styles';

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
