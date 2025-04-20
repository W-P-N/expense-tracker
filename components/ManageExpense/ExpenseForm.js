import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { isValidElement, useState } from "react";
import Button from "../ui/Button";
import { getFormattedDate } from './../../util/date';
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {

    const [inputs, setInputs] = useState({
        amount: { 
            value: defaultValues ? defaultValues.amount.toString() : '', 
            isValid: true, 
        },
        date: { 
            value: defaultValues ? getFormattedDate(defaultValues.date) : '', 
            isValid: true, 
        },
        description: { 
            value: defaultValues ? defaultValues.description.toString() : '', 
            isValid: true, 
        }
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [inputIdentifier]: {value: enteredValue, isValid: true}
            }
        })
    };

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,  // Plus converts the input to number
            date: new Date(inputs.date.value),
            description: inputs.description.value
        };

        // Validation:
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if(!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Show feedback for failed validation
            // Alert.alert('Invalid Input', 'Please Check your input values');
            setInputs((currInputs) => {
                return {
                    amount: {
                        value: currInputs.amount.value,
                        isValid: amountIsValid
                    },
                    date: {
                        value: currInputs.date.value,
                        isValid: dateIsValid
                    },
                    description: {
                        value: currInputs.description.value,
                        isValid: descriptionIsValid
                    }
                }
            })
            return;
        };

        onSubmit(expenseData);
    };

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

    return (
        <View>
            <Text style={styles.titleStyle}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input 
                    label='Amount' 
                    style={styles.rowInput} 
                    textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChangedHandler.bind(this, 'amount'),
                    value: inputs.amount.value,  // Reflect change in the form
                    }}
                    invalid={!inputs.amount.isValid}
                />
                <Input 
                    label='Date' 
                    style={styles.rowInput} 
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangedHandler.bind(this, 'date'),
                        value: inputs.date.value
                    }}
                    invalid={!inputs.date.isValid}
                />
            </View>
            <Input 
                label='Description'
                textInputConfig={{
                multiline: true,
                numberOfLines: 10,
                // autoCapitalize
                // autoCorrect
                onChangeText: inputChangedHandler.bind(this, 'description'),
                value: inputs.description.value
                }}
                invalid={!inputs.description.isValid}
            />
            {formIsInvalid && (
                <Text style={styles.errorText}>Invalid Input Values - Please check your entered data!</Text>
            )}
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
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
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
