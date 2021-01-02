import { useHistory, Route, Switch } from 'react-router-dom'
import NewKeepitPage from './Pages/NewKeepitPage'
import HomePage from './Pages/HomePage'
import KeepitDetailPage from './Pages/KeepitDetailPage'
function App() {
  return (
    <Switch>
      <Route path="/new">
        <NewKeepitPage />
      </Route>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/detail/:id">
        <KeepitDetailPage />
      </Route>
    </Switch>
  )
}

export default App
