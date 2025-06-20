import React, { useMemo } from 'react'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler,
} from 'chart.js'

// line graph
import {Line} from 'react-chartjs-2'
import styled from 'styled-components'
import { dateFormat } from '../../utils/dateFormat'

// we need to register the elements that we have imported from the chart.js
ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler,
)

function Chart({incomes = [], expenses = []}) {

    // Sort expenses and incomes by date in ascending order
    const sortedExpenses = useMemo(() => [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date)), [expenses]);
    const sortedIncomes = useMemo(() => [...incomes].sort((a, b) => new Date(a.date) - new Date(b.date)), [incomes]);

    console.log('Chart component - sortedExpenses:', sortedExpenses);
    console.log('Chart component - sortedIncomes:', sortedIncomes);

    const data = useMemo(() => {
        const datasets = [
            {
                label: 'Expenses',
                data: sortedExpenses.map((expense) => expense.amount),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                tension: 0,
                fill: false,
                pointRadius: 4,
                pointHoverRadius: 6
            }
        ];

        // Conditionally add Income dataset if incomes array is not empty
        if (sortedIncomes && sortedIncomes.length > 0) {
            datasets.unshift({
                label: 'Income',
                data: sortedIncomes.map((income) => income.amount),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                tension: 0,
                fill: false,
                pointRadius: 4,
                pointHoverRadius: 6
            });
        }

        return {
            labels: sortedExpenses.map((exp) => dateFormat(exp.date)),
            datasets: datasets
        };
    }, [sortedExpenses, sortedIncomes]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    padding: 20
                }
            },
            title: {
                display: true,
                text: incomes && incomes.length > 0 ? 'Income vs Expenses Over Time' : 'Expenses Overview',
                font: {
                    size: 18,
                    weight: 'bold'
                },
                padding: {
                    top: 10,
                    bottom: 20
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleFont: {
                    size: 14,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 13
                },
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-IN', {
                                style: 'currency',
                                currency: 'INR'
                            }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            y: {
                type: 'linear',
                beginAtZero: true,
                min: 0,
                max: Math.max(...sortedExpenses.map(exp => exp.amount), ...sortedIncomes.map(inc => inc.amount), 100),
                ticks: {
                    callback: function(value) {
                        return '₹' + value.toLocaleString('en-IN');
                    },
                    font: {
                        size: 12
                    }
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 12
                    },
                    maxRotation: 45,
                    minRotation: 45
                }
            }
        }
    }

    return (
        <ChartStyled>
            <Line data={data} options={options} />
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart