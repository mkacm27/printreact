import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, History, Settings as SettingsIcon } from 'lucide-react-native';

// Screens
import DashboardScreen from '../pages/DashboardScreen';
import HistoryScreen from '../pages/HistoryScreen';
import SettingsScreen from '../pages/SettingsScreen';
import PrintJobPage from '../features/print-jobs/pages/PrintJobPage';
import ReceiptScreen from '../pages/ReceiptScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Dashboard') {
            return <Home color={color} size={size} />;
          } else if (route.name === 'History') {
            return <History color={color} size={size} />;
          } else if (route.name === 'Settings') {
            return <SettingsIcon color={color} size={size} />;
          }
          return null;
        },
        tabBarActiveTintColor: 'hsl(200 95% 45%)',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="PrintJob" component={PrintJobPage} options={{ title: 'New Print Job' }} />
      <Stack.Screen name="Receipt" component={ReceiptScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
