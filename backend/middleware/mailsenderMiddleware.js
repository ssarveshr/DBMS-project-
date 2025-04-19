// utils/emailSender.js
import { createTransport } from 'nodemailer';
import { email } from '../config';

// Create reusable transporter object
const transporter = createTransport({
  service: email.service,
  auth: {
    user: email.username,
    pass: email.password
  }
});

/**
 * Send email to a user
 * @param {string} toEmail - Recipient's email address
 * @param {string} subject - Email subject
 * @param {string} text - Plain text content
 * @param {string} html - HTML content (optional)
 */
const sendEmail = async (toEmail, subject, text, html = '') => {
  try {
    const mailOptions = {
      from: email.from,
      to: toEmail,
      subject: subject,
      text: text,
      html: html || text // Use HTML if provided, otherwise fallback to text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

export default sendEmail;