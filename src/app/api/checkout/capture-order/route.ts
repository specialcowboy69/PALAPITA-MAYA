import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { captureOrder } from '@/lib/paypal';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type CaptureOrderBody = {
  orderID?: string;
};

export async function POST(request: Request) {
  try {
    const { orderID } = await request.json() as CaptureOrderBody;

    if (!orderID) {
      return NextResponse.json({ error: 'Order ID requerido' }, { status: 400 });
    }

    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);

    if (httpStatusCode === 200 || httpStatusCode === 201) {
      await prisma.reservation.updateMany({
        where: { paypalOrderId: orderID },
        data: { status: 'PAID' }
      });

      return NextResponse.json(jsonResponse);
    }

    console.error('Checkout capture-order PayPal error:', {
      httpStatusCode,
      jsonResponse,
    });
    return NextResponse.json({ error: 'Fallo al capturar pago en PayPal' }, { status: 500 });
  } catch (error) {
    console.error('Checkout capture-order API error:', error);
    return NextResponse.json({ error: 'Error interno al capturar pago' }, { status: 500 });
  }
}
