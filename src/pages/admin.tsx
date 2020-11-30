import api from '@/services/api';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react'

interface AdminProps {
  products: any[],
}

const Admin: React.FC<AdminProps> = () => {

  const [products, setProducts] = useState([])
  const [qrCode, setQrCode] = useState('')

  useEffect(() => {
    loadProducts();
  }, [])

  async function generateQrcode(productId: number) {
    setQrCode('');
    const response = await api.post('/products/qrcode', {
      productId: productId
    });
    setQrCode(response.data.qrcode);
  }

  async function loadProducts() {
    try {
      const response = await api.get('/products');
      const products = response.data;
      console.log(products);
      setProducts(products);
    } catch (error) {

    }

  }

  return (
    <div>

      <h1>Painel Administrativo</h1>

      <br/>
      {
        products.map((item) => {
          return (
            <div key={item.id}>
              {item.id} - {item.name}
              <button className="btn btn-primary" onClick={() => generateQrcode(item.id)}>Gerar QRcode</button>
            </div>
          )
        })
      }

      { qrCode && <img src={qrCode}/> }


    </div>
  )
}

export default Admin;
