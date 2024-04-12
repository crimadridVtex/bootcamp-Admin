//Second example
/*import React, { FC, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { InputSearch } from 'vtex.styleguide'

import { useQuery } from 'react-apollo'

import productDayData from '../../graphql/productDay.graphql'

const ProductDay: FC = () => {
  const [searchValue, setSearchValue] = useState('')

  const productData: any = useQuery(productDayData, {
    variables: {
      term: searchValue,
      page: 1,
      pageSize: 10,
    },
    ssr: false,
  })

  console.log('these a products', productData)

  return (
    <div>
      <InputSearch
        placeholder="Search..."
        value={searchValue}
        label={<FormattedMessage id="product-day.inputsearch.label" />}
        size="small"
        onChange={(e: any) => {
          setSearchValue(e.target.value)
          console.log('onchange! search this: ', e.target.value)
        }}
        onSubmit={(e: any) => {
          e.preventDefault()
          console.log('submitted! search this: ', e.target.value)
        }}
      />
    </div>
  )
}

export default ProductDay*/

import React, { Fragment, useState } from 'react'

import { Table, Toggle } from 'vtex.styleguide'

import { useQuery } from 'react-apollo'

import productDayData from '../../graphql/productDay.graphql'

import { useIntl } from 'react-intl'

import ModalContent from './modal'

import { productday as messages } from '../../utils/messages'

interface State {
  searchValue: string
  emptyStateLabel: string
}

interface DataTable {
  idProduct?: string
  isActiveProduct?: boolean
  productName?: string
  idSku?: string
  isActiveSku?: boolean
  skuName?: string
  highlight?: string
}

interface ItemProducts {
  id: string
  isActive: boolean
  name: string
  skus: ItemSkus[]
}

interface ItemSkus {
  id: string
  isActive: boolean
  skuName: string
}

const initialState: State = {
  searchValue: '',
  emptyStateLabel: 'Nothing to show.',
}

const ProductDay = () => {
  const { formatMessage } = useIntl()
  const [searchValue, setSearchValue] = useState('')
  const [showModal, setshowModal] = useState(false)
  const [modaldata, setmodaldata] = useState<DataTable>()

  const jsonSchema = {
    properties: {
      idProduct: {
        title: formatMessage(messages.idProduct),
        width: 50,
      },
      productName: {
        title: formatMessage(messages.productName),
        width: 150,
      },
      isActiveProduct: {
        title: formatMessage(messages.isActiveProduct),
        width: 150,
        cellRenderer: ({ cellData }: any) => {
          return <Toggle disabled checked={cellData} />
        },
      },
      idSku: {
        title: formatMessage(messages.idSku),
        width: 150,
      },
      skuName: {
        title: formatMessage(messages.skuName),
        width: 150,
      },
      isActiveSku: {
        title: formatMessage(messages.isActiveSku),
        width: 150,
        cellRenderer: ({ cellData }: any) => {
          return <Toggle disabled checked={cellData} />
        },
      },
      highlight: {
        title: formatMessage(messages.highlight),
        width: 150,
      },
    },
  }

  let productsData: DataTable[] = []

  const { loading, error, data } = useQuery(productDayData, {
    variables: {
      term: searchValue,
      page: 1,
      pageSize: 10,
    },
    ssr: false,
  })

  if (loading) {
    console.log('cargando', loading)
  }
  if (error) {
    console.log('cargando', error)
  }

  //useEffect(() => {
  data?.products.items.forEach((product: ItemProducts) => {
    product.skus.forEach((sku: ItemSkus) => {
      let elementData: DataTable = {}
      elementData.idProduct = product.id
      elementData.isActiveProduct = product.isActive
      elementData.productName = product.name
      elementData.idSku = sku.id
      elementData.isActiveSku = sku.isActive
      elementData.skuName = sku.skuName
      elementData.highlight = ''
      productsData.push(elementData)
    })
  })
  //}, productsData)

  function handleInputSearchChange(e: any) {
    setSearchValue(e.target.value)
    console.log('onchange', e.target.value)
  }

  function handleInputSearchClear() {
    setSearchValue(initialState.searchValue)
  }

  function handleInputSearchSubmit(e: any) {
    console.log('these a products', data)
    e.preventDefault()

    if (!searchValue) {
      setSearchValue(initialState.searchValue)
    } else {
      setSearchValue(initialState.emptyStateLabel)
    }
  }

  const handleCloseModal = () => {
    setshowModal(false)
    //console.log('modal open', showModal)
  }

  return (
    <div>
      <Fragment>
        <Table
          schema={jsonSchema}
          items={productsData}
          toolbar={{
            inputSearch: {
              value: searchValue,
              placeholder: 'Search stuff...',
              onChange: handleInputSearchChange,
              onClear: handleInputSearchClear,
              onSubmit: handleInputSearchSubmit,
            },
            density: {
              buttonLabel: 'Line density',
              lowOptionLabel: 'Low',
              mediumOptionLabel: 'Medium',
              highOptionLabel: 'High',
            },
          }}
          onRowClick={({ rowData }: any) => {
            setshowModal(true)
            setmodaldata(rowData)
          }}
        ></Table>
        {showModal ? (
          <ModalContent
            isOpen={showModal}
            data={modaldata as DataTable}
            onClose={handleCloseModal}
          />
        ) : null}
      </Fragment>
    </div>
  )
}

export default ProductDay
