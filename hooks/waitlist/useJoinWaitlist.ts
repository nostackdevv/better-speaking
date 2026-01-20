import { useMutation } from '@tanstack/react-query';

import { ApiError, WaitlistResponse } from '@/types/api';

export function useJoinWaitlist() {
  return useMutation<WaitlistResponse, ApiError, string>({
    mutationFn: async (email: string) => {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw errorData;
      }

      const data: WaitlistResponse = await response.json();
      return data;
    },
  });
}
