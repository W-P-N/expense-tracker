import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './components/ui/IconButton';
import ExpensesContextProvider from './store/context/expense-context';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

// Nested Tab Navigator
function ExpenseOverView() {
	return (
		<BottomTab.Navigator
			screenOptions={({navigation}) => ({
				headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
				headerTintColor: 'white',
				tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
				tabBarActiveTintColor: 'white',
				headerRight: ({tintColor}) => (
					<IconButton 
						icon='add' 
						size={24} 
						color={tintColor} 
						onPress={() => {
							navigation.navigate('ManageExpense');
						}}/>
				),
			})}
		>
			<BottomTab.Screen 
				name='RecentExpenses' 
				component={RecentExpenses} 
				options={{
					title: 'Recent Expenses',
					tabBarLabel: 'Recent',
					tabBarIcon: ({color, size}) => (<Ionicons name='hourglass' color={color} size={size} />)
				}} 
			/>

			<BottomTab.Screen 
				name='AllExpenses' 
				component={AllExpenses} 
				options={{
					title: 'All Expenses',
					tabBarLabel: 'All Expenses',
					tabBarIcon: ({color, size}) => (<Ionicons name='calendar' color={color} size={size} />)
				}} 
			/>
			
		</BottomTab.Navigator>
	)
}

export default function App() {
	return (
    	<>
			<ExpensesContextProvider>
				<StatusBar style='light' />
				<NavigationContainer>
					<Stack.Navigator
						initialRouteName='ExpenseOverview'
						screenOptions={{
							headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
							headerTintColor: 'white',
						}}
					>
						<Stack.Screen name='ExpenseOverview' component={ExpenseOverView} options={{headerShown: false}} />
						<Stack.Screen 
							name='ManageExpense' 
							component={ManageExpense} 
							options={{
								presentation: 'modal'
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</ExpensesContextProvider>
    	</>
  	);
}


