import { useHistory, Route, Switch } from 'react-router-dom'
import NewKeepitPage from './Pages/NewKeepitPage'
import HomePage from './Pages/HomePage'

function App() {
  return (
    <Switch>
      <Route path="/new">
        <NewKeepitPage />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  )
}

export default App
