/**
 * Home Screen
 * Main landing page showing upcoming matches and league highlights
 */

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants';
import { MatchCard } from '../components';
import type { Match, LeagueType } from '../models';

// Sample data for demonstration
const SAMPLE_MATCHES: Match[] = [
  {
    id: '1',
    homeTeam: {
      id: 't1',
      name: '전북 현대 모터스',
      shortName: '전북',
      logo: '',
      stadium: '전주월드컵경기장',
      city: '전주',
      founded: 1994,
      league: 'kleague1',
    },
    awayTeam: {
      id: 't2',
      name: '울산 현대',
      shortName: '울산',
      logo: '',
      stadium: '울산문수축구경기장',
      city: '울산',
      founded: 1983,
      league: 'kleague1',
    },
    date: '2024-12-01',
    time: '14:00',
    stadium: {
      id: 's1',
      name: '전주월드컵경기장',
      city: '전주',
      capacity: 42477,
      address: '전북 전주시 덕진구',
      latitude: 35.8675,
      longitude: 127.0647,
      teamId: 't1',
    },
    status: 'scheduled',
    league: 'kleague1',
    round: 35,
  },
];

export const HomeScreen: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = React.useState<LeagueType>('kleague1');

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>All of K League</Text>
        <Text style={styles.subtitle}>K리그 종합 커뮤니티</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedLeague === 'kleague1' && styles.activeTab
          ]}
          onPress={() => setSelectedLeague('kleague1')}
        >
          <Text style={[
            styles.tabText,
            selectedLeague === 'kleague1' && styles.activeTabText
          ]}>
            K리그1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedLeague === 'kleague2' && styles.activeTab
          ]}
          onPress={() => setSelectedLeague('kleague2')}
        >
          <Text style={[
            styles.tabText,
            selectedLeague === 'kleague2' && styles.activeTabText
          ]}>
            K리그2
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>다가오는 경기</Text>
        {SAMPLE_MATCHES.map((match) => (
          <MatchCard 
            key={match.id} 
            match={match}
            onPress={(m) => console.log('Match pressed:', m.id)}
          />
        ))}

        <Text style={styles.sectionTitle}>최근 결과</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>경기 결과가 없습니다</Text>
        </View>
      </ScrollView>
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
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.surface,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.surface,
    opacity: 0.8,
    marginTop: SPACING.xs,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
    marginHorizontal: SPACING.md,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl,
    marginHorizontal: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
});

export default HomeScreen;
