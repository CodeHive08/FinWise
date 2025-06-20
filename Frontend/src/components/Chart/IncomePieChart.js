import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

function IncomePieChart() {
    const { incomes } = useGlobalContext();

    const categoryTotals = useMemo(() => {
        return (incomes || []).reduce((acc, income) => {
            const { category, amount } = income;
            acc[category] = (acc[category] || 0) + amount;
            return acc;
        }, {});
    }, [incomes]);

    const chartData = useMemo(() => {
        const labels = Object.keys(categoryTotals);
        const data = Object.values(categoryTotals);
        const backgroundColors = [
            '#4BC0C0', 
            '#36A2EB', 
            '#FFCE56', 
            '#FF6384',
            '#9966FF',
            '#FF9F40',
        ];

        return {
            labels,
            datasets: [{
                data,
                backgroundColor: backgroundColors.slice(0, labels.length),
                hoverBackgroundColor: backgroundColors.slice(0, labels.length),
            }]
        };
    }, [categoryTotals]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    font: {
                        size: 12
                    },
                    generateLabels: function(chart) {
                        const data = chart.data;
                        if (!data.labels || !data.datasets || !data.datasets[0]) {
                            return [];
                        }

                        return data.labels.map((label, i) => {
                            const value = data.datasets[0].data[i];
                            return {
                                text: `${label}: ${value}`,
                                fillStyle: data.datasets[0].backgroundColor[i],
                                strokeStyle: data.datasets[0].borderColor?.[i],
                                lineWidth: 1,
                                hidden: false,
                                index: i
                            };
                        });
                    }
                }
            },
            title: {
                display: true,
                text: 'Income Overview',
                font: {
                    size: 16
                }
            }
        }
    };

    return (
        <IncomePieChartStyled>
            <Pie data={chartData} options={options} />
        </IncomePieChartStyled>
    );
}

const IncomePieChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default IncomePieChart; 