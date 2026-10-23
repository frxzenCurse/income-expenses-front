import Title from "antd/es/typography/Title"
import { selectTransactionByDates, useGetTransactionsQuery } from "../../../redux/transaction/transactionSlice"
import { Space } from "antd"
import TransactionsList from "../transactionsList/TransactionsList"

function TransactionsListing() {

  const { data } = useGetTransactionsQuery(undefined, {
    selectFromResult: result => ({
      ...result,
      data: selectTransactionByDates(result),
    })
  }) 

  return (
    <div style={{marginTop: 30}}>
      <Title level={3}>Все транзакции</Title>
      <Space vertical style={{display: 'flex', margin: '0 30px'}}>
        {data && data.dates.map(item =>
          <div style={{padding: 10}}>
            <Title level={4}>{item}</Title>
            <TransactionsList items={data.transactions[item]} inListing={true} />
          </div>
        )}
      </Space>
    </div>
  )
}

export default TransactionsListing