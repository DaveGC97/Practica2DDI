import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { styles } from './TabNavigation.styles';
import Account from '../../../screen/Account';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Image } from 'react-native';
import StackNavigation from '../StackNavigation/StackNavigation';
import StackFavoritos from '../StackNavigation/StackFavoritos';
import StackAccount from '../StackNavigation/StackAccount';

const TabNavigations = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: (routeStatus) => setIcon(route, routeStatus),
            })}
        >
            <Tab.Screen
                name='StackAccount'
                component={StackAccount}
                options={{
                    title: 'Cuenta',
                    tabBarLabel: '',
                    tabBarStyle: { backgroundColor: '#222E24' },
                }}
            />

            <Tab.Screen
                name='StackNavigation'
                component={StackNavigation}
                options={{
                    title: '',
                    headerTransparent: true,
                    tabBarLabel: '',
                    tabBarStyle: { backgroundColor: '#222E24' },
                    tabBarIcon: () => (
                        <Image
                            source={require('../../../assets/rick1.png')}
                            style={{
                                width: 130,
                                height: 130,
                                marginBottom: 65,
                            }}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name='Favorites'
                component={StackFavoritos}
                options={{
                    title: 'Favoritos',
                    tabBarLabel: '',
                    tabBarStyle: { backgroundColor: '#222E24' },
                }}
            />
        </Tab.Navigator>
    );
};
const setIcon = (route, routeStatus) => {
    let iconName = '';
    let color = '#116B1D';

    if (routeStatus.focused) {
        color = '#32B444';
    }
    if (route.name === 'Favorites') {
        iconName = 'heart';
    }
    if (route.name === 'StackAccount') {
        iconName = 'user';
    }
    return <AwesomeIcon name={iconName} color={color} style={styles.icon} />;
};

export default TabNavigations;
