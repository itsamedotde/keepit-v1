import { useHistory, Route, Switch } from 'react-router-dom'
import NewKeepitPage from './Pages/NewKeepitPage';
import HomePage from './Pages/HomePage';
import ImageUploading from 'react-images-uploading';
import {useState , useEffect, createContext } from 'react';
import UploadButton from './Components/UploadButton';



function App() {

  return (
    <Switch>
      <Route path="/new">
        <NewKeepitPage ></NewKeepitPage> 
      </Route>
      <Route path="/">
        <UploadButton></UploadButton>
      </Route>
    </Switch>
  );
}

export default App;
