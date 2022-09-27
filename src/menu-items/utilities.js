// assets
import { IconTypography, IconCrosshair, IconApple, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconCrosshair,
    IconShadow,
    IconWindmill,
    IconApple
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Utilidades',
    type: 'group',
    children: [
        {
            id: 'medidas',
            title: 'Atualizar medidas',
            type: 'item',
            url: '/usuario/medidas',
            icon: icons.IconCrosshair,
            breadcrumbs: false
        },
        {
            id: 'novo-alimento',
            title: 'Adicionar Alimentos',
            type: 'item',
            url: '/usuario/novo-alimento',
            icon: icons.IconApple,
            breadcrumbs: false
        }
    ]
};

export default utilities;
