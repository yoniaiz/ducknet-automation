import { buildUser } from "../support/generate";

describe("Register", () => {
  it("register new user", () => {
    const user = buildUser();

    cy.visit("http://localhost:3000/register");
    cy.findByLabelText(/username/i).type(user.username);
    cy.findByLabelText(/email/i).type(user.email);
    cy.findByLabelText(/password/i).type(user.password);

    cy.findByText(/submit/i).click();

    cy.url().should("include", "/projects");
    cy.getCookie("next-auth.session-token").should("exist");
  });
});

export {};
