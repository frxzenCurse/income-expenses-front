import LoginForm from '../../components/common/loginForm/LoginForm'
import Info from '../../components/common/info/Info'
import { useGetUserQuery } from '../../redux/apiSlice'
import { Spin } from 'antd'

function MainPage() {

  const {data: user, isFetching} = useGetUserQuery()

  if (isFetching) {
    return <Spin size='large' />
  }

  return (
    <div>
      {user ?
        <Info /> 
        :
        <LoginForm />
      }
    </div>
  )
}

export default MainPage