import { useEffect, useRef } from 'react';
import type { Message } from '../types';
import MessageItem from './MessageItem';
import './MessageList.css';

interface MessageListProps {
  messages: Message[];
  /** 空状态时的引导文案 */
  emptyHint?: string;
}

/**
 * 消息列表组件
 * - 渲染消息流
 * - 新消息 / 正在生成时自动滚动到底部
 */
export default function MessageList({
  messages,
  emptyHint = '你好，我是豆包。今天想聊点什么？',
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="msglist msglist--empty">
        <p>{emptyHint}</p>
      </div>
    );
  }

  return (
    <div className="msglist">
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
