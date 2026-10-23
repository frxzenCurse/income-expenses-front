import { Button, Form, Input, Spin, type FormProps } from 'antd'
import Title from 'antd/es/typography/Title';
import type { ILoginForm } from '../../../types/forms';
import Text from 'antd/es/typography/Text';
import { useLoginMutation } from '../../../redux/apiSlice';


function LoginForm() {

  const [form] = Form.useForm();
  const [login, { isLoading, error}] = useLoginMutation()

  const onFinish: FormProps<ILoginForm>['onFinish'] = async (values) => {
    try {
      await login(values).unwrap();
      form.resetFields()
    } catch (e) {
      console.log(e)
    }
  };

  const onFinishFailed: FormProps<ILoginForm>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      {isLoading  ?
        <Spin size="large" />
        :
        <>
          <Title level={3}>Пожалуйста войдите</Title>
          <Form
            form={form}
            name="basic"
            style={{ maxWidth: 600, margin: "30px auto 0" }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<ILoginForm>
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder='username' />
            </Form.Item>

            <Form.Item<ILoginForm>
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder='password' />
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      }
      {error && 
        <Text type='danger'>Что-то пошло не так...</Text>}
    </>
  )
}

export default LoginForm