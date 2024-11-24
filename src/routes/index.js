import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context';

// imports
import AllRoutes from './stackRoutes';

export default function Routes(){
  return(
    <SafeAreaProvider>
      <NavigationContainer>
        <AllRoutes/>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}