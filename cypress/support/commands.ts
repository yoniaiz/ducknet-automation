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

// Cypress.Commands.add("loginNewUser", (overrides?: Partial<User>) => {
//   cy.createUser(overrides).then(async (user) => {
//     await signIn("credentials", {
//       redirect: false,
//       ...user,
//     });
//     cy.visit("/");
//   });
// });
