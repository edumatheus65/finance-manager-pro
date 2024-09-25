import { prisma } from "../../../../prisma/prisma.js";

export class PostgresGetUserByEmailRepository {
  async execute(email) {
    const user = prisma.user.findUnique({
      where: { email: email },
    });

    return user;
  }
}
