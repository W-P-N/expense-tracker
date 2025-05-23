import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ExpensesSummary({expenses, periodName}) {

    const expensesSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount  // Assumption ... don't first look at the data then code this...
    }, 0);  // Reduce -> Combines multiples values in an array into a single numeber.

    return (
        <View style={styles.container}>
            <Text style={styles.period}>
                {periodName}
            </Text>
            <Text style={styles.sum}>
                Rs {expensesSum.toFixed(2)}
            </Text>
        </View>
    );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
    container: {
        padding:8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    period: {
        fontSize: 14,
        color: GlobalStyles.colors.primary400,
    },
    sum: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary500
    }
});
