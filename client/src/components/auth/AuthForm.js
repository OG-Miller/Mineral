import React, { useState, useEffect }  from 'react';
import { useAuth } from './auth';
import { Link, withRouter } from 'react-router-dom';
import "./authForm.css"

const AuthForm = (props) => {
  const [ username, setUsername] = useState('');
  const [ password, setPassword] = useState('');
  const [ action, setAction ] = useState("Sign In");
  const { setUserName, setAuthToken, user_name } = useAuth();



  const authenticate = async () => {
    const basePath = '/api/auth/'; // path for user authentication route in the server side api
    let url = basePath;

    if(action === "Sign In" ){
      url += "login";
    }

    console.log(url);
    console.log(action);

    const response = await fetch(url, {
      method: "POST",
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({username, password})
    });

    const json = await response.json();
    console.log(json);
    if(response.ok) {
      setAuthToken(json.token);
      setUserName(json.user.username); // auth context provider
      setUsername(json.user.username); // set username in this component
    } else {
      alert(json.msg);
    }
  }

  useEffect( () => {
    if(props.action) {
      setAction(props.action);
    } else {
      if(props.location.pathname === '/signup') {
        setAction("Sign Up");
      } else {
        setAction("Sign In");
      }
    }
  },[props])
  
// we want to see if the user_name exists inside the auth state/ auth context; if it does then we redirect,
// otherwise we want to render the form
if(user_name){
  // redirect to the homepage

}




return (
  <div>
    <form>

      <h3>{action}</h3>
     
      <input 
      className="username"
      placeholder="Username" 
      name ="username" 
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      />

      <input 
      className="password"
      placeholder="Password"
      type="password" 
      autoComplete= "on"
      name ="password" 
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />
      
      <button 
      className="submit_button"
      onClick={() => authenticate()}>
      {action}
      </button>

      {
        action === 'Sign In' ?
          <Link to='/signup'>Don't have an account? Sign up!</Link> : 
          <Link to='/login'>Already have an account? Sign in!</Link> 
      }
      
    </form>
  </div>


)




}
export default withRouter( AuthForm );