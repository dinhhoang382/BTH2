import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchContacts } from "../utility/api";
import ContactListItem from "../components/ContactListItem";
import { ActivityIndicator } from "react-native-paper";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactsError, fetchContactsLoading, fetchContactsSuccess } from "../store";
const keyExtractor = ({ phone }) => phone;

const Contacts = ({ navigation }) => {
  const {contacts, loading, error} = useSelector((state)=>state)
  const dispatch = useDispatch();
  //load du lieu
  useEffect(() => {
    dispatch(fetchContactsLoading())
    fetchContacts()
    .then(
      contacts=>{
        dispatch(fetchContactsSuccess(contacts))
      }
    )
    .catch(
      e=> {
        dispatch(fetchContactsError());
      }
    )
  }, []);
  //sort
  // const contactsSorted = [...contacts].sort((a, b) =>
  //   a.name.localeCompare(b.name)
  // );
  const contactsSorted = contacts.slice().sort((a, b) => a.name.localeCompare(b.name));
  const renderContact = ({ item }) => {
    const { name, avatar, phone } = item;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigation.navigate("Profile", { contact: item })}
      />
    );
  };
  //render
  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator color="blue" size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
        <FlatList
          data={contactsSorted}
          keyExtractor={keyExtractor}
          renderItem={renderContact}
        />
      )}
    </View>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
    flex: 1,
  },
});
