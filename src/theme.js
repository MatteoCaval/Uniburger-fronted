import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import indigo from '@material-ui/core/colors/indigo'

let theme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: green,
        // type: 'dark',
    },
    status: {
        danger: 'orange',
    },
    typography: {
        /*
        fontFamily: [
            'Comic Sans MS'
        ].join(','),
        */
    }
});

theme = responsiveFontSizes(theme);

export default theme;