import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';


import React from "react";
import {
    CodeConfirm,
    ForgetPassword,
    Home,
    NewPassword,
    Signin,
    Signup
} from "../screens";

const Stack = createStackNavigator();



const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "transparent"
                    },
                    headerStyle: { elevation: 0 },
                    cardStyle: { backgroundColor: '#fff' },
                    animationEnabled: true,
                    headerTintColor: '#fff',
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeft: null,
                    headerLeftContainerStyle: {
                        paddingLeft: 20
                    }

                }}

                initialRouteName="newpass"
            >

                <Stack.Screen name="signup" component={Signup} />
                <Stack.Screen name="signin" component={Signin} />
                <Stack.Screen name="codeconfirm" component={CodeConfirm} />
                <Stack.Screen name="forgetpass" component={ForgetPassword} />
                <Stack.Screen name="newpass" component={NewPassword} />





                <Stack.Screen name="home" component={Home} />


            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootStack;