export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
}

export const PRODUCTS: Product[] = [
  {
    id: 'aurora-headphones',
    name: 'Aurora Headphones',
    description: 'Wireless over-ear headphones with up to 40 hours of beautifully uninterrupted sound.',
    priceInCents: 18900,
  },
]
