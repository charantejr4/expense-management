const express=require('express');
const { addTransaction, getAllTransaction } = require('../controllers/transactionCtrl');

//router object
const router=express.Router()

//routers
//add transaciton POST method
router.post('/add-transaction',addTransaction);


//get Transactions
router.post("/get-transaction",getAllTransaction);
module.exports=router;