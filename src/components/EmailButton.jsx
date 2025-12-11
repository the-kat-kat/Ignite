import React, { useState } from 'react';

const EmailSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure email is not empty and is valid
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setIsSubmitting(true);
    setStatus(null); // Clear previous status message

    try {
      // Make a POST request to the serverless function to add the email
      const response = await fetch('/api/add-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: data.message });
      } else {
        setStatus({ type: 'error', message: data.message });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto p-6 rounded-2xl bg-white/70" >      
      {status && (
        <div className={`text-center rounded-2xl p-2 mb-4 ${status.type === 'error' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-row justify-center items-center gap-3" >
        <input
          type="email"
          className="w-96 h-12 p-2 border border-salmon rounded-md focus:outline-none focus:ring-2 focus:ring-darkGreen text-black text-sm "
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className={`h-12 p-2 text-white text-sm rounded-md bg-salmon ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-salmon hover:bg-darkGreen'}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Join the Slack'}
        </button>
      </form>
      <p className="text-black text-sm mt-4">Not currently in the Hack Club Slack? Enter your email to get join instructions!</p>
    </div>
  );
};

export default EmailSignup;