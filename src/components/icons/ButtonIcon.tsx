import { PencilIcon, PlusIcon, UserPlusIcon } from '@heroicons/react/24/outline';

export type ButtonIconsId = '' | 'user-plus' | 'edit' | 'add';

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
    case 'add':
      return <PlusIcon className={style} />;
    default:
      return <></>;
  }
};

export default ButtonIcon;
