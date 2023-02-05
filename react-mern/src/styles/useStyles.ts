import { makeStyles, createStyles } from '@mui/styles';
import { createTheme, PaletteColorOptions } from '@mui/material/styles';

const useStyles = makeStyles(() =>
  createStyles({
    titleNavbar: {
      fontSize: '24px !important',
    },
    buttonLogout: {
      backgroundColor: '#F6959D !important',
    },
  })
);

declare module '@mui/material/styles' {
  interface CustomPalette {
    orange: PaletteColorOptions;
    greenLow: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    orange: true;
  }
}

declare module '@mui/icons-material/Edit' {
  interface SvgIconPropsColorOverrides {
    greenLow: true;
  }
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: any) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    orange: createColor('#F6959D'),
    greenLow: createColor('#7BC2B1'),
  },
});

export default { useStyles, theme };
