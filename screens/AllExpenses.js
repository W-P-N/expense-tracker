import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/context/expense-context";

function AllExpenses() {
    const expensesCtx = useContext(ExpensesContext);
    return (
        <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod='Total' fallbackText='No Registered Expense Found'/>
    );
};


export default AllExpenses
