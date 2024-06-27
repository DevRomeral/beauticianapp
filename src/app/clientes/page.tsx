import { useTranslations } from 'next-intl';

import DebugInfo from '@/components/DebugInfo';

export default function ClientesPage() {
  const t = useTranslations('Clientes');

  return (
    <div className="container mx-auto">
      <h1>{t('title')}</h1>
      <DebugInfo>
        <p>To Be Done</p>
      </DebugInfo>
    </div>
  );
}
