'use client';

import { Dashboard } from '@/services/api/ApiUserService';
import { Appointment } from '@/types/props/components/cards/appointments/appointment.model';

import AppointmentCard from '@/components/appointment/AppointmentCard';
import Button from '@/components/inputs/Button';
import TextField from '@/components/inputs/TextField';

export default function HomePage() {
  const appointment1: Appointment = {
    date: new Date(Date.now()),
    customer: 'Adolfi',
    service: 'Pedicura',
  };

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
      <h1>Home</h1>
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
          <h1>Buttons</h1>
          <div className="flex flex-row gap-2">
            <Button text="Normal" />
            <Button style="primary" text="Primary" />
            <Button style="danger" text="Danger" />
          </div>
        </div>
        <div>
          <h1>Text Fields</h1>
          <div className="flex flex-row gap-2">
            <TextField id="tfPrueba" label="Mi Input" placeholder="Placeholder" />
          </div>
        </div>
        <div>
          <h1>Appointment Cards</h1>
          <AppointmentCard appointment={appointment1}></AppointmentCard>
        </div>
      </div>
    </div>
  );
}
