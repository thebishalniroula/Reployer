const express = require("express");
const app = express();
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxy();
proxy.on("proxyReq", (proxyReq, req, res) => {
  const url = req.url;
  if (url === "/") proxyReq.path += "index.html";
});

app.use((req, res) => {
  const hostname = req.headers.host;
  const subdomain = hostname.split(".")[0];

  const resolvesTo = `${"https://sujan-test-2.s3.ap-south-1.amazonaws.com"}/${subdomain}`;

  return proxy.web(req, res, { target: resolvesTo, changeOrigin: true });
});

app.listen(3001, () => {
  console.log("Proxy server started on port 3001");
});
