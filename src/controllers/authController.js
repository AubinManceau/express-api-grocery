import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/Users.js";
import ClientUser from "../models/ClientUsers.js";
import AdminUser from "../models/AdminUsers.js";
import CommercialUser from "../models/CommercialUsers.js";
import SupplierUser from "../models/SupplierUsers.js";
import DeliveryManUser from "../models/DeliveryManUsers.js";
import LogisticManagerUser from "../models/LogiscticManagerUsers.js";

const signup = async (req, res) => {
  try {
    const { email, password, first_name, last_name, role } = req.body;

    if (!email || !password || !first_name || !last_name || !role) {
      return res.status(400).json({
        error: "Email, password, role, firstname and lastname are required",
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "This email is already saved" });
    }

    const user = await User.create({
      first_name,
      last_name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    if (role === "client") {
      await ClientUser.create({
        user_id: user.user_id,
      });
    } else if (role === "admin") {
      await AdminUser.create({
        user_id: user.user_id,
      });
    } else if (role === "commercial") {
      await CommercialUser.create({
        user_id: user.user_id,
      });
    } else if (role === "supplier") {
      await SupplierUser.create({
        user_id: user.user_id,
      });
    } else if (role === "deliveryMan") {
      await DeliveryManUser.create({
        user_id: user.user_id,
      });
    } else if (role === "logisticManager") {
      await LogisticManagerUser.create({
        user_id: user.user_id,
      });
    } else {
      return res.status(400).json({ error: "Role not found" });
    }

    return res.status(201).json({
      message: `${user.first_name} ${user.last_name} was successfully registered`,
    });
  } catch (error) {
    return res.status(500).json({ error: "Error when creating user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Incorrect login/password pair" });
    }

    if (user.deletedAt) {
      return res.status(401).json({ message: "Incorrect login/password pair" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect login/password pair" });
    }

    const token = jwt.sign(
      {
        id: user.user_id,
        email: user.email,
      },
      "RANDOM_TOKEN",
      { expiresIn: "24h" },
    );
    res.header("Authorization", `Bearer ${token}`);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default { signup, login };
