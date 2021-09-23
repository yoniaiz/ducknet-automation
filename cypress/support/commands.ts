/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
import { buildUser } from "./generate";

interface User {
  username: string;
  email: string;
  password: string;
}

declare global {
  namespace Cypress {
    type Greeting = {
      greeting: string;
      name: string;
    };

    interface Chainable {
      /**
       * Registers random user
       * can receive overrides
       * @memberof Cypress.Chainable
       * @param overrides the overrides for the random user
       * @example
       ```
        cy.createUser({ firstName: 'Yoni' })
        // or use defaults
        cy.createUser()
       ```
       */
      createUser: (overrides?: Partial<User>) => Cypress.Chainable<User>;

      loginNewUser: (overrides?: Partial<User>) => void;
    }
  }
}

Cypress.Commands.add("createUser", (overrides?: Partial<User>) => {
  const user = buildUser(overrides);
  cy.request({
    url: "/api/auth/signup",
    method: "POST",
    body: user,
  }).then((response) => ({ ...response.body, ...user }));
});

Cypress.Commands.add("loginNewUser", (overrides?: Partial<User>) => {
  cy.createUser(overrides).then((user) => {
    cy.request({ url: "/api/auth/csrf" }).then((csrfTokenRes) => {
      cy.request({
        method: "POST",
        url: "/api/auth/callback/credentials",
        body: {
          redirect: false,
          email: user.email,
          password: user.password,
          csrfToken: csrfTokenRes.body.csrfToken,
          callbackUrl: "http://localhost:3000/login",
          json: true,
        },
      }).then((res) => {
        cy.request({ url: "/api/auth/session" }).then(() => {
          cy.visit("/");
        });
      });
    });
  });
});
