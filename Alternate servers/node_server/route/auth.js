const users = require('../../../auth.json');
exports.login = function(req, res) {
  body = '';
  req.on('data', function(chunk) {
    body += chunk;
  });
  req.on('end', function() {
    body = JSON.parse(body);
    const { email, password } = body;
    res.setHeader('Content-Type', 'application/json');
    try {
      if (email === '' || password === '') {
        res.statusCode = 400;
        res.end(
          JSON.stringify({
            authenticated: false,
            error: 'Input field cannot be empty'
          })
        );
      }
      users.users.map(user => {
        if (user.email === email && user.password === password) {
          res.statusCode = 200;
          res.end(JSON.stringify({ authenticated: true, user: user }));
        }
        res.statusCode = 401;
        res.end(
          JSON.stringify({
            authenticated: false,
            error: 'User does not exist'
          })
        );
      });
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ authenticated: false, error: error.message }));
    }
  });
};
