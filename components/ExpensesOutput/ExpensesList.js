import { FlatList, Text } from "react-native";

function ExpensesList({expenses}) {

    function renderExpenseItem(itemData) {
        return <Text>
            {itemData.item.description}
        </Text>
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
