import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { 
    orderCreateReducer, 
    orderDeleteReducer, 
    orderDeliverReducer, 
    orderDetailsReducer, 
    orderHistoryReducer, 
    orderListReducer, 
    orderPayReducer 
} from './reducers/orderReducers';
import { 
    productCreateReducer, 
    productDeleteReducer, 
    productDetailsReducer, 
    productListReducer, 
    productUpdateReducer 
} from './reducers/productReducers';
import { 
    userDeleteReducer,
    userDetailsReducer, 
    userListReducer, 
    userRegisterReducer, 
    userSigninReducer, 
    userUpdateProfileReducer, 
    userUpdateReducer
} from './reducers/userReducers';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null
    },
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
        paymentMethod: 'PayPal'
    }
};
const reducer = combineReducers ({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderHistory: orderHistoryReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userUpdate: userUpdateReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
    reducer, 
    initialState, 
    composeEnhancers(applyMiddleware(thunk))
);

export default store;