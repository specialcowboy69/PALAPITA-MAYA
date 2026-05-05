import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ reservations });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener reservas' }, { status: 500 });
  }
}
