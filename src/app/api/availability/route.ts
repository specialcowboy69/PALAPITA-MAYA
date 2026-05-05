import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { eachDayOfInterval } from 'date-fns';

export async function GET() {
  try {
    // 1. Obtener todas las fechas bloqueadas manualmente
    const blockedDatesDb = await prisma.blockedDate.findMany();
    const manualBlocked = blockedDatesDb.map((b: any) => b.date.toISOString().split('T')[0]);

    // 2. Obtener las reservas activas (PAGADAS o PENDIENTES)
    const reservations = await prisma.reservation.findMany({
      where: {
        status: {
          in: ['PAID', 'PENDING']
        }
      }
    });

    // Extraer todos los días individuales ocupados por las reservas
    let reservedDates: string[] = [];
    reservations.forEach((res: any) => {
      // eachDayOfInterval incluye ambos extremos (start y end)
      const days = eachDayOfInterval({ start: res.startDate, end: res.endDate });
      const formattedDays = days.map((d: Date) => d.toISOString().split('T')[0]);
      reservedDates = [...reservedDates, ...formattedDays];
    });

    // Combinar ambos y eliminar duplicados
    const unavailableDates = Array.from(new Set([...manualBlocked, ...reservedDates]));

    return NextResponse.json({ unavailableDates });
  } catch (error) {
    return NextResponse.json({ error: 'Error al consultar disponibilidad' }, { status: 500 });
  }
}
