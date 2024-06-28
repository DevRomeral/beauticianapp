import LanguageWrapper from '@/__mocks__/components/LanguageWrapper';
import { LanguageConfig } from '@/__mocks__/configs/LanguageConfig';
import HomePage from '@/app/page';
import { render, screen } from '@testing-library/react';

describe('Home Page', () => {
  it('renders home page', () => {
    render(
      <LanguageWrapper>
        <HomePage />
      </LanguageWrapper>,
    );

    expect(screen.getByText(LanguageConfig.messages.Home.title)).toBeInTheDocument();
  });
});
