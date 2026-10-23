import { Space } from 'antd'
import Transaction from '../transaction/Transaction'
import type { ITransaction } from '../../../types/entities'

interface IProps {
  items: ITransaction[],
  inListing: boolean,
}

function TransactionsList({items, inListing}: IProps) {
  return (
    <Space vertical style={{width: '100%'}}>
      {items.map(item =>
        <Transaction key={item.id} item={item} inListing={inListing} />
      )}
    </Space>
  )
}

export default TransactionsList