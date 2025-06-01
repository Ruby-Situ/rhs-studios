import nodemailer from 'nodemailer';
import formidable from 'formidable-serverless';

export const config = {
  api: {
    bodyParser: false, // Required to use formidable
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).send('Form error');
    }
    const { name, email, message, category } = fields;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
    console.log('GMAIL_USER:', process.env.GMAIL_USER || 'NOT SET');
    console.log('GMAIL_PASS:', process.env.GMAIL_PASS ? 'SET' : 'NOT SET');


    try {
      await transporter.sendMail({
        from: email,
        to: process.env.GMAIL_USER,
        subject: `Contact from ${name}`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Category: </strong> ${category}</p>
               <p>${message}</p>`,
      });

      return res.status(200).json({
        success: true,
        message: 'Message sent successfully. I will respond as soon as possible 🙂'
      });
    } catch (error) {
      console.error('Email send error:', error);
      return res.status(500).json({
        success: false,
        message: 'Error sending message.'});
    }
  });
}
