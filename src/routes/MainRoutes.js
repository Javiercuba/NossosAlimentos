import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing

const Medidas = Loadable(lazy(() => import('views/utilities/Medidas')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const NovoAlimento = Loadable(lazy(() => import('views/AdicionarAlimento')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard/default',
            element: <DashboardDefault />
        },
        {
            path: '/usuario/medidas',
            element: <Medidas />
        },
        {
            path: '/utils/util-color',
            element: <UtilsColor />
        },
        {
            path: '/utils/util-shadow',
            element: <UtilsShadow />
        },
        {
            path: '/icons/tabler-icons',
            element: <UtilsTablerIcons />
        },
        {
            path: '/icons/material-icons',
            element: <UtilsMaterialIcons />
        },
        {
            path: '/usuario/novo-alimento',
            element: <NovoAlimento />
        }
    ]
};

export default MainRoutes;
