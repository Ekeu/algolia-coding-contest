import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/navbar/navbar.component';
import Home from './pages/home/home.page';
import Signin from './pages/authentication/sign-in/sign-in.page';
import Signup from './pages/authentication/sign-up/sign-up.page';

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer
        hideProgressBar
        closeButton={false}
        style={{ width: '25rem', padding: '0px' }}
      />
      <Switch>
        <Route exact path='/blog' component={Home} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/' component={Home} />
      </Switch>
    </>
  );
}

export default App;
