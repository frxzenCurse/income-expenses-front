import { Button, Col, Row, Space } from 'antd'
import Title from 'antd/es/typography/Title'
import CategoriesList from '../categoriesList/CategoriesList'
import { useAppDispatch } from '../../../redux/hooks'
import { openModal } from '../../../redux/modal/modalSlice'
import FormModal from '../modal/FormModal'
import TransactionsListing from '../transactionsListing/TransactionsListing'
import { selectCategoriesByType, useGetCategoriesQuery } from '../../../redux/category/categorySlice'

function Info() {

  const dispatch = useAppDispatch()
  const { categoriesByType } = useGetCategoriesQuery(undefined, {
    selectFromResult: result => ({
      ...result,
      categoriesByType: selectCategoriesByType(result),
    })
  }) 

  function addCategory() {
    const modalData = {
      title: 'Добавить категорию',
      type: 'category',
      data: null,
    }
    dispatch(openModal(modalData))
  }

  function addTransaction() {
    const modalData = {
      title: 'Добавить транзакцию',
      type: 'transaction',
      data: null,
    }
    dispatch(openModal(modalData))
  }

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Space orientation="vertical" style={{width: '100%'}}>
            <Title level={3}>Расходы</Title>
            <CategoriesList items={categoriesByType.expense} />
          </Space>
        </Col>
        <Col span={12}>
          <Space orientation="vertical" style={{width: '100%'}}>
            <Title level={3}>Доходы</Title>
            <CategoriesList items={categoriesByType.income} />
          </Space>
        </Col>
      </Row>
      <Space style={{width: '100%', marginTop: 30}}>
        <Button onClick={addCategory}>Добавить категорию</Button>
        <Button onClick={addTransaction}>Добавить транзакцию</Button>
      </Space>
      <TransactionsListing />
      <FormModal />
    </>
  )
}

export default Info