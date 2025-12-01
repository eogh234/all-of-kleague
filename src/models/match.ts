/**
 * Match/Game related types
 */

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  time: string;
  stadium: Stadium;
  status: MatchStatus;
  homeScore?: number;
  awayScore?: number;
  league: LeagueType;
  round: number;
}

export type MatchStatus = 'scheduled' | 'live' | 'finished' | 'postponed' | 'cancelled';

export type LeagueType = 'kleague1' | 'kleague2';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  stadium: string;
  city: string;
  founded: number;
  league: LeagueType;
}

export interface Stadium {
  id: string;
  name: string;
  city: string;
  capacity: number;
  address: string;
  latitude: number;
  longitude: number;
  image?: string;
  teamId: string;
}

export interface LeagueTable {
  league: LeagueType;
  season: string;
  standings: TeamStanding[];
}

export interface TeamStanding {
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: MatchResult[];
}

export type MatchResult = 'W' | 'D' | 'L';

export interface Player {
  id: string;
  name: string;
  number: number;
  position: PlayerPosition;
  nationality: string;
  birthDate: string;
  teamId: string;
  image?: string;
}

export type PlayerPosition = 'GK' | 'DF' | 'MF' | 'FW';
