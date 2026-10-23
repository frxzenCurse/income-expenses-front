import { Space } from 'antd'
import Text from 'antd/es/typography/Text'
import type { ICategory } from '../../../types/entities'

interface IProps {
  category: ICategory,
  total: number,
}

function CategoryLabel({category, total}: IProps) {

  return (
    <Space>
      <Text>
        {category.name} 
      </Text>
      {total ? 
        <>
          {category.type === 'expenses' ?
            <Text strong type={total > category.maxLimit ? 'danger' : 'warning'}>{total}₽/{category.maxLimit}₽ ({Math.round(total / category.maxLimit * 100)}%)</Text>
            :
            <Text strong type='success'>{total}₽</Text>
          }
        </>
        :
        null
      }
    </Space>
  )
}

export default CategoryLabel