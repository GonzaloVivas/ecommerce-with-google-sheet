import * as React from "react"
import { GetStaticPaths, GetStaticProps } from 'next'
import { Product } from '../product/types'
import api from '../product/api'
import StoreScreen from '../product/screens/Store'
import { ParsedUrlQuery } from 'querystring'

interface Props {
  products: Product[]
}

function parseCurrency(value: number): string {
  return value.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
  })
}

const IndexRoute: React.FC<Props> = ({ products }) => {
  return <StoreScreen products={products} />
}

interface Params extends ParsedUrlQuery{
  mock: String;
}

export const getStaticProps: GetStaticProps<unknown, Params> = async ({params}) => {

  const products = await api.mock.list(params.mock)

  return {
    props: {
      products
    },
    revalidate: 10
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: process.env.NODE_ENV === "production" ? false : 'blocking'
  }
}

export default IndexRoute

