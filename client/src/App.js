import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/navbar/navbar.component';
import PrivateRoute from './components/private-route/private-route.component';

import Home from './pages/home/home.page';
import Signin from './pages/authentication/sign-in/sign-in.page';
import Signup from './pages/authentication/sign-up/sign-up.page';
import Dashboard from './pages/user/dashboard/dashboard.page';
import DashboardResources from './pages/user/dashboard/dashboard-my-resources';
import CreateHotel from './pages/hotels/create-hotel.component';

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
        <Route exact path='/' component={Home} />
        <Route exact path='/blog' component={Home} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/signup' component={Signup} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute
          exact
          path='/dashboard/my/resources'
          component={DashboardResources}
        />
        <PrivateRoute exact path='/hotels/new' component={CreateHotel} />
      </Switch>
    </>
  );
}

export default App;
