import { StyleSheet, TextInput, View } from "react-native";
import { useContext, useLayoutEffect, useState } from "react";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/ui/Button";
import { ExpensesContext } from "../store/context/expense-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

function ManageExpense({route, navigation}) {

    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

    const expensesCtx = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;  // !! -> converts the value into boolean. Falsy value into false and truthy value into truth

    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing]);

    async function deleteExpenseHandler() {
        setIsFetching(true);
        try {
            await deleteExpense(editedExpenseId);
            expensesCtx.removeExpense(editedExpenseId);
            navigation.goBack();
        } catch (error) {
            setError('Unable to delete the expense, please try again.');
        }
        setIsFetching(false);
    };
    function cancelHandler() {
        navigation.goBack();
    };
    async function confirmHandler(expenseData) {
        setIsFetching(true);
        try {        
        if (isEditing) {
            setIsFetching(true);
                expensesCtx.updateExpense(editedExpenseId, expenseData);
                await updateExpense(editedExpenseId, expenseData);
                navigation.goBack();
                setIsFetching(false);
            } else {
                setIsFetching(true);
                    const id = await storeExpense(expenseData);
                    expensesCtx.addExpense({...expenseData, id: id});
                    navigation.goBack();
                setIsFetching(false);
            }
        } catch (error) {
            setError('Unable to update the expense, please try again');
        }
    };

    function handleError() {
        setError(null);
    }

    if(error && !isFetching) {
        return <ErrorOverlay message={error} onConfirm={handleError} />
    }

    if(isFetching) {
        return <LoadingOverlay />
    }


    return (
        <View style={styles.rootContainer}>
            <ExpenseForm onSubmit={confirmHandler} onCancel={cancelHandler} submitButtonLabel={isEditing ? 'Update' : 'Add'} defaultValues={selectedExpense}/>
            
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
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
});
