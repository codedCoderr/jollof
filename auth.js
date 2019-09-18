const db = require('./db');
exports.register = (req, res) => {
  body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', async () => {
    body = JSON.parse(body);
    const { _username, _fullname, _email, _avatar, _status, _password } = body;
    res.setHeader('Content-Type', 'application/json');
    try {
      let users = await db.query(`select * from users where email='${_email}'`);

      if (_email === email) {
        res.statusCode = 401;
        res.end(
          JSON.stringify({
            authenticated: false,
            error: 'User already exists'
          })
        );
      }
      if (users.rowCount !== 0) {
        var { email } = users.rows[0];
        res.statusCode = 401;
        res.end(
          JSON.stringify({
            authenticated: false,
            error: 'User already exists'
          })
        );
      } else if (
        _email === '' ||
        _password === '' ||
        _username === '' ||
        _status === '' ||
        _fullname === ''
      ) {
        res.statusCode = 400;
        res.end(
          JSON.stringify({
            authenticated: false,
            error: 'Input field cannot be empty'
          })
        );
      } else {
        await db.query(
          `insert into users (username,fullname,email,avatar,status,password)
          values ('${_username}','${_fullname}','${_email}','${_avatar}','${_status}',crypt('${_password}',gen_salt('bf')))`
        );
        res.statusCode = 200;
        res.end(
          JSON.stringify({
            authenticated: true,
            user: {
              username: _username,
              fullname: _fullname,
              email: _email,
              avatar: _avatar,
              status: _status
            }
          })
        );
      }
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ authenticated: false, error: error.message }));
    }
  });
};
exports.login = (req, res) => {
  body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', async () => {
    body = JSON.parse(body);
    const { _email, _password } = body;
    res.setHeader('Content-Type', 'application/json');
    try {
      if (_email === '' || _password === '') {
        res.statusCode = 400;
        res.end(
          JSON.stringify({
            authenticated: false,
            error: 'Input field cannot be empty'
          })
        );
      }
      let user = await db.query(
        `select * from users where email='${_email}' and password=crypt('${_password}',password)`
      );

      if (user.rowCount === 0) {
        res.statusCode = 401;
        res.end(
          JSON.stringify({
            authenticated: false,
            error: 'Invalid credentials'
          })
        );
      }
      let { id, email, username, fullname, avatar, status } = user.rows[0];
      res.statusCode = 200;
      res.end(
        JSON.stringify({
          authenticated: true,
          user: {
            id: id,
            username: username,
            fullname: fullname,
            email: email,
            avatar: avatar,
            status: status
          }
        })
      );
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ authenticated: false, error: error.message }));
    }
  });
};
