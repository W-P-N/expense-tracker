import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";

function ExpenseForm() {

    function amountChangedHandler() {};

    return (
        <View>
            <Text style={styles.titleStyle}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input label='Amount' style={styles.rowInput} textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: amountChangedHandler,
                }}/>
                <Input label='Date' style={styles.rowInput} textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: () => {}
                }}/>
            </View>
            <Input label='Description'textInputConfig={{
                multiline: true,
                numberOfLines: 10
                // autoCapitalize
                // autoCorrect
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
