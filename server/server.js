const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/transaction-db').then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

const Transaction = mongoose.model('transactions', new mongoose.Schema({
    id: String,
    date: Number,
    sender: {
        type: {firstName: String, lastName: String, dateOfBirth: String, IDNumber: String}
    },
    recipient: {
        type: {firstName: String, lastName: String, email: String, accountNumber: String, bank: String}
    },
    Amount: Number,
    CurrencyCd: String,
    Comments: String,
    Status: String,
}))

app.get('/transactions/:startDate/:endDate', async (req, res) => {
    const startDate = parseInt(req.params.startDate);
    const endDate = parseInt(req.params.endDate);
    try {
        const transactions = await Transaction
            .find({
                'status': { $in: ['COMPLETED', 'IN PROGRESS', 'REJECTED'] },
                'date': { $gt: startDate, $lt: endDate }
            })
            .sort({ 'date': 1 })
            .exec();
        res.json(transactions)
    } 
    catch (error){
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

app.get('/transactions/:id', async (req, res) => {
    const { id } = req.params;
  
    const transaction = await Transaction.findOne({ id });
    res.json(transaction);
  });

app.put('/transactions/:id', async (req, res) => {
    const { id } = req.params;
    updated = req.body;
    const updatedTransaction = await Transaction.findOneAndUpdate({ id: id }, { $set: updated }, { new: true });
    res.json(updatedTransaction);
    if (!updatedTransaction) {
        return res.status(404).send('Transaction not found');
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})