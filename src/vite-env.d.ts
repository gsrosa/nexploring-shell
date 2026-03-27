/// <reference types="vite/client" />

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
