import type { Message } from '../types';
import './MessageItem.css';

interface MessageItemProps {
  message: Message;
}

/**
 * 单条消息展示组件
 * - user：右侧蓝色气泡（用户消息）
 * - assistant：左侧白底内容（AI 回复）
 */
export default function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`msg ${isUser ? 'msg--user' : 'msg--assistant'}`}>
      <div className="msg__avatar" aria-hidden>
        {isUser ? '我' : '豆'}
      </div>
      <div className="msg__body">
        <div className="msg__bubble">
          {message.loading ? (
            <span className="msg__typing">正在思考…</span>
          ) : (
            <span className="msg__text">{message.content}</span>
          )}
        </div>
      </div>
    </div>
  );
}