import { FlatList, StyleSheet, Text, View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { GlobalStyles } from "../../constants/styles";

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

function ExpensesOutput({expenses, expensesPeriod}) {
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
            <ExpensesList expenses={DUMMY_EXPENSES}/>
        </View>
    );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
        flex: 1
    }
})
