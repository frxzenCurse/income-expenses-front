import { Button, DatePicker, Form, Input, Select, Spin, type FormProps } from 'antd'
import { useEffect } from 'react'
import { useCreateTransactionMutation, useUpdateTransactionMutation } from '../../../redux/transaction/transactionSlice';
import type { ITransactionForm } from '../../../types/forms';
import Text from 'antd/es/typography/Text';
import dayjs from 'dayjs';
import { useGetCategoriesQuery } from '../../../redux/category/categorySlice';
import type { ITransaction } from '../../../types/entities';

interface IProps {
  data: null | ITransaction,
}

function TransactionForm({data}: IProps) {
  const [form] = Form.useForm();
  const { data: categories } = useGetCategoriesQuery()
  const [updateTransaction, { isLoading: isUpdateLoading, error: updateError }] = useUpdateTransactionMutation()
  const [createTransaction, { isLoading: isCreateLoading, error: createError }] = useCreateTransactionMutation()

  let options = categories?.map(item => ({value: item.id, label: item.name})) 
  let isLoading = isUpdateLoading || isCreateLoading
  let error = updateError || createError ? 'Что-то пошло не так...' : null

  const onFinish: FormProps<ITransactionForm>['onFinish'] = (values) => {
    let date = values.date.format('DD-MM-YYYY')
    let formData = {...values, date: date}

    if (data) {
      updateTransaction({...data, ...formData})
    } else {
      createTransaction(formData)
    }
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        amount: data.amount,
        date: dayjs(data.date, 'DD-MM-YYYY'),
        categoryId: data.categoryId,
      })
    }
  }, [data])

  return (
    <div className='parent'>
      {isLoading &&
        <div className='loader'>
          <Spin size="large" />
        </div>}
      <div className={`container ${isLoading ? 'loading' : ''}`}>
        <Form
          name="basic"
          form={form}
          style={{ margin: "30px auto 0" }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<ITransactionForm>
            name="name"
            rules={[{ required: true, message: 'Please input your category name!' }]}
          >
            <Input placeholder='Название' />
          </Form.Item>
          <Form.Item<ITransactionForm> name="categoryId" rules={[{ required: true }]}>
            <Select
              allowClear
              placeholder="Выберите тип категории"
              options={options}
            />
          </Form.Item>
          <Form.Item<ITransactionForm> name="date" rules={[{ required: true }]}>
            <DatePicker format="DD-MM-YYYY" placeholder='Выберите дату' style={{width: '100%'}} />
          </Form.Item>
          <Form.Item<ITransactionForm>
            name="amount"
            rules={[{ required: true, message: 'Please input your transaction amount!' }]}
          >
            <Input placeholder='Сумма' />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Отправить
            </Button>
          </Form.Item>
        </Form>
      </div>
      {error && 
        <Text type='danger'>{error}</Text>}
    </div>
  )
}

export default TransactionForm