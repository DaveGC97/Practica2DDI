import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { styles } from './TabNavigation.styles';
import Account from '../../../screen/Account';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Image } from 'react-native';
import StackNavigation from '../StackNavigation/StackNavigation';
import StackFavoritos from '../StackNavigation/StackFavoritos';
import StackAccount from '../StackNavigation/StackAccount';
import StackHome from '../StackNavigation/StackHome';
import StackCategorias from '../StackNavigation/StackCategorias';
import StackReseñas from '../StackNavigation/StackReseñas';
import StackMapa from '../StackNavigation/StackMapa';

const TabNavigations = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: (routeStatus) => setIcon(route, routeStatus),
            })}
        >
            <Tab.Screen
                name='StackHome'
                component={StackHome}
                options={{
                    title: 'Inicio',
                    headerTitleAlign: 'center',
                    tabBarLabel: '',
                    tabBarStyle: { backgroundColor: '#000' },
                }}
            />
            <Tab.Screen
                name='StackCategorias'
                component={StackCategorias}
                options={{
                    title: 'Categorias',
                    headerTitleAlign: 'center',
                    tabBarLabel: '',
                    tabBarStyle: { backgroundColor: '#000' },
                }}
            />
            <Tab.Screen
                name='StackMapa'
                component={StackMapa}
                options={{
                    title: 'Mapa',
                    headerTitleAlign: 'center',
                    tabBarLabel: '',
                    tabBarStyle: { backgroundColor: '#000' },
                }}
            />
            <Tab.Screen
                name='StackReseñas'
                component={StackReseñas}
                options={{
                    title: 'Reseñas',
                    headerTitleAlign: 'center',
                    tabBarLabel: '',
                    tabBarStyle: { backgroundColor: '#000' },
                }}
            />
            <Tab.Screen
                name='StackAccount'
                component={StackAccount}
                options={{
                    title: 'Perfil',
                    headerTitleAlign: 'center',
                    tabBarLabel: '',
                    tabBarStyle: { backgroundColor: '#000' },
                }}
            />
        </Tab.Navigator>
    );
};
const setIcon = (route, routeStatus) => {
    let iconName = '';
    let color = '#B6E3BA';

    if (routeStatus.focused) {
        color = '#24EF2C';
    }
    if (route.name === 'StackHome') {
        iconName = 'home';
    }
    if (route.name === 'StackCategorias') {
        iconName = 'list';
    }
    if (route.name === 'StackReseñas') {
        iconName = 'star-half-o';
    }
    if (route.name === 'StackMapa') {
        iconName = 'map-marker';
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
