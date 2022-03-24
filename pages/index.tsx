import React, { useState } from 'react'
import { GetStaticProps } from 'next'
import { Product } from '../product/types'
import api from '../product/api'
import { Box, Button, Grid, Link, Stack, Text, Image, Flex } from '@chakra-ui/react'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'

interface Props {
  products: Product[]
}

function parseCurrency(value: number): string {
  return value.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
  })
}

const IndexRoute: React.FC<Props> = ({ products}) => {

  const [cart, setCart] = React.useState<Product[]>([])
  const [selectedImage, setSelectedImage] = React.useState<string>(null)

  const text = React.useMemo(
    () => 
      cart
        .reduce((message, product) => message.concat(`* ${product.title} - ${parseCurrency(product.price)}\n`),
        ``
        )
        .concat(`\nTotal: ${parseCurrency(cart.reduce((total, product) => total + product.price, 0))}`),
    [cart]
  )

  return (
    <AnimateSharedLayout>
      <Stack spacing={6}>
        <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
          {products.map((product) => (
            <Stack
              borderRadius="md"
              padding={4}
              key={product.id}
              backgroundColor="gray.100"
              spacing={3}
            >
              <Stack spacing={1}>
                <Image
                  src={product.image}
                  alt={product.title} 
                  as={motion.img}
                  cursor="pointer"
                  layoutId={product.image}
                  maxHeight={128}
                  objectFit="cover"
                  borderRadius="md"
                  onClick={() => setSelectedImage(product.image)}
                />
                <Text>{product.title}</Text>
                <Text fontSize="sm" fontWeight="500" color="green.500">{parseCurrency(product.price)}</Text>
              </Stack>
              <Button
                colorScheme="primary"
                variant="outline"
                size="sm"
                onClick={() => setCart(cart => cart.concat(product))} 
              >
                Agregar
              </Button>
            </Stack>
          ))}
        </Grid>

        <AnimatePresence>
          {Boolean(cart.length) && (
            <Box
              initial={{scale: 0}}
              animate={{scale: 1}}
              exit={{scale: 0}}
              as={motion.div}
              position="sticky"
              bottom={4} 
              textAlign="center"
            >
              <Button
                as={Link}
                href={`https://wa.me/5491145235632?text=${encodeURIComponent(text)}`}
                isExternal
                colorScheme="whatsapp"
                leftIcon={<Image alt="whatsapp" src="https://icongr.am/fontawesome/whatsapp.svg?size=24&color=ffffff" />}
                size="lg"
              >
                Completar pedido ({cart.length} productos)
              </Button>
            </Box>
          )}
        </AnimatePresence>

      </Stack>
      <AnimatePresence>
        {selectedImage && (
          <Flex
            key="backdrop"
            alignItems="center"
            as={motion.div}
            backgroundColor="rgba(0,0,0,0.5)"
            justifyContent="center"
            layoutId={selectedImage}
            position="fixed"
            top={0}
            left={0}
            height="100%"
            width="100%"
            onClick={() => setSelectedImage(null)}
          >
            <Image key="image" src={selectedImage} alt="Image" />
          </Flex>
        )}
      </AnimatePresence>
    </AnimateSharedLayout>
    )
}

export const getStaticProps: GetStaticProps = async () => {

  const products = await api.list()

  return {
    props: {
      products
    },
    revalidate: 10
  }
}

export default IndexRoute

