import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';
import { Dashboard } from '../pages/Dashboard';
import { ListSales } from '../pages/List';
import { SearchTax } from '../pages/Search';
import { TotalTaxes } from '../pages/TotalImpostos';

type AppRoutes = {
  dashboard: undefined;
  list: undefined;
  search: undefined;
  total: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelPosition: 'below-icon',
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarStyle: {
          height: 60,
          marginRight: 1,
        },
      }}
    >
      <Screen
        name="dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Cadastro',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="add" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="list"
        component={ListSales}
        options={{
          tabBarLabel: 'Listar Todos',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="format-list-bulleted" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="search"
        component={SearchTax}
        options={{
          tabBarLabel: 'Pesquisa',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="search" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="total"
        component={TotalTaxes}
        options={{
          tabBarLabel: 'Totais de Impostos',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="calculate" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
