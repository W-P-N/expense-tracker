import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../ui/Button";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel}) {

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

    function submitHandler() {}

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
            <View style={styles.buttonContainer}>
                <Button mode='flat' onPress={onCancel} style={styles.button}>
                    Cancel
                </Button>
                <Button onPress={submitHandler} style={styles.button}>
                    {submitButtonLabel}
                </Button>
            </View>
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
})
