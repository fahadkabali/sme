import type { NextApiRequest, NextApiResponse } from 'next';
import { sendNotification } from '../../utils/notifications';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, eventType, details } = req.body;

  if (!email || !eventType) {
    return res.status(400).json({ error: 'Email and event type are required.' });
  }

  const eventMessages: Record<string, string> = {
    newMatch: `Congratulations! A new match has been created for you: ${details}.`,
    update: `There is an update regarding your activity: ${details}.`,
  };

  const message = eventMessages[eventType] || 'You have a new notification.';

  try {
    await sendNotification({
      to: email,
      subject: `Platform Notification: ${eventType}`,
      message,
    });
    res.status(200).json({ message: 'Notification sent successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send notification.' });
  }
}
