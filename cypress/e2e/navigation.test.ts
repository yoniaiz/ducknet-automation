describe("Navigation", () => {
  describe("unauthorized", () => {
    it("should navigate to login page as first page and then to register page after click", () => {
      cy.visit("/");
      cy.get("h1").contains(/login/i);
      cy.findByTestId("link--register").click();
      cy.url().should("include", "/register");
      cy.get("h1").contains(/register/i);
    });

    it("shouldnt be able to got to create project page", () => {
      cy.visit("/login");
      cy.url().should("include", "/login");
      cy.visit("/create");
      cy.url().should("include", "/login");
    });
  });

  describe("authorized", () => {
    it("Should be able to go to create project", () => {
      cy.loginNewUser();

      cy.url().should("include", "/projects");
      cy.findByTestId("link--create").click();
      cy.url().should("include", "/create");
    });
  });
});

export {};
