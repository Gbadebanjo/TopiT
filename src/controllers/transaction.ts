import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { Transaction } from "../models";

export async function addTransaction(req: Request, res: Response) {
  // const id = uuidv4();
  // const userId = req.user.id;
  // try {
  //   await Transaction.create({ ...req.body, id, userId });
    res.json({message: "transaction successful"});
  // } catch (error: any) {
  //   console.log(error.message);
  //   res.status(500).json({ error: 'error in transaction' });
  // }
}

export async function getAllTransactions(req: Request, res: Response) {
  console.log('calling controller function to get all transactions');
  try {
    const allTransactions = await Transaction.findAll();
    res.json(allTransactions)
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

// export async function getTransaction(req: Request, res: Response) {
//   console.log('calling controller function to get a transaction by id');
//   try {
//     const transaction = await Transaction.findOne({ where: { id: req.params.id } });
//     if (transaction) {
//       res.json(transaction);
//     } else {
//       res.status(404).json({ error: "Transaction not found!" });
//     }
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// }

// export async function deleteTransaction(req: Request, res: Response) {
//   try {
//     const transaction = await Transaction.findOne({ where: { id: req.params.id } });
//     if (transaction) {
//       await transaction.destroy();
//       res.redirect(200, '/transactions');
//     } else {
//       throw new Error("Transaction not found!");
//     }
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// }