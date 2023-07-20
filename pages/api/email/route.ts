import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  resend.emails.send({
    from: "jens.erven@gmail.com",
    to: "jens.erven@gmail.com",
    subject: "Hello World",
    html: "<h1>Goed zo!</h1><p>Congrats on sending your <strong>first email</strong>!</p>",
  });

  return NextResponse.json({
    status: "Ok",
  });
}
