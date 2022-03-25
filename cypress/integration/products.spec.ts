import mock from "../../product/mocks/default.json"

describe("Products", () => {
  it("should show all products", () => {
    cy.visit("/default");
    cy.get('[data-test-id="product"]').should("have.length", mock.length);
  });

  it("shows a message when there are no products", () => {
    cy.visit("/empty");

    cy.get('[data-test-id="product"]').should("have.length", 0);
    cy.contains("No hay productos")
  })
});