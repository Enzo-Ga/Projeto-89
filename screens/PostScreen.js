import React, { Component } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import firebase from "firebase";

export default class PostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      <View style={styles.container}>
        <View
          style={
            this.state.light_theme
              ? styles.cardContainerLight
              : styles.cardContainer
          }
        >
          <View style={styles.authorContainer}>
            <View style={styles.authorImageContainer}>
              <Image
                source={require("../assets/profile_img.png")}
                style={styles.profileImage}
              ></Image>
            </View>
            <View style={styles.authorNameContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.authorNameTextLight
                    : styles.authorNameText
                }
              >
                {this.props.route.params.author}
              </Text>
            </View>
          </View>
          <Image
            source={require("../assets/post.jpeg")}
            style={styles.postImage}
          />
          <View style={styles.captionContainer}>
            <Text
              style={
                this.state.light_theme
                  ? styles.captionTextLight
                  : styles.captionText
              }
            >
              {this.props.route.params.caption}
            </Text>
          </View>
          <View style={styles.captionContainer}>
            <View style={styles.likeButton}>
              <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
              <Text
                style={
                  this.state.light_theme
                    ? styles.likeTextLight
                    : styles.likeText
                }
              >
                12k
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2a2a2a",
    borderRadius: RFValue(20),
    padding: RFValue(20),
  },
  cardContainerLight: {
    margin: RFValue(13),
    backgroundColor: "#e6e6e6",
    borderRadius: RFValue(20),
    padding: RFValue(20),
  },
  authorContainer: {
    flex: 0.1,
    flexDirection: "row",
  },
  authorImageContainer: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: RFValue(100),
  },
  authorNameContainer: {
    flex: 0.85,
    justifyContent: "center",
  },
  authorNameText: {
    color: "white",
    fontSize: RFValue(20),
  },
  authorNameTextLight: {
    color: "black",
    fontSize: RFValue(20),
  },
  postImage: {
    marginTop: RFValue(20),
    resizeMode: "contain",
    width: "100%",
    alignSelf: "center",
    height: RFValue(275),
  },
  captionContainer: {},
  captionText: {
    fontSize: 13,
    color: "white",
    paddingTop: RFValue(10),
  },
  captionTextLight: {
    fontSize: 13,
    color: "black",
    paddingTop: RFValue(10),
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30),
  },
  likeText: {
    color: "white",
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
  likeTextLight: {
    color: "black",
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
});
