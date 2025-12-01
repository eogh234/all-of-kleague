/**
 * Schedule Screen
 * Displays match schedule with calendar view
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  FlatList 
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants';
import { MatchCard } from '../components';
import type { Match, LeagueType } from '../models';

export const ScheduleScreen: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = useState<LeagueType | 'all'>('all');
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());

  const months = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  // Sample matches - in real app, fetch from API
  const matches: Match[] = [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>경기 일정</Text>
      </View>

      {/* League Filter */}
      <View style={styles.filterContainer}>
        {(['all', 'kleague1', 'kleague2'] as const).map((league) => (
          <TouchableOpacity
            key={league}
            style={[
              styles.filterButton,
              selectedLeague === league && styles.activeFilter
            ]}
            onPress={() => setSelectedLeague(league)}
          >
            <Text style={[
              styles.filterText,
              selectedLeague === league && styles.activeFilterText
            ]}>
              {league === 'all' ? '전체' : league === 'kleague1' ? 'K리그1' : 'K리그2'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Month Selector */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.monthScroller}
        contentContainerStyle={styles.monthScrollerContent}
      >
        {months.map((month, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.monthButton,
              selectedMonth === index && styles.activeMonth
            ]}
            onPress={() => setSelectedMonth(index)}
          >
            <Text style={[
              styles.monthText,
              selectedMonth === index && styles.activeMonthText
            ]}>
              {month}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Match List */}
      {matches.length > 0 ? (
        <FlatList
          data={matches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MatchCard 
              match={item}
              onPress={(m) => console.log('Navigate to match:', m.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📅</Text>
          <Text style={styles.emptyTitle}>일정이 없습니다</Text>
          <Text style={styles.emptyText}>
            {months[selectedMonth]}에 예정된 경기가 없습니다
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 48,
    paddingBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.surface,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    padding: SPACING.sm,
    gap: SPACING.sm,
  },
  filterButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.background,
  },
  activeFilter: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  activeFilterText: {
    color: COLORS.surface,
    fontWeight: '600',
  },
  monthScroller: {
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  monthScrollerContent: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
  },
  monthButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginHorizontal: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
  },
  activeMonth: {
    backgroundColor: COLORS.primary,
  },
  monthText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  activeMonthText: {
    color: COLORS.surface,
    fontWeight: '600',
  },
  listContent: {
    paddingVertical: SPACING.sm,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default ScheduleScreen;
