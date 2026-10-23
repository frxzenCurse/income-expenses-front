export type CategoryType = 'income' | 'expenses'

export interface IUser {
  id: number,
  username: string,
}

export interface ICategory {
  id: number,
  name: string,
  type: CategoryType,
  maxLimit: number,
}

export interface ITransaction {
  id: number,
  name: string,
  date: string,
  amount: number,
  categoryId: number,
  categoryName: string,
  categoryType: CategoryType,
}

export interface ITransactionRequest {
  name: string,
  date: string,
  amount: number,
  categoryId: number,
}
