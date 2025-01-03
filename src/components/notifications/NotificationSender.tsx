"use client"
import { useState } from 'react';

const NotificationSender = () => {
  const [email, setEmail] = useState('');
  const [eventType, setEventType] = useState('newMatch');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const sendNotification = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/notifications/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, eventType, details }),
      });

      if (response.ok) {
        setMessage('Notification sent successfully.');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      setMessage('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Send Notification</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendNotification();
        }}
      >
        <div className="mb-3">
          <label className="block font-medium mb-1">Recipient Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block font-medium mb-1">Event Type</label>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="newMatch">New Match</option>
            <option value="update">Update</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="block font-medium mb-1">Details</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Notification'}
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
    </div>
  );
};

export default NotificationSender;
