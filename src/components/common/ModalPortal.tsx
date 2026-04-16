import React, { ReactElement } from 'react'
import { createPortal } from 'react-dom'

interface ModalPortalProps {
  children: ReactElement
}

const ModalPortal: React.FC<ModalPortalProps> = ({ children }) => {
  const modalRoot =
    typeof document === 'undefined' ? null : document.getElementById('modalTmp') || document.body

  return modalRoot ? createPortal(children, modalRoot) : null
}

export default ModalPortal
