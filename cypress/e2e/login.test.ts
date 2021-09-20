describe("Register", () => {
  it("Should login existing user", () => {
    cy.createUser().then((user) => {
      cy.visit("/login");
      cy.findByLabelText(/email/i).type(user.email);
      cy.findByLabelText(/password/i).type(user.password);

      cy.findByText(/submit/i).click();

      cy.url().should("include", "/projects");
      cy.getCookie("next-auth.session-token").should("exist");
    });
  });
});

export {};
