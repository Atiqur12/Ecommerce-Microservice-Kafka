import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function OrderForm() {
    const navigate = useNavigate();

  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customerEmail, setCustomerEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity, customerEmail }),
      
    });

    if (!response.ok) {
      alert('Failed to create order. Please try again.');
      return;
    }
    navigate('/orders')

    setProductId('');
    setQuantity(1);
    setCustomerEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={productId} onChange={(e) => setProductId(e.target.value)} placeholder="Product ID" />
      <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} placeholder="Quantity" />
      <input value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} placeholder="Email" />
      <button type="submit">Place Order</button>
    </form>
  );
}

export default OrderForm;