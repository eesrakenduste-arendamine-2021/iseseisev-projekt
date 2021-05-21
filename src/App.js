import React from 'react';
import {useState, useEffect} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './comps/Header';
import ImgUpload from './comps/ImgUpload';
import ImageGrid from './comps/Gallery';
import Login from './comps/Login';
import {auth} from './firebase/config';

function App() {
  const [user, setUser] = useState(null)
  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged(userAuth=>{

      const user = {
        uid: userAuth.uid, email: userAuth.email
      }

      if (userAuth) {
        console.log('userAuth', userAuth)
        setUser(user)
      } else {
        setUser(null)
      }
    })
    return unsubscribe
    }, [])

  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      {user && <ImgUpload/>}
      <Route path="/Login" component={Login}/>
      <ImageGrid/>
      {user &&<button onClick={() => auth.signOut()}>Signout</button>}
      </BrowserRouter>
    </div>
  );
}

export default App;
