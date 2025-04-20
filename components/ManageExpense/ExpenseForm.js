import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";

function ExpenseForm() {

    const [inputValues, setInputValues] = useState({
        amount: '',
        date: '',
        description: ''
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputValues((currentInputValues) => {
            return {
                ...currentInputValues,
                [inputIdentifier]: enteredValue
            }
        })
    };

    return (
        <View>
            <Text style={styles.titleStyle}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input label='Amount' style={styles.rowInput} textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChangedHandler.bind(this, 'amount'),
                    value: inputValues.amount  // Reflect change in the form
                }}/>
                <Input label='Date' style={styles.rowInput} textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangedHandler.bind(this, 'date'),
                    value: inputValues.date
                }}/>
            </View>
            <Input label='Description'textInputConfig={{
                multiline: true,
                numberOfLines: 10,
                // autoCapitalize
                // autoCorrect
                onChangeText: inputChangedHandler.bind(this, 'description'),
                value: inputValues.description
            }}/>
        </View>
    );
};

export default ExpenseForm;

const styles = StyleSheet.create({
    rootContainer: {
        marginTop: 40,
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    }
})
