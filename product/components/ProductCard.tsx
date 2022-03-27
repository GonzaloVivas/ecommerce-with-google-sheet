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
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      key={product.id}
      backgroundColor="white"
      spacing={3}
      borderWidth={1}
      borderColor="gray.100"
    >
      <Stack direction="row" width="100%">
        <Image
          loading="lazy"
          src={product.image}
          alt={product.title}
          maxHeight={128}
          objectFit="cover"
          backgroundColor="white"
          borderRadius="md"
          width={{base: 24, sm: 36}}
          height={36}
          minWidth={36}
        />
        <Stack padding={4} spacing={1} width="100%" justifyContent="space-between">
          <Stack spacing={1}>
            <Text fontSize="lg" fontWeight="500">{product.title}</Text>
            <Text fontSize="sm" color="gray.500">{product.description}</Text>
          </Stack>
          <Stack alignItems="flex-end" direction="row" justifyContent="space-between">
            <Text fontSize="md" fontWeight="500" color="green.500">{parseCurrency(product.price)}</Text>
            <Button
              size="xs"
              onClick={() => onAdd(product)}
            >
              Agregar
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default ProductCard