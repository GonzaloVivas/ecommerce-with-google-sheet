import { parseCurrency } from "../currency";

describe('currency', () => {
  describe('parseCurrency', () => {
    it('should return localized price', () => {
      const currentPrice = 65;
      const expectedPrice = `$\xa065,00`;

      expect(parseCurrency(currentPrice)).toEqual(expectedPrice);
    })
  })
})