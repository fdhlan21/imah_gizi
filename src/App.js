// In App.js in a new project

import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import FlashMessage from 'react-native-flash-message';
import StackNav from './routes/Stack';

function App() {
  return (
    <>
    <NavigationContainer>
     <StackNav/>
    </NavigationContainer>
    <FlashMessage position='top'/>
    </>
  );
}

export default App;