import type { Dayjs } from "dayjs";
import type { CategoryType } from "./entities";

export interface ILoginForm {
  username: string,
  password: string,
}

export interface ICategoryForm {
  name: string,
  type: CategoryType,
  maxLimit?: number,
}

export interface ITransactionForm {
  name: string,
  amount: number,
  date: Dayjs,
  categoryId: number,
}