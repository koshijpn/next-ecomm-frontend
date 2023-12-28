import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';

export async function load({ fetch }) {
  try {
    // 画像データを取得
    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/img', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // JSONデータに変換
    const res = await resp.json();

    if (resp.status === 200) {
      return {
        images: res
      };
    } else {
      // ステータスコードが200以外の場合、空のimagesを返す
      console.error('Error fetching image data. Status:', resp.status);
      console.error('Error response:', res);
      return {
        images: []
      };
    }
  } catch (error) {
    // エラーが発生した場合、空のimagesを返す
    console.error('Error fetching image data:', error);
    return {
      images: []
    };
  }
}
