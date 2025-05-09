import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";

function ExpenseItem({id, description, amount, date}) {

    const navigation = useNavigation();

    function expensePressHandler() {
        navigation.navigate(
            'ManageExpense',
            {
                expenseId: id
            }
        )
    };

    return (
        <Pressable onPress={expensePressHandler} style={({pressed}) => pressed && styles.pressedStyle}>
            <View style={styles.outerView}>
                <View>
                    <Text style={[styles.textBase, styles.descriptionText]}>
                        {description}
                    </Text>
                    <Text style={styles.textBase}>
                        {getFormattedDate(date)}
                    </Text>
                </View>
                <View style={styles.amtContainer}>
                    <Text style={styles.amtText}>
                        Rs. {amount.toFixed(2)}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

export default ExpenseItem;

const styles = StyleSheet.create({
    pressedStyle: {
        opacity: 0.75
    },
    outerView: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 4
    },
    textBase: {
        color: GlobalStyles.colors.primary50,
    },
    descriptionText: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold'
    },
    amtContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80
    },
    amtText: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold'
    }
});
