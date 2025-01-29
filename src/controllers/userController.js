import jwt from 'jsonwebtoken';
import User from '../models/Users.js';
import bcrypt from 'bcrypt';
import ClientUser from '../models/ClientUsers.js';
import AdminUser from '../models/AdminUsers.js';
import CommercialUser from '../models/CommercialUsers.js';
import SupplierUser from '../models/SupplierUsers.js';
import DeliveryManUser from '../models/DeliveryManUsers.js';
import LogisticManagerUser from '../models/LogiscticManagerUsers.js';

const signup = async (req, res) => {
  const { email, password, first_name, last_name, role } = req.body;

  if (!email || !password || !first_name || !last_name || !role) {
      return res.status(400).json({ error: 'Email, password, role, firstname and lastname are required' });
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

  if(role == "client"){
    await ClientUser.create({
      user_id: user.user_id,
    });
  }else if(role == "admin"){
    await AdminUser.create({
      user_id: user.user_id,
    }); 
  }else if(role == "commercial"){
    await CommercialUser.create({
      user_id: user.user_id,
    });
  }else if(role == "supplier"){
    await SupplierUser.create({
      user_id: user.user_id,
    });
  }else if(role == "deliveryMan"){
    await DeliveryManUser.create({
      user_id: user.user_id,
    });
  }else if(role == "logisticManager"){
    await LogisticManagerUser.create({
      user_id: user.user_id,
    });
  }else {
    return res.status(400).json({ error: 'Role not found' });
  }

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

  if(user.deletedAt){
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
    const users = await User.findAll({ where: { deletedAt: null } });
    const usersWithRole = await Promise.all(users.map(async user => {
      const client = await ClientUser.findOne({ where: { user_id: user.user_id } });
      const admin = await AdminUser.findOne({ where: { user_id: user.user_id } });
      const commercial = await CommercialUser.findOne({ where: { user_id: user.user_id } });
      const supplier = await SupplierUser.findOne({ where: { user_id: user.user_id } });
      const deliveryMan = await DeliveryManUser.findOne({ where: { user_id: user.user_id } });
      const logisticManager = await LogisticManagerUser.findOne({ where: { user_id: user.user_id } });
      if(client){
        return { user: user, role: "client" };
      }else if(admin){
        return { user: user, role: "admin" };
      }else if(commercial){
        return { user: user, role: "commercial" };
      }else if(supplier){
        return { user: user, role: "supplier" };
      }else if(deliveryMan){
        return { user: user, role: "deliveryMan" };
      }else if(logisticManager){
        return { user: user, role: "logisticManager" };
      }else{
        return { user: user, role: "unknown" };
      }
    }));
    res.status(200).json({ users: usersWithRole });
  }catch (error) {
    res.status(400).json({ error: 'Error when recovering users' });
  }
}

const getUserById = async (req, res) => {
  const id = req.params.id;
  try{
    const user = await User.findByPk(id);
    if(!user){
      res.status(404).json({ error: 'User not found' });
    }else if(user.deletedAt){
      res.status(404).json({ error: 'User not found' });
    }else{
      const client = await ClientUser.findOne({ where: { user_id: user.user_id } });
      const admin = await AdminUser.findOne({ where: { user_id: user.user_id } });
      const commercial = await CommercialUser.findOne({ where: { user_id: user.user_id } });
      const supplier = await SupplierUser.findOne({ where: { user_id: user.user_id } });
      const deliveryMan = await DeliveryManUser.findOne({ where: { user_id: user.user_id } });
      const logisticManager = await LogisticManagerUser.findOne({ where: { user_id: user.user_id } });
      let userWithRole;
      if(client){
        userWithRole = { user: user, role: "client" };
      }else if(admin){
        userWithRole = { user: user, role: "admin" };
      } else if(commercial){
        userWithRole = { user: user, role: "commercial" };
      } else if(supplier){
        userWithRole = { user: user, role: "supplier" };
      } else if(deliveryMan){
        userWithRole = { user: user, role: "deliveryMan" };
      } else if(logisticManager){
        userWithRole = { user: user, role: "logisticManager" };
      } else {
        userWithRole = { user: user, role: "unknown" };
      }
      res.status(200).json({ user: userWithRole });
    }
  }catch (error) {
    res.status(400).json({ error: 'Error when recovering user' });
  }
}

const updateUser = async (req, res) => {
  const id = req.params.id;
  try{
    const user = await User.findByPk(id);
    if(!user){
      res.status(404).json({ error: 'User not found' });
    }else if(user.deletedAt){
      res.status(404).json({ error: 'User not found' });
    }else{
      const { deletedAt, ...updateData } = req.body;
      const client = await ClientUser.findOne({ where: { user_id: user.user_id } });
      const admin = await AdminUser.findOne({ where: { user_id: user.user_id } });
      const commercial = await CommercialUser.findOne({ where: { user_id: user.user_id } });
      const supplier = await SupplierUser.findOne({ where: { user_id: user.user_id } });
      const deliveryMan = await DeliveryManUser.findOne({ where: { user_id: user.user_id } });
      const logisticManager = await LogisticManagerUser.findOne({ where: { user_id: user.user_id } });
      let userWithRole;
      if(client){
        userWithRole = { user: user, role: "client" };
      }else if(admin){
        userWithRole = { user: user, role: "admin" };
      } else if(commercial){
        userWithRole = { user: user, role: "commercial" };
      } else if(supplier){
        userWithRole = { user: user, role: "supplier" };
      } else if(deliveryMan){
        userWithRole = { user: user, role: "deliveryMan" };
      } else if(logisticManager){
        userWithRole = { user: user, role: "logisticManager" };
      } else {
        userWithRole = { user: user, role: "unknown" };
      }
      await user.update(updateData);
      res.status(200).json({ message: 'User updated', user: userWithRole });
    }
  }catch{
    res.status(400).json({ error: 'Error when updating user' });
  }
}

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try{
    const user = await User.findByPk(id);
    if(!user){
      res.status(404).json({ error: 'User not found' });
    }else if(user.deletedAt){
      res.status(404).json({ error: 'User not found' });
    }else{
      await user.update({ deletedAt: new Date() });
      res.status(200).json({ message: 'User deleted', user: user });
    }
  }catch{
    res.status(400).json({ error: 'Error when deleting user' });
  }
}

export default { signup, login, getUsers, getUserById, updateUser, deleteUser };
