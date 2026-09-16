import type { ConversationSummary } from '../types';
import './Sidebar.css';

interface SidebarProps {
  /** 当前激活的会话 id */
  activeId: string | null;
  /** 会话列表 */
  conversations: ConversationSummary[];
  /** 新建会话 */
  onNewChat: () => void;
  /** 切换会话 */
  onSelect: (id: string) => void;
}

/**
 * 左侧边栏组件
 * 展示会话列表 + 「新建对话」入口（豆包 Web 版布局）
 */
export default function Sidebar({
  activeId,
  conversations,
  onNewChat,
  onSelect,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <button className="sidebar__new" onClick={onNewChat}>
          <span className="sidebar__new-icon">+</span>
          新建对话
        </button>
      </div>

      <nav className="sidebar__list">
        {conversations.map((item) => (
          <button
            key={item.id}
            className={`sidebar__item ${item.id === activeId ? 'is-active' : ''}`}
            onClick={() => onSelect(item.id)}
            title={item.title}
          >
            {item.title}
          </button>
        ))}
        {conversations.length === 0 && (
          <p className="sidebar__empty">暂无会话</p>
        )}  
      </nav>

     
    </aside>
  );
}
