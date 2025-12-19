import TransactionModel, { TransactionTypeEnum } from "../models/transaction.model";
import { calculateNextOccurrence } from "../utils/helper";
import { CreateTransactionType } from "../validators/transaction.validator";
export const createTransactionService = async (
    body: CreateTransactionType,
    userId: string
) => {
    let nextRecurringDate: Date | undefined
    const currentDate = new Date()

    if(body.isRecurring && body.recurringInterval) {
        const calculatedDate = calculateNextOccurrence(
            body.date,
            body.recurringInterval
        )
        nextRecurringDate = calculatedDate < currentDate ? calculateNextOccurrence(currentDate, body.recurringInterval) : calculatedDate
    }
    const transaction = await TransactionModel.create({
        ...body,
        userId,
        category: body.category,
        amount: Number(body.amount),
        isRecurring: body.isRecurring || false,
        recurringInterval: body.recurringInterval || null,
        nextRecurringDate,
        lastProcessed: null,
    })
    return transaction
};;


export const getAllTransactionService = async (
  userId: string,
  filters: {
    keyword?: string | undefined;
    type?: keyof typeof TransactionTypeEnum | undefined;
    recurringStatus?: "RECURRING" | "NON_RECURRING" | undefined;
  },
  pagination: {
    pageSize: number;
    pageNumber: number;
  }
) => {
  const { keyword, type, recurringStatus } = filters;

  const filterConditions: Record<string, any> = {
    userId,
  };

  if (keyword) {
    filterConditions.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { category: { $regex: keyword, $options: "i" } },
    ];
  }

  if (type) {
    filterConditions.type = type;
  }

  if (recurringStatus) {
    if (recurringStatus === "RECURRING") {
      filterConditions.isRecurring = true;
    } else if (recurringStatus === "NON_RECURRING") {
      filterConditions.isRecurring = false;
    }
  }

  const { pageSize, pageNumber } = pagination;
  const skip = (pageNumber - 1) * pageSize;

  const [transations, totalCount] = await Promise.all([
    TransactionModel.find(filterConditions)
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 }),
    TransactionModel.countDocuments(filterConditions),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    transations,
    pagination: {
      pageSize,
      pageNumber,
      totalCount,
      totalPages,
      skip,
    },
  };
};
