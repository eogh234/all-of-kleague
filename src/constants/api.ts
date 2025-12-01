/**
 * API Configuration Constants
 * Base URLs and endpoints for the KLeague API
 */

// Environment-based API URLs
const API_BASE_URLS = {
  development: 'http://localhost:3000/api',
  staging: 'https://staging-api.allofkleague.com/api',
  production: 'https://api.allofkleague.com/api',
};

// Get current environment (defaults to development)
const getEnvironment = (): keyof typeof API_BASE_URLS => {
  if (__DEV__) return 'development';
  // Can be extended to check for staging environment
  return 'production';
};

export const API_BASE_URL = API_BASE_URLS[getEnvironment()];

// API Endpoints
export const ENDPOINTS = {
  // Schedule endpoints
  MATCHES: '/matches',
  MATCH_DETAILS: (id: string) => `/matches/${id}`,
  SCHEDULE: '/schedule',
  
  // League endpoints
  LEAGUE_TABLE: '/league/table',
  KLEAGUE1_TABLE: '/league/kleague1/table',
  KLEAGUE2_TABLE: '/league/kleague2/table',
  
  // Team endpoints
  TEAMS: '/teams',
  TEAM_DETAILS: (id: string) => `/teams/${id}`,
  
  // Stadium endpoints
  STADIUMS: '/stadiums',
  STADIUM_DETAILS: (id: string) => `/stadiums/${id}`,
  
  // Player endpoints
  PLAYERS: '/players',
  PLAYER_DETAILS: (id: string) => `/players/${id}`,
  
  // Community/Chat endpoints
  CHAT_ROOMS: '/chat/rooms',
  CHAT_MESSAGES: (roomId: string) => `/chat/rooms/${roomId}/messages`,
  
  // News endpoints
  NEWS: '/news',
  NEWS_DETAILS: (id: string) => `/news/${id}`,
};

// WebSocket URL for real-time communication
export const WEBSOCKET_URL = __DEV__
  ? 'ws://localhost:3000'
  : 'wss://api.allofkleague.com';
