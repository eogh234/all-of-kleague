/**
 * Application Configuration
 * Central configuration management
 */

interface AppConfig {
  app: {
    name: string;
    version: string;
    environment: 'development' | 'staging' | 'production';
  };
  api: {
    baseUrl: string;
    timeout: number;
    retryAttempts: number;
  };
  websocket: {
    url: string;
    reconnectDelay: number;
    maxReconnectAttempts: number;
  };
  features: {
    chat: boolean;
    notifications: boolean;
    analytics: boolean;
  };
}

const getEnvironment = (): AppConfig['app']['environment'] => {
  if (__DEV__) return 'development';
  // Can check for staging via environment variables or build configuration
  return 'production';
};

const configs: Record<AppConfig['app']['environment'], Omit<AppConfig, 'app'>> = {
  development: {
    api: {
      baseUrl: 'http://localhost:3000/api',
      timeout: 30000,
      retryAttempts: 3,
    },
    websocket: {
      url: 'ws://localhost:3000',
      reconnectDelay: 1000,
      maxReconnectAttempts: 5,
    },
    features: {
      chat: true,
      notifications: false,
      analytics: false,
    },
  },
  staging: {
    api: {
      baseUrl: 'https://staging-api.allofkleague.com/api',
      timeout: 30000,
      retryAttempts: 3,
    },
    websocket: {
      url: 'wss://staging-api.allofkleague.com',
      reconnectDelay: 2000,
      maxReconnectAttempts: 5,
    },
    features: {
      chat: true,
      notifications: true,
      analytics: false,
    },
  },
  production: {
    api: {
      baseUrl: 'https://api.allofkleague.com/api',
      timeout: 30000,
      retryAttempts: 3,
    },
    websocket: {
      url: 'wss://api.allofkleague.com',
      reconnectDelay: 3000,
      maxReconnectAttempts: 5,
    },
    features: {
      chat: true,
      notifications: true,
      analytics: true,
    },
  },
};

const environment = getEnvironment();

export const appConfig: AppConfig = {
  app: {
    name: 'All of K League',
    version: '1.0.0',
    environment,
  },
  ...configs[environment],
};

export default appConfig;
