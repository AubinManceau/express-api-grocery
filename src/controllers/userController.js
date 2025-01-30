import User from "../models/Users.js";
import ClientUser from "../models/ClientUsers.js";
import AdminUser from "../models/AdminUsers.js";
import CommercialUser from "../models/CommercialUsers.js";
import SupplierUser from "../models/SupplierUsers.js";
import DeliveryManUser from "../models/DeliveryManUsers.js";
import LogisticManagerUser from "../models/LogiscticManagerUsers.js";

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ where: { deletedAt: null } });
    const usersWithRole = await Promise.all(
      users.map(async (user) => {
        const client = await ClientUser.findOne({
          where: { user_id: user.user_id },
        });
        const admin = await AdminUser.findOne({
          where: { user_id: user.user_id },
        });
        const commercial = await CommercialUser.findOne({
          where: { user_id: user.user_id },
        });
        const supplier = await SupplierUser.findOne({
          where: { user_id: user.user_id },
        });
        const deliveryMan = await DeliveryManUser.findOne({
          where: { user_id: user.user_id },
        });
        const logisticManager = await LogisticManagerUser.findOne({
          where: { user_id: user.user_id },
        });
        if (client) {
          return { user, role: "client" };
        }
        if (admin) {
          return { user, role: "admin" };
        }
        if (commercial) {
          return { user, role: "commercial" };
        }
        if (supplier) {
          return { user, role: "supplier" };
        }
        if (deliveryMan) {
          return { user, role: "deliveryMan" };
        }
        if (logisticManager) {
          return { user, role: "logisticManager" };
        }
        return { user, role: "unknown" };
      }),
    );
    res.status(200).json({ users: usersWithRole });
  } catch (error) {
    res.status(400).json({ error: "Error when recovering users" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else if (user.deletedAt) {
      res.status(404).json({ error: "User not found" });
    } else {
      const client = await ClientUser.findOne({
        where: { user_id: user.user_id },
      });
      const admin = await AdminUser.findOne({
        where: { user_id: user.user_id },
      });
      const commercial = await CommercialUser.findOne({
        where: { user_id: user.user_id },
      });
      const supplier = await SupplierUser.findOne({
        where: { user_id: user.user_id },
      });
      const deliveryMan = await DeliveryManUser.findOne({
        where: { user_id: user.user_id },
      });
      const logisticManager = await LogisticManagerUser.findOne({
        where: { user_id: user.user_id },
      });
      let userWithRole;
      if (client) {
        userWithRole = { user, role: "client" };
      } else if (admin) {
        userWithRole = { user, role: "admin" };
      } else if (commercial) {
        userWithRole = { user, role: "commercial" };
      } else if (supplier) {
        userWithRole = { user, role: "supplier" };
      } else if (deliveryMan) {
        userWithRole = { user, role: "deliveryMan" };
      } else if (logisticManager) {
        userWithRole = { user, role: "logisticManager" };
      } else {
        userWithRole = { user, role: "unknown" };
      }
      res.status(200).json({ user: userWithRole });
    }
  } catch (error) {
    res.status(400).json({ error: "Error when recovering user" });
  }
};

const getUsersByRole = async (req, res) => {
  const { role } = req.params;
  try {
    if (role === "client") {
      const clients = await ClientUser.findAll();
      const clientUsers = await User.findAll({
        where: {
          user_id: clients.map((client) => client.user_id),
          deletedAt: null,
        },
      });
      res.status(200).json({ clients: clientUsers });
    } else if (role === "admin") {
      const admins = await AdminUser.findAll();
      const adminUsers = await User.findAll({
        where: {
          user_id: admins.map((admin) => admin.user_id),
          deletedAt: null,
        },
      });
      res.status(200).json({ admins: adminUsers });
    } else if (role === "commercial") {
      const commercials = await CommercialUser.findAll();
      const commercialUsers = await User.findAll({
        where: {
          user_id: commercials.map((commercial) => commercial.user_id),
          deletedAt: null,
        },
      });
      res.status(200).json({ commercials: commercialUsers });
    } else if (role === "supplier") {
      const suppliers = await SupplierUser.findAll();
      const supplierUsers = await User.findAll({
        where: {
          user_id: suppliers.map((supplier) => supplier.user_id),
          deletedAt: null,
        },
      });
      res.status(200).json({ suppliers: supplierUsers });
    } else if (role === "deliveryMan") {
      const deliveryMen = await DeliveryManUser.findAll();
      const deliveryManUsers = await User.findAll({
        where: {
          user_id: deliveryMen.map((deliveryMan) => deliveryMan.user_id),
          deletedAt: null,
        },
      });
      res.status(200).json({ deliveryMen: deliveryManUsers });
    } else if (role === "logisticManager") {
      const logisticManagers = await LogisticManagerUser.findAll();
      const logisticManagerUsers = await User.findAll({
        where: {
          user_id: logisticManagers.map(
            (logisticManager) => logisticManager.user_id,
          ),
          deletedAt: null,
        },
      });
      res.status(200).json({ logisticManagers: logisticManagerUsers });
    } else {
      res.status(400).json({ error: "Role not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else if (user.deletedAt) {
      res.status(404).json({ error: "User not found" });
    } else {
      const { deletedAt, ...updateData } = req.body;
      const client = await ClientUser.findOne({
        where: { user_id: user.user_id },
      });
      const admin = await AdminUser.findOne({
        where: { user_id: user.user_id },
      });
      const commercial = await CommercialUser.findOne({
        where: { user_id: user.user_id },
      });
      const supplier = await SupplierUser.findOne({
        where: { user_id: user.user_id },
      });
      const deliveryMan = await DeliveryManUser.findOne({
        where: { user_id: user.user_id },
      });
      const logisticManager = await LogisticManagerUser.findOne({
        where: { user_id: user.user_id },
      });
      let userWithRole;
      if (client) {
        userWithRole = { user, role: "client" };
      } else if (admin) {
        userWithRole = { user, role: "admin" };
      } else if (commercial) {
        userWithRole = { user, role: "commercial" };
      } else if (supplier) {
        userWithRole = { user, role: "supplier" };
      } else if (deliveryMan) {
        userWithRole = { user, role: "deliveryMan" };
      } else if (logisticManager) {
        userWithRole = { user, role: "logisticManager" };
      } else {
        userWithRole = { user, role: "unknown" };
      }
      await user.update(updateData);
      res.status(200).json({ message: "User updated", user: userWithRole });
    }
  } catch (error) {
    res.status(400).json({ error: "Error when updating user" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else if (user.deletedAt) {
      res.status(404).json({ error: "User not found" });
    } else {
      await user.update({ deletedAt: new Date() });
      res.status(200).json({ message: "User deleted", user });
    }
  } catch (error) {
    res.status(400).json({ error: "Error when deleting user" });
  }
};

export default {
  getUsers,
  getUserById,
  getUsersByRole,
  updateUser,
  deleteUser,
};
