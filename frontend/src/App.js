import { NavLink, Route, Switch } from 'react-router-dom'
import NewKeepitPage from './Pages/NewKeepit';
import HomePage from './Pages/HomePage';


function App() {
  return (
    <>
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/new" component={NewKeepitPage} />
    </Switch>
    </>
  );
}

export default App;
