import { GoogleGenAI, Type } from '@google/genai';
import { API_KEY, GEMINI_MODEL } from '../constants';
import { ExamFormData, ExamPlan } from '../types';

interface GenerateExamPlanConfig {
  apiKey: string;
  model: string;
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateExamPlan = async (
  formData: ExamFormData,
): Promise<ExamPlan> => {
  const { examName, examDate, anxietyLevel, studyHabits, strengths, weaknesses } = formData;

  const prompt = `You are an AI-powered educational coach specializing in reducing test anxiety and optimizing exam performance. Your task is to generate a personalized, anxiety-safe exam preparation plan for a student based on their input.

**Student Profile:**
*   Exam Name: ${examName}
*   Exam Date: ${examDate}
*   Current Test Anxiety Level (1-5, 5 being highest): ${anxietyLevel}
*   Current Study Habits: ${studyHabits}
*   Academic Strengths: ${strengths}
*   Academic Weaknesses/Challenges: ${weaknesses}

Based on this profile, create a detailed, actionable exam plan. Focus on strategies to mitigate anxiety, leverage strengths, address weaknesses, and structure study time effectively. Tailor recommendations specifically for their anxiety level; for higher anxiety, emphasize mindfulness, short breaks, and gradual exposure strategies.

**Output Format:** Provide the response as a JSON object. The content for each item should be a descriptive string.`;

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'High-level advice to reduce anxiety and improve study.',
            },
            action_steps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Specific, measurable steps with clear timings or frequencies.',
            },
            summary: {
              type: Type.STRING,
              description: 'A concise motivational summary of the plan.',
            },
          },
          required: ['recommendations', 'action_steps', 'summary'],
          propertyOrdering: ['recommendations', 'action_steps', 'summary'],
        },
      },
    });

    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as ExamPlan;
  } catch (error) {
    console.error('Error generating exam plan:', error);
    throw new Error('Failed to generate exam plan. Please try again.');
  }
};