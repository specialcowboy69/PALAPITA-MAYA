export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required' },
        { status: 400 }
      );
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        message,
      },
    });

    return NextResponse.json({ success: true, inquiry });
  } catch (error: any) {
    console.error('CRITICAL ERROR in /api/contact:', error.message, error.stack);
    return NextResponse.json(
      { error: 'Error processing inquiry', details: error.message },
      { status: 500 }
    );
  }
}
