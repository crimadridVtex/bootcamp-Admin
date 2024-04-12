import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'

import ProductDay from './components/ProductDay/index'

import './styles.global.css'

const AdminExample = () => {
  return (
    <Layout
      pageHeader={
        <PageHeader title={<FormattedMessage id="product-day.title" />} />
      }
    >
      <PageBlock variation="full">
        <ProductDay />
      </PageBlock>
    </Layout>
  )
}

export default AdminExample
