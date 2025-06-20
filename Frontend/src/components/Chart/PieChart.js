import React from 'react';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { dollar } from '../../utils/icons'; // Import dollar icon

function PieChart({ days = 30 }) {
    const { expenses } = useGlobalContext();

    // Filter expenses for the last X days
    const filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        const today = new Date();
        const diffTime = Math.abs(today - expenseDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= days;
    });

    // Calculate total for filtered expenses
    const totalFilteredExpenses = filteredExpenses.reduce((total, expense) => total + expense.amount, 0);

    // Group expenses by category
    const categoryTotals = filteredExpenses.reduce((acc, expense) => {
        const { category, amount } = expense;
        acc[category] = (acc[category] || 0) + amount;
        return acc;
    }, {});

    const data = {
        labels: Object.keys(categoryTotals),
        datasets: [{
            data: Object.values(categoryTotals),
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
                '#FF6384',
                '#36A2EB'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
                '#FF6384',
                '#36A2EB'
            ]
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    font: {
                        size: 12
                    }
                }
            },
            title: {
                display: true,
                text: `Expenses for Last ${days} Days`,
                font: {
                    size: 16
                },
                padding: {
                    bottom: 20,
                }
            }
        }
    };

    return (
        <PieChartStyled>
            <div className="chart-header">
                <h2>Expenses for Last {days} Days</h2>
                <p className="total-amount">
                    {dollar} {totalFilteredExpenses}
                </p>
            </div>
            <div className="chart-container">
                <Pie data={data} options={options} />
            </div>
        </PieChartStyled>
    );
}

const PieChartStyled = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .chart-header {
        text-align: center;
        margin-bottom: 1rem;
    }

    .chart-container {
        width: 100%;
        height: calc(100% - 60px); /* Adjust height to accommodate header */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .total-amount {
        font-size: 2rem; /* Make the amount larger */
        font-weight: 800;
        color: var(--color-green); /* Example color, adjust as needed */
        margin-top: 0.5rem; /* Space between title and amount */
    }
`;

export default PieChart; 