import type {
  ChatRequest,
  ChatResult,
  ConversationSummary,
} from '../types';
import { mockDelay, request, USE_MOCK } from './request';

/**
 * 对话相关 API（模板）
 * ------------------------------------------------------------
 * 路由约定（对接后端时按此实现）：
 *   GET  /api/conversations   查询会话列表
 *   POST /api/chat            发送消息，返回 AI 回复
 * ------------------------------------------------------------
 */

/** 获取会话列表 */
export async function fetchConversations(): Promise<ConversationSummary[]> {
  if (USE_MOCK) {
    await mockDelay();
    return [];
  }
  return request<ConversationSummary[]>('/conversations');
}

/** 发送消息，获取 AI 回复 */
export async function sendChatMessage(
  req: ChatRequest
): Promise<ChatResult> {
  if (USE_MOCK) {
    await mockDelay(600);
    return {
      conversationId: req.conversationId,
      reply: replyOf(req.content),
    };
  }
  return request<ChatResult>('/chat', {
    method: 'POST',
    body: req,
  });
}

/** 本地模拟回复：演示用，可替换为真实模型返回 */
function replyOf(content: string): string {
  return `已收到你的问题：「${content}」\n这是静态 Demo 的模拟回复。接入真实后端后，这里将返回模型生成的回答。`;
}
