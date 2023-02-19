import React, { Component } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import Feed from "../screens/Feed";
import CreatePost from "../screens/CreatePost";
import firebase from "firebase";

const Tab = createMaterialBottomTabNavigator();

export default class BottomTab extends Component {
  constructor() {
    super();
    this.state = {
      light_theme: true,
    };
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", (data) => {
        theme = data.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    return (
      <Tab.Navigator
        labeled={false}
        barStyle={[
          styles.bottomTabStyle,
          { backgroundColor: this.state.light_theme ? "gray" : "black" },
        ]}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Feed") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "CreatePost") {
              iconName = focused ? "camera" : "camera-outline";
            }
            return (
              <Ionicons
                name={iconName}
                size={RFValue(25)}
                color={color}
                style={styles.icons}
              />
            );
          },
        })}
        activeColor={"#ee8249"}
        inactiveColor={this.state.light_theme ? "black" : "gray"}
      >
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="CreatePost" component={CreatePost} />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  bottomTabStyle: {
    height: "8%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    position: "absolute",
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30),
  },
});
