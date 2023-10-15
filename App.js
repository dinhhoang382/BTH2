import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Contacts from "./screens/Contacts";
import Routes from "./components/Routes";
import TabNavigator from "./routes";
import { Provider } from "react-redux";
import Store from "./store";

export default function App() {
  return (
    <Provider store={Store}>
      <TabNavigator />
    </Provider>
  );
}
