import { getDateTime } from '@/services/customize/date-service';
import { render, screen } from '@testing-library/react';

import AppointmentCard from '@/components/appointment/AppointmentCard';

describe('AppointmentCard', () => {
  it('renders appointment card given a valid value', () => {
    const customer = 'Customer';
    const service = 'Service';
    const date = new Date(2024, 6, 8, 17, 0);
    const expectedTime = getDateTime(date);

    render(<AppointmentCard date={date} service={service} customer={customer} />);

    expect(screen.getByText(customer)).toBeInTheDocument();
    expect(screen.getByText(service)).toBeInTheDocument();
    expect(screen.getByText(expectedTime)).toBeInTheDocument();
  });

  // TODO: crear test para cuando falta algún dato
});
