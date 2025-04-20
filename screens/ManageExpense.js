import { StyleSheet, TextInput, View } from "react-native";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/ui/Button";
import { ExpensesContext } from "../store/context/expense-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpense({route, navigation}) {

    const expensesCtx = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;  // !! -> converts the value into boolean. Falsy value into false and truthy value into truth

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        expensesCtx.removeExpense(editedExpenseId);
        navigation.goBack();
    };
    function cancelHandler() {
        navigation.goBack();
    };
    function confirmHandler() {
        if (isEditing) {
            expensesCtx.updateExpense(editedExpenseId, {description: 'Test!', amount: 20, date: new Date('2025-03-10')});
        } else {
            expensesCtx.addExpense({description: 'Test!', amount: 20, date: new Date('2025-03-10')});
        }
        navigation.goBack();
    };


    return (
        <View style={styles.rootContainer}>
            <ExpenseForm />
            <View style={styles.buttonContainer}>
                <Button mode='flat' onPress={cancelHandler} style={styles.button}>
                    Cancel
                </Button>
                <Button onPress={confirmHandler} style={styles.button}>{isEditing ? 'Update' : 'Add'}</Button>
            </View>
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton 
                        icon="trash" 
                        color={GlobalStyles.colors.error500} 
                        size={36} 
                        onPress={deleteExpenseHandler} 
                    />
                </View>
            )}
        </View>
    );
};

export default ManageExpense;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },  
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
});
