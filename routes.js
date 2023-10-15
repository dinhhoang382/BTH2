import { StyleSheet, Text, View, _Image } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Contacts from "./screens/Contacts";
import Profile from "./screens/Profile";
import Favorite from "./screens/Favorites";
import User from "./screens/User";
import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import colors from "./utility/colors";
import Options from "./screens/Options";
import { createDrawerNavigator } from "@react-navigation/drawer";

const getTabBarIcon =
  (icon) =>
  ({ tintColor }) =>
    <MaterialIcons name={icon} size={26} style={{ color: tintColor }} />;

const Stack = createStackNavigator();
const ContactsScreens = () => {
  return (
    <Stack.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        // headerTintColor: "white",
        // headerStyle: { backgroundColor: "tomato" },
        // headerTitleAlign: "center",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Contacts"
        component={Contacts}
        options={{ title: "Contacts" }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ route }) => {
          const { contact } = route.params;
          const { name } = contact;
          return {
            title: name.split(" ")[0],
            headerTintColor: "white",
            headerStyle: { backgroundColor: colors.blue },
          };
        }}
      />
    </Stack.Navigator>
  );
};
const FavoritesScreens = () => {
  return (
    <Stack.Navigator
      initialRouteName="Favorites"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Favorite"
        component={Favorite}
        options={{ title: "Favorites" }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Profile" }}
      />
    </Stack.Navigator>
  );
};
const UserScreens = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="User">
      <Stack.Screen
        name="User"
        component={User}
        options={{
          headerTitle: "Me",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#3ac",
          },
          headerRight: () => (
            <MaterialIcons
              name="settings"
              size={24}
              style={{ color: "white", marginRight: 10 }}
              onPress={() => navigation.navigate("Options")}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Options"
        component={Options}
        options={{ title: "Options" }}
      />
    </Stack.Navigator>
  );
};
const Tab = createDrawerNavigator();
const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="ContactsScreens"
        barStyle={{ backgroundColor: colors.blue }}
        labeled={false}
        activeTintColor={colors.greyLight}
        inactiveColor={colors.greyDark}
      >
        <Tab.Screen
          name="ContactsScreens"
          component={ContactsScreens}
          options={{ drawerIcon: getTabBarIcon("list") }}
        />
        <Tab.Screen
          name="FavoritesScreens"
          component={FavoritesScreens}
          options={{ drawerIcon: getTabBarIcon("star") }}
        />
        <Tab.Screen
          name="UserScreens"
          component={UserScreens}
          options={{ drawerIcon: getTabBarIcon("person") }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default TabNavigator;
