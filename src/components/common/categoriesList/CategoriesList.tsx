import { Space } from 'antd'
import Category from '../category/Category'
import type { ICategory } from '../../../types/entities'

interface IProps {
  items: ICategory[]
}

function CategoriesList({items}: IProps) {
  return (
    <Space vertical style={{width: '100%'}}>
      {items.map(item => 
        <Category key={item.id} category={item} />
      )}
    </Space>
  )
}

export default CategoriesList