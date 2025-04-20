import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/context/expense-context";
import { getDateMinusDays } from "../util/date";

function RecentExpenses() {
    const expensesCtx = useContext(ExpensesContext);

    // Logic to add the most recent dates
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return expense.date > date7DaysAgo;

    })
    return (
        <ExpensesOutput expenses={recentExpenses} expensesPeriod='Last 7 Days'/>
    );
};

export default RecentExpenses
