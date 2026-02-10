import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, pseudo, type, title } = await request.json();

    // 1. Mail de réception (Envoyé quand le citoyen poste)
    if (type === 'confirmation_reception') {
      await resend.emails.send({
        from: 'Montpellier Horizon <onboarding@resend.dev>', // Mets ton domaine si tu en as un
        to: email,
        subject: 'Votre proposition a bien été reçue',
        html: `
          <h1>Merci ${pseudo} !</h1>
          <p>Votre proposition "<strong>${title}</strong>" a bien été enregistrée.</p>
          <p>Elle est actuellement en cours de traitement par nos administrateurs.</p>
          <p>Vous recevrez un nouvel email dès sa validation.</p>
        `
      });
    }

    // 2. Mail de validation (Envoyé quand l'admin valide)
    if (type === 'publication_validee') {
      await resend.emails.send({
        from: 'Montpellier Horizon <onboarding@resend.dev>',
        to: email,
        subject: 'Bonne nouvelle : Votre proposition est en ligne !',
        html: `
          <h1>Félicitations ${pseudo}</h1>
          <p>Votre proposition "<strong>${title}</strong>" a été validée par l'équipe.</p>
          <p>Elle est désormais visible publiquement sur la plateforme. N'hésitez pas à la partager !</p>
        `
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur email' }, { status: 500 });
  }
}