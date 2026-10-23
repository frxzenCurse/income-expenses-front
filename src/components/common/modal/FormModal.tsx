import { Modal } from 'antd'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { closeModal } from '../../../redux/modal/modalSlice';
import CategoryForm from '../categoryForm/CategoryForm';
import TransactionForm from '../transactionForm/TransactionForm';
import type { ICategory, ITransaction } from '../../../types/entities';

function FormModal() {

  const { isOpen, modalData } = useAppSelector(state => state.modal)
  const dispatch = useAppDispatch()

  const handleCancel = () => {
    dispatch(closeModal())
  };

  return (
    <Modal
      title={modalData.title}
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      destroyOnHidden={true}
    >
      {modalData.type == 'category' ?
        <CategoryForm 
          data={modalData.data ? modalData.data as ICategory : null} 
        />
        :
        <TransactionForm 
          data={modalData.data ? modalData.data as ITransaction : null}
        />
      }
    </Modal>
  )
}

export default FormModal