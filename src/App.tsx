import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LanguageProvider } from './contexts/LanguageContext';
import AppNavigator from './navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LanguageProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </LanguageProvider>
    </GestureHandlerRootView>
  );
};

export default App;
