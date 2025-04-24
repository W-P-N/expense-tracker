import axios from "axios";

const URL = 'https://react-native-2c1be-default-rtdb.firebaseio.com';

export function storeExpense(expenseData) {
    axios.post(
        URL + '/expenses.json', 
        expenseData
    );
};

export async function getExpenses() {
    const resp = await axios.get(
        URL + '/expenses.json',
    );
    const expenses = [];

    for(const key in resp.data) {
        const expenseObj = {
            id: key,
            amount: resp.data[key].amount,
            date: new Date(resp.data[key].date),
            description: resp.data[key].description
        };
        expenses.push(expenseObj);
    };

    return expenses;
}

