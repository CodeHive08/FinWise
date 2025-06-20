import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';
import Chart from '../Chart/Chart';

function Expenses() {
    const {addIncome,expenses, getExpenses, deleteExpense, totalExpenses} = useGlobalContext()
    const [filterDays, setFilterDays] = useState(30);

    useEffect(() =>{
        getExpenses()
    }, [])

    const filterExpensesByDays = (days) => {
        const today = new Date();
        return (expenses || []).filter(expense => {
            const expenseDate = new Date(expense.date);
            const diffTime = Math.abs(today - expenseDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= days;
        });
    };

    const filteredExpenses = filterExpensesByDays(filterDays);

    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-expense">Total Expense: <span>₹{totalExpenses()}</span></h2>

                <div className="filter-buttons">
                    <button 
                        className={filterDays === 30 ? 'active' : ''}
                        onClick={() => setFilterDays(30)}
                    >
                        Last 30 Days
                    </button>
                    <button 
                        className={filterDays === 60 ? 'active' : ''}
                        onClick={() => setFilterDays(60)}
                    >
                        Last 60 Days
                    </button>
                </div>

                <div className="chart-container">
                    <h2>Expenses Overview</h2>
                    <Chart expenses={filteredExpenses} incomes={[]} />
                </div>

                <div className="expense-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="expenses">
                        {filteredExpenses.map((income) => {
                            const {_id, title, amount, date, category, description, type} = income;
                            console.log(income)
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                type={type}
                                category={category} 
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteExpense}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-expense{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .filter-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin: 1rem 0;

        button {
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            border-radius: 20px;
            padding: 0.8rem 1.5rem;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            color: #000;

            &:hover {
                background: var(--color-green);
                color: #fff;
            }

            &.active {
                background: var(--color-red);
                color: #fff;
            }
        }
    }

    .chart-container {
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin-top: 1rem;
        margin-bottom: 2rem;
        height: 350px;

        h2 {
            text-align: center;
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }
    }

    .expense-content{
        display: flex;
        gap: 2rem;
        margin-top: 8rem;
        .expenses{
            flex: 1;
        }
    }
`;

export default Expenses