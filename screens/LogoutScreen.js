import React, { Component } from "react";
import { View } from "react-native";
import firebase from "firebase";

export default class Logout extends Component {
  componentDidMount() {
    alert("Você foi desconectado!");
    firebase.auth().signOut();
    this.props.navigation.replace("login");
  }
  render() {
    return <View style={{ flex: 1, backgroundColor: "black" }}></View>;
  }
}
