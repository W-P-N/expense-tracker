import { View, Text } from "react-native";

function ExpensesSummary({expenses, periodName}) {

    const expensesSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount  // Assumption ... don't first look at the data then code this...
    }, 0);  // Reduce -> Combines multiples values in an array into a single numeber.

    return (
        <View>
            <Text>
                {periodName}
            </Text>
            <Text>
                Rs {expensesSum.toFixed(2)}
            </Text>
        </View>
    );
};

export default ExpensesSummary;
