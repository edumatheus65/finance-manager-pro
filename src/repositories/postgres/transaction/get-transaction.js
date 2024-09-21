import { PostgresHelper } from "../../../db/postgres/helper";

export class PostgresgetTransactionByUserIdRepository {
  async execute(userID) {
    const transactions = await PostgresHelper.query(
      "SELECT * FROM transactions WHERE user_id = $!",
      [userID]
    );

    return transactions;
  }
}
