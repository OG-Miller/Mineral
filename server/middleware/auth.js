const jwt = require('jsonwebtoken');
const auth = (req, res, next ) => {
  let publicURLS = [
    {url: '/api/auth/', method: 'POST'}
  ]

  let isPublic = false;
//checks all the routes in publicURLS and if the route is public then we go onto the next part of the request chain
  for(var i = 0; i < publicURLS.length; i++) {
    const { url, method } = publicURLS[i];
    if(req.url.includes(url) && req.method === method) {
      isPublic = true;
      break;
    }
  }
//if link is a public URL we set the 'isPublic' flag to true
  if(isPublic){
    next();
    return;
  }
//if not public then.....
  const token = req.header('x-auth-token');//gives token that client has to set in their headers
  if(!token) {
    res.status(401).json({msg: 'Invalid token. Access denied'});
    return;
  }

  try {
    const decoded = jwt.verify(JSON.parse(token), 'secret')//has match what we put in our routes/auth.js newUser route
    req.username = decoded;// if token is verified
    next();
  } catch (exception) {
    res.status(400).json({msg: 'Token is not valid'});
  }
}

module.exports = auth;