import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';
import { isAvailable } from 'expo/build/AR';

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'DevRadar',
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil no GitHub',
            }
        },
    }, {
        defaultNavigationOptions: {
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerStyle: {
                backgroundColor: "#7D40E7",
            }
        }
    })
);

export default Routes;