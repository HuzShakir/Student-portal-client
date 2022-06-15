import { Auth } from "aws-amplify"

const config= {
    "Auth": {
        "region": "ap-south-1",
    "userPoolId": `${process.env.REACT_APP_POOL_ID}`,
    "userPoolWebClientId": `${process.env.REACT_APP_CLIENT_ID}`,
    "mandatorySignIn": false,
    "cookieStorage": {
      "domain": `${process.env.NODE_ENV==='development'?"localhost":"react-student-portal.s3-website.ap-south-1.amazonaws.com"}`,
      "path": "/",
      "expires": 365,
      "secure": true
    },
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