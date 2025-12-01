/**
 * Chat Service
 * Handles real-time communication and chat operations
 */

import { apiClient } from './api';
import { ENDPOINTS, WEBSOCKET_URL } from '../constants';
import type { ChatRoom, ChatMessage } from '../models';

type MessageHandler = (message: ChatMessage) => void;

class ChatService {
  private socket: WebSocket | null = null;
  private messageHandlers: Map<string, MessageHandler[]> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  /**
   * Connect to WebSocket server
   */
  connect(userId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.socket = new WebSocket(`${WEBSOCKET_URL}?userId=${userId}`);

        this.socket.onopen = () => {
          console.log('WebSocket connected');
          this.reconnectAttempts = 0;
          resolve();
        };

        this.socket.onmessage = (event) => {
          try {
            const message: ChatMessage = JSON.parse(event.data);
            this.notifyHandlers(message.roomId, message);
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error);
          }
        };

        this.socket.onclose = () => {
          console.log('WebSocket disconnected');
          this.attemptReconnect(userId);
        };

        this.socket.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(error);
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Disconnect from WebSocket server
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.messageHandlers.clear();
  }

  /**
   * Subscribe to messages in a room
   */
  subscribeToRoom(roomId: string, handler: MessageHandler): () => void {
    const handlers = this.messageHandlers.get(roomId) || [];
    handlers.push(handler);
    this.messageHandlers.set(roomId, handlers);

    // Send join room message
    this.sendRaw({ type: 'join', roomId });

    // Return unsubscribe function
    return () => {
      const currentHandlers = this.messageHandlers.get(roomId) || [];
      const index = currentHandlers.indexOf(handler);
      if (index > -1) {
        currentHandlers.splice(index, 1);
        this.messageHandlers.set(roomId, currentHandlers);
      }
      this.sendRaw({ type: 'leave', roomId });
    };
  }

  /**
   * Send a message to a room
   */
  sendMessage(roomId: string, content: string): void {
    this.sendRaw({
      type: 'message',
      roomId,
      content,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Get available chat rooms
   */
  async getChatRooms(): Promise<ChatRoom[]> {
    const response = await apiClient.get<ChatRoom[]>(ENDPOINTS.CHAT_ROOMS);
    return response.data;
  }

  /**
   * Get message history for a room
   */
  async getMessageHistory(
    roomId: string,
    limit = 50,
    before?: string
  ): Promise<ChatMessage[]> {
    const params: Record<string, string> = {
      limit: limit.toString(),
      ...(before && { before }),
    };
    const response = await apiClient.get<ChatMessage[]>(
      ENDPOINTS.CHAT_MESSAGES(roomId),
      params
    );
    return response.data;
  }

  private sendRaw(data: unknown): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    }
  }

  private notifyHandlers(roomId: string, message: ChatMessage): void {
    const handlers = this.messageHandlers.get(roomId) || [];
    handlers.forEach((handler) => handler(message));
  }

  private attemptReconnect(userId: string): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.pow(2, this.reconnectAttempts) * 1000;
      console.log(`Attempting reconnect in ${delay}ms...`);
      setTimeout(() => this.connect(userId), delay);
    }
  }
}

export const chatService = new ChatService();
export default chatService;
