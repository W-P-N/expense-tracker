import { createContext, useReducer, useState } from "react";

export const ExpensesContext = createContext({
    expenses: [],
    setExpenses: (expenses) => {},
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
        case 'SET':{
            return action.payload
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

    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    function addExpense(expenseData) {
        dispatch({
            type: 'ADD',
            payload: expenseData
        });
    };

    function setExpenses(expenses) {
        dispatch({
            type: 'SET',
            payload: expenses
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
        setExpenses: setExpenses,
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
