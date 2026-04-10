require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// 🔥 CONFIG SMTP INFOMANIAK
const transporter = nodemailer.createTransport({
  host: "mail.infomaniak.com",
  port: 465,
  secure: true, // 🔥 SSL direct
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// 📧 ROUTE ENVOI
app.post('/send-card', async (req, res) => {

  const { email, prenom, imageBase64 } = req.body;

  if (!email || !imageBase64) {
    return res.status(400).json({ error: "Données manquantes" });
  }

  try {

    await transporter.sendMail({
      from: `"La Tanière" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "La Tanière - Ta nouvelle carte de membre",
      text: `Bonjour ${prenom},

Voici ta carte de membre.
Elle sera à scanner à chaque visite.

À bientôt,
La Tanière`,
      attachments: [{
        filename: `Carte_${prenom}.png`,
        content: imageBase64.split('base64,')[1],
        encoding: 'base64'
      }]
    });

    console.log("✅ Email envoyé à", email);

    res.json({ success: true });

  } catch (err) {
    console.error("❌ Erreur email :", err);
    res.status(500).json({ error: "Erreur envoi email" });
  }
});

// ▶️ LANCEMENT
app.listen(3000, () => {
  console.log("🚀 Serveur lancé sur http://localhost:3000");
});