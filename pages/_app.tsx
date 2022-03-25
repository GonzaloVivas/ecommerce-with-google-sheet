import * as React from "react";
import { ChakraProvider, Container, VStack, Image, Heading, Text, Box, Divider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import theme from '../theme'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={4}>
        <Container
          borderRadius="sm"
          backgroundColor="white"
          boxShadow="md"
          maxWidth="container.xl"
          padding={4}
        >
          <VStack marginBottom={6}>
            <Image
              borderRadius={999}
              src="//picsum.photos/125/125" alt="Logo"
            ></Image>
            <Heading>Almacency</Heading>
            <Text>El almacén</Text>
          </VStack>
          <Divider marginY={6} />
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App