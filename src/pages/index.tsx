
import SEO from '@/components/SEO';
import api from '@/services/api';
import { Title } from '@/styles/pages/Catalog/Products/Product';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React from 'react';

interface HomeProps{
  products: any[],
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await api.get('/products');
  const products = response.data;

  return {
    props: {
      products: products,
    }
  }
}

export default function Home({ products }: HomeProps) {

  return (
    <div>
      <SEO title="Produtos" />
      <Title>Products</Title>
      <ul>
        {products.map(product => {
          return (
            <li key={product.id}>
            <Link href={`/catalog/products/${product.id}`}>
              <a>
                {product.name}
              </a>
            </Link>
            </li>
          );
        })}
      </ul>
    </div>
  )
}
