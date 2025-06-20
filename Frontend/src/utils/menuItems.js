import {dashboard, expenses, transactions, trend, travel} from '../utils/icons'

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id:3,
        title: "Incomes",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Expenses",
        icon: expenses,
        link: "/dashboard",
    },
    {
        id:5,
        title: "Travel Planner",
        icon: travel,
        link: "/travel",
    },
]