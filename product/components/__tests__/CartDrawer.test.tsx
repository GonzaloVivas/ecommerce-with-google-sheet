import * as React from "react"
import { fireEvent, render, screen } from "@testing-library/react"

import CartDrawer from "../CartDrawer"
import { CartItem } from "../../types"

const cart: CartItem[] = [{
  id: "id",
  category: "category",
  description: "description",
  image: "image",
  price: 100,
  title: "title",
  quantity: 2
}]

test("should call onDecrement when substract a product", () => {
  
  const onDecrement = jest.fn();

  render(
    <CartDrawer
      items={cart}
      isOpen 
      onClose={jest.fn()}
      onDecrement={onDecrement} 
      onIncrement={jest.fn()} 
    />
  );

  fireEvent.click(screen.getByTestId("decrement"))

  expect(onDecrement).toHaveBeenCalled()
})

test("should call onIncrement when increment a product", () => {
  
  const onIncrement = jest.fn();

  render(
    <CartDrawer
      items={cart}
      isOpen 
      onClose={jest.fn()}
      onDecrement={jest.fn()} 
      onIncrement={onIncrement} 
    />
  );

  fireEvent.click(screen.getByTestId("increment"))

  expect(onIncrement).toHaveBeenCalled()
})

test("show no-items message when cart is empty", () => {
  
  const onDecrement = jest.fn();

  render(
    <CartDrawer
      items={[]}
      isOpen 
      onClose={jest.fn()}
      onDecrement={onDecrement} 
      onIncrement={jest.fn()} 
    />
  );

  expect(screen.getByText("No hay elementos en tu carrito")).toBeInTheDocument();
})
