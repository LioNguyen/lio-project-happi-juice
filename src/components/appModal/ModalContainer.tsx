import { memo } from 'react'

import { OrderConfirmModal } from '@/components/appModal'
import { MODAL_NAME, useGlobal } from '@/domains/global'

const ModalContainer = () => {
  const { modals } = useGlobal()
  const { instances } = modals

  // Modal component will be placed in here
  const MODAL_COMPONENTS: Record<string, React.FC<any>> = {
    [MODAL_NAME.orderConfirm]: OrderConfirmModal,
    // ... add other modals
  }

  return (
    <>
      {Object.keys(instances).map((name) => {
        const modal = instances[name]
        if (!modal) return null

        const ModalComponent = MODAL_COMPONENTS[name]
        if (!ModalComponent) return null

        return <ModalComponent key={name} open={modal.isOpen} {...modal} />
      })}
    </>
  )
}

export default memo(ModalContainer)
