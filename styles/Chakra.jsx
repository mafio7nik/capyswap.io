import {
    ChakraProvider,
    cookieStorageManager,
    localStorageManager
  } from '@chakra-ui/react';
  import theme from './theme.ts';
  
  export function Chakra({ cookies, children }) {
  
    const colorModeManager =
      typeof cookies === 'string'
        ? cookieStorageManager(cookies)
        : localStorageManager
  
    return (
      <ChakraProvider colorModeManager={colorModeManager} theme={theme}>
          {children}
      </ChakraProvider>
    )
  }
  
  // also export a reusable function getServerSideProps
  export function getServerSideProps({ req }) {
    return {
      props: {
        // first time users will not have any cookies and you may not return
        // undefined here, hence ?? is necessary
        cookies: req.headers.cookie ?? '',
      },
    }
  }
  