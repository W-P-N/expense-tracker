import { View, StyleSheet, Text, Button } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ErrorOverlay({message, onConfirm}) {
    return (
        <>
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>
                An Error occurred!
            </Text>
            <Text style={styles.text}>
                {message}
            </Text>
            <Button title='Okay' onPress={onConfirm}/>
        </View>
        </>
    );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    text: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 8
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    message: {
        fontSize: 14,
    }
})

