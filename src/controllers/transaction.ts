import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { Transaction } from "../models";
import { FundingAccount } from "../models";

// controllers -> routes -> app.ts

/**GET /account/transaction/all */
export async function getAllTransactions(req: Request, res: Response) {
  console.log('calling controller function to get all transactions');
  try {
    const allTransactions = await Transaction.findAll();
    console.log(allTransactions);
    res.render('transactions', {})
    // res.json(allTransactions)
  } catch (error: any) {
    res.status(500).json(error);
  }
}

/**GET or POST /account/transaction/recharge */
export async function recharge(req: Request, res: Response) {
  const user = req.user.dataValues;
  console.log('calling controller to recharge airtime');
  const service = req.url === '/recharge' ? 'airtime' : 'data';
  const id = uuidv4();
  const userId = user.id;
  const type = 'debit';
  const { serviceProvider, amount, phone } = req.body;
  const description = `${serviceProvider} ${amount} ${service} ${type} ${phone}`;
  try {
    const newTransaction = await Transaction.create({
      ...req.body,
      id,
      userId,
      description,
      type,
      service
    });
    console.log('description: ', newTransaction.dataValues.description);
    // update funding account balance
    let fundingAccount = await FundingAccount.findOne({ where: { userId } });
    await FundingAccount.update(
      { acctBal: fundingAccount?.dataValues.acctBal - amount },
      { where: { userId } }
    );

    fundingAccount = await FundingAccount.findOne({ where: { userId } });
    console.log('new acct balance: ', fundingAccount?.dataValues.acctBal);
    res.redirect(req.url.slice(1));
    // res.json({ message: "transaction successful", data: newTransaction });
  } catch (error: any) {
    res.status(500).json(error);
  }
}

/**POST /account/transaction/fund */
export async function fund(req: Request, res: Response) {
  console.log('calling controller to fund wallet');
  const user = req.user.dataValues;
  const id = uuidv4();
  const userId = user.id;
  const amount = Number(req.body.amount);
  const serviceProvider = 'Topidus';
  const type = 'credit';
  const service = 'fund';
  const description = `${serviceProvider} ${amount} ${service} ${type}`;
  try {
    // find user funding account
    let fundingAccount = await FundingAccount.findOne({ where: { userId } });
    if (fundingAccount) {
      await Transaction.create({
        id,
        type,
        amount,
        description,
        service,
        userId,
        serviceProvider
      });
      // update funding account balance
      await FundingAccount.update(
        { acctBal: fundingAccount.dataValues.acctBal + amount },
        { where: { userId } }
      );

      fundingAccount = await FundingAccount.findOne({ where: { userId } });
      // res.json({ message: "transaction successful", data: fundingAccount?.dataValues });
      console.log('new acct balance: ', fundingAccount?.dataValues.acctBal);
      res.redirect('fund');
    }

  } catch (error: any) {
    res.status(500).json(error);
  }

}