/**
 * SSR/Edge-safe base64 -> JSON decoder.
 * - Uses atob in browsers when available.
 * - Falls back to Node's Buffer in server environments.
 * - Returns null if neither is available or if parsing fails.
 */
export function decodeBase64Json<T = unknown>(base64: string): T | null {
  try {
    let json: string;
    // 브라우저 환경에서는 atob을 활용하고 서버 환경에서는 Buffer를 사용한다. 일부 런타임에서는 둘 다 없을 수 있다.
    if (typeof atob === 'function') {
      json = atob(base64);
    } else if (typeof Buffer !== 'undefined') {
      json = Buffer.from(base64, 'base64').toString('utf-8');
    } else {
      // As a last resort, return null rather than crashing
      return null;
    }
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}
