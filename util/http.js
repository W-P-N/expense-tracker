import axios from "axios";

const URL = 'https://react-native-2c1be-default-rtdb.firebaseio.com';

export async function storeExpense(expenseData) {
    const resp = await axios.post(
        URL + '/expenses.json', 
        expenseData
    );
    const id = resp.data.name;
    console.log(resp.data.name);
    return id;
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
};

export function updateExpense(id, expenseData) {
    return axios.put(
        URL + `/expenses/${id}.json`,
        expenseData
    );
};

export async function deleteExpense(id) {
    return axios.delete(
        URL + `/expenses/${id}.json`
    );
};

