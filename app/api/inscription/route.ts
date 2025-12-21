import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  const data = await req.json()

  const transporter = nodemailer.createTransport({
    host: "smtp.etiennissi@gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })

  await transporter.sendMail({
    from: `"ETHSUN" <${process.env.MAIL_USER}>`,
    to: "etienchrist@gmail.com.uk",
    subject: "Nouvelle inscription ETHSUN",
    html: `
      <h2>Nouvelle inscription</h2>
      <p><b>Nom :</b> ${data.lastName}</p>
      <p><b>Email :</b> ${data.email}</p>
      <p><b>Programme :</b> ${data.program}</p>
      <p><b>Message :</b> ${data.message}</p>
    `,
  })

  return NextResponse.json({ success: true })
}
