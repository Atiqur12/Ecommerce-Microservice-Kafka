  import OrderForm from './OrderForm';
  import {Routes, Route, Link} from 'react-router-dom'
  import OrdersList from './OrdersList';
  import './App.css'

  interface OrderItem{
    _id : string;
    productId : string;    
    quantity : number;
    customerEmail : string;
    status : string

  }


  function App() {
    
    return (
      <div>
      <nav>
        <Link to="/orders">Orders</Link> | <Link to="/orders/new">New Order</Link>
      </nav>

      <Routes>
        <Route path="/orders" element={<OrdersList />} />
        <Route path="/orders/new" element={<OrderForm />} />
      </Routes>
    </div>
    )
  }
 
  export default App
