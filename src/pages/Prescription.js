import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { FaCheckCircle, FaLeaf } from 'react-icons/fa';
import { prescriptionsAPI } from '../services/api';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store';

const Prescription = () => {
  const [step, setStep] = useState(1);
  const [recommendations, setRecommendations] = useState(null);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const mutation = useMutation(
    (data) => prescriptionsAPI.submit(data),
    {
      onSuccess: (response) => {
        setRecommendations(response.data.prescription);
        toast.success('Prescription generated successfully!');
      },
      onError: () => {
        toast.error('Failed to generate prescription');
      },
    }
  );

  const onSubmit = (data) => {
    const payload = {
      questionnaire: {
        age: parseInt(data.age),
        gender: data.gender,
        healthConcerns: data.healthConcerns || [],
        symptoms: data.symptoms,
        currentMedications: data.currentMedications,
        allergies: data.allergies,
        lifestyle: {
          diet: data.diet,
          exercise: data.exercise,
          sleepHours: parseInt(data.sleepHours || 7),
        },
        chronicConditions: data.chronicConditions ? data.chronicConditions.split(',').map(c => c.trim()) : [],
        preferredFormats: data.preferredFormats || [],
      },
      guestEmail: !isAuthenticated ? data.email : undefined,
    };

    mutation.mutate(payload);
  };

  if (recommendations) {
    return (
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <FaCheckCircle className="text-6xl text-green-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Your Personalized Prescription
              </h1>
              <p className="text-gray-600">
                Based on your health profile, we recommend the following herbs
              </p>
            </div>

            {/* Recommendations */}
            <div className="space-y-6 mb-8">
              {recommendations.recommendations.map((rec, idx) => (
                <div key={idx} className="border-l-4 border-green-600 pl-6 py-4 bg-gray-50 rounded">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {rec.product?.name || 'Herbal Product'}
                      </h3>
                      <div className="space-y-2 text-gray-700">
                        <p><strong>Reason:</strong> {rec.reason}</p>
                        <p><strong>Dosage:</strong> {rec.dosage}</p>
                        <p><strong>Duration:</strong> {rec.duration}</p>
                        <p><strong>Precautions:</strong> {rec.precautions}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                      rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {rec.priority} priority
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* General Advice */}
            <div className="bg-green-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-2">General Advice</h3>
              <p className="text-gray-700">{recommendations.generalAdvice}</p>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <p className="text-sm text-yellow-800">{recommendations.disclaimer}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => navigate('/products')}
                className="btn-primary"
              >
                Shop Recommended Products
              </button>
              <button
                onClick={() => window.print()}
                className="btn-secondary"
              >
                Print Prescription
              </button>
              <button
                onClick={() => {
                  setRecommendations(null);
                  setStep(1);
                }}
                className="btn-secondary"
              >
                Get New Prescription
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
          <FaLeaf className="text-5xl text-green-700 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Get Your Personalized Herbal Prescription
          </h1>
          <p className="text-gray-600">
            Answer a few questions to receive tailored herbal recommendations
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  {...register('age', { required: 'Age is required', min: 1, max: 120 })}
                  className="input-field"
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select {...register('gender', { required: true })} className="input-field">
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">Gender is required</p>}
              </div>
            </div>

            {!isAuthenticated && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email (to receive your prescription) *
                </label>
                <input
                  type="email"
                  {...register('email', { required: !isAuthenticated })}
                  className="input-field"
                />
              </div>
            )}

            {/* Health Concerns */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Health Concerns (select all that apply)
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  'digestive-issues',
                  'immune-system',
                  'skin-problems',
                  'stress-anxiety',
                  'sleep-disorders',
                  'joint-pain',
                  'respiratory-issues',
                  'weight-management',
                  'energy-levels',
                  'blood-pressure',
                ].map((concern) => (
                  <label key={concern} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={concern}
                      {...register('healthConcerns')}
                      className="rounded text-green-600"
                    />
                    <span className="text-gray-700">{concern.replace(/-/g, ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Symptoms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe Your Symptoms
              </label>
              <textarea
                {...register('symptoms')}
                rows="4"
                className="input-field"
                placeholder="Please describe your symptoms in detail..."
              ></textarea>
            </div>

            {/* Lifestyle */}
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diet Type
                </label>
                <select {...register('diet')} className="input-field">
                  <option value="balanced">Balanced</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="high-protein">High Protein</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exercise Level
                </label>
                <select {...register('exercise')} className="input-field">
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="active">Active</option>
                  <option value="very-active">Very Active</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sleep Hours/Night
                </label>
                <input
                  type="number"
                  {...register('sleepHours')}
                  min="0"
                  max="24"
                  defaultValue="7"
                  className="input-field"
                />
              </div>
            </div>

            {/* Current Medications & Allergies */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Medications
                </label>
                <textarea
                  {...register('currentMedications')}
                  rows="3"
                  className="input-field"
                  placeholder="List any medications you're currently taking..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Known Allergies
                </label>
                <textarea
                  {...register('allergies')}
                  rows="3"
                  className="input-field"
                  placeholder="List any known allergies..."
                ></textarea>
              </div>
            </div>

            {/* Preferred Formats */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Herb Formats
              </label>
              <div className="flex flex-wrap gap-3">
                {['tea', 'powder', 'capsule', 'tincture', 'fresh-herb', 'dried-herb'].map((format) => (
                  <label key={format} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={format}
                      {...register('preferredFormats')}
                      className="rounded text-green-600"
                    />
                    <span className="text-gray-700">{format.replace(/-/g, ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="w-full btn-primary flex items-center justify-center"
            >
              {mutation.isLoading ? (
                <>
                  <div className="spinner mr-2"></div>
                  Generating Prescription...
                </>
              ) : (
                'Get My Prescription'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Prescription;
