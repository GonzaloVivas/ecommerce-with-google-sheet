import * as React from "react"
import { CartItem, Product } from '../types'
import { Box, Button, Grid, Stack, Text, Image } from '@chakra-ui/react'

import ProductCard from "../components/ProductCard"

import CartDrawer from '../components/CartDrawer';
import { editCart } from '../selectors';

interface Props {
  products: Product[]
}

const StoreScreen: React.FC<Props> = ({ products }) => {

  const [cart, setCart] = React.useState<CartItem[]>([])
  const [selectedImage, setSelectedImage] = React.useState<string>(null)
  const [isCartOpen, toggleCart] = React.useState<boolean>(false)

  function handleEditCart(product: Product, action: 'increment' | 'decrement') {
    setCart(editCart(product, action))
  }

  return (
    <>
      <Stack spacing={6}>

        {Boolean(products.length) ? 
        
          <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
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
              colorScheme="whatsapp"
              leftIcon={<Image alt="whatsapp" src="https://icongr.am/fontawesome/whatsapp.svg?size=24&color=ffffff" />}
              size="lg"
              width={{base: "100%", sm:"fit-content"}}
            >
              Ver pedido ({cart.reduce((acc, item) => acc + item.quantity, 0)} productos)
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

