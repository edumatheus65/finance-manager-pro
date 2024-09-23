import { PostgresHelper } from "../../../db/postgres/helper.js";

export class PostgresUpdateTransactionRepository {
  async execute(transactionId, updateTransactionParams) {
    const updateFields = [];
    const updateValues = [];

    Object.keys(updateTransactionParams).forEach((key, index) => {
      updateFields.push(`${key} =$${index + 1}`);
      updateValues.push(updateTransactionParams[key]);
    });

    updateValues.push(transactionId);

    const updateQuery = `
      UPDATE transactions
      SET ${updateFields.join(", ")}
      WHERE id = $${updateValues.length}
      RETURNING *
      `;

    const updatedTransaction = await PostgresHelper.query(
      updateQuery,
      updateValues
    );

    return updatedTransaction[0];
  }
}
