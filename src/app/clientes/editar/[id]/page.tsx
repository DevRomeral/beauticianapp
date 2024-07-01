'use client';

import EditarClienteForm from '@/screens/clientes/EditarClienteForm';
import { useParams } from 'next/navigation';

export default function EditarClientesPage() {
  const { id } = useParams();

  return <EditarClienteForm customerId={id as string} />;
}
