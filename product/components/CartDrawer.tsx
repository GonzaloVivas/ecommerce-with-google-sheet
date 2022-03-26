import React from "react";

import { Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerProps, Image, Link, Stack, Text } from "@chakra-ui/react";

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
        <DrawerCloseButton />
        <DrawerHeader>Tu pedido</DrawerHeader>

        <DrawerBody data-testid="cart">
          {Boolean(items.length) ? <Stack spacing={4} divider={<Divider />}>
            {items.map((product) => (
              <Stack key={product.id} data-testid="cart-item" direction="row">
                <Stack width="100%">
                  <Stack direction="row" justifyContent="space-between">
                    <Text fontWeight="500">{product.title} {product.quantity > 1 ? `(x${product.quantity})` : ''}</Text>
                    <Text color="green.400">{parseCurrency(product.price * product.quantity)}</Text>
                  </Stack>
                  <Stack direction="row">
                    <Button
                      size="xs"
                      onClick={() => onDecrement(product)}
                      data-testid="decrement"
                    >
                      -
                    </Button>
                    <Text>{product.quantity}</Text>
                    <Button
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

        {Boolean(items.length) && (<DrawerFooter>
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
            Completar pedido ({total})
          </Button>
        </DrawerFooter>)}
      </DrawerContent>
    </Drawer>
  )
};

export default CartDrawer;
