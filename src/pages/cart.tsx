import Address from '@/components/Address';
import { ButtonPrimary } from '@/components/Basics/Button/styles';
import CardCart from '@/components/Card/Cart';
import Header from '@/components/Header';
import IconLabel from '@/components/IconLabel';
import { useCart } from '@/context/Cart/CartContext';
import api from '@/services/api';
import { Card, Column, Container, Row, Total } from '@/styles/pages/Cart/styles';
import Link from 'next/link';
import React, { memo, useEffect, useState } from 'react';
import { FiMapPin, FiTruck } from 'react-icons/fi';

const Cart: React.FC = () => {
  const { cart, address } = useCart();
  const [totalProduct, setTotalProduct] = useState(0);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({
    customerId: 1,
  });

  useEffect(() => {
    let sum = 0;
    cart.map(item => {
      sum += item.product.price;
    })
    setTotal(sum);
  }, [])

  async function createOrder() {
    console.log(cart);
    const response = await api.post('/orders', {
      totalPrice: totalProduct,
      customerId: 1,
      orderProducts: cart.map((item) => ({productId: item.product.id, quantity: item.quantity}))
    });

    console.log(response);
  }

  return (
    <>
      <Header />
      <Container>
        {cart.map((item) => {
          return (
            <CardCart
              key={item.product.id}
              value={item.quantity}
              img={item.product.photoUrl}
              name={item.product.name}
              price={parseInt(item.product.price)}
              totalProduct={totalProduct}
              setTotalProduct={setTotalProduct}
              delivery={item.delivery}
            />
          );
        })}
        <Card>
          <Total>
            <Column>
              <p>Endereço de entrega: </p>
              <IconLabel icon={(<FiMapPin size={15} />)} label={<Address address={address} />} />
            </Column>
            <br />
            <Row>
              <Column>
                <p>Valor do frete: </p>
                <IconLabel icon={(<FiTruck size={15} />)} label={<p>R$ 36,90</p>} />
              </Column>
              <Column>
                <p>Total:</p>
                <span>{totalProduct}</span>
              </Column>
            </Row>
          </Total>
        </Card>
        <Link href="/payment">
          <ButtonPrimary>
            <button type="button" onClick={createOrder}>FINALIZAR</button>
          </ButtonPrimary>
        </Link>
      </Container>
    </>
  );
}

export default memo(Cart);
