/**
 * Match Service
 * Handles all match-related API operations
 */

import { apiClient } from './api';
import { ENDPOINTS } from '../constants';
import type { Match, LeagueTable, LeagueType } from '../models';

/**
 * Fetch all upcoming matches
 */
export const getMatches = async (league?: LeagueType): Promise<Match[]> => {
  const params = league ? { league } : undefined;
  const response = await apiClient.get<Match[]>(ENDPOINTS.MATCHES, params);
  return response.data;
};

/**
 * Fetch match details by ID
 */
export const getMatchDetails = async (matchId: string): Promise<Match> => {
  const response = await apiClient.get<Match>(ENDPOINTS.MATCH_DETAILS(matchId));
  return response.data;
};

/**
 * Fetch matches by date range
 */
export const getSchedule = async (
  startDate: string,
  endDate: string,
  league?: LeagueType
): Promise<Match[]> => {
  const params: Record<string, string> = {
    startDate,
    endDate,
    ...(league && { league }),
  };
  const response = await apiClient.get<Match[]>(ENDPOINTS.SCHEDULE, params);
  return response.data;
};

/**
 * Fetch league table/standings
 */
export const getLeagueTable = async (league: LeagueType): Promise<LeagueTable> => {
  const endpoint = league === 'kleague1' 
    ? ENDPOINTS.KLEAGUE1_TABLE 
    : ENDPOINTS.KLEAGUE2_TABLE;
  const response = await apiClient.get<LeagueTable>(endpoint);
  return response.data;
};

export const matchService = {
  getMatches,
  getMatchDetails,
  getSchedule,
  getLeagueTable,
};

export default matchService;
