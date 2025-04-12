export async function generateDailyMealPlan() {
  const response = await fetch("/api/meal-plans/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to generate meal plan");
  }

  const data = await response.json();
  return data.plan; // Return the actual meal plan data
}

export async function getUserMealHistory(days = 7) {
  const response = await fetch(`/api/meals/history?days=${days}`);

  if (!response.ok) {
    throw new Error("Failed to fetch meal history");
  }

  return response.json();
}
export async function saveUserMeal(mealData: any) {
  const response = await fetch("/api/meals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mealData),
  });

  if (!response.ok) {
    throw new Error("Failed to save meal");
  }

  return response.json();
}

export async function analyzeMealWithAI(image: string, description?: string) {
  const response = await fetch("/api/analyze-meal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image, description }),
  });

  if (!response.ok) {
    throw new Error("Failed to analyze meal");
  }

  return response.json();
}

export async function updateMealAnalysis(mealId: string, analysis: any) {
  const response = await fetch(`/api/meals/${mealId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ aiAnalysis: analysis }),
  });

  if (!response.ok) {
    throw new Error("Failed to update meal analysis");
  }

  return response.json();
}
