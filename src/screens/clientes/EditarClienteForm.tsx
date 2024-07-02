import { useAlert } from '@/contexts/AlertContext';
import { getCustomerById, saveCustomer } from '@/services/api/ApiCustomerService';
import { Customer } from '@/types/customer.model';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import DiseaseCard from '@/components/cards/DiseaseCard';
import FormErrorCard from '@/components/cards/FormErrorCard';
import DebugInfo from '@/components/DebugInfo';
import LoadingPlaceholder from '@/components/display/LoadingPlaceholder';
import PageTitle from '@/components/display/PageTitle';
import Button from '@/components/inputs/Button';
import TextArea from '@/components/inputs/TextArea';
import TextField from '@/components/inputs/TextField';

import ClienteNotFound from './ClienteNotFound';

export interface IEditarClienteFormConfig {
  formId: string;
  hCustomerId: string;
  tfNameId: string;
  tfLastname1Id: string;
  tfLastname2Id: string;
  spAgeTextId: string;
  btnAddDiseaseId: string;
  tfWatchId: string;
  btnCancelId: string;
  btnSaveId: string;
  btnGoToNewCustomerId: string;
}

export const FormConfig: IEditarClienteFormConfig = {
  formId: 'editCustomerForm',
  hCustomerId: 'hiddenCustomerId',
  tfNameId: 'tfCustomerName',
  tfLastname1Id: 'tfCustomerLastname1',
  tfLastname2Id: 'tfCustomerLastname2',
  spAgeTextId: 'spanAgeText',
  btnAddDiseaseId: 'btnAddDisease',
  tfWatchId: 'watchCustomer',
  btnCancelId: 'btnEditCancel',
  btnSaveId: 'btnSaveCustomer',
  btnGoToNewCustomerId: 'btnGoToNewCustomer',
};

export interface EditarClienteFormProps {
  customerId: string;
}

const EditarClienteForm: React.FC<EditarClienteFormProps> = ({ customerId }) => {
  const t = useTranslations('Clientes.CrearEditar');
  const router = useRouter();
  const { showConfirm } = useAlert();
  const [_customerId, _setCustomerId] = useState(customerId);
  const [customerNotFound, setCustomerNotFound] = useState(false);
  const isNewCustomer = useMemo(() => _customerId == '', [_customerId]);
  const createEditTextPrefix = useMemo(() => (isNewCustomer ? 'create' : 'edit'), [isNewCustomer]);
  // undefined: no cargado
  const [customer, setCustomer] = useState<Customer>({ id: '', age: 0, name: '', lastAppointment: null, diseases: [] });
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getCustomerById(customerId);

      if (response == null) {
        setCustomerNotFound(true);
        return;
      }

      setCustomer(response);
    }

    if (isNewCustomer) {
      setCustomer({
        age: 0,
        id: '',
        diseases: [],
        name: '',
        lastAppointment: null,
      });
    } else {
      fetchData();
    }
  }, [isNewCustomer, customerId]);

  const onCancel = async () => {
    showConfirm({
      title: '',
      message: t('form.cancel.alert.description'),
      onConfirm: () => {
        router.back();
      },
      confirmText: t('form.cancel.alert.ok'),
      cancelText: t('form.cancel.alert.cancel'),
    });
  };

  const onSave = async () => {
    setErrorMessages([]);
    const errors = [];
    const form = document.getElementById(FormConfig.formId) as HTMLFormElement;
    const formData = new FormData(form);

    const name: string = formData.get(FormConfig.tfNameId)?.toString() || '';
    if (name.length == 0) {
      errors.push('El nombre del cliente no puede estar vacío');
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }

    // TODO: leer desde el formulario
    const savedCustomer: Customer = {
      id: customer?.id || '',
      age: customer?.age || 0,
      diseases: customer?.diseases || [],
      name,
      lastAppointment: null,
    };

    const response = await saveCustomer(savedCustomer);

    if (isNewCustomer && response?.id != '') {
      _setCustomerId(response!.id || '');
    }

    alert('Guardado (guiño, guiño) por el server: ' + JSON.stringify(response));
  };

  if (customerNotFound) return <ClienteNotFound />;

  // const isLoading = true;
  const isLoading = customer?.id == '';

  // TODO: crear plantilla para cuando no se haya encontrado al cliente por su ID
  return (
    <div className={`container mx-auto my-2 flex flex-col gap-3`}>
      <div>
        <PageTitle title={t(`title.${createEditTextPrefix}`)}></PageTitle>
      </div>
      <form id={FormConfig.formId} className="flex flex-col gap-3">
        <input id={FormConfig.hCustomerId} name={FormConfig.hCustomerId} type="hidden" value={customer?.id} />
        <div>
          <DebugInfo>
            <p>ID: {customerId}</p>
            <p>Dará un error si se deja el nombre del cliente vacío</p>
          </DebugInfo>
        </div>
        <div className="flex flex-col gap-3">
          <TextField
            id={FormConfig.tfNameId}
            label={t('form.name.label')}
            value={customer?.name}
            placeholder={t('form.name.placeholder')}
            isLoading={isLoading}
            required={true}
          />
          <div className="flex gap-2">
            <TextField
              id={FormConfig.tfLastname1Id}
              label={t('form.lastname1.label')}
              placeholder={t('form.lastname1.placeholder')}
              isLoading={isLoading}
            />
            <TextField
              id={FormConfig.tfLastname2Id}
              label={t('form.lastname2.label')}
              placeholder={t('form.lastname2.placeholder')}
              isLoading={isLoading}
            />
          </div>
          <div className="flex items-end justify-between gap-2">
            <div className="flex-1">
              <DebugInfo>TODO: crear input de tipo fecha</DebugInfo>
            </div>
            <div className="flex-1 gap-2">
              <LoadingPlaceholder isLoading={isLoading} height="h-4">
                <span id={FormConfig.spAgeTextId} className="font-semibold">
                  {t('form.age', {
                    age: customer?.age,
                    plural: customer?.age == 1 ? '' : 's',
                  })}
                </span>
              </LoadingPlaceholder>
            </div>
          </div>
          <div className="flex items-end justify-between gap-2">
            <div className="flex flex-1">
              <DebugInfo>TODO Aquí irá selector con opciones fijas</DebugInfo>
            </div>
            <Button
              text={t('form.diseases.add.title')}
              icon="add"
              id={FormConfig.btnAddDiseaseId}
              onClick={() => alert('TO BE DONE')}
            />
          </div>
          <div className="flex gap-2">
            {customer &&
              customer.diseases.map((disease) => (
                <DiseaseCard key={disease} customerId={customer.id} disease={disease} />
              ))}
          </div>
          <TextArea
            id={FormConfig.tfWatchId}
            label={t('form.watch.label')}
            placeholder={t('form.watch.placeholder')}
            isLoading={isLoading}
            required={true}
          />
        </div>
        <FormErrorCard errors={errorMessages} />
        <div className="flex justify-between">
          <Button text={t('form.cancel.title')} icon="back" id={FormConfig.btnCancelId} onClick={onCancel} />
          <Button
            isLoading={isLoading}
            text={t(`form.save.${createEditTextPrefix}.title`)}
            id={FormConfig.btnSaveId}
            style="success"
            onClick={onSave}
          />
        </div>
      </form>
    </div>
  );
};

export default EditarClienteForm;
