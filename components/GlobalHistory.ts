export type GlobalHistoryItem = {
  id: string;
  calculator: string;
  summary: string;
  result: string;
  timestamp: number;
};

const HISTORY_KEY = "cornerspan-history";

export function getGlobalHistory(): GlobalHistoryItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(HISTORY_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addGlobalHistory(
  calculator: string,
  summary: string,
  result: string
) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const history = getGlobalHistory();

    const newItem: GlobalHistoryItem = {
      id: `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}`,
      calculator,
      summary,
      result,
      timestamp: Date.now(),
    };

    const updated = [
      newItem,
      ...history,
    ].slice(0, 100);

    localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(updated)
    );
  } catch {
    // Ignore storage errors
  }
}

export function deleteGlobalHistory(
  id: string
) {
  if (typeof window === "undefined") {
    return;
  }

  const history = getGlobalHistory();

  const updated = history.filter(
    (item) => item.id !== id
  );

  localStorage.setItem(
    HISTORY_KEY,
    JSON.stringify(updated)
  );
}

export function clearGlobalHistory() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(HISTORY_KEY);
}
