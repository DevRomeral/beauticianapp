'use client';

import DetallesCliente from '@/screens/clientes/DetallesCliente';
import { useParams } from 'next/navigation';

export default function DetalleClientesPage() {
  const { id } = useParams();

  return <DetallesCliente customerId={id as string} />;
}
