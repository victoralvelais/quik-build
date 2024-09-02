import FormData from 'form-data';
import Mailgun from 'mailgun.js';

const { MAILGUN_API_KEY, MAILING_LIST_ADDRESS } = process.env;

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({ username: 'api', key: MAILGUN_API_KEY || '' });

interface User {
  address: string;
  name?: string;
  vars?: {
    [key: string]: string;
  };
  subscribed?: 'yes' | 'no';
  upsert?: 'yes' | 'no';
}

export const addEmailToList = async (form: { beta?: any; name?: string; email: string }) => {
  const userProfile: User = { address: form.email, subscribed: 'yes', upsert: 'yes' }

  if (form.beta) {
    userProfile.name = form.name;
    userProfile.vars = { ...form.beta };
  }

  try {
    // @ts-expect-error If MAILING_LIST_ADDRESS error, it will be caught below
    const result = await mg.lists.members.createMember(MAILING_LIST_ADDRESS, userProfile)
    console.log('Email added to list successfully', result);
    return { success: true, message: 'Email added to list successfully', result };
  } catch (error) {
    console.error('Error adding email to list:', error);
    return { success: false, message: 'Failed to add email to list', error };
  }
};
export const unsubscribeEmailFromList = async (email: string) => {
  try {
    // @ts-expect-error If MAILING_LIST_ADDRESS error, it will be caught below
    const result = await mg.lists.members.updateMember(MAILING_LIST_ADDRESS, email, { subscribed: false })
    console.log('Email unsubscribed successfully', result);
    return { success: true, message: 'Email unsubscribed successfully', result };
  } catch (error) {
    console.error('Error unsubscribing email from list:', error);
    return { success: false, message: 'Failed to unsubscribe email from list', error };
  }
};
