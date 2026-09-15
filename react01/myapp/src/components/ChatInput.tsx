import { useState } from 'react';
import './ChatInput.css';

interface ChatInputProps {
  /** 是否正在等待 AI 回复（禁用发送） */
  disabled?: boolean;
  /** 发送回调 */
  onSend: (content: string) => void;
}

/**
 * 底部输入框组件
 * - 多行 textarea + 回车发送（Shift+Enter 换行）
 * - 空内容 / 加载中禁止发送
 */
export default function ChatInput({ disabled = false, onSend }: ChatInputProps) {
  const [value, setValue] = useState('');

  const submit = () => {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="chatinput">
      <div className="chatinput__box">
        <textarea
          className="chatinput__textarea"
          rows={1}
          placeholder="输入你的问题…（Enter 发送，Shift+Enter 换行）"
          value={value}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="chatinput__send"
          onClick={submit}
          disabled={disabled || !value.trim()}
        >
          发送
        </button>
      </div>
    </div>
  );
} 
