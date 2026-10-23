import { Space } from 'antd'
import Text from 'antd/es/typography/Text'
import { DeleteOutlined, SettingOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../redux/hooks'
import { openModal } from '../../../redux/modal/modalSlice'
import { useDeleteTransactionMutation } from '../../../redux/transaction/transactionSlice'
import type { ITransaction } from '../../../types/entities'

interface IProps {
  item: ITransaction,
  inListing: boolean,
}

function Transaction({item, inListing}: IProps) {

  const dispatch = useAppDispatch()
  const [deleteTransaction] = useDeleteTransactionMutation()

  function onUpdate() {
    const modalData = {
      type: 'transaction',
      title: 'Изменить транзакцию',
      data: item
    }

    dispatch(openModal(modalData))
  }

  function onDelete() {
    deleteTransaction(item.id)
  }

  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <Text strong>{item.name} ({inListing ? item.categoryName : item.date})</Text>
      <Space>
        <Text type={item.categoryType === 'income' ? 'success' : 'danger'}>
          {item.categoryType === 'income' ? '+' : '-'}{item.amount}₽
        </Text>
        <SettingOutlined
          onClick={(event) => {
            event.stopPropagation();
            onUpdate()
          }}
        />
        <DeleteOutlined
          onClick={(event) => {
            event.stopPropagation();
            onDelete()
          }}
        />
      </Space>
    </div>
  )
}

export default Transaction