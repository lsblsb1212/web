import type { Message } from '../types';
import MessageList from './MessageList.tsx';
import ChatInput from './ChatInput';
import './ChatWindow.css';

interface ChatWindowProps {
  /** 当前会话标题 */
  title: string;
  messages: Message[];
  /** 是否等待 AI 回复 */
  pending: boolean;
  onSend: (content: string) => void;
}

/**
 * 主聊天面板组件
 * 组合「消息列表 + 输入框」，是右侧内容区的核心容器
 */
export default function ChatWindow({
  title,
  messages,
  pending,
  onSend,
}: ChatWindowProps) {
  return (
    <main className="chat">
      <header className="chat__header">{title}</header>
      <MessageList messages={messages} />
      <ChatInput disabled={pending} onSend={onSend} />
    </main>
  );
}