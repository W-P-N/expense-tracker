import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/context/expense-context";
import { getDateMinusDays } from "../util/date";
import { getExpenses } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true);
    const expensesCtx = useContext(ExpensesContext);

    // const [fetchedExpenses, setFetchedExpenses] = useState([]); // Instead added a new method in context

    // Logic to add the most recent dates
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return expense.date > date7DaysAgo;

    });

    useEffect(() => {
        async function fetchExpenses() {
            setIsFetching(true);
            const expenses = await getExpenses();
            setIsFetching(false);
            expensesCtx.setExpenses(expenses);
        };
        fetchExpenses();
    }, []);

    if (isFetching) {
        return <LoadingOverlay />
    }

    return (
        <ExpensesOutput expenses={recentExpenses} expensesPeriod='Last 7 Days' fallbackText='No expenses registered for the last 7 days'/>
    );
};

export default RecentExpenses
