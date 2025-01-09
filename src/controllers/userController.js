import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const signup = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({ error: 'Email, mot de passe, prénom et nom sont requis' });
  }

  const existingUser = await User.findOne({ where: { email: email } });
  if (existingUser) {
    return res.status(400).json({ error: 'Cet email est déjà enregistré.' });
  }

  const user = await User.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: await bcrypt.hash(password, 10),
  });

  return res.status(201).json({ 
    message: user.first_name + ' ' + user.last_name + ' a été enregistré avec succès !',
  });
}

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe sont requis.' });
  }

  const user = await User.findOne({ where: { email: email } });
  if (!user) {
      return res.status(401).json({ message: 'Paire identifiant / mot de passe incorrecte' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
      return res.status(401).json({ message: 'Paire identifiant / mot de passe incorrecte' });
  }

  const token = jwt.sign(
    {
      id: user.user_id,
      email: user.email,
    },
    'RANDOM_TOKEN',
    { expiresIn: "24h" },
  );

  return res.status(200).json({ token });
}

export default { signup, login };
