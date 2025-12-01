/**
 * Chat/Community related types
 */

export interface ChatRoom {
  id: string;
  name: string;
  description: string;
  type: ChatRoomType;
  teamId?: string;
  matchId?: string;
  createdAt: string;
  memberCount: number;
}

export type ChatRoomType = 'team' | 'match' | 'general' | 'news';

export interface ChatMessage {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: string;
  type: MessageType;
}

export type MessageType = 'text' | 'image' | 'system';

export interface User {
  id: string;
  name: string;
  avatar?: string;
  favoriteTeam?: string;
  createdAt: string;
}
