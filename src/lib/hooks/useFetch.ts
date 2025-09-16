import { useCallback, useState } from 'react';

type UseFetchResponse = {
  isPending: boolean;
  isError: boolean;
  executeFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
};

export const useFetch = (): UseFetchResponse => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const executeFetch = useCallback(async (input: RequestInfo | URL, init?: RequestInit) => {
    try {
      setIsPending(true);
      setIsError(false);
      const res = await fetch(input, init);
      setIsError(!res.ok);
      return res;
    } catch (error) {
      setIsError(true);
      throw error;
    } finally {
      setIsPending(false);
    }
  }, [setIsPending, setIsError]);

  return {
    isPending,
    isError,
    executeFetch
  };
};
