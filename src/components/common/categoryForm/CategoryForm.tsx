import { Button, Form, Input, Select, Spin, type FormProps } from 'antd'
import { useEffect, useState } from 'react'
import type { ICategoryForm } from '../../../types/forms';
import Text from 'antd/es/typography/Text';
import './categoryForm.scss'
import { useCreateCategoryMutation, useUpdateCategoryMutation } from '../../../redux/category/categorySlice';
import type { ICategory } from '../../../types/entities';

interface IProps {
  data: null | ICategory,
}

function CategoryForm({data}: IProps) {
  const [form] = Form.useForm();
  const [value, setValue] = useState('')
  const [updateCategory, { isLoading: isUpdateLoading, error: updateError }] = useUpdateCategoryMutation()
  const [createCategory, { isLoading: isCreateLoading, error: createError }] = useCreateCategoryMutation()

  let isLoading = isUpdateLoading || isCreateLoading
  let error = updateError || createError ? 'Что-то пошло не так...' : null

  const onFinish: FormProps<ICategoryForm>['onFinish'] = (values) => {
    if (data) {
      updateCategory({...data, ...values})
    } else {
      createCategory({maxLimit: 0, ...values})
    }
  };

  const onChange = (value: string) => {
    setValue(value)
  }

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        maxLimit: data.maxLimit,
        type: data.type
      })

      setValue(data.type)
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
          <Form.Item<ICategoryForm>
            name="name"
            rules={[{ required: true, message: 'Please input your category name!' }]}
          >
            <Input placeholder='Название' />
          </Form.Item>
          <Form.Item<ICategoryForm> name="type" rules={[{ required: true }]}>
            <Select
              allowClear
              placeholder="Выберите тип категории"
              onChange={onChange}
              options={[
                { label: 'доход', value: 'income' },
                { label: 'расход', value: 'expenses' },
              ]}
            />
          </Form.Item>
          {value == 'expenses' &&
            <Form.Item<ICategoryForm>
              name="maxLimit"
              rules={[{ required: false }]}
            >
              <Input placeholder='Максимальный лимит' />
            </Form.Item>}

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

export default CategoryForm