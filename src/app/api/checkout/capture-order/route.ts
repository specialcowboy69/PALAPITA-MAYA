import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { captureOrder } from '@/lib/paypal';

export async function POST(request: Request) {
  try {
    const { orderID } = await request.json();

    // 1. Capturar orden en PayPal
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);

    if (httpStatusCode === 200 || httpStatusCode === 201) {
      // Pago exitoso, actualizar DB
      await prisma.reservation.updateMany({
        where: { paypalOrderId: orderID },
        data: { status: 'PAID' }
      });

      return NextResponse.json(jsonResponse);
    } else {
      return NextResponse.json({ error: 'Fallo al capturar pago en PayPal' }, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error interno al capturar pago' }, { status: 500 });
  }
}
