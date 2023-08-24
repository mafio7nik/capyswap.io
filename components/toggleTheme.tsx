import { useColorMode, useColorModeValue, IconButton, Icon } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

export default function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
       <IconButton
          aria-label='Toggle Theme'
          icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
          onClick={toggleColorMode}/>
    </>
  )
}