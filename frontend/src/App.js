import { useHistory, Route, Switch } from 'react-router-dom'
import NewKeepitPage from './Pages/NewKeepitPage'
import HomePage from './Pages/HomePage'
import Header from './Components/Header'
import Footer from './Components/Footer'
import UploadButtonFooter from './Components/UploadButtonFooter'
import BackButton from './Components/BackButton'
import SearchButton from './Components/SearchButton'

function App() {
  return (
    <Switch>
      <Route path="/new">
        <NewKeepitPage />
      </Route>
      <Route path="/">
        <Header></Header>
        <HomePage />
        <Footer
          action={<UploadButtonFooter />}
          left={<BackButton height="30px" width="30px" />}
          right={<SearchButton />}
        ></Footer>
      </Route>
    </Switch>
  )
}

export default App
