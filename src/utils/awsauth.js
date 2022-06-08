const auth={
  "domain": "student-portal.auth.ap-south-1.amazoncognito.com",
    "scope": [
    //   "phone",
      "email",
      "profile",
      "openid",
      "aws.cognito.signin.user.admin"
    ],
    "redirectSignIn": "http://localhost:3000/",
    "redirectSignOut": "http://localhost:3000/",
    "responseType": "token"
  }
export default auth