import SettingsSection from '@/screens/settings/SettingsSection';
import { render, screen } from '@testing-library/react';

describe('SettingsSection', () => {
  it('should render', () => {
    const title = 'Title';
    const description = 'Description';
    const settingText = 'Brand new setting';

    render(
      <SettingsSection title={title} description={description}>
        <span>{settingText}</span>
      </SettingsSection>,
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByText(settingText)).toBeInTheDocument();
  });
});
