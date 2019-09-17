const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const auth = require("./route/auth");
  const reqUrl = url.parse(req.url, true);

  if (reqUrl.pathname == "/api/auth/login" && req.method === "POST") {
    auth.login(req, res);
  } else {
    res.end("Invalid Endpoint");
  }
});
const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
