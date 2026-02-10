import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email, pseudo, type, title } = await request.json();

  if (type === 'confirmation_reception') {
    await resend.emails.send({
      from: 'Montpellier Horizon <contact@votre-domaine.com>',
      to: email,
      subject: 'Merci pour votre participation !',
      html: `<p>Bonjour ${pseudo}, votre proposition "${title}" a bien été reçue et est en cours de validation par nos admins.</p>`
    });
  }

  if (type === 'publication_validee') {
    await resend.emails.send({
      from: 'Montpellier Horizon <contact@votre-domaine.com>',
      to: email,
      subject: 'Votre proposition est en ligne !',
      html: `<p>Félicitations ${pseudo}, votre proposition "${title}" a été validée et est maintenant visible sur le site.</p>`
    });
  }

  return NextResponse.json({ success: true });
}