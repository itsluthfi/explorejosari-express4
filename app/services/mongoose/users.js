const Users = require('../../api/v1/users/model');
const { BadRequestError } = require('../../errors');

const createUsers = async (req) => {
  const { name, password, role, confirmPassword, email } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError('Password dan Konfirmasi password tidak cocok');
  }

  const result = await Users.create({
    name,
    email,
    password,
    role,
  });

  return result;
};

module.exports = { createUsers };
