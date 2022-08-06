import 'dotenv/config';
import nodemailer from 'nodemailer'
import express from 'express';

import { prisma } from './prisma';

const app = express();
app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD
  }
});

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot
    }
  });

  await transport.sendMail({
    from: 'Equipe Feedback <oi@feedback.com>',
    to: 'Luiz Fernando Verissimo <luizfverissimo@gmail.com>',
    subject: 'Novo Feedback!',
    html: [
      '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
      `<p>Tipo do comentário: ${type}</p>`,
      `<p>Commentário: ${comment}</p>`,
      '</div>'
    ].join('\n')
  })

  return res.status(201).json({ data: feedback });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`HTTP server running at ${process.env.SERVER_PORT}`);
});
