import { DataTypes, Model } from "sequelize";
import db from "./config/db.config";

export class User extends Model { };
User.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
  },
  fundingAccount: {
    type: DataTypes.STRING,
    defaultValue: Math.random().toString().slice(2, 12)
  }
}, {
  sequelize: db,
  tableName: "Users",
  // modelName: "Users"
});

export class Transaction extends Model { }
Transaction.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
  },
  network: {
    type: DataTypes.STRING,
  },
  amount: {
    type: DataTypes.NUMBER,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  rechargeType:{
    type: DataTypes.STRING   // airtime, data, cabletv, electricity
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  description: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.UUIDV4,
  }
}, {
  sequelize: db,
  tableName: "Transactions",
});

export class FundingAccount extends Model { };
FundingAccount.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
  },
  bank: {
    type: DataTypes.STRING,
    defaultValue: 'Topidus Bank'
  },
  number: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.UUIDV4
  }
}, {
  sequelize: db,
  tableName: "FundingAccounts"
})

Transaction.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Transaction, { foreignKey: 'userId', as: 'transactions' });

// FundingAccount.belongsTo(User, { foreignKey: 'userId' });
// User.hasOne(FundingAccount, { foreignKey: "userId", as: 'fundingAcct' });