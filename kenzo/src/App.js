import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import SellerRoute from './components/SellerRoute';
import Cart from './views/Cart';
import Home from './views/Home';
import OrderDetails from './views/OrderDetails';
import OrderHistory from './views/OrderHistory';
import OrderList from './views/OrderList';
import PaymentMethod from './views/PaymentMethod';
import PlaceOrder from './views/PlaceOrder';
import ProductDetails from './views/ProductDetails';
import ProductEdit from './views/ProductEdit';
import ProductList from './views/ProductList';
import Profile from './views/Profile';
import Register from './views/Register';
import Seller from './views/Seller';
import Shipping from './views/Shipping';
import Signin from './views/Signin';
import UserEdit from './views/UserEdit';
import UserList from './views/UserList';

function App() {

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo }= userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  }
  return (
    <BrowserRouter>
      <div className="grid-container">
          <header className="row"> 
            <div>
                <Link className="brand" to="/">Kenzo</Link>
            </div>
            <div>
                <Link to="/cart">Cart
                  {cartItems.length > 0 && (
                    <span className="badge">{cartItems.length}</span>
                  )}
                </Link>
                {
                  userInfo ? (
                    <div className="dropdown">
                      <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i></Link>
                      <ul className="dropdown-content">
                        <li>
                          <Link to="/profile">User Profile</Link>
                        </li>
                        <li>
                          <Link to="/orderhistory">Order History</Link>
                        </li>
                        <li>
                          <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <Link to="/signin">Sign In</Link>
                  )
                }
                {userInfo && userInfo.isSeller && (
                  <div className="dropdown">
                    <Link to="#admin">
                      Seller <i className="fa fa-caret-down"></i>
                    </Link>
                    <ul className="dropdown-content">
                      <li>
                        <Link to="/productlist/seller">Products</Link>
                      </li>
                      <li>
                        <Link to="/orderlist/seller">Orders</Link>
                      </li>
                    </ul>
                  </div>
                )}
                {userInfo && userInfo.isAdmin && (
                  <div className="dropdown">
                    <Link to="#admin">
                      Admin <i className="fa fa-caret-down"></i>
                    </Link>
                    <ul className="dropdown-content">
                      <li>
                        <Link to="/dashboard">Dashboard</Link>
                      </li>
                      <li>
                        <Link to="/productlist">Products</Link>
                      </li>
                      <li>
                        <Link to="/orderlist">Orders</Link>
                      </li>
                      <li>
                        <Link to="/userlist">Users</Link>
                      </li>
                    </ul>
                  </div>
                )}
            </div>
          </header>
          <main>
            <Route path="/seller/:id" component={Seller}></Route>
            <Route path="/cart/:id?" component={Cart}></Route>
            <Route path="/product/:id" component={ProductDetails} exact></Route>
            <Route path="/product/:id/edit" component={ProductEdit} exact></Route>
            <Route path="/signin" component={Signin}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/shipping" component={Shipping}></Route>
            <Route path="/payment" component={PaymentMethod}></Route>
            <Route path="/placeorder" component={PlaceOrder}></Route>
            <Route path="/order/:id" component={OrderDetails}></Route>
            <Route path="/orderhistory" component={OrderHistory}></Route>
            <PrivateRoute path="/profile" component={Profile}></PrivateRoute>
            <AdminRoute path="/productlist" component={ProductList} exact></AdminRoute>
            <AdminRoute path="/orderlist" component={OrderList} exact></AdminRoute>
            <AdminRoute path="/userlist" component={UserList}></AdminRoute>
            <AdminRoute path="/user/:id/edit" component={UserEdit}></AdminRoute>
            <SellerRoute path="/productlist/seller" component={ProductList}></SellerRoute>
            <SellerRoute path="/orderlist/seller" component={OrderList}></SellerRoute>
            <Route path="/" component={Home} exact></Route>
          </main>
          <footer className="row center"> 
              All rights reserved
          </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
