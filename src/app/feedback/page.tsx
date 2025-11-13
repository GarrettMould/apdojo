'use client';

import { useState } from 'react';
import { PageContainer } from '@/components/ui/page-container';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'feedback',
          name: formData.name,
          email: formData.email,
          feedback: formData.feedback
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', feedback: '' });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto py-12">
        {submitStatus !== 'success' && (
          <h1 className="text-4xl font-extrabold tracking-tight mb-8 text-center text-gray-900">
            Feedback <span className="text-blue-500">Form</span>
          </h1>
        )}
        
        {submitStatus === 'success' ? (
          <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-8 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 rounded-full border-4 border-gray-900 flex items-center justify-center mx-auto">
                <Check className="w-16 h-16 text-blue-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-8">
              Your feedback has been received. We appreciate you taking the time to help us improve.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Feedback Field */}
            <div>
              <label htmlFor="feedback" className="block text-sm font-bold text-gray-900 mb-1">
                Feedback
              </label>
              <textarea
                id="feedback"
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Please share your thoughts, suggestions, or concerns..."
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors
                  ${isSubmitting 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </div>

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 text-red-700 rounded-md">
                There was an error submitting your feedback. Please try again.
              </div>
            )}
          </form>
        )}
      </div>
    </PageContainer>
  );
} 