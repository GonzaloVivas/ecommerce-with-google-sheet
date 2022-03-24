/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
import Papa from 'papaparse'

import { Product } from "./types"

export default {
  list: async (): Promise<Product[]> => {
    return axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vTRZ9cZQr375dvLe6wIOneckMhIZoehfSu8JSjRN6lLa2VHec7Lk8PEAyMOH_t3MNG3bqQieU99K33x/pub?output=csv',
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
  }
}