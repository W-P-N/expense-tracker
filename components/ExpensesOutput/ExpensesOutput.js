import { FlatList, StyleSheet, Text, View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { GlobalStyles } from "../../constants/styles";


function ExpensesOutput({expenses, expensesPeriod, fallbackText}) {
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            {expenses.length > 0 ? <ExpensesList expenses={expenses}/> : <Text style={styles.infoTextStyle}>{fallbackText}</Text>}
        </View>
    );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
        flex: 1
    },
    infoTextStyle: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32
    }
})
