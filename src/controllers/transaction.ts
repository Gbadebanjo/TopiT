import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import * as utils from "../utils";
import { Transaction } from "../models";
import { FundingAccount } from "../models";

/**GET /account/transaction/all */
export async function getAllTransactions(req: Request, res: Response) {
  console.log('calling controller function to get all transactions');
  try {
    const allTransactions = await Transaction.findAll();
    res.json(allTransactions)
  } catch (error: any) {
    res.status(500).json(error);
  }
}

/**GET or POST /account/transaction/recharge */
export async function recharge(req: Request, res: Response) {
  const user = req.user.dataValues;
  if (req.method === 'POST') {
    console.log('calling controller to recharge airtime');
    const id = uuidv4();
    const userId = user.id;
    const { serviceProvider, amount, service, type } = req.body;
    const description = `${serviceProvider} ${amount} ${service} ${type}`
    try {
      const newTransaction = await Transaction.create({ ...req.body, id, userId, description });
      res.json({ message: "transaction successful", data: newTransaction });
    } catch (error: any) {
      res.status(500).json(error);
    }
  } else {
    console.log('calling controller to show airtime recharge page');
    res.json({message: 'showing transactions page', data: user});
    // res.render('recharge', {});
  }
}

/**GET or POST /account/transaction/fund */
// export async function fund(req: Request, res: Response) {
//   const user = req.user.dataValues;
//   if (req.method === 'POST') {
//     console.log('calling controller to fund wallet');
//     const id = uuidv4();
//     const userId = user.id;
//     const amount  = req.body.amount;
//     const serviceProvider = 'Topidus';
//     const type = 'debit';
//     const service = 'fund';
//     const description = `${serviceProvider} ${amount} ${service} ${type}`
//     try {
//       // find user funding account
//       const fundingAccount = await FundingAccount.findOne({ where: { userId } });
//       const acctBal = fundingAccount?.dataValues.acctBal + amount;
//       const newTransaction = await Transaction.create({
//         id: user.id,
//         type: 'debit',
//         amount: amount + fundingAccount?.dataValues.acctBal,
//         // id, userId, description });
//       res.json({ message: "transaction successful", data: newTransaction });
//     } catch (error: any) {
//       res.status(500).json(error);
//     }
//   } else {
//     console.log('calling controller to show airtime recharge page');
//     res.json({message: 'showing transactions page', data: user});
//     // res.render('recharge', {});
//   }
// }