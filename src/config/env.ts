interface EnvConfig {
  MODE: string;
  DEV: boolean;
  PROD: boolean;
  BASE_URL: string;
  API_URL: string;
  REMOTE_SEARCH_APP_URL: string;
  REMOTE_AI_ASSISTANT_URL: string;
  REMOTE_USER_APP_URL: string;
}

function getEnvVar(key: string, fallback: string): string {
  return (import.meta.env[key] as string | undefined) ?? fallback;
}

export const env: EnvConfig = {
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
  BASE_URL: import.meta.env.BASE_URL,
  API_URL: getEnvVar('VITE_API_URL', 'http://localhost:4000'),
  REMOTE_SEARCH_APP_URL: getEnvVar(
    'VITE_REMOTE_SEARCH_APP_URL',
    'http://localhost:3001/assets/remoteEntry.js',
  ),
  REMOTE_AI_ASSISTANT_URL: getEnvVar(
    'VITE_REMOTE_AI_ASSISTANT_URL',
    'http://localhost:3002/assets/remoteEntry.js',
  ),
  REMOTE_USER_APP_URL: getEnvVar(
    'VITE_REMOTE_USER_APP_URL',
    'http://localhost:3003/assets/remoteEntry.js',
  ),
};
