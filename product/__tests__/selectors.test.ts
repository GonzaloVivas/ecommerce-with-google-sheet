import { editCart } from "../selectors";
import { CartItem, Product } from "../types"

const product: Product = {
  id: "id",
  category: "category",
  description: "description",
  image: "image",
  price: 100,
  title: "title",
}

describe('editCart', () => {
  it('should reduce the quantity of a product by 1', () => {
    const actual: CartItem[] = [{...product, quantity: 5}];
    const expected: CartItem[] = [{...product, quantity: 4}];

    expect(editCart(product, 'decrement')(actual)).toEqual(expected);
  });

  it('should increase the quantity of a product by 1', () => {
    const actual: CartItem[] = [{ ...product, quantity: 5 }];
    const expected: CartItem[] = [{ ...product, quantity: 6 }];

    expect(editCart(product, 'increment')(actual)).toEqual(expected);
  });

it('should delete a product if we reduce and the quantity was 1', () => {
    const actual: CartItem[] = [{ ...product, quantity: 1 }];
    const expected: CartItem[] = [];

    expect(editCart(product, 'decrement')(actual)).toEqual(expected);
  });

})