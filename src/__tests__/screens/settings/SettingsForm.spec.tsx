import LanguageWrapper from '@/__mocks__/components/LanguageWrapper';
import { LanguageConfig as MockLanguageConfig } from '@/__mocks__/configs/LanguageConfig';
import SettingsForm from '@/screens/settings/SettingsForm';
import { render, screen } from '@testing-library/react';

jest.mock('@/configs/LanguageConfig', () => ({
  LanguageConfig: MockLanguageConfig,
}));

describe('SettingsForm', () => {
  it('should render', () => {
    render(
      <LanguageWrapper>
        <SettingsForm />,
      </LanguageWrapper>,
    );

    // TODO: implementar tests
    expect(screen.getByText('Settings.title')).toBeInTheDocument();
  });

  // // TODO: crear test para cambiar idioma
  // it('should change language', async () => {
  //   render(
  //     <LanguageWrapper locale={MockLanguageConfig.defaultLocale}>
  //       <SettingsForm />
  //     </LanguageWrapper>,
  //   );

  //   // (changeLanguage as jest.Mock).mockResolvedValue(payload);

  //   const select = screen.getByTestId('selectChangeLanguage');
  //   expect(select).toBeInTheDocument();

  //   const newValue = 'en';
  //   fireEvent.change(select, { target: { value: newValue } });

  //   // // Simula el cambio de idioma en changeLanguage
  //   // (changeLanguage as jest.Mock).mockImplementation((newLocale) => {
  //   //   const messages = MockLanguageConfig.messages;
  //   //   render(
  //   //     <LanguageWrapper messages={messages} locale={newLocale}>
  //   //       <SettingsForm />
  //   //     </LanguageWrapper>,
  //   //   );
  //   // });

  //   // Trigger the changeLanguage function
  //   expect(changeLanguage).toHaveBeenCalledWith(newValue);

  //   // Verifica que el valor del select ha cambiado
  //   expect((select as HTMLSelectElement).value).toBe(newValue);

  //   // Verifica que el texto ha cambiado al nuevo idioma
  //   expect(screen.getByText('Settings')).toBeInTheDocument();
  // });
});
