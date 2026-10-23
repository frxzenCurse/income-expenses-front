import { Collapse, Space } from 'antd'
import TransactionsList from '../transactionsList/TransactionsList'
import { DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../redux/hooks'
import { openModal } from '../../../redux/modal/modalSlice'
import { selectTransactionsByCategory, useGetTransactionsQuery } from '../../../redux/transaction/transactionSlice'
import { useEffect, useState } from 'react';
import CategoryLabel from '../categoryLabel/CategoryLabel';
import { useDeleteCategoryMutation } from '../../../redux/category/categorySlice';
import type { ICategory } from '../../../types/entities';

interface IProps {
  category: ICategory,
}

const genExtra = (onClick: () => void, onDelete: () => void) => (
  <Space>
    <SettingOutlined
      onClick={(event) => {
        event.stopPropagation();
        onClick()
      }}
    />
    <DeleteOutlined 
      onClick={(event) => {
        event.stopPropagation();
        onDelete()
      }}
    />
  </Space>
);


function Category({category}: IProps) {

  const [total, setTotal] = useState(0)
  const dispatch = useAppDispatch()
  const [deleteCategory] = useDeleteCategoryMutation()
  const { transactions } = useGetTransactionsQuery(undefined, {
    selectFromResult: result => ({
      ...result,
      transactions: selectTransactionsByCategory(result, category.id),
    })
  }) 

  function onClickUpdate() {
    const modalData = {
      type: 'category',
      title: 'Изменить категорию',
      data: category
    }

    dispatch(openModal(modalData))
  }

  function onDeleteClick() {
    deleteCategory(category.id)
  }

  useEffect(() => {
    let result = 0;
    transactions.forEach(item => {
      result += item.amount
    })
    setTotal(result)
  }, [transactions])
  
  return (
    <div>
      <Collapse 
        items={[
          {
            key: category.id,
            label: <CategoryLabel total={total} category={category} />,
            children: <TransactionsList items={transactions} inListing={false} />,
            extra: genExtra(onClickUpdate, onDeleteClick),
          },
        ]}
      />
    </div>
  )
}

export default Category