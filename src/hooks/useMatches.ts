/**
 * useMatches Hook
 * Custom hook for fetching and managing match data
 */

import { useState, useEffect, useCallback } from 'react';
import { matchService } from '../services';
import type { Match, LeagueType } from '../models';

interface UseMatchesResult {
  matches: Match[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useMatches(league?: LeagueType): UseMatchesResult {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await matchService.getMatches(league);
      setMatches(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch matches');
    } finally {
      setLoading(false);
    }
  }, [league]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return { matches, loading, error, refresh: fetchMatches };
}

export default useMatches;
