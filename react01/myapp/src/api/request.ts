import type { ApiResponse } from '../types';

/**
 * API 请求基础封装（模板）
 * ------------------------------------------------------------
 * 这是前端与后端交互的统一入口。真实项目中：
 * 1. 可用 fetch 或 axios（如装 axios 则替换本文件实现，接口签名不变）
 * 2. 通过 Vite 代理将 /api 转发到后端服务
 * 3. 统一处理 baseURL、鉴权 token、超时、错误拦截
 *
 * 对应后端路由约定（示例）：
 *   GET  /api/health
 *   GET  /api/conversations
 *   POST /api/chat
 *   POST /api/auth/login
 * ------------------------------------------------------------
 */

/** 后端基础地址（vite.config 中配置了代理时可直接写 /api） */
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

/** 请求超时（ms） */
const TIMEOUT = 30000;

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  /** 需要携带的鉴权 token */
  token?: string;
}

/** 统一请求函数：返回业务 data（code===0 才 resolve） */
export async function request<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', body, token } = options;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`请求失败：HTTP ${res.status}`);
    }

    const json = (await res.json()) as ApiResponse<T>;
    if (json.code !== 0) {
      throw new Error(json.message || '业务错误');
    }
    return json.data;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * 静态 Demo 用的 mock 适配层
 * ------------------------------------------------------------
 * 后端未就绪时，可以把「真实请求」替换成「本地模拟」，保证前端可跑。
 * 接真实后端时：删除 mock 分支，或注释掉下方导出即可。
 * 注释掉 mock，业务代码无需任何改动。
 * ------------------------------------------------------------
 */
export const USE_MOCK = false;

/** 模拟网络延迟 */
export function mockDelay(ms = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}