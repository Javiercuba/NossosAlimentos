// material-ui
import { useTheme } from '@mui/material/styles';

import { Typography, Grid } from '@mui/material';
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */
import logo from 'assets/images/Logo.png';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * <img src={logo} alt="Nossos Alimentos" width="100" />
         *
         */
        <div>
            <Typography alignContent="center" variant="h4">
                Nossos Alimentos
            </Typography>
        </div>
    );
};

export default Logo;
