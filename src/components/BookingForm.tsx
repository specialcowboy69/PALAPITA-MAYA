'use client';

import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { differenceInDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PRICE_PER_NIGHT = 150;

export default function BookingForm({ dict }: { dict: any }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    guests: '2'
  });
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [unavailableDates, setUnavailableDates] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [nights, setNights] = useState(0);

  useEffect(() => {
    fetch('/api/availability')
      .then(res => res.json())
      .then((data: any) => setUnavailableDates(data.unavailableDates || []))
      .catch((err: any) => console.error(err));
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const diff = differenceInDays(endDate, startDate);
      if (diff > 0) {
        // Verificar solapamiento
        const isOverlap = unavailableDates.some((date: string) => {
          const d = new Date(date);
          return d >= startDate && d < endDate;
        });
        if (isOverlap) {
          setError(dict.error_overlap);
          setNights(0);
        } else {
          setError('');
          setNights(diff);
        }
      } else {
        setError(dict.error_order);
        setNights(0);
      }
    }
  }, [startDate, endDate, unavailableDates, dict]);

  const excludedDates = unavailableDates.map((date: string) => new Date(new Date(date).getTime() + new Date(date).getTimezoneOffset() * 60000));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const isFormValid = formData.name && formData.email && nights > 0 && !error;
  const totalAmount = nights * PRICE_PER_NIGHT;

  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test", currency: "USD", intent: "capture" }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'left', background: 'var(--bg-primary)', padding: '2rem', borderRadius: '8px' }}>
        
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="startDate" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{dict.arrival}</label>
            <DatePicker 
              selected={startDate} 
              onChange={(date: Date | null) => setStartDate(date)} 
              selectsStart 
              startDate={startDate} 
              endDate={endDate} 
              minDate={new Date()} 
              excludeDates={excludedDates}
              placeholderText={dict.select_date}
              className="datepicker-input"
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="endDate" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{dict.departure}</label>
            <DatePicker 
              selected={endDate} 
              onChange={(date: Date | null) => setEndDate(date)} 
              selectsEnd 
              startDate={startDate} 
              endDate={endDate} 
              minDate={startDate || new Date()} 
              excludeDates={excludedDates}
              placeholderText={dict.select_date}
              className="datepicker-input"
            />
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .datepicker-input {
            padding: 1rem;
            border-radius: 4px;
            border: 1px solid rgba(0,0,0,0.1);
            width: 100%;
            font-size: 1rem;
          }
          .react-datepicker-wrapper {
            width: 100%;
          }
          /* Pintar fechas bloqueadas en rojo */
          .react-datepicker__day--excluded {
            background-color: #ffebee !important;
            color: #d32f2f !important;
            text-decoration: line-through;
            opacity: 0.8;
          }
          .react-datepicker__day--excluded:hover {
            background-color: #ffcdd2 !important;
          }
        `}} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="name" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{dict.fullname}</label>
            <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder={dict.fullname_placeholder} style={{ padding: '1rem', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.1)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="email" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{dict.email}</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder={dict.email_placeholder} style={{ padding: '1rem', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.1)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="whatsapp" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{dict.whatsapp}</label>
            <input type="tel" id="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder={dict.whatsapp_placeholder} style={{ padding: '1rem', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.1)' }} />
          </div>
        </div>

        {nights > 0 && !error && (
          <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>{dict.summary}</h3>
            <p style={{ color: 'var(--text-muted)' }}>{nights} {nights === 1 ? dict.night : dict.nights} x ${PRICE_PER_NIGHT} USD</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)', marginTop: '0.5rem' }}>{dict.total}: ${totalAmount} USD</p>
          </div>
        )}

        <div style={{ marginTop: '1rem' }}>
          {isFormValid ? (
            <PayPalButtons
              style={{ layout: "vertical", shape: "rect", color: "gold" }}
              createOrder={async () => {
                const res = await fetch("/api/checkout/create-order", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    customerName: formData.name,
                    email: formData.email,
                    phone: formData.whatsapp,
                    startDate: startDate?.toISOString(),
                    endDate: endDate?.toISOString()
                  }),
                });
                const data = await res.json();
                if (data.id) return data.id;
                throw new Error("No se pudo crear la orden");
              }}
              onApprove={async (data, actions) => {
                const res = await fetch("/api/checkout/capture-order", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ orderID: data.orderID }),
                });
                const captureData = await res.json();
                if (captureData.status === "COMPLETED") {
                  alert(dict.success);
                  // Aquí se podría limpiar el form o redirigir
                  setFormData({ ...formData });
                  setStartDate(null);
                  setEndDate(null);
                } else {
                  alert(dict.error_capture);
                }
              }}
              onError={(err: any) => {
                console.error("PayPal Error:", err);
                alert(dict.error_paypal);
              }}
            />
          ) : (
            <button disabled style={{ width: '100%', padding: '1.25rem', backgroundColor: '#ccc', color: '#666', borderRadius: '30px', cursor: 'not-allowed' }}>
              {dict.pay_button}
            </button>
          )}
        </div>
      </div>
    </PayPalScriptProvider>
  );
}
