import { useCallback, useEffect, useMemo, useState } from "react";

export interface UserPreferences {
  showSuggestions: boolean;
  autoScrollOnReply: boolean;
}

const STORAGE_KEY = "nutrifit-user-preferences";
const EVENT_NAME = "nutrifit:user-preferences-change";

const DEFAULT_PREFERENCES: UserPreferences = {
  showSuggestions: true,
  autoScrollOnReply: true,
};

const parseStoredPreferences = (value: string | null): UserPreferences => {
  if (!value) {
    return DEFAULT_PREFERENCES;
  }
  try {
    const parsed = JSON.parse(value) as Partial<UserPreferences>;
    return {
      showSuggestions: typeof parsed.showSuggestions === "boolean" ? parsed.showSuggestions : DEFAULT_PREFERENCES.showSuggestions,
      autoScrollOnReply:
        typeof parsed.autoScrollOnReply === "boolean" ? parsed.autoScrollOnReply : DEFAULT_PREFERENCES.autoScrollOnReply,
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
};

const readStoredPreferences = (): UserPreferences => {
  if (typeof window === "undefined") {
    return DEFAULT_PREFERENCES;
  }
  return parseStoredPreferences(window.localStorage.getItem(STORAGE_KEY));
};

export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(() => readStoredPreferences());

  const updatePreference = useCallback(<K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
    setPreferences((prev) => {
      const updated = { ...prev, [key]: value };
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent<UserPreferences>(EVENT_NAME, { detail: updated }));
      }
      return updated;
    });
  }, []);

  const resetPreferences = useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PREFERENCES));
      window.dispatchEvent(new CustomEvent<UserPreferences>(EVENT_NAME, { detail: DEFAULT_PREFERENCES }));
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        setPreferences(parseStoredPreferences(event.newValue));
      }
    };
    const handleCustomEvent = (event: Event) => {
      const custom = event as CustomEvent<UserPreferences>;
      if (custom.detail) {
        setPreferences(custom.detail);
      }
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener(EVENT_NAME, handleCustomEvent as EventListener);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(EVENT_NAME, handleCustomEvent as EventListener);
    };
  }, []);

  return useMemo(
    () => ({
      preferences,
      updatePreference,
      resetPreferences,
      defaults: DEFAULT_PREFERENCES,
    }),
    [preferences, updatePreference, resetPreferences],
  );
};
