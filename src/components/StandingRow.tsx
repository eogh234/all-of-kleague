/**
 * StandingRow Component
 * Displays a single row in the league standings table
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants';
import type { TeamStanding } from '../models';

interface StandingRowProps {
  standing: TeamStanding;
  isHeader?: boolean;
}

export const StandingRow: React.FC<StandingRowProps> = ({ 
  standing, 
  isHeader = false 
}) => {
  const getFormColor = (result: string): string => {
    switch (result) {
      case 'W': return COLORS.success;
      case 'D': return COLORS.warning;
      case 'L': return COLORS.error;
      default: return COLORS.textSecondary;
    }
  };

  if (isHeader) {
    return (
      <View style={[styles.container, styles.headerContainer]}>
        <Text style={[styles.position, styles.headerText]}>#</Text>
        <Text style={[styles.teamName, styles.headerText]}>Team</Text>
        <Text style={[styles.stat, styles.headerText]}>P</Text>
        <Text style={[styles.stat, styles.headerText]}>W</Text>
        <Text style={[styles.stat, styles.headerText]}>D</Text>
        <Text style={[styles.stat, styles.headerText]}>L</Text>
        <Text style={[styles.stat, styles.headerText]}>GD</Text>
        <Text style={[styles.points, styles.headerText]}>Pts</Text>
      </View>
    );
  }

  return (
    <View style={[
      styles.container,
      standing.position <= 3 && styles.topThree,
      standing.position >= 10 && styles.relegation,
    ]}>
      <Text style={styles.position}>{standing.position}</Text>
      <Text style={styles.teamName} numberOfLines={1}>
        {standing.team.shortName}
      </Text>
      <Text style={styles.stat}>{standing.played}</Text>
      <Text style={styles.stat}>{standing.won}</Text>
      <Text style={styles.stat}>{standing.drawn}</Text>
      <Text style={styles.stat}>{standing.lost}</Text>
      <Text style={styles.stat}>
        {standing.goalDifference > 0 ? '+' : ''}{standing.goalDifference}
      </Text>
      <Text style={styles.points}>{standing.points}</Text>
      <View style={styles.formContainer}>
        {standing.form.slice(-5).map((result, index) => (
          <View
            key={index}
            style={[styles.formDot, { backgroundColor: getFormColor(result) }]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerContainer: {
    backgroundColor: COLORS.primary,
  },
  headerText: {
    color: COLORS.surface,
    fontWeight: 'bold',
  },
  topThree: {
    backgroundColor: '#E3F2FD',
  },
  relegation: {
    backgroundColor: '#FFEBEE',
  },
  position: {
    width: 24,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.text,
  },
  teamName: {
    flex: 1,
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    marginRight: SPACING.xs,
  },
  stat: {
    width: 28,
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  points: {
    width: 32,
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
  },
  formContainer: {
    flexDirection: 'row',
    marginLeft: SPACING.xs,
  },
  formDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 1,
  },
});

export default StandingRow;
