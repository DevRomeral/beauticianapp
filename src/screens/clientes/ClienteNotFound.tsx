import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import Button from '@/components/inputs/Button';

export const ClienteNotFoundConfig = {
  btnGoBackId: 'btnGoBack',
  btnGoToNewCustomerId: 'btnGoToNewCustomer',
};

export interface ClienteNotFoundProps {}

const ClienteNotFound: React.FC<ClienteNotFoundProps> = ({}) => {
  const t = useTranslations('Clientes.NotFound');
  const router = useRouter();

  const onCancel = async () => {
    router.back();
  };

  const onGoToCreateNew = async () => {
    router.replace('/clientes/crear');
  };

  return (
    <div className={`container mx-auto my-2 flex flex-col gap-3`}>
      <div className="flex flex-col gap-3">
        <p>{t('description')}</p>
        <div className="flex gap-3">
          <Button
            id={ClienteNotFoundConfig.btnGoBackId}
            text={t('form.goBack.title')}
            icon="back"
            style=""
            onClick={onCancel}
          />
          <Button
            id={ClienteNotFoundConfig.btnGoToNewCustomerId}
            text={t('form.createNew.title')}
            icon="user-plus"
            style="primary"
            onClick={onGoToCreateNew}
          />
        </div>
      </div>
    </div>
  );
};

export default ClienteNotFound;
