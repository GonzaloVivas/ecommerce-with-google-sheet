import React from "react";

import { Button, CloseButton, Divider, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerProps, Image, Link, Stack, Text } from "@chakra-ui/react";

import { parseCurrency } from "../../utils/currency";

import { Product, CartItem } from '../types'

interface Props extends Omit<DrawerProps, 'children'> {
  items: CartItem[],
  onIncrement: (product: Product) => void,
  onDecrement: (product: Product) => void,
} 

const CartDrawer: React.FC<Props> = ({items, onClose, onIncrement, onDecrement, ...props}) => {

  const total = React.useMemo(
    () => parseCurrency(items.reduce((total, product) => total + (product.price * product.quantity), 0)),
    [items]
  )

  const quantity = React.useMemo(() => items.reduce((acc, item) => acc + item.quantity, 0), [items]);

  const text = React.useMemo(
    () =>
      items
        .reduce(
          (message, product) =>
            message.concat(
              `* ${product.title}${product.quantity > 1 ? ` (x${product.quantity})` : ''} - ${parseCurrency(product.price * product.quantity)}\n`
            ),
          ``
        )
        .concat(`\nTotal: ${total}`),
    [items, total]
  )

  React.useEffect(() => {
    if (!items.length) {
      onClose();
    }
  }, [items.length, onClose])
  
  
  return (
    <Drawer
      placement='right'
      size="sm"
      onClose={onClose}
      {...props}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader paddingX={4}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack fontWeight="500" direction="row" fontSize="2xl">
              <Text>Tu pedido</Text><Text color="gray.400">({quantity})</Text></Stack>
            <CloseButton onClick={onClose} />
          </Stack>
        </DrawerHeader>

        <DrawerBody data-testid="cart" paddingX={4}>
          {Boolean(items.length) ? <Stack spacing={4} divider={<Divider />}>
            {items.map((product) => (
              <Stack key={product.id} data-testid="cart-item" direction="row">
                <Stack width="100%">
                  <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    fontWeight="500"
                  >
                    <Text fontSize="lg">{product.title}{product.quantity > 1 ? ` (x${product.quantity})` : ''}</Text>
                    <Text>{parseCurrency(product.price * product.quantity)}</Text>
                  </Stack>
                  <Stack direction="row">
                    <Button
                      colorScheme="primary"
                      borderRadius={999}
                      size="xs"
                      onClick={() => onDecrement(product)}
                      data-testid="decrement"
                    >
                      -
                    </Button>
                    <Text fontWeight="500">{product.quantity}</Text>
                    <Button
                      colorScheme="primary"
                      borderRadius={999}
                      size="xs"
                      onClick={() => onIncrement(product)}
                      data-testid="increment"
                    >
                      +
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            ))}
          </Stack> : <Text>No hay elementos en tu carrito</Text>}
        </DrawerBody>

        {Boolean(items.length) && (
          <DrawerFooter paddingX={4}>
            <Stack width="100%" spacing={4}>
              <Divider></Divider>
              <Stack
                fontSize="lg"
                fontWeight="500"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text>Total</Text>
                <Text>{total}</Text>
              </Stack>
              <Button
                as={Link}
                href={`https://wa.me/5491145235632?text=${encodeURIComponent(text)}`}
                isExternal
                colorScheme="whatsapp"
                leftIcon={<Image alt="whatsapp"
                  src="https://icongr.am/fontawesome/whatsapp.svg?size=24&color=ffffff" />}
                size="lg"
                width="100%"
                data-testid="complete-order"
              >
                Completar pedido
              </Button>
            </Stack>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
};

export default CartDrawer;
