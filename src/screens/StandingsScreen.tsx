/**
 * Standings Screen
 * Displays league table/standings for K League 1 and 2
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants';
import { StandingRow } from '../components';
import type { TeamStanding, LeagueType, Team } from '../models';

// Sample standings data
const createSampleStandings = (league: LeagueType): TeamStanding[] => {
  const kleague1Teams = [
    '울산 현대', '전북 현대', '포항 스틸러스', 'FC 서울', '인천 유나이티드',
    '대구 FC', '광주 FC', '제주 유나이티드', '수원 FC', '강원 FC',
    '대전 하나 시티즌', '김천 상무'
  ];
  
  const kleague2Teams = [
    '부산 아이파크', '충남 아산 FC', '서울 이랜드', '부천 FC 1995', '안산 그리너스',
    '전남 드래곤즈', '김포 FC', '충북 청주 FC', '경남 FC', '성남 FC',
    '안양 FC', '천안 시티 FC'
  ];

  const teams = league === 'kleague1' ? kleague1Teams : kleague2Teams;

  return teams.map((name, index) => {
    const team: Team = {
      id: `${league}-${index}`,
      name,
      shortName: name.split(' ')[0],
      logo: '',
      stadium: '',
      city: name.split(' ')[0],
      founded: 1990,
      league,
    };

    return {
      position: index + 1,
      team,
      played: 34,
      won: Math.max(0, 20 - index * 2),
      drawn: Math.floor(Math.random() * 10),
      lost: Math.min(34, index * 2),
      goalsFor: Math.max(20, 70 - index * 5),
      goalsAgainst: Math.min(60, 20 + index * 4),
      goalDifference: Math.max(-20, 50 - index * 8),
      points: Math.max(10, 70 - index * 5),
      form: ['W', 'D', 'L', 'W', 'W'].slice(0, 5) as ('W' | 'D' | 'L')[],
    };
  });
};

export const StandingsScreen: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = useState<LeagueType>('kleague1');
  
  const standings = createSampleStandings(selectedLeague);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>순위표</Text>
      </View>

      {/* League Selector */}
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

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#E3F2FD' }]} />
          <Text style={styles.legendText}>ACL 진출</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FFEBEE' }]} />
          <Text style={styles.legendText}>강등권</Text>
        </View>
      </View>

      {/* Standings Table */}
      <ScrollView style={styles.tableContainer}>
        <StandingRow 
          standing={{} as TeamStanding} 
          isHeader={true} 
        />
        {standings.map((standing) => (
          <StandingRow 
            key={standing.team.id} 
            standing={standing} 
          />
        ))}
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
    paddingBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.surface,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.md,
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
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.surface,
    gap: SPACING.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: SPACING.xs,
  },
  legendText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  tableContainer: {
    flex: 1,
  },
});

export default StandingsScreen;
