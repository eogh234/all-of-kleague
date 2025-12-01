/**
 * MatchCard Component
 * Displays a match preview card with team info and score
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants';
import type { Match } from '../models';

interface MatchCardProps {
  match: Match;
  onPress?: (match: Match) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onPress }) => {
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <TouchableOpacity
      style={[styles.container, isLive && styles.liveContainer]}
      onPress={() => onPress?.(match)}
      activeOpacity={0.7}
    >
      {isLive && (
        <View style={styles.liveBadge}>
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      )}
      
      <View style={styles.header}>
        <Text style={styles.date}>{formatDate(match.date)}</Text>
        <Text style={styles.time}>{match.time}</Text>
      </View>
      
      <View style={styles.teamsContainer}>
        <View style={styles.teamContainer}>
          <Text style={styles.teamName} numberOfLines={1}>
            {match.homeTeam.shortName}
          </Text>
        </View>
        
        <View style={styles.scoreContainer}>
          {isFinished || isLive ? (
            <Text style={styles.score}>
              {match.homeScore} - {match.awayScore}
            </Text>
          ) : (
            <Text style={styles.vsText}>VS</Text>
          )}
        </View>
        
        <View style={styles.teamContainer}>
          <Text style={styles.teamName} numberOfLines={1}>
            {match.awayTeam.shortName}
          </Text>
        </View>
      </View>
      
      <Text style={styles.stadium}>{match.stadium.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginVertical: SPACING.xs,
    marginHorizontal: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  liveContainer: {
    borderColor: COLORS.error,
    borderWidth: 2,
  },
  liveBadge: {
    position: 'absolute',
    top: SPACING.xs,
    right: SPACING.xs,
    backgroundColor: COLORS.error,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  liveText: {
    color: COLORS.surface,
    fontSize: FONT_SIZES.xs,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  date: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginRight: SPACING.sm,
  },
  time: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  teamsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamContainer: {
    flex: 1,
    alignItems: 'center',
  },
  teamName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  scoreContainer: {
    paddingHorizontal: SPACING.md,
  },
  score: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  vsText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  stadium: {
    textAlign: 'center',
    marginTop: SPACING.sm,
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
});

export default MatchCard;
