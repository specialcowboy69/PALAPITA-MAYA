import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createOrder } from '@/lib/paypal';
import { differenceInDays } from 'date-fns';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const PRICE_PER_NIGHT = 150;

type CreateOrderBody = {
  customerName?: string;
  email?: string;
  phone?: string;
  startDate?: string;
  endDate?: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json() as CreateOrderBody;
    const { customerName, email, phone, startDate, endDate } = body;

    if (!customerName || !email) {
      return NextResponse.json({ error: 'Nombre y email requeridos' }, { status: 400 });
    }

    if (!startDate || !endDate) {
      return NextResponse.json({ error: 'Fechas requeridas' }, { status: 400 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json({ error: 'Fechas inválidas' }, { status: 400 });
    }

    const nights = differenceInDays(end, start);
    if (nights <= 0) {
      return NextResponse.json({ error: 'Rango de fechas inválido' }, { status: 400 });
    }

    const totalAmount = nights * PRICE_PER_NIGHT;
    const { jsonResponse, httpStatusCode } = await createOrder(totalAmount.toString());

    if (httpStatusCode !== 200 && httpStatusCode !== 201) {
      console.error('Checkout create-order PayPal error:', {
        httpStatusCode,
        jsonResponse,
      });
      return NextResponse.json({ error: 'Error en PayPal' }, { status: 500 });
    }

    const paypalOrderId = typeof jsonResponse.id === 'string' ? jsonResponse.id : null;
    if (!paypalOrderId) {
      console.error('Checkout create-order missing PayPal order id:', jsonResponse);
      return NextResponse.json({ error: 'PayPal no devolvió ID de orden' }, { status: 500 });
    }

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
    console.error('Checkout create-order API error:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
