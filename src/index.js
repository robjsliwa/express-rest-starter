import express from 'express';
import http from 'http';
import fs from 'fs';
import apiVersion1 from './api/api1.js';
import validateJWT, { setPublicCert } from './middleware/validate-jwt.js';
import config from './config.json';

let publicCert = null;
try {
  publicCert = fs.readFileSync(config.public_cert);
} catch(err) {
  console.log(err);
  process.exit(1);
}

const app = express();
app.server = http.createServer(app);

setPublicCert(publicCert);

app.use(validateJWT);
app.use('/v1', apiVersion1);

app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Server running on ${app.server.address().address}${app.server.address().port}`);
});
