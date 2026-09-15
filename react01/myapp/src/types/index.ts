// ============================================================
// 全局类型定义 —— 项目内所有模块共享的数据结构
// 对应真实的豆包场景：会话、消息、API 响应
// ============================================================

/** 消息发送方 */
export type MessageRole = 'user' | 'assistant';

/** 单条消息 */
export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  /** 创建时间戳（ms） */
  createdAt: number;
  /** 是否正在生成中（流式 / 加载态） */
  loading?: boolean;
}

/** 会话（一次对话） */
export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
}

/** API 统一响应包装（对应后端 /api 返回结构模板） */
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

/** 发送消息请求体（对应 POST /api/chat 请求模板） */
export interface ChatRequest {
  conversationId: string;
  content: string;
}

/** 发送消息响应数据 */
export interface ChatResult {
  conversationId: string;
  reply: string;
}

/** 会话列表项（对应 GET /api/conversations 响应模板） */
export interface ConversationSummary {
  id: string;
  title: string;
  updatedAt: number;
}