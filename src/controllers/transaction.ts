import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import * as utils from "../utils";
import { Transaction } from "../models";

export async function addTransaction(req: Request, res: Response) {
  // const id = uuidv4();
  // const user = req.user.dataValues;
  // const userId = user.id;
  // try {
  //   const newTransaction = await Transaction.create({ ...req.body, id, userId });
  //   res.json({message: "transaction successful", data: newTransaction});
  // } catch (error: any) {
  //   res.status(500).json(error);
  // }
}

export async function getAllTransactions(req: Request, res: Response) {
  console.log('calling controller function to get all transactions');
  try {
    const allTransactions = await Transaction.findAll();
    res.json(allTransactions)
  } catch (error: any) {
    res.status(500).json(error);
  }
}

// account/transaction/recharge
export async function recharge(req: Request, res: Response) {
  const user = req.user.dataValues;
  if (req.method === 'POST') {
    console.log('calling controller to recharge airtime');
    const id = uuidv4();
    const userId = user.id;
    try {
      const newTransaction = await Transaction.create({ ...req.body, id, userId });
      res.json({ message: "transaction successful", data: newTransaction });
    } catch (error: any) {
      res.status(500).json(error);
    }
  } else {
    console.log('calling controller to show airtime recharge page');
    res.json(user.transactions)
    // res.render('recharge', {});
  }

}