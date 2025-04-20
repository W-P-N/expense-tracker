import { createContext, useReducer, useState } from "react";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'shoes',
        amount: 2000.21,
        date: new Date('2025-12-19')
    },
    {
        id: 'e2',
        description: 'trousers',
        amount: 200.21,
        date: new Date('2025-12-22')
    },
    {
        id: 'e3',
        description: 'chocolate',
        amount: 211,
        date: new Date('2025-12-25')
    },
    {
        id: 'e4',
        description: 'coffee and snacks',
        amount: 401,
        date: new Date('2025-01-21')
    },
    {
        id: 'e5',
        description: 'tea',
        amount: 21,
        date: new Date('2025-02-27')
    },
    {
        id: 'e6',
        description: 'shoes',
        amount: 2000.21,
        date: new Date('2025-12-19')
    },
    {
        id: 'e7',
        description: 'trousers',
        amount: 200.21,
        date: new Date('2025-12-22')
    },
    {
        id: 'e8',
        description: 'chocolate',
        amount: 211,
        date: new Date('2025-12-25')
    },
    {
        id: 'e9',
        description: 'coffee and snacks',
        amount: 401,
        date: new Date('2025-01-21')
    },
    {
        id: 'e10',
        description: 'tea',
        amount: 21,
        date: new Date('2025-02-27')
    },
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    removeExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {}
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD': {
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id: id}, ...state];
        }
        case 'UPDATE': {
            const updatableExpenseIdx = state.findIndex((expense) => expense.id === action.payload.id);  // Find the element to update and store in a constant.
            const updatableExpense = state[updatableExpenseIdx];  // Get hold of the expense to be updated from the list.
            const updatedItem = {...updatableExpense, ...action.payload.data}  // Update operations on the expense
            const updatedExpenses = [...state];  // Get the current state array.
            updatedExpenses[updatableExpenseIdx] = updatedItem;  // Update the item by replacing the item.
            return updatedExpenses;

        }
        case 'DELETE': {
            return state.filter((expense) => expense.id !== action.payload);
        }
        default:
            return state;
    }
}

function ExpensesContextProvider({children}) {

    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData) {
        dispatch({
            type: 'ADD',
            payload: expenseData
        });
    };

    function removeExpense(id) {
        dispatch({
            type: 'DELETE',
            payload: id
        });
    };

    function updateExpense(id, expenseData) {
        dispatch({
            type:'UPDATE',
            payload: {id: id, data: expenseData}
        });
    };
    
    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        removeExpense: removeExpense,
        updateExpense: updateExpense
    };

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    );
};

export default ExpensesContextProvider;
