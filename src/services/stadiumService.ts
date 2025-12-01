/**
 * Stadium Service
 * Handles all stadium-related API operations
 */

import { apiClient } from './api';
import { ENDPOINTS } from '../constants';
import type { Stadium } from '../models';

/**
 * Fetch all stadiums
 */
export const getStadiums = async (): Promise<Stadium[]> => {
  const response = await apiClient.get<Stadium[]>(ENDPOINTS.STADIUMS);
  return response.data;
};

/**
 * Fetch stadium details by ID
 */
export const getStadiumDetails = async (stadiumId: string): Promise<Stadium> => {
  const response = await apiClient.get<Stadium>(ENDPOINTS.STADIUM_DETAILS(stadiumId));
  return response.data;
};

export const stadiumService = {
  getStadiums,
  getStadiumDetails,
};

export default stadiumService;
