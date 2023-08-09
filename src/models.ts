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
  type: {
    type: DataTypes.ENUM('debit', 'credit'),
    allowNull: false
  },
  amount: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
  },
  service: {
    type: DataTypes.ENUM('airtime', 'data', 'electricity', 'cable', 'fund'),
    allowNull: false
  },
  userId: {
    type: DataTypes.UUIDV4,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  serviceProvider: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'mtn'
  },
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
  bankName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  acctNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  acctName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUIDV4,
    allowNull: false
  },
  acctBal: {
    type: DataTypes.NUMBER,
    allowNull: false,
  }
}, {
  sequelize: db,
  tableName: "FundingAccounts"
})

Transaction.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Transaction, { foreignKey: 'userId', as: 'transactions' });

FundingAccount.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(FundingAccount, { foreignKey: "userId", as: 'fundingAcct' });


// mtn 1000 airtime debit
// providus 5000 funding credit
// serviceProvider amount service type