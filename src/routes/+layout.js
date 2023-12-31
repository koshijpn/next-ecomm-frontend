import { checkLoginStatus } from '../utils/auth';
export const ssr = false;

export async function load() {
    // ページの初期化時にログイン状態を確認
    checkLoginStatus();
}


