import { useState, useEffect } from "react";

interface OrderItem {
    _id: string;
    productId: string;
    quantity: number;
    customerEmail: string;
    status: string;
  }



  function OrdersList() {
    const [orders, setOrders] = useState<OrderItem[]>([]);
  
    useEffect(() => {
      fetch('http://localhost:3000/orders')
        .then((res) => res.json())
        .then((data) => setOrders(data));
    }, []);
  
    return (
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            {order.productId} — {order.quantity} — {order.customerEmail} — {order.status}
          </li>
        ))}
      </ul>
    );
  }
  
  export default OrdersList;