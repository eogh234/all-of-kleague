/**
 * StadiumCard Component
 * Displays stadium information card
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants';
import type { Stadium } from '../models';

interface StadiumCardProps {
  stadium: Stadium;
  onPress?: (stadium: Stadium) => void;
}

export const StadiumCard: React.FC<StadiumCardProps> = ({ stadium, onPress }) => {
  const formatCapacity = (capacity: number): string => {
    return capacity.toLocaleString('ko-KR');
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress?.(stadium)}
      activeOpacity={0.7}
    >
      {stadium.image ? (
        <Image source={{ uri: stadium.image }} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>🏟️</Text>
        </View>
      )}
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{stadium.name}</Text>
        <Text style={styles.city}>{stadium.city}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.capacity}>
            수용 인원: {formatCapacity(stadium.capacity)}명
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    marginVertical: SPACING.xs,
    marginHorizontal: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: COLORS.border,
  },
  placeholderImage: {
    width: '100%',
    height: 150,
    backgroundColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 48,
  },
  content: {
    padding: SPACING.md,
  },
  name: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  city: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  capacity: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
  },
});

export default StadiumCard;
