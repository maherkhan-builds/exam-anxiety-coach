import React, { useState, useEffect } from 'react';
import AnxietyAssessmentForm from './components/AnxietyAssessmentForm';
import ExamPlanDisplay from './components/ExamPlanDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { ExamFormData, ExamPlan } from './types';
import { generateExamPlan } from './services/geminiService';

const App: React.FC = () => {
  const [examPlan, setExamPlan] = useState<ExamPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(true); // State to control showing the form

  useEffect(() => {
    // Basic check for API key presence (though it's assumed to be injected)
    if (!process.env.API_KEY) {
      setError('API Key is not configured. Please ensure process.env.API_KEY is set.');
    }
  }, []);

  const handleSubmit = async (formData: ExamFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const plan = await generateExamPlan(formData);
      setExamPlan(plan);
      setShowForm(false); // Hide the form and show the plan
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred while generating the plan.');
      setExamPlan(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewPlan = () => {
    setExamPlan(null);
    setError(null);
    setShowForm(true); // Show the form again
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-blue-100">
      <header className="w-full max-w-3xl text-center mb-8">
        <h1 className="text-5xl font-extrabold text-indigo-800 leading-tight">
          Conquer <span className="text-blue-600">Exam Anxiety</span>
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Personalized, AI-powered study plans designed to calm your mind and boost your performance.
        </p>
      </header>

      <main className="w-full">
        {error && <ErrorMessage message={error} />}

        {isLoading && <LoadingSpinner />}

        {!isLoading && showForm && <AnxietyAssessmentForm onSubmit={handleSubmit} isLoading={isLoading} />}

        {!isLoading && examPlan && !showForm && (
          <ExamPlanDisplay plan={examPlan} onNewPlan={handleNewPlan} />
        )}
      </main>
    </div>
  );
};

export default App;