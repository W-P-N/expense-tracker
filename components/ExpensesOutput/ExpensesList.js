import { FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

function ExpensesList({expenses}) {

    function renderExpenseItem(itemData) {
        return <ExpenseItem {...itemData.item} />
    }
    return (
        <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={renderExpenseItem}      
        />
    );
};

export default ExpensesList;
