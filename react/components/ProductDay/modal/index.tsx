import React, { useRef } from 'react'
import { Modal, Input, Button } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'

interface DataTable {
  idProduct?: string
  isActiveProduct?: boolean
  productName?: string
  idSku?: string
  isActiveSku?: boolean
  skuName?: string
  highlight?: string
}

interface props {
  data: DataTable
  isOpen: boolean
  onClose: () => void
}

export const ModalContent = ({ data, isOpen, onClose }: props) => {
  const inputValue = useRef<HTMLInputElement>(null)

  const savehighlight = () => {
    data.highlight = inputValue.current?.value ?? ''
  }

  return (
    <Modal centered isOpen={isOpen} onClose={onClose} responsiveFullScreen>
      <div className="flex flex-column flex-row-ns">
        <h4 className="t-heading-4">{data?.skuName}</h4>
      </div>
      <div>
        <Input
          placeholder="Placeholder"
          label={<FormattedMessage id="product-day.modal.input.placeholder" />}
          ref={inputValue}
          //value={message}
        />
      </div>
      <div className="pt2">
        <Button size="small" onClick={savehighlight}>
          <FormattedMessage id="product-day.modal.button.save" />
        </Button>
      </div>
    </Modal>
  )
}

export default ModalContent
