import { useLocalStorage } from "@/hooks/ui/useLocalStorage";
import { StoredSession } from "@/types/domain";
import { useCallback } from "react";

const MAX_SESSIONS = 25;
const STORAGE_KEY = "practice-sessions";

export function useSessionHistory() {
  const { value: sessions, setValue: setSessions, isLoaded } = useLocalStorage<StoredSession[]>({
    key: STORAGE_KEY,
    defaultValue: [],
  });

  const addSession = useCallback(
    (session: StoredSession) => {
      setSessions((prevSessions) => {
        const updatedSessions = [...prevSessions, session];
        // Keep only the last 25 sessions
        return updatedSessions.slice(-MAX_SESSIONS);
      });
    },
    [setSessions]
  );

  const getPreviousSession = useCallback((): { fillerCount: number } | null => {
    if (sessions.length === 0) return null;
    // Get the most recent session
    const lastSession = sessions[sessions.length - 1];
    return { fillerCount: lastSession.fillerCount };
  }, [sessions]);

  return {
    sessions,
    addSession,
    getPreviousSession,
    isLoaded,
  };
}
