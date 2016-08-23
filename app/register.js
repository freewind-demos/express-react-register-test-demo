import _ from 'lodash';

const users = [];

function _findUser(username) {
  return _.find(users, {username});
}

export default function (req, res) {
  const userData = req.body;
  if (!userData || _.isEmpty(userData.username) || _.isEmpty(userData.password)) {
    return res.status(400).send('Invalid user data');
  }
  if (_findUser(userData.username)) {
    return res.status(409).send('User already exists');
  }
  users.push(req.body);
  res.status(201).send('register successfully');
}