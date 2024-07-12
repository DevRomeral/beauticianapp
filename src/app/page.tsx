'use client';

import { Dashboard } from '@/services/api/ApiUserService';
import { Customer } from '@/types/customer.model';
import { useTranslations } from 'next-intl';
import { ChangeEvent } from 'react';

import AppointmentCard from '@/components/appointment/AppointmentCard';
import CustomerCard from '@/components/cards/CustomerCard';
import Button from '@/components/inputs/Button';
import CheckBox from '@/components/inputs/CheckBox';
import DateField from '@/components/inputs/dates/DateField';
import DateTimeField from '@/components/inputs/dates/DateTimeField';
import RadioInput from '@/components/inputs/radio/RadioInput';
import Select from '@/components/inputs/Select';
import TextArea from '@/components/inputs/TextArea';
import TextField from '@/components/inputs/TextField';

export default function HomePage() {
  const t = useTranslations('Home');
  async function tmp() {
    try {
      const response = await Dashboard();
      console.log('Dashboard', response);
    } catch (err) {
      console.error('Error al pedir el dashboard');
      alert('Inicia sesión primero');
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center gap-2">
      <Button onClick={tmp} style="primary" text="Dashboard" type="button" />
      <h1>{t('title')}</h1>
      <div className="flex flex-col gap-2">
        <div>
          <h1>H1 Heading Text</h1>
          <h2>H2 Heading Text</h2>
          <h3>H3 Heading Text</h3>
          <h4>H4 Heading Text</h4>
          <h5>H5 Heading Text</h5>
          <h6>H6 Heading Text</h6>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, placeat. Alias explicabo veritatis labore
            harum, voluptate consequatur sunt cumque ad.
          </p>
        </div>
        <div>
          <h1>Controls</h1>
          <h3>Buttons</h3>
          <div className="flex flex-row gap-2">
            <Button text="Normal" />
            <Button style="primary" text="Primary" />
            <Button style="danger" text="Danger" />
            <Button style="success" text="Success" />
          </div>
          <h3>Radio Input</h3>
          <RadioInput
            isLoading={false}
            defaultValue="value2"
            name="tmpRadio"
            onChange={(value: string) => {
              console.log(value);
            }}
            options={[
              { id: 'id1', value: 'value1', label: 'children1' },
              { id: 'id2', value: 'value2', label: 'children2' },
            ]}
          />
          <h3>Check Box</h3>
          <CheckBox
            id={'cbDemo'}
            value={'cbDemo'}
            label={'CheckBox'}
            name={'cbDemo'}
            // currentValue={true}
            onChange={function (e: ChangeEvent<HTMLInputElement>): void {
              console.log('Checked: ' + e.target.checked);
            }}
          />
          <h3>Text Fields</h3>
          <div className="flex flex-row gap-2">
            <TextField id="tfPrueba" label="Mi Input" placeholder="Placeholder" />
            <TextArea id="tfPruebaArea" label="Mi Textarea" placeholder="Placeholder" />
          </div>
          <DateField id={'dfDemo'} label={'Fecha'} />
          <DateTimeField id={'dfDemoTime'} label={'Fecha y Hora'} minDate={new Date(2024, 6, 9, 12, 0)} />
          <Select
            id={'dfDemo'}
            label={'Select'}
            options={[
              { value: '1', content: 'Primero' },
              { value: '2', content: 'Second' },
            ]}
          />
        </div>
        <div>
          <h1>Cards</h1>
          <h3>Appointment Cards</h3>
          <AppointmentCard date={new Date(Date.now())} customer="Adolfi" service="Pedicura"></AppointmentCard>
          <h3>Customer Cards</h3>
          <CustomerCard
            customer={new Customer('1', 'Gustavo', new Date(2001, 0, 1), new Date(2024, 0, 1, 12, 34), ['1', '2'])}
          />
        </div>
      </div>
    </div>
  );
}
