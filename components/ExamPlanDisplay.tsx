import React from 'react';
import { ExamPlan } from '../types';

interface ExamPlanDisplayProps {
  plan: ExamPlan;
  onNewPlan: () => void;
}

const ExamPlanDisplay: React.FC<ExamPlanDisplayProps> = ({ plan, onNewPlan }) => {
  return (
    <div className="p-6 md:p-8 bg-white rounded-lg shadow-xl w-full max-w-3xl mx-auto space-y-8 animate-fade-in">
      <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">Your Personalized Exam Plan</h2>

      <section className="bg-indigo-50 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-indigo-800 mb-4">Summary</h3>
        <p className="text-gray-800 leading-relaxed text-lg">{plan.summary}</p>
      </section>

      <section className="bg-blue-50 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-blue-800 mb-4">Recommendations</h3>
        <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
          {plan.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start">
              <span className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0 mt-2 mr-3"></span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-green-50 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-green-800 mb-4">Action Steps</h3>
        <ol className="list-decimal list-inside space-y-3 text-gray-700 text-lg">
          {plan.action_steps.map((step, index) => (
            <li key={index} className="flex items-start">
              <span className="font-semibold text-green-600 mr-2">{index + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="pt-6 border-t border-gray-200">
        <button
          onClick={onNewPlan}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
        >
          Create A New Plan
        </button>
      </div>
    </div>
  );
};

export default ExamPlanDisplay;