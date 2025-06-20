require("dotenv").config();
const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const router = require('express').Router();


const OpenAI = require("openai")
const openai = new OpenAI({apiKey: ""})


// end points created below

router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    // param is id and to get it we do :id
    .delete('/delete-income/:id', deleteIncome)

    // for expense
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)

router.post('/getTravelPlan', async (req, res) => {
    console.log(req.body.content);
    
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: req.body.content }]
    });
    console.log(chatCompletion.choices[0].message.content);
    
    res.json(chatCompletion.choices[0].message.content);
})

module.exports = router