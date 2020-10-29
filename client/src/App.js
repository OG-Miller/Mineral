import React, { useState } from 'react';
import './App.css';
import AuthForm from './components/auth/AuthForm';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthContext } from './components/auth/auth';

function App() {
 
// reading values from localSt. if they exist, we set that value. If not, we set it to empty.
  const existingToken = localStorage.getItem("token") || "";
  const existingUsername = localStorage.getItem("username") || ""; 
  // we set up the initial state with these values ^
  const [ authToken, setAuthToken ] = useState(existingToken);
  const [ username, setUsername ] = useState(existingUsername);
 
  //the following two functions are responsible for setting cookies in local storage.
  // they are the functions that are called in AuthForm.js ~line 8
  const setUserName = (data) => {
    if(!data) {
      localStorage.removeItem('username');// this handles logging out for example
      setUsername();
    } else {
      localStorage.setItem('username', data);
      setUsername(data);
    }
  }

  const setToken = (data) => {
    if(!data) {
      localStorage.removeItem('token');
      setAuthToken();
    } else {
      localStorage.setItem('token', JSON.stringify(authToken));
      setAuthToken(data);
    }
  }
 

  return(
    
    <AuthContext.Provider value={{authToken, setAuthToken: setToken, username, setUserName: setUserName}} >
      <div className='App'>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={AuthForm} />
            <Route exact path="/signup" component={AuthForm} />
          </Switch>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
    
  )


}

export default App;
