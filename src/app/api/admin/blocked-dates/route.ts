export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { eachDayOfInterval } from 'date-fns';

export async function GET() {
  try {
    const blockedDates = await prisma.blockedDate.findMany();
    return NextResponse.json({ blockedDates });
  } catch (error) {
    console.error('Admin blocked dates GET error:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { startDate, endDate, reason } = await request.json();
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : start;
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json({ error: 'Fechas inválidas' }, { status: 400 });
    }

    if (end < start) {
      return NextResponse.json({ error: 'La fecha "Hasta" no puede ser anterior a "Desde"' }, { status: 400 });
    }
    
    // Obtener todos los días en el rango
    const days = eachDayOfInterval({ start, end });
    
    // Insertar cada día, ignorando si ya existe (unique constraint)
    for (const d of days) {
      // Forzar a la misma hora para evitar problemas de timezone
      const normalizedDate = new Date(d.toISOString().split('T')[0]);
      
      const exists = await prisma.blockedDate.findFirst({
        where: { date: normalizedDate }
      });

      if (!exists) {
        await prisma.blockedDate.create({
          data: {
            date: normalizedDate,
            reason: reason || 'Bloqueo manual'
          }
        });
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin blocked dates POST error:', error);
    return NextResponse.json({ error: 'Error al bloquear rango de fechas' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get('date');
    if (!dateStr) return NextResponse.json({ error: 'Fecha requerida' }, { status: 400 });
    
    await prisma.blockedDate.delete({
      where: { date: new Date(dateStr) }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin blocked dates DELETE error:', error);
    return NextResponse.json({ error: 'Error al desbloquear' }, { status: 500 });
  }
}
