import { render, screen } from '@testing-library/react';

import FormErrorCard, { idDivErrors } from '@/components/cards/FormErrorCard';

describe('FormErrorCard', () => {
  it('should render provided errors', () => {
    const error1 = 'error1';
    const error2 = 'error2';

    render(<FormErrorCard errors={[error1, error2]} />);

    expect(screen.getByText(error1)).toBeInTheDocument();
    expect(screen.getByText(error2)).toBeInTheDocument();
  });

  it('should not render anything if not error provided', () => {
    render(<FormErrorCard errors={[]} />);

    expect(screen.queryByTestId(idDivErrors)).not.toBeInTheDocument();
  });
});
