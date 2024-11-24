import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import { enableScreens } from 'react-native-screens';
enableScreens();

// telas
import Home from "../screens/Home";
import ResumoConta from '../screens/ResumoConta';

export default function AllRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ResumoConta"
        component={ResumoConta}
        options={{
          title: 'Resumo da conta',
          headerStyle: {
            backgroundColor: '#1d3461',
          },
          headerTintColor: 'white',
      }}
      />
        
    </Stack.Navigator>
  );
}