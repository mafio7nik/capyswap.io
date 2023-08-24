import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';


const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}
 
const overrides = {
  config
}

const theme = extendTheme(overrides)

export default theme