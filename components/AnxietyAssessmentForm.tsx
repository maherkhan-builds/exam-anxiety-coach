import React, { useState } from 'react';
import { ExamFormData } from '../types';

interface AnxietyAssessmentFormProps {
  onSubmit: (data: ExamFormData) => void;
  isLoading: boolean;
}

const AnxietyAssessmentForm: React.FC<AnxietyAssessmentFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<ExamFormData>({
    examName: '',
    examDate: '',
    anxietyLevel: 3, // Default to a moderate level
    studyHabits: '',
    strengths: '',
    weaknesses: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 md:p-8 bg-white rounded-lg shadow-xl w-full max-w-2xl mx-auto space-y-6">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Personalized Exam Plan</h2>

      <div>
        <label htmlFor="examName" className="block text-sm font-medium text-gray-700 mb-1">
          Exam Name
        </label>
        <input
          type="text"
          id="examName"
          name="examName"
          value={formData.examName}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="e.g., AWS Certified Developer - Associate"
        />
      </div>

      <div>
        <label htmlFor="examDate" className="block text-sm font-medium text-gray-700 mb-1">
          Exam Date
        </label>
        <input
          type="date"
          id="examDate"
          name="examDate"
          value={formData.examDate}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="anxietyLevel" className="block text-sm font-medium text-gray-700 mb-2">
          Your current test anxiety level (1 = Very Low, 5 = Very High)
        </label>
        <input
          type="range"
          id="anxietyLevel"
          name="anxietyLevel"
          min="1"
          max="5"
          step="1"
          value={formData.anxietyLevel}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1 (Very Low)</span>
          <span>2</span>
          <span>3 (Moderate)</span>
          <span>4</span>
          <span>5 (Very High)</span>
        </div>
      </div>

      <div>
        <label htmlFor="studyHabits" className="block text-sm font-medium text-gray-700 mb-1">
          Describe your current study habits
        </label>
        <textarea
          id="studyHabits"
          name="studyHabits"
          value={formData.studyHabits}
          onChange={handleChange}
          rows={4}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="e.g., I study for 2 hours daily, mostly reading textbooks. I find it hard to focus for long periods."
        ></textarea>
      </div>

      <div>
        <label htmlFor="strengths" className="block text-sm font-medium text-gray-700 mb-1">
          What are your academic strengths?
        </label>
        <textarea
          id="strengths"
          name="strengths"
          value={formData.strengths}
          onChange={handleChange}
          rows={3}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="e.g., Good at memorizing facts, strong problem-solving skills, quick learner."
        ></textarea>
      </div>

      <div>
        <label htmlFor="weaknesses" className="block text-sm font-medium text-gray-700 mb-1">
          What are your academic weaknesses or challenges?
        </label>
        <textarea
          id="weaknesses"
          name="weaknesses"
          value={formData.weaknesses}
          onChange={handleChange}
          rows={3}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="e.g., Poor time management during exams, difficulty with multiple-choice questions, easily distracted."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
      >
        {isLoading ? 'Generating Plan...' : 'Generate My Exam Plan'}
      </button>
    </form>
  );
};

export default AnxietyAssessmentForm;