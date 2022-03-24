import React from 'react'
import { GetStaticProps } from 'next'
import { Product } from '../product/types'
import api from '../product/api'
import { Box, Button, Grid, Link, Stack, Text } from '@chakra-ui/react'

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

      {Boolean(cart.length) && (
        <Box position="sticky" bottom={4} textAlign="center">
          <Button
            as={Link}
            href={`https://wa.me/5491145235632?text=${encodeURIComponent(text)}`}
            isExternal
            colorScheme="whatsapp"
          >
            Completar pedido ({cart.length} productos)
          </Button>
        </Box>
      )}

    </Stack>
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

