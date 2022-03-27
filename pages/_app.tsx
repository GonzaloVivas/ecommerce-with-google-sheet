import * as React from "react";
import { ChakraProvider, Container, Stack, Link, Flex, Image, Heading, Text, Box, Divider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import theme from '../theme'
import { INFORMATION } from "../app/constants";
import Head from "next/head";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Mi tienda online - {INFORMATION.title}</title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
        <meta content="GROWAR" name="author" />
        <meta content="Gonzalo Vivas" name="copyright" />
      </Head>
      <ChakraProvider theme={theme}>
        <Box>
          <Container
            borderRadius="sm"
            backgroundColor="white"
            maxWidth="container.xl"
            padding={4}
            paddingTop={0}
          >
            <Stack spacing={8}>
              <Stack marginBottom={4} spacing={4}>
                <Image
                  src={INFORMATION.banner} alt="Banner"
                  borderRadius="lg"
                  height="100%"
                  maxHeight={64}
                ></Image>
                <Stack
                  direction={{base: "column", sm: "row"}}
                  alignItems="center"
                  spacing={{base:3, sm: 6}}
                >
                  <Box
                    marginTop={{base: -12, sm: -16}}
                    marginLeft={2}
                    borderRadius={9999}
                    padding={1}
                    backgroundColor="white"
                    minWidth={{base: 24, sm: 32}}
                  >
                    <Image
                      borderRadius={999}
                      width={{base: 24, sm: 32}}
                      height={{base: 24, sm: 32}}
                      src={INFORMATION.avatar}
                      alt={INFORMATION.title}
                    />
                  </Box>
                  <Stack spacing={3} alignItems={{ base: "center", sm: "flex-start" }} textAlign={{base: "center", sm: "left"}}>
                    <Heading>{INFORMATION.title}</Heading>
                    <Text color="gray.500" fontWeight="500">{INFORMATION.description}</Text>
                    <Stack direction="row">
                      {INFORMATION.social.map((social) => (
                        <Link key={social.name} isExternal href={social.url}>
                          <Flex
                            alignItems="center"
                            justifyContent="center"
                            width={8}
                            height={8}
                            borderRadius={9999}
                            backgroundColor="primary.500"
                            color="white"
                          >
                            <Image alt="Facebook" src={`https://icongr.am/fontawesome/${social.name}.svg?size=16&color=ffffff`} />
                          </Flex>
                        </Link>
                      ))}
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
              <Divider marginY={8} />
              <Component {...pageProps} />
            </Stack>
            <Divider marginY={4} />
            <Text textAlign="center">
              © {new Date().getFullYear()}. Desarrollado en base a los streams de <Link textDecoration="underline" isExternal href="https://gonzalopozzo.com">goncy</Link>
            </Text>
          </Container>
        </Box>
      </ChakraProvider>
    </>
  )
}

export default App