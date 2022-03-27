/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
import Papa from 'papaparse'
import { INFORMATION } from '../app/constants'

import { Product } from "./types"

export default {
  list: async (): Promise<Product[]> => {
    return axios.get(INFORMATION.sheet,
      {responseType: 'blob'}
    ).then( res => {
      return new Promise<Product[]>((resolve, reject) => {
        Papa.parse(res.data, {
          header: true,
          complete: results => {
            const products = results.data as Product[]
            return resolve(
              products.map((product) => ({
              ...product,
              price: Number(product.price)
              }))
            )
          },
          error: (error) => {
            return reject(error.message)
          }
        })
      })
    })
  },
  mock: {
    list: (mock: string): Promise<Product[]> => import(`./mocks/${mock}.json`).then(result => result.default)
  }
}