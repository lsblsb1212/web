import { mockDelay, request, USE_MOCK } from './request';

/**
 * 用户相关 API（模板）
 * ------------------------------------------------------------
 * 路由约定（对接后端时按此实现）：
 *   POST /api/auth/login     登录，返回 token
 *   GET  /api/user/profile   获取当前用户信息
 * ------------------------------------------------------------
 */

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResult {
  token: string;
  nickname: string;
}

export interface UserProfile {
  id: string;
  nickname: string;
  avatar: string;
}

/** 登录 */
export async function login(params: LoginParams): Promise<LoginResult> {
  if (USE_MOCK) {
    await mockDelay();
    return { token: 'mock-token', nickname: params.username || '游客' };
  }
  return request<LoginResult>('/auth/login', {
    method: 'POST',
    body: params,
  });
}

/** 获取当前用户信息 */
export async function fetchProfile(token: string): Promise<UserProfile> {
  if (USE_MOCK) {
    await mockDelay();
    return { id: 'u_1', nickname: '游客', avatar: '' };
  }
  return request<UserProfile>('/user/profile', { token });
}
