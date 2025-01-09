import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const signup = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({ error: 'Email, password, firstname and lastname are required' });
  }

  const existingUser = await User.findOne({ where: { email: email } });
  if (existingUser) {
    return res.status(400).json({ error: 'This email is already saved' });
  }

  const user = await User.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: await bcrypt.hash(password, 10),
  });

  return res.status(201).json({ 
    message: user.first_name + ' ' + user.last_name + ' was successfully registered',
  });
}

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = await User.findOne({ where: { email: email } });
  if (!user) {
      return res.status(401).json({ message: 'Incorrect login/password pair' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect login/password pair' });
  }

  const token = jwt.sign(
    {
      id: user.user_id,
      email: user.email,
    },
    'RANDOM_TOKEN',
    { expiresIn: "24h" },
  );
  res.header("Authorization", "Bearer " + token)
  return res.status(200).json({"token" : token});
}

const getUsers = async (req, res) => {
  try{
    const users = await User.findAll();
    res.status(200).json({ users: users });
  }catch (error) {
    res.status(400).json({ error: 'Error when recovering users' });
  }
}

export default { signup, login, getUsers };
