/**
 * useLeagueTable Hook
 * Custom hook for fetching league standings
 */

import { useState, useEffect, useCallback } from 'react';
import { matchService } from '../services';
import type { LeagueTable, LeagueType } from '../models';

interface UseLeagueTableResult {
  table: LeagueTable | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useLeagueTable(league: LeagueType): UseLeagueTableResult {
  const [table, setTable] = useState<LeagueTable | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTable = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await matchService.getLeagueTable(league);
      setTable(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch standings');
    } finally {
      setLoading(false);
    }
  }, [league]);

  useEffect(() => {
    fetchTable();
  }, [fetchTable]);

  return { table, loading, error, refresh: fetchTable };
}

export default useLeagueTable;
