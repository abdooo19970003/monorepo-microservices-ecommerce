import nodemailer from "nodemailer";

// Create a transporter for SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "abdooo1997003@gmail.com",
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});


export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: "'Abdulloh Elkuse' <abdooo1997003@gmail.com>",
      to,
      subject,
      html,
    })
    console.log('Message sent: %s', info.messageId);
  }
  catch (error) {
    console.log(error)
  }
}