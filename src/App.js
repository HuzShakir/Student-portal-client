import  { Auth, Hub  } from 'aws-amplify'
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import { useEffect, useState } from 'react';
import Student from './Student';
import Navbar from './Navbar';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App() {
  const [user, setuser] = useState(false)
  const [loading, setloading] = useState(true)
  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
          switch (event) {
            case 'signIn':
              Auth.currentSession().then(data=>setuser(data)).catch(err=>setuser(false))
              break
            case 'signOut': 
              setuser(false)
              break
            default:
              break
          }
        })
        
      }, [])

      useEffect(()=>{
        Auth.currentSession().then(data=>{setuser(data);setloading(false)}).catch(err=>{setuser(false);setloading(false)})
      },[])
  


  return (
    <>
      {!loading && <div className="">
        <Router>
        <Navbar user={user} />
          <Routes>
            {!user ? 
          (  <Route exact path='/' element={<Authenticator className='mt-5 rounded-md' hideSignUp />}></Route>)
            :(<Route exact path='/' element={user?.accessToken.payload['cognito:groups'].includes("Student")?<Navigate to={`/student/${user.accessToken.payload.sub}`}/>:<Dashboard/>}></Route>)
          }
            {user && <>
            <Route exact path="/student/:studentid" element={<Student view={!user?.accessToken.payload['cognito:groups'].includes("Student")}  />}></Route>
            </>}
            <Route path='*' element={<Navigate to={'/'}/>}/>
            
          </Routes>
        </Router>
      </div>}
    </>
  );
}

export default App;
