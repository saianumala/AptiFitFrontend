const API_BASE = "/api";

export const fetchUserPreferences = async (userId) => {
  const response = await fetch(`${API_BASE}/preferences/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch preferences");
  return response.json();
};

export const fetchBodyMetrics = async (userId) => {
  const response = await fetch(`${API_BASE}/metrics/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch metrics");
  return response.json();
};

export const updateUserPreferences = async (userId, data) => {
  const response = await fetch(`${API_BASE}/preferences/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update preferences");
  return response.json();
};
