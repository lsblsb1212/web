import { useEffect, useRef, useState } from 'react';
import Sidebar from './components/Sidebar.tsx';
import ChatWindow from './components/ChatWindow.tsx';
import { sendChatMessage } from './api/chat.ts';
import type { Conversation, Message } from './types/index.ts';
import './App.css';

/** 简单的本地 id 生成 */
let counter = 0;
function uid(prefix = 'id'): string {
  counter += 1;
  return `${prefix}_${Date.now()}_${counter}`;
}

/** 从内容生成会话标题（截取首句） */
function titleOf(content: string): string {
  const line = content.split('\n')[0].trim();
  return line.length > 12 ? `${line.slice(0, 12)}…` : line;
}

export default function App() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const pendingRef = useRef(false);

  const active = conversations.find((c) => c.id === activeId) ?? null;

  // 进入页面默认新建一个空会话
  useEffect(() => {
    if (conversations.length === 0) {
      const c: Conversation = { id: uid('conv'), title: '新对话', messages: [], updatedAt: Date.now() };
      setConversations([c]);
      setActiveId(c.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateConversation = (id: string, updater: (c: Conversation) => Conversation) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? updater(c) : c))
    );
  };

  const handleNewChat = () => {
    const c: Conversation = { id: uid('conv'), title: '新对话', messages: [], updatedAt: Date.now() };
    setConversations((prev) => [c, ...prev]);
    setActiveId(c.id);
  };

  const handleSend = async (content: string) => {
    if (!activeId || pendingRef.current) return;
    pendingRef.current = true;
    setPending(true);

    const convId = activeId;
    const userMsg: Message = { id: uid('msg'), role: 'user', content, createdAt: Date.now() };

    updateConversation(convId, (c) => ({
      ...c,
      title: c.messages.length === 0 ? titleOf(content) : c.title,
      messages: [...c.messages, userMsg],
      updatedAt: Date.now(),
    }));

    try {
      // 调用 api 模板（mock 环境直接返回模拟回复）
      const { reply } = await sendChatMessage({ conversationId: convId, content });

      const assistantMsg: Message = {
        id: uid('msg'),
        role: 'assistant',
        content: reply,
        createdAt: Date.now(),
      };
      updateConversation(convId, (c) => ({
        ...c,
        messages: [...c.messages, assistantMsg],
        updatedAt: Date.now(),
      }));
    } finally {
      pendingRef.current = false;
      setPending(false);
    }
  };

  return (
    <div className="app">
      <Sidebar
        activeId={activeId}
        conversations={conversations.map(({ id, title, updatedAt }) => ({
          id,
          title,
          updatedAt,
        }))}
        onNewChat={handleNewChat}
        onSelect={setActiveId}
      />
      <ChatWindow
        title={active?.title ?? '新对话'}
        messages={active?.messages ?? []}
        pending={pending}
        onSend={handleSend}
      />
    </div>
  );
}