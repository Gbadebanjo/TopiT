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
    res.render('transactions', {})
    // res.json(allTransactions)
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
    const type = 'debit';
    const service = 'airtime';
    const { serviceProvider, amount, phone } = req.body;
    const description = `${serviceProvider} ${amount} ${service} ${type} ${phone}`;
    try {
      const newTransaction = await Transaction.create({
        amount,
        id,
        userId,
        description,
        serviceProvider,
        type,
        phone,
        service
      });
      // update funding account balance
      let fundingAccount = await FundingAccount.findOne({ where: { userId } });
      await FundingAccount.update(
        { acctBal: fundingAccount?.dataValues.acctBal - amount },
        { where: { userId } }
      );
      
      fundingAccount = await FundingAccount.findOne({ where: { userId } });
      res.render('recharge', {});
      // res.json({ message: "transaction successful", data: newTransaction });
    } catch (error: any) {
      res.status(500).json(error);
    }
  } else {
    console.log('calling controller to show airtime recharge page');
    // res.json({message: 'showing transactions page', data: user});
    res.render('recharge', {});
  }
}

/**GET or POST /account/transaction/fund */
export async function fund(req: Request, res: Response) {
  const user = req.user.dataValues;
  if (req.method === 'POST') {
    console.log('calling controller to fund wallet');
    const id = uuidv4();
    const userId = user.id;
    const amount = Number(req.body.amount);
    const serviceProvider = 'Topidus';
    const type = 'debit';
    const service = 'fund';
    const description = `${serviceProvider} ${amount} ${service} ${type}`
    try {
      // find user funding account
      let fundingAccount = await FundingAccount.findOne({ where: { userId } });
      if (fundingAccount) {
        await Transaction.create({
          id: uuidv4(),
          type: 'debit',
          amount,
          description,
          service,
          userId
        });
        // update funding account balance
        await FundingAccount.update(
          { acctBal: fundingAccount.dataValues.acctBal + amount },
          { where: { userId } }
        );
        fundingAccount = await FundingAccount.findOne({ where: { userId } });
        // res.json({ message: "transaction successful", data: fundingAccount?.dataValues });
        res.render('addfunds', {});
      }

    } catch (error: any) {
      res.status(500).json(error);
    }
  } else {
    console.log('calling controller to show airtime recharge page');
    // res.json({ message: 'showing transactions page', data: user });
    res.render('addfunds');
  }
  
}