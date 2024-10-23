import { createTheme } from '@mui/material/styles';

/**
 * Represents the theme object with specified properties.
 *
 * The theme object is created using the specified configuration options such as colors, typography, etc.
 *
 * @typedef {Object} theme
 * @property {Object} palette - The color palette configuration for the theme.
 * @property {Object} palette.background - The background color configuration for the theme.
 * @property {string} palette.background.default - The default background color in hexadecimal format.
 * @property {Object} typography - The typography configuration for the theme.
 * @property {string} typography.fontFamily - The font family used for typography in the theme.
 */
const theme = createTheme({
    palette: {
        background: {
            default: '#80DEEA', // Cyan 200
        },
    },
    typography: {
        fontFamily: 'Inter, sans-serif',
    },
});

export default theme;
