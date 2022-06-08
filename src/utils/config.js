import { Auth } from "aws-amplify"

const config= {
    "Auth": {
        "region": "ap-south-1",
    "userPoolId": `${process.env.REACT_APP_POOL_ID}`,
    "userPoolWebClientId": `${process.env.REACT_APP_CLIENT_ID}`,
    "mandatorySignIn": false,
    "cookieStorage": {
      "domain": "localhost",
      "path": "/",
      "expires": 365,
      "secure": false
    },
    "redirectSignIn": "http://localhost:3000/",
    "redirectSignOut": "http://localhost:3000"
},
"API": {
    "endpoints": [
      {
        "name": "Student",
        // "endpoint": "http://localhost:5000",
        "endpoint": `${process.env.REACT_APP_ENDPOINT}`,
        custom_header: async () => { 
          return { Authorization : "Bearer "+(await Auth.currentSession()).getIdToken().getJwtToken() } 
        }
      }
    ]
  }}
export default config 