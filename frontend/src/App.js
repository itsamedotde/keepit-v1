import { Route, Switch } from 'react-router-dom'
import NewKeepitPage from './Pages/NewKeepitPage'
import HomePage from './Pages/HomePage'
import KeepitDetailPage from './Pages/KeepitDetailPage'
import styled from 'styled-components/macro'
const StyledAppWrapper = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 500px;
  min-width: 250px;
  margin: 0px auto;
  box-shadow: rgb(0, 0, 0) 0px 0px 25px 0px;
  background: rgb(255, 255, 255);
  position: relative;
`
function App() {
  return (
    <StyledAppWrapper>
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
    </StyledAppWrapper>
  )
}

export default App
