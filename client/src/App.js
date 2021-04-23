import { Route, Switch } from 'react-router-dom';

import Navbar from './components/navbar/navbar.component';
import Home from './pages/home/home.page';
import Signin from './pages/authentication/signin.page';
import Signup from './pages/authentication/signup.page';

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/signup' component={Signup} />
      </Switch>
    </>
  );
}

export default App;
