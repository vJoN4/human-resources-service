import 'antd/dist/antd.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { CRUDScreen, LoginScreen, RegisterScreen } from './screens';

const App = () =>  {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginScreen />
        </Route>
        <Route exact path="/register">
          <RegisterScreen />
        </Route>
        <Route exact path="/home">
          <CRUDScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
