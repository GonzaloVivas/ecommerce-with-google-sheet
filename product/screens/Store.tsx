import * as React from "react"
import { Product } from '../types'
import { Box, Button, Grid, Link, Stack, Text, Image, Flex } from '@chakra-ui/react'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import { parseCurrency } from '../../utils/currency'
import ProductCard from "../components/ProductCard"



interface Props {
  products: Product[]
}

const StoreScreen: React.FC<Props> = ({ products }) => {

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
    <AnimateSharedLayout type="crossfade">
      <Stack spacing={6}>

        {Boolean(products.length) ? 
        
          <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product} 
                onAdd={(product) => setCart((cart) => cart.concat(product))}
              />
            ))}
          </Grid>

        : <Text color="gray.500" fontSize="lg" margin="auto">No hay productos</Text>}

        <AnimatePresence>
          {Boolean(cart.length) && (
            <Box
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
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

export default StoreScreen

