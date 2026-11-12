import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name, age, category, position, experience,
      strengths, injuries, whatsapp, email,
    } = body ?? {};

    if (!name || !age) {
      return NextResponse.json({ error: 'Name and age are required.' }, { status: 400 });
    }
    const hasPhone = typeof whatsapp === 'string' && whatsapp.trim().length >= 6;
    const hasEmail = typeof email === 'string' && /.+@.+\..+/.test(email.trim());
    if (!hasPhone && !hasEmail) {
      return NextResponse.json({ error: 'Provide a WhatsApp number or an email.' }, { status: 400 });
    }

    const ageNum = parseInt(age, 10);
    const squad = ageNum <= 12 ? 'U12' : ageNum <= 14 ? 'U14' : ageNum <= 16 ? 'U16' : ageNum <= 18 ? 'U18' : 'U21';
    const stage = ageNum <= 12 ? 'Foundation' : ageNum <= 14 ? 'Development' : ageNum <= 16 ? 'Performance' : ageNum <= 18 ? 'Elite' : 'Transition';

    const { error: dbError } = await supabase.from('waitlist').insert({
      name: String(name).trim(),
      age: ageNum,
      squad,
      stage,
      category: category ?? null,
      position: position ?? null,
      level: experience ?? null,
      strengths: strengths?.trim() || null,
      injuries: injuries?.trim() || null,
      whatsapp: hasPhone ? whatsapp.trim() : null,
      email: hasEmail ? email.trim() : null,
    });

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json({ error: 'Could not save your details. Please try again.' }, { status: 500 });
    }

    const coachEmail = process.env.COACH_EMAIL || 'zainasad@gmail.com';
    const lines = [
      'TSV BAHRIA 1860 — FREE WAITLIST SIGN-UP',
      '',
      `Player Name: ${name}`,
      `Age: ${age} → ${squad} Squad (${stage} Stage)`,
      `Category: ${category ?? '—'}`,
      `Position: ${position ?? '—'}`,
      `Playing Level: ${experience ?? '—'}`,
      `Strengths & Weaknesses: ${strengths?.trim() || '—'}`,
      `Past Injuries: ${injuries?.trim() || 'None'}`,
      `WhatsApp: ${hasPhone ? whatsapp.trim() : '—'}`,
      `Email: ${hasEmail ? email.trim() : '—'}`,
    ].join('\n');

    // Notify coach
    await resend.emails.send({
      from: 'TSV Bahria 1860 <onboarding@resend.dev>',
      to: coachEmail,
      subject: `New waitlist sign-up: ${name} (age ${age})`,
      text: lines,
    }).catch((e) => console.error('Resend coach email error:', e));

    // Confirm to applicant if email provided
    if (hasEmail) {
      await resend.emails.send({
        from: 'TSV Bahria 1860 <onboarding@resend.dev>',
        to: email.trim(),
        subject: 'You are on the TSV Bahria 1860 waitlist!',
        text: `Hi ${name},\n\nThanks for joining the free waitlist for TSV Bahria 1860. Coach Zain will be in touch soon.\n\nYour details:\n${lines}\n\n— TSV Bahria 1860, Karachi`,
      }).catch((e) => console.error('Resend applicant email error:', e));
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Waitlist API error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}