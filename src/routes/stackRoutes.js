import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import { enableScreens } from 'react-native-screens';
enableScreens();

// telas
import Home from "../screens/Home";
import ResumoConta from '../screens/ResumoConta';
import ExibirCardapio from '../screens/ExibirCardapio';
import Configuracoes from '../screens/Configuracoes/Configuracoes';
import EditarMesas from '../screens/Configuracoes/EditarMesas';
import EditarCardapio from '../screens/Configuracoes/EditarCardapio';

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

      <Stack.Screen
        name="ExibirCardapio"
        component={ExibirCardapio}
        options={{
          title: 'Resumo da conta - Cardápio',
          headerStyle: {
            backgroundColor: '#1d3461',
          },
          headerTintColor: 'white',
        }}
      />

      <Stack.Screen
        name="Configuracoes"
        component={Configuracoes}
        options={{
          title: 'Configurações',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: '#1d3461',
        }}
      />

      <Stack.Screen
        name="EditarMesas"
        component={EditarMesas}
        options={{
          title: 'Configurações - Editar mesas',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: '#1d3461',
        }}
      />

      <Stack.Screen
        name="EditarCardapio"
        component={EditarCardapio}
        options={{
          title: 'Configurações - Editar cardápio',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: '#1d3461',
        }}
      />
        
    </Stack.Navigator>
  );
}