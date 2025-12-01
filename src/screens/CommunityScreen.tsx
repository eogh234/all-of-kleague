/**
 * Community Screen
 * Real-time chat and community features
 */

import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants';
import { ChatMessage as ChatMessageComponent } from '../components';
import type { ChatMessage, ChatRoom } from '../models';

// Sample chat rooms
const CHAT_ROOMS: ChatRoom[] = [
  { 
    id: 'general', 
    name: '일반 채팅', 
    description: '모든 K리그 팬들의 대화방',
    type: 'general',
    createdAt: '2024-01-01',
    memberCount: 1523
  },
  { 
    id: 'kleague1', 
    name: 'K리그1 토론방', 
    description: 'K리그1 경기 토론',
    type: 'general',
    createdAt: '2024-01-01',
    memberCount: 892
  },
  { 
    id: 'kleague2', 
    name: 'K리그2 토론방', 
    description: 'K리그2 경기 토론',
    type: 'general',
    createdAt: '2024-01-01',
    memberCount: 456
  },
];

// Sample messages
const SAMPLE_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    roomId: 'general',
    userId: 'user1',
    userName: '울산팬',
    content: '오늘 경기 기대됩니다!',
    timestamp: '2024-12-01T10:30:00',
    type: 'text',
  },
  {
    id: '2',
    roomId: 'general',
    userId: 'user2',
    userName: '전북서포터',
    content: '이번 시즌 정말 치열하네요',
    timestamp: '2024-12-01T10:32:00',
    type: 'text',
  },
  {
    id: '3',
    roomId: 'general',
    userId: 'system',
    userName: 'System',
    content: '새로운 사용자가 입장했습니다',
    timestamp: '2024-12-01T10:33:00',
    type: 'system',
  },
];

export const CommunityScreen: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(SAMPLE_MESSAGES);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const currentUserId = 'currentUser'; // In real app, get from auth

  const handleSendMessage = () => {
    if (!inputText.trim() || !selectedRoom) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      roomId: selectedRoom.id,
      userId: currentUserId,
      userName: '나',
      content: inputText.trim(),
      timestamp: new Date().toISOString(),
      type: 'text',
    };

    setMessages([...messages, newMessage]);
    setInputText('');
    
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  if (!selectedRoom) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>커뮤니티</Text>
          <Text style={styles.subtitle}>실시간 채팅</Text>
        </View>

        <FlatList
          data={CHAT_ROOMS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.roomCard}
              onPress={() => setSelectedRoom(item)}
            >
              <View style={styles.roomInfo}>
                <Text style={styles.roomName}>{item.name}</Text>
                <Text style={styles.roomDescription}>{item.description}</Text>
              </View>
              <View style={styles.roomMeta}>
                <Text style={styles.memberCount}>
                  👥 {item.memberCount.toLocaleString()}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.roomList}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setSelectedRoom(null)}
        >
          <Text style={styles.backText}>← 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{selectedRoom.name}</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages.filter(m => m.roomId === selectedRoom.id)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatMessageComponent 
            message={item}
            isOwnMessage={item.userId === currentUserId}
          />
        )}
        style={styles.messageList}
        contentContainerStyle={styles.messageListContent}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="메시지를 입력하세요..."
          placeholderTextColor={COLORS.textSecondary}
          multiline
          maxLength={500}
        />
        <TouchableOpacity 
          style={[
            styles.sendButton,
            !inputText.trim() && styles.sendButtonDisabled
          ]}
          onPress={handleSendMessage}
          disabled={!inputText.trim()}
        >
          <Text style={styles.sendButtonText}>전송</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  backButton: {
    marginBottom: SPACING.xs,
  },
  backText: {
    color: COLORS.surface,
    fontSize: FONT_SIZES.sm,
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
  roomList: {
    padding: SPACING.sm,
  },
  roomCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  roomInfo: {
    flex: 1,
  },
  roomName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  roomDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  roomMeta: {
    alignItems: 'flex-end',
  },
  memberCount: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    paddingVertical: SPACING.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONT_SIZES.md,
    maxHeight: 100,
    color: COLORS.text,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginLeft: SPACING.sm,
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.border,
  },
  sendButtonText: {
    color: COLORS.surface,
    fontWeight: '600',
    fontSize: FONT_SIZES.md,
  },
});

export default CommunityScreen;
