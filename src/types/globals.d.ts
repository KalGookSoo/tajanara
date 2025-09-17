declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
    registerServiceWorker?(scriptURL: string, options?: RegistrationOptions): Promise<ServiceWorkerRegistration>;
  }

  interface ServiceWorkerRegistration {
    waiting?: ServiceWorker;
  }

  /**
   * 계정 인증 요청 DTO
   */
  interface SignInRequest {
    username: string;
    password: string;
  }

  /**
   * 계정 인증 응답 DTO
   */
  interface SignInResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }

  /**
   * 노래
   */
  interface Song {
    id: string;
    title: string;
    artist: string;
    lyrics: string;
  }
}

export {};
