// app/api/contact/route.ts
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    const data = await resend.emails.send({
      from: "Royston Akash Dsouza <onboarding@resend.dev>", // must be verified in Resend
      to: ["roystonad2004@gmail.com"], // your receiving email
      subject: `Message from ${name} via Contact Form in Portfolio Website`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    })

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Email sending failed", error)
    return new Response(JSON.stringify({ error: "Email failed to send" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
