/**
 * Root Navigator
 * Main navigation structure for the app
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants';
import type { RootTabParamList } from './types';

import {
  HomeScreen,
  ScheduleScreen,
  StandingsScreen,
  StadiumsScreen,
  CommunityScreen,
} from '../screens';

const Tab = createBottomTabNavigator<RootTabParamList>();

interface TabIconProps {
  focused: boolean;
  label: string;
  icon: string;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, label, icon }) => (
  <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
    {icon}
  </Text>
);

export const RootNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="홈" icon="🏠" />
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          tabBarLabel: '일정',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="일정" icon="📅" />
          ),
        }}
      />
      <Tab.Screen
        name="Standings"
        component={StandingsScreen}
        options={{
          tabBarLabel: '순위',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="순위" icon="🏆" />
          ),
        }}
      />
      <Tab.Screen
        name="Stadiums"
        component={StadiumsScreen}
        options={{
          tabBarLabel: '경기장',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="경기장" icon="🏟️" />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarLabel: '커뮤니티',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="커뮤니티" icon="💬" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.surface,
    borderTopColor: COLORS.border,
    paddingTop: 8,
    paddingBottom: 8,
    height: 64,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  tabIcon: {
    fontSize: 20,
    opacity: 0.6,
  },
  tabIconFocused: {
    opacity: 1,
  },
});

export default RootNavigator;
