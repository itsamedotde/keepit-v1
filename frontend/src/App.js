import { useHistory, Route, Switch } from 'react-router-dom'
import NewKeepitPage from './Pages/NewKeepitPage'
import HomePage from './Pages/HomePage'
import Header from './Components/Header'

function App() {
  return (
    <Switch>
      <Route path="/new">
        <Header />
        <NewKeepitPage />
      </Route>
      <Route path="/">
        <Header />
        <HomePage />
      </Route>
    </Switch>
  )
}

export default App
