const REMOTE_DEFAULTS = {
  searchApp: 'http://localhost:3001/assets/remoteEntry.js',
  aiAssistant: 'http://localhost:3002/assets/remoteEntry.js',
  userApp: 'http://localhost:3003/assets/remoteEntry.js',
} as const;

export function buildRemotes(envVars: Record<string, string> = {}) {
  return {
    searchApp:
      envVars.VITE_REMOTE_SEARCH_APP_URL ?? REMOTE_DEFAULTS.searchApp,
    aiAssistant:
      envVars.VITE_REMOTE_AI_ASSISTANT_URL ?? REMOTE_DEFAULTS.aiAssistant,
    userApp: envVars.VITE_REMOTE_USER_APP_URL ?? REMOTE_DEFAULTS.userApp,
  };
}
