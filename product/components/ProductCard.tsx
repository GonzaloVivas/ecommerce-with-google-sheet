import * as React from 'react'
import { Product } from '../types';
import { Button, Image, Stack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion'

import { parseCurrency } from '../../utils/currency'

interface Props {
  product: Product,
  onAdd: (product: Product) => void,
}

const ProductCard: React.FC<Props> = ({product, onAdd}) => {
  
  return (
    <Stack
      data-test-id="product"
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
          // onClick={() => setSelectedImage(product.image)}
        />
        <Text>{product.title}</Text>
        <Text fontSize="sm" fontWeight="500" color="green.500">{parseCurrency(product.price)}</Text>
      </Stack>
      <Button
        colorScheme="primary"
        variant="outline"
        size="sm"
        onClick={() => onAdd(product)}
      >
        Agregar
      </Button>
    </Stack>
  )
}

export default ProductCard