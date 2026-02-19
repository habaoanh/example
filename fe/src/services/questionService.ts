import { GeminiResponse, QuestionData } from '../types';

// Helper to get the auth token from localStorage
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem('authToken');
};

// Calls our backend to analyze raw text with the AI model
export const analyzeQuestionByAI = async (rawInput: string): Promise<GeminiResponse> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Authentication token not found. Please log in again.');
  }

  try {
    const response = await fetch('/api/questions/analyzebyai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ rawInput }),
    });

    if (!response.ok) {
      // Attempt to parse error JSON, but fall back to status text if it fails
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      } catch (e) {
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      }
    }

    const result = await response.json();
    return result.data; // Our backend wraps the Gemini response in a 'data' property

  } catch (error) {
    console.error("Frontend service error [analyzeQuestionByAI]:", error);
    throw error; // Re-throw to be handled by the calling component
  }
};

// Calls our backend to save a new question to the database
export const saveQuestion = async (questionData: Omit<QuestionData, 'id'>): Promise<QuestionData> => {
    const token = getAuthToken();
    if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
    }

    try {
        const response = await fetch('/api/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(questionData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to save the question.');
        }

        const savedQuestion = await response.json();
        return savedQuestion.data; // Assuming the backend returns the saved question under a 'data' property

    } catch (error) {
        console.error("Frontend service error [saveQuestion]:", error);
        throw error; // Re-throw to be handled by the calling component
    }
};
