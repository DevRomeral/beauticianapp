export interface SettingsSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, description, children }) => {
  return (
    <div>
      <div className="flex items-end justify-between gap-1">
        <div className="flex-1">
          <h3>{title}</h3>
          <h6>{description}</h6>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default SettingsSection;
