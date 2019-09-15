exports.login = function(req, res) {
  body = '';
  req.on('data', function(chunk) {
    body += chunk;
  });
  req.on('end', function() {
    body = JSON.parse(body);
    const { username, email, password } = body;
    try {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ authenticated: true, user: body }));
    } catch (error) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ authenticated: false, user: null }));
    }
  });
};
