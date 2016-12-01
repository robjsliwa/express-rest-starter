import express from 'express';
import jwt from 'jsonwebtoken';

let cert = null;

export default (req, res, next) => {
  const token = getBearerToken(req.headers['authorization']);
  console.log(token);
  if (token) {
    jwt.verify(token, cert, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.json({ success: false, message: 'Authentication failed' });
      } else {
        console.log(decoded);
        req.decoded = decoded;
        next()
      }
    });
  } else {
    return res.status(401).send({
      success: false,
      message: 'No valid token provided.'
    });
  }
}

export function setPublicCert(publicCert) {
  cert = publicCert;
}

function getBearerToken(authorizationHeader) {
  if (!authorizationHeader) {
    return null;
  }

  const authComponents = authorizationHeader.split(' ');

  if (authComponents.length !== 2) {
    return null;
  }

  if (authComponents[0] !== 'Bearer') {
    return null;
  }

  return authComponents[1];
}
