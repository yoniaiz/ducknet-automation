import * as faker from "faker";

interface User {
  username: string;
  email: string;
  password: string;
}

export const buildUser = (overrides?: Partial<User>): User => ({
  username: faker.name.findName(),
  email: faker.internet.email(),
  password: `${faker.internet.password(8, false)}!1Aa`,
  ...overrides,
});
