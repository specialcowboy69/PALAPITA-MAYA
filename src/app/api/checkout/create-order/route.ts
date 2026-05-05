import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createOrder } from '@/lib/paypal';
import { differenceInDays } from 'date-fns';

const PRICE_PER_NIGHT = 150; // Ejemplo de precio por noche

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, email, phone, startDate, endDate } = body;

    if (!startDate || !endDate) {
      return NextResponse.json({ error: 'Fechas requeridas' }, { status: 400 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Calcular noches y precio
    const nights = differenceInDays(end, start);
    if (nights <= 0) {
      return NextResponse.json({ error: 'Rango de fechas inválido' }, { status: 400 });
    }
    
    const totalAmount = nights * PRICE_PER_NIGHT;

    // 1. Crear la orden en PayPal
    const { jsonResponse, httpStatusCode } = await createOrder(totalAmount.toString());
    
    if (httpStatusCode !== 200 && httpStatusCode !== 201) {
      return NextResponse.json({ error: 'Error en PayPal' }, { status: 500 });
    }

    const paypalOrderId = jsonResponse.id;

    // 2. Guardar en Base de Datos como PENDING
    const reservation = await prisma.reservation.create({
      data: {
        customerName,
        email,
        phone,
        startDate: start,
        endDate: end,
        totalAmount,
        paypalOrderId,
        status: 'PENDING'
      }
    });

    return NextResponse.json({ 
      id: paypalOrderId,
      reservationId: reservation.id 
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
