/**
 * Database Configuration
 * Configuration for local storage and remote database connections
 */

export interface DatabaseConfig {
  local: {
    storageKey: string;
    version: number;
  };
  remote: {
    provider: 'firebase' | 'supabase' | 'custom';
    options: Record<string, unknown>;
  };
  cache: {
    enabled: boolean;
    ttl: number; // Time to live in milliseconds
    maxSize: number; // Maximum cache size in bytes
  };
}

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
  USER_PREFERENCES: '@kleague/user_preferences',
  FAVORITE_TEAM: '@kleague/favorite_team',
  CACHED_MATCHES: '@kleague/cached_matches',
  CACHED_STANDINGS: '@kleague/cached_standings',
  AUTH_TOKEN: '@kleague/auth_token',
  ONBOARDING_COMPLETE: '@kleague/onboarding_complete',
} as const;

/**
 * Default database configuration
 */
export const databaseConfig: DatabaseConfig = {
  local: {
    storageKey: '@kleague',
    version: 1,
  },
  remote: {
    provider: 'firebase', // Can be changed based on backend choice
    options: {
      // Firebase configuration would go here
      // apiKey: process.env.FIREBASE_API_KEY,
      // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      // projectId: process.env.FIREBASE_PROJECT_ID,
      // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      // appId: process.env.FIREBASE_APP_ID,
    },
  },
  cache: {
    enabled: true,
    ttl: 5 * 60 * 1000, // 5 minutes
    maxSize: 10 * 1024 * 1024, // 10 MB
  },
};

/**
 * Supabase configuration template (alternative backend)
 */
export const supabaseConfigTemplate = {
  url: 'https://your-project.supabase.co',
  anonKey: 'your-anon-key',
};

export default databaseConfig;
