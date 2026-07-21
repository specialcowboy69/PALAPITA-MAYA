"use client"

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

type Reservation = {
  id: string;
  customerName: string;
  email: string;
  startDate: string;
  endDate: string;
  status: string;
};

type BlockedDate = {
  id: string;
  date: string;
};

type Inquiry = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'READ' | 'UNREAD';
  createdAt: string;
};

export default function AdminDashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [startDateBlock, setStartDateBlock] = useState('');
  const [endDateBlock, setEndDateBlock] = useState('');
  const [loadError, setLoadError] = useState('');

  const fetchData = useCallback(async () => {
    try {
      setLoadError('');
      const [resRes, resDates, resInq] = await Promise.all([
        fetch('/api/admin/reservations'),
        fetch('/api/admin/blocked-dates'),
        fetch('/api/admin/inquiries'),
      ]);

      if (!resRes.ok || !resDates.ok || !resInq.ok) {
        throw new Error('No se pudieron cargar todos los datos del panel.');
      }

      const dataRes: { reservations?: Reservation[] } = await resRes.json();
      const dataDates: { blockedDates?: BlockedDate[] } = await resDates.json();
      const dataInq: Inquiry[] | { error?: string } = await resInq.json();

      setReservations(dataRes.reservations || []);
      setBlockedDates(dataDates.blockedDates || []);
      setInquiries(Array.isArray(dataInq) ? dataInq : []);
    } catch (error) {
      console.error('Admin dashboard load error:', error);
      setLoadError('No se pudieron cargar los datos del panel. Revisa los logs de Vercel.');
    }
  }, []);

  useEffect(() => {
    // This dashboard is client-only and loads protected admin data after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchData();
  }, [fetchData]);

  const blockDate = async () => {
    if (!startDateBlock) return;
    try {
      const res = await fetch('/api/admin/blocked-dates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate: startDateBlock, endDate: endDateBlock || startDateBlock, reason: 'Bloqueo manual' })
      });

      if (!res.ok) {
        const data: { error?: string } = await res.json();
        alert(data.error || 'Error al bloquear');
        return;
      }

      setStartDateBlock('');
      setEndDateBlock('');
      await fetchData();
    } catch {
      alert('Error de red');
    }
  };

  const unblockDate = async (date: string) => {
    await fetch(`/api/admin/blocked-dates?date=${date}`, {
      method: 'DELETE'
    });
    await fetchData();
  };

  const markInquiryAsRead = async (id: string, currentStatus: Inquiry['status']) => {
    const newStatus = currentStatus === 'READ' ? 'UNREAD' : 'READ';
    await fetch('/api/admin/inquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus })
    });
    await fetchData();
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta consulta?')) return;
    await fetch(`/api/admin/inquiries?id=${id}`, {
      method: 'DELETE'
    });
    await fetchData();
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Panel de Administración</h1>
        <Link href="/" style={{ textDecoration: 'none', color: '#166534', fontWeight: 'bold' }}>&larr; Volver a la web</Link>
      </div>

      {loadError && (
        <p style={{ marginTop: '1rem', color: '#991b1b', background: '#fee2e2', padding: '0.75rem', borderRadius: '6px' }}>
          {loadError}
        </p>
      )}

      <section style={{ marginTop: '3rem' }}>
        <h2>Bloquear Rango de Fechas</h2>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.8rem', marginBottom: '0.2rem' }}>Desde</label>
            <input
              type="date"
              value={startDateBlock}
              onChange={(e) => setStartDateBlock(e.target.value)}
              style={{ padding: '0.5rem' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.8rem', marginBottom: '0.2rem' }}>Hasta (Opcional)</label>
            <input
              type="date"
              value={endDateBlock}
              onChange={(e) => setEndDateBlock(e.target.value)}
              min={startDateBlock}
              style={{ padding: '0.5rem' }}
            />
          </div>
          <button onClick={blockDate} disabled={!startDateBlock} style={{ padding: '0.5rem 1rem', background: '#166534', color: 'white', border: 'none', cursor: startDateBlock ? 'pointer' : 'not-allowed', opacity: startDateBlock ? 1 : 0.5, height: '40px' }}>Bloquear</button>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <h3>Fechas Bloqueadas</h3>
          <ul>
            {blockedDates.map((b) => (
              <li key={b.id} style={{ marginBottom: '0.5rem' }}>
                {new Date(b.date).toLocaleDateString()}
                <button onClick={() => unblockDate(b.date)} style={{ marginLeft: '1rem', color: 'red', cursor: 'pointer', background: 'none', border: 'none' }}>Desbloquear</button>
              </li>
            ))}
            {blockedDates.length === 0 && <p>No hay fechas bloqueadas manualmente.</p>}
          </ul>
        </div>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2>Últimas Reservas</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr style={{ textAlign: 'left', background: '#f1f5f9' }}>
              <th style={{ padding: '0.5rem' }}>Cliente</th>
              <th style={{ padding: '0.5rem' }}>Email</th>
              <th style={{ padding: '0.5rem' }}>Inicio</th>
              <th style={{ padding: '0.5rem' }}>Fin</th>
              <th style={{ padding: '0.5rem' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.5rem' }}>{r.customerName}</td>
                <td style={{ padding: '0.5rem' }}>{r.email}</td>
                <td style={{ padding: '0.5rem' }}>{new Date(r.startDate).toLocaleDateString()}</td>
                <td style={{ padding: '0.5rem' }}>{new Date(r.endDate).toLocaleDateString()}</td>
                <td style={{ padding: '0.5rem', fontWeight: 'bold', color: r.status === 'PAID' ? '#166534' : '#d97706' }}>{r.status}</td>
              </tr>
            ))}
            {reservations.length === 0 && (
              <tr><td colSpan={5} style={{ padding: '1rem', textAlign: 'center' }}>No hay reservas todavía.</td></tr>
            )}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: '3rem', backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <h2>Consultas de Contacto</h2>
        <div style={{ marginTop: '1rem' }}>
          {inquiries.length === 0 ? (
            <p>No hay consultas nuevas.</p>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {inquiries.map((inq) => (
                <div key={inq.id} style={{
                  backgroundColor: '#fff',
                  padding: '1rem',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                  borderLeft: inq.status === 'UNREAD' ? '4px solid #166534' : '4px solid #cbd5e1'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <strong>{inq.name} ({inq.email})</strong>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      {new Date(inq.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p style={{ margin: '0.5rem 0', color: '#334155' }}>{inq.message}</p>
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                    <button
                      onClick={() => markInquiryAsRead(inq.id, inq.status)}
                      style={{
                        background: 'none',
                        border: '1px solid #cbd5e1',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      {inq.status === 'UNREAD' ? 'Marcar como leída' : 'Marcar como no leída'}
                    </button>
                    <button
                      onClick={() => deleteInquiry(inq.id)}
                      style={{
                        background: 'none',
                        border: '1px solid #fee2e2',
                        color: '#991b1b',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
