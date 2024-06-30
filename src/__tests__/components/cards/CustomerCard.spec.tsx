import LanguageWrapper from '@/__mocks__/components/LanguageWrapper';
import { Customer } from '@/types/customer.model';
import { getDateDay } from '@/utils/format/DateFormat';
import { render, screen } from '@testing-library/react';

import CustomerCard from '@/components/cards/CustomerCard';

const mockRouterPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    prefetch: () => null,
    push: mockRouterPush,
  }),
}));

const dummyCustomer: Customer = {
  id: '1',
  name: 'Gustavo',
  age: 22,
  lastAppointment: new Date(2024, 0, 1, 12, 34),
  diseases: [],
};

describe('CustomerCard', () => {
  it('should render main customer details', () => {
    const expectedLastAppointmentText = getDateDay(dummyCustomer.lastAppointment);
    render(
      <LanguageWrapper>
        <CustomerCard customer={dummyCustomer} />
      </LanguageWrapper>,
    );

    expect(screen.getByText(dummyCustomer.name)).toBeInTheDocument();
    expect(screen.getByText(dummyCustomer.age.toString())).toBeInTheDocument();
    expect(screen.getByText(expectedLastAppointmentText)).toBeInTheDocument();
  });
});
