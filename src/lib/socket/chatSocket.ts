import { io, Socket } from "socket.io-client";
import { apiHost, targetApi } from "@/utils/baseUrl";
import { getAccessToken } from "@/redux/baseApi";
import { refreshSession } from "@/services/actions/auth";
import type { ChatMessage, ChatAttachment } from "@/redux/apis/chat";

let socketInstance: Socket | null = null;
let currentToken: string | null = null;

export function getSocketBaseUrl(): string {
  if (apiHost) return apiHost;
  if (targetApi) {
    try {
      return new URL(targetApi).origin;
    } catch {
      return targetApi.replace(/\/api\/v1\/?$/, "").replace(/\/$/, "");
    }
  }
  if (typeof window !== "undefined") return window.location.origin;
  return "";
}

/**
 * Ensures access token is available and connects to Socket.IO server.
 */
export async function getChatSocket(): Promise<Socket | null> {
  if (typeof window === "undefined") return null;

  let token = getAccessToken();
  if (!token) {
    await refreshSession();
    token = getAccessToken();
  }
  if (!token) {
    console.warn("Socket.IO: No access token available for connection.");
    return null;
  }

  if (socketInstance && currentToken === token && (socketInstance.connected || socketInstance.active)) {
    return socketInstance;
  }

  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }

  currentToken = token;
  const baseUrl = getSocketBaseUrl();

  const socket = io(baseUrl, {
    path: "/socket.io",
    auth: { token },
    query: { token },
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
  });

  socket.on("connect_error", (error) => {
    console.warn("Socket.IO connect_error:", error.message);
  });

  socket.on("disconnect", (reason) => {
    if (reason === "io server disconnect") {
      void refreshSession().then(() => {
        const freshToken = getAccessToken();
        if (freshToken) {
          socket.auth = { token: freshToken };
          socket.connect();
        }
      });
    }
  });

  socketInstance = socket;
  return socket;
}

export function disconnectChatSocket() {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
    currentToken = null;
  }
}

export function joinChatGroup(socket: Socket | null, groupId: string) {
  if (!socket || !groupId) return;
  socket.emit("group:join", { groupId });
}

export function leaveChatGroup(socket: Socket | null, groupId: string) {
  if (!socket || !groupId) return;
  socket.emit("group:leave", { groupId });
}

export function sendGroupMessage(
  socket: Socket | null,
  payload: {
    groupId: string;
    text?: string;
    attachments?: ChatAttachment[];
  }
): Promise<{ success: boolean; data?: ChatMessage; message?: string }> {
  return new Promise((resolve) => {
    if (!socket || !socket.connected) {
      resolve({ success: false, message: "Socket is not connected. Please try again." });
      return;
    }

    socket.emit(
      "group:send-message",
      payload,
      (response: { success: boolean; data?: ChatMessage; message?: string }) => {
        if (response && typeof response === "object") {
          resolve(response);
        } else {
          resolve({ success: false, message: "Unknown response from server." });
        }
      }
    );
  });
}

export function deleteGroupMessage(
  socket: Socket | null,
  messageId: string
): Promise<{ success: boolean; data?: ChatMessage; message?: string }> {
  return new Promise((resolve) => {
    if (!socket || !socket.connected) {
      resolve({ success: false, message: "Socket is not connected." });
      return;
    }

    socket.emit(
      "group:delete-message",
      { messageId },
      (response: { success: boolean; data?: ChatMessage; message?: string }) => {
        if (response && typeof response === "object") {
          resolve(response);
        } else {
          resolve({ success: false, message: "Failed to delete message." });
        }
      }
    );
  });
}

export function sendTypingIndicator(socket: Socket | null, groupId: string, name: string) {
  if (!socket || !groupId) return;
  socket.emit("group:typing", { groupId, name });
}

export function sendStopTypingIndicator(socket: Socket | null, groupId: string) {
  if (!socket || !groupId) return;
  socket.emit("group:stop-typing", { groupId });
}
