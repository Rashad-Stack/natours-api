const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getAllUsers = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    data: {
      users,
    },
  });
};

exports.createUser = (req, res) => {
  const newUserId = users[tours.length - 1].id + 1;
  const newUser = Object.assign({ id: newUserId }, req.body);
  users.push(newUser);
  fs.writeFile(
    `${__dirname}/dev-data/data/user.json`,
    JSON.stringify(users),
    (err) => {
      res.status(202).send({
        status: 'success',
        data: { users: newUser },
      });
    }
  );
};

exports.getUser = (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  const user = users.find((el) => el.id === id);

  // if (id > tours.length) {
  if (!user) {
    res.status(404).send({
      status: 'failed',
      message: 'invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};
exports.updateUser = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    res.status(404).send({
      status: 'failed',
      message: 'invalid ID',
    });
  }
  res.status(202).json({
    status: 'success',
    data: {
      users: req.body,
    },
  });
};

exports.deleteUser = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    res.status(404).send({
      status: 'failed',
      message: 'invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: {
      users: null,
    },
  });
};
