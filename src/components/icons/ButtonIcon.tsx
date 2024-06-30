import { PencilIcon, UserPlusIcon } from '@heroicons/react/24/outline';

export type ButtonIconsId = '' | 'user-plus' | 'edit';

export interface ButtonIconProps {
  id: ButtonIconsId;
}

const style = 'h-4 w-4';

// TODO: Crear tests de ButtonIcon
const ButtonIcon: React.FC<ButtonIconProps> = ({ id }) => {
  switch (id) {
    case 'user-plus':
      return <UserPlusIcon className={style} />;
    case 'edit':
      return <PencilIcon className={style} />;
    default:
      return <></>;
  }
};

export default ButtonIcon;
