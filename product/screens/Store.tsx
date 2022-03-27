import * as React from "react"
import { CartItem, Product } from '../types'
import { Box, Button, Grid, Stack, Text, Image } from '@chakra-ui/react'

import ProductCard from "../components/ProductCard"

import CartDrawer from '../components/CartDrawer';
import { editCart } from '../selectors';
import { parseCurrency } from "../../utils/currency";

interface Props {
  products: Product[]
}

const StoreScreen: React.FC<Props> = ({ products }) => {

  const [cart, setCart] = React.useState<CartItem[]>([])
  const [isCartOpen, toggleCart] = React.useState<boolean>(false)

  const total = React.useMemo(
    () => parseCurrency(cart.reduce((total, product) => total + (product.price * product.quantity), 0)),
    [cart]
  )

  const quantity = React.useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  function handleEditCart(product: Product, action: 'increment' | 'decrement') {
    setCart(editCart(product, action))
  }

  return (
    <>
      <Stack spacing={6}>

        {Boolean(products.length) ? 
        
          <Grid
            gridGap={8}
            templateColumns={{ 
              base: "repeat(auto - fill, minmax(240px, 1fr))",
              sm: "repeat(auto-fill, minmax(360px, 1fr))" 
            }}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product} 
                onAdd={(product) => handleEditCart(product, 'increment')}
              />
            ))}
          </Grid>

        : <Text color="gray.500" fontSize="lg" margin="auto">No hay productos</Text>}

        {Boolean(cart.length) && (
          <Box
            position="sticky"
            bottom={4}
            textAlign="center"
          >
            <Button
              onClick={() => toggleCart(true)}
              colorScheme="primary"
              size="lg"
              width={{base: "100%", sm:"fit-content"}}
              data-testid="show-cart"
              boxShadow="2xl"
            >
              <Stack direction="row" spacing={6} alignItems="center">
                <Stack direction="row" spacing={3} alignItems="center">
                  <Text>Ver pedido</Text>
                  <Text
                    backgroundColor="rgba(0,0,0,0.25)"
                    padding={1}
                    fontSize="xs"
                    borderRadius="xs"
                    paddingX={2}
                    paddingY={1}
                    fontWeight="400"
                    color="gray.100"
                  >
                    {quantity} productos
                  </Text>
                </Stack>
                <Text>{total}</Text>
              </Stack>
            </Button>
          </Box>
        )}

      </Stack>

      <CartDrawer
        items={cart}
        isOpen={isCartOpen}
        onClose={() => toggleCart(false)} 
        onIncrement={(product) => handleEditCart(product, 'increment')}
        onDecrement={(product) => handleEditCart(product, 'decrement')}
      />
    </>
  )
}

export default StoreScreen

