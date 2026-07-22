  import OrderForm from './OrderForm';
  import {Routes, Route, Link} from 'react-router-dom'
  import OrdersList from './OrdersList';
  import './App.css'

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
