
import {useState, useEffect} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import './App.css';
import Layout from './components/Layout';
import Index from './pages/store/Index';
import Navigation from './pages/Navigation';
import ProductType from './pages/store/ProductType';
import Product from './pages/store/Product';
import Checkout from './pages/transactions/Checkout';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Profile from './pages/user/Profile';
import MyProducts from './pages/user/MyProducts';
import MyOrders from './pages/user/MyOrders';
import CreateProduct from './pages/user/CreateProduct';
import ErrorPage from './pages/UI/error';
import ThankYouPage from './pages/UI/thank-you';

// TODO: bug - when first logging in, 'my profile' link is set to
// user being null...

const fetchedToken = localStorage.getItem('token');

function App() {
  // EVENTUALLY: check to see if token is already set in localstorage
  // before setting state of token; also add expiration

  const [token, setToken] = useState(fetchedToken);
  const [error, setError] = useState({status: false, message: ''});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [redirectToIndex, setRedirectToIndex] = useState(false);


  // see if user is already logged in
  // --> is this the best way to do this?
  useEffect(() => {
    if (fetchedToken) {
      localStorage.setItem('token', token);
    }

    fetch('http://localhost:8080/user/get-username', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        return res.json()
      })
      .then(resData => {
        if (resData.username) {
          setIsLoggedIn(true);
        }
        setUsername(resData.username);
      })
      .catch(err => {
        // TODO
        console.log(err);
      })

  }, [token])

  const logoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        // not sure if this is the best way to redirect after logging out...
        // NOT ALWAYS WORKING... need to find a better way
        setRedirectToIndex(true);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation isLoggedIn={isLoggedIn} username={username} logoutHandler={() => logoutHandler()}/>
        <Layout>
          {redirectToIndex ? <Redirect to="/" /> : null}
          <Switch>
            <Route path="/create-product" render={() => <CreateProduct error={error} setError={(e) => setError(e)} />} />
            {/* not entirely sure how to render these compenents yet... */}
            <Route path="/error" component={ErrorPage}/>
            <Route path="/thank-you" render={(props) => <ThankYouPage {...props} />}/>
            <Route path="/login" render={() => <Login setToken={(t) => setToken(t)} setIsLoggedIn={(i) => setIsLoggedIn(i)} setUsername={setUsername} />} />
            <Route path="/signup" component={Signup}/>
            {/* using 'requestedName' because user could put any string in url
              ... does not guarantee that it is a user that exists!!
            */}
            <Route path="/:requestedName/profile" render={() => <Profile error={error} setError={setError}/>}/>
            <Route path="/:requestedName/my-products" render={() => <MyProducts error={error} setError={setError} />}/>
            <Route path="/:requestedName/my-orders" render={() => <MyOrders error={error} setError={setError} />}/>
            <Route path="/:productTypeName/:productId/checkout" render={() => <Checkout error={error} setError={setError}/>}/>
            <Route path="/:productTypeName/:productId" render={() => <Product error={error} setError={(e) => setError(e)}/>}/>
            <Route path="/:productTypeName" render={(props) => <ProductType {...props} error={error} setError={setError} />} />
            <Route path="/" render={() => <Index error={error} setError={setError} />}/>
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
