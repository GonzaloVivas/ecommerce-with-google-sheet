import * as React from 'react'
import { Product } from '../types';
import { Button, Image, Stack, Text } from '@chakra-ui/react';

import { parseCurrency } from '../../utils/currency'

interface Props {
  product: Product,
  onAdd: (product: Product) => void,
}

const ProductCard: React.FC<Props> = ({product, onAdd}) => {
  
  return (
    <Stack
      data-testid="product"
      borderRadius="md"
      padding={4}
      key={product.id}
      backgroundColor="white"
      boxShadow="md"
      spacing={3}
      borderWidth={1}
      borderColor="gray.100"
    >
      <Stack direction="row">
        <Image
          loading="lazy"
          src={product.image}
          alt={product.title}
          cursor="pointer"
          maxHeight={128}
          objectFit="contain"
          backgroundColor="white"
          borderRadius="md"
          width={16}
          height={16}
        />
        <Stack spacing={1}>
          <Text fontSize="lg">{product.title}</Text>
          <Text fontSize="md" fontWeight="500" color="green.500">{parseCurrency(product.price)}</Text>
        </Stack>
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