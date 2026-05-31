//Import das bibliotecas
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
//Import das telas
import HomeScreen from './screens/HomeScreen';
import AddPetScreen from './screens/AddPetScreen';
import FoundScreen from './screens/FoundScreen';
import PetDetailScreen from './screens/PetDetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator screenOptions={{ tabBarLabelStyle: { fontSize: 11 } }}>
            <Tab.Screen name="Perdidos" component={HomeScreen} />
            <Tab.Screen name="Cadastrar" component={AddPetScreen} />
            <Tab.Screen name="Encontrados" component={FoundScreen} />
        </Tab.Navigator>
    )
}

export default function App () {
    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator>
                <Stack.Screen
                    name="Main"
                    component={TabNavigator}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="PetDetail"
                    component={PetDetailScreen}
                    options={{title: 'Detalhes do Pet'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

