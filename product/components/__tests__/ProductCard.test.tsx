import * as React from "react"
import {fireEvent, render, screen} from "@testing-library/react"

import ProductCard from "../ProductCard"
import {Product} from "../../types"

const product: Product = {
  id: "id",
  category: "category",
  description: "description",
  image: "image",
  price: 100,
  title: "title"
}

test("should show the product\'s title, price and button", () => {
  render(<ProductCard product={product} onAdd={jest.fn()} />);

  const priceRegex = new RegExp(String(product.price), "i")

  expect(screen.getByText(product.title)).toBeInTheDocument();
  expect(screen.getByText(priceRegex)).toBeInTheDocument();
  expect(screen.getByText("Agregar")).toBeInTheDocument();
})

test("should run onAdd when add is clicked", () => {
  const onAdd = jest.fn();

  render(<ProductCard product={product} onAdd={onAdd} />);

  fireEvent.click(screen.getByText("Agregar"))

  expect(onAdd).toHaveBeenCalled();

})