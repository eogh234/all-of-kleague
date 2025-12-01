/**
 * Stadiums Screen
 * Displays list of all K League stadiums with details
 */

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList 
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants';
import { StadiumCard } from '../components';
import type { Stadium } from '../models';

// Sample stadiums data
const STADIUMS: Stadium[] = [
  {
    id: 's1',
    name: '전주월드컵경기장',
    city: '전주',
    capacity: 42477,
    address: '전북 전주시 덕진구 기린대로 1055',
    latitude: 35.8675,
    longitude: 127.0647,
    teamId: 't1',
  },
  {
    id: 's2',
    name: '울산문수축구경기장',
    city: '울산',
    capacity: 44466,
    address: '울산광역시 남구 문수로 44',
    latitude: 35.5344,
    longitude: 129.2823,
    teamId: 't2',
  },
  {
    id: 's3',
    name: '포항스틸야드',
    city: '포항',
    capacity: 25000,
    address: '경북 포항시 남구 희망대로 832',
    latitude: 36.0093,
    longitude: 129.3593,
    teamId: 't3',
  },
  {
    id: 's4',
    name: '서울월드컵경기장',
    city: '서울',
    capacity: 66806,
    address: '서울특별시 마포구 월드컵로 240',
    latitude: 37.5683,
    longitude: 126.8973,
    teamId: 't4',
  },
  {
    id: 's5',
    name: '인천축구전용경기장',
    city: '인천',
    capacity: 20891,
    address: '인천광역시 중구 참외전로 245',
    latitude: 37.4678,
    longitude: 126.6323,
    teamId: 't5',
  },
  {
    id: 's6',
    name: 'DGB대구은행파크',
    city: '대구',
    capacity: 12415,
    address: '대구광역시 수성구 유니버시아드로 180',
    latitude: 35.8342,
    longitude: 128.6810,
    teamId: 't6',
  },
];

export const StadiumsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>경기장 정보</Text>
        <Text style={styles.subtitle}>K리그 구단 홈경기장</Text>
      </View>

      <FlatList
        data={STADIUMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StadiumCard 
            stadium={item}
            onPress={(stadium) => console.log('Navigate to stadium:', stadium.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
  subtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.surface,
    opacity: 0.8,
    marginTop: SPACING.xs,
  },
  listContent: {
    paddingVertical: SPACING.sm,
  },
});

export default StadiumsScreen;
