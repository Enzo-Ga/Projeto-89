import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  StatusBar,
  Platform,
  Button,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { RFValue } from "react-native-responsive-fontsize";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import firebase from "firebase";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      previewImage: "Image_1",
      dropdownHeight: 40,
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

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }

  async addPost() {
    if (this.state.caption) {
      let postData = {
        preview_images: this.state.previewImage,
        caption: this.state.caption,
        author: firebase.auth().currentUser.displayName,
        created_on: new Date(),
        author_uid: firebase.auth().currentUser.uid,
        profile_image: this.state.profile_image,
        likes: 0,
      };
      await firebase
        .database()
        .ref("/posts/" + Math.random().toString(36).slice(2))
        .set(postData)
        .then(function (snapshot) {});
      this.props.navigation.navigate("Feed");
    } else {
      alert(
        "Error",
        "Todos os campos são obrigatórios!",
        [{ text: "OK", onPress: () => console.log("OK Pressionado") }],
        { cancelable: false }
      );
    }
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      let preview_images = {
        Image_1: require("../assets/image_1.jpg"),
        Image_2: require("../assets/image_2.jpg"),
        Image_3: require("../assets/image_3.jpg"),
        Image_4: require("../assets/image_4.jpg"),
        Image_5: require("../assets/image_5.jpg"),
        Image_6: require("../assets/image_6.jpg"),
        Image_7: require("../assets/image_7.jpg"),
      };
      return (
        <View
          style={
            this.state.light_theme ? styles.containerLight : styles.container
          }
        >
          <SafeAreaView style={styles.droidSafeArea} />

          <View syle={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>

            <View style={styles.appTitleTextContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.appTitleTextLight
                    : styles.appTitleText
                }
              >
                Novo Post
              </Text>
            </View>
          </View>

          <View style={styles.fieldsContainer}>
            <ScrollView>
              <Image
                source={preview_images[this.state.previewImage]}
                style={styles.previewImage}
              />

              <View style={{ height: RFValue(this.state.dropdownHeight) }}>
                <DropDownPicker
                  items={[
                    { label: "Image 1", value: "Image_1" },
                    { label: "Image 2", value: "Image_2" },
                    { label: "Image 3", value: "Image_3" },
                    { label: "Image 4", value: "Image_4" },
                    { label: "Image 5", value: "Image_5" },
                    { label: "Image 6", value: "Image_6" },
                    { label: "Image 7", value: "Image_7" },
                  ]}
                  defaultValue={this.state.previewImage}
                  containerStyle={{
                    height: 40,

                    borderRadius: 20,

                    marginBottom: 10,
                  }}
                  onOpen={() => {
                    this.setState({ dropdownHeight: 170 });
                  }}
                  onClose={() => {
                    this.setState({ dropdownHeight: 40 });
                  }}
                  style={{
                    backgroundColor: "transparent",
                    borderWidth: 1,
                    borderColor: this.state.light_theme ? "black" : "white",
                    color: this.state.light_theme ? "black" : "white",
                  }}
                  textStyle={{
                    color: this.state.light_theme ? "black" : "white",
                  }}
                  itemStyle={{
                    justifyContent: "flex-start",
                  }}
                  dropDownStyle={{
                    backgroundColor: this.state.light_theme
                      ? "#e6e6e6"
                      : "#2a2a2a",
                  }}
                  labelStyle={{
                    color: this.state.light_theme ? "black" : "white",
                  }}
                  arrowStyle={{
                    color: this.state.light_theme ? "black" : "white",
                  }}
                  onSelectItem={(item) => {
                    this.setState({
                      previewImage: item.value,
                    });
                  }}
                  onChangeItem={(item) => {
                    this.setState({
                      previewImage: item.value,
                    });
                  }}
                />
              </View>
              <View>
                <TextInput
                  style={
                    this.state.light_theme
                      ? styles.inputFontLight
                      : styles.inputFont
                  }
                  onChangeText={(caption) => this.setState({ caption })}
                  placeholder={"Legenda"}
                  placeholderTextColor={
                    this.state.light_theme ? "black" : "white"
                  }
                  numberOfLines={4}
                />
                <Button title="Enviar" onPress={this.addPost()}></Button>
              </View>
            </ScrollView>
          </View>

          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row",
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
  },
  fieldsContainer: {
    flex: 0.85,
  },
  previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain",
  },
  inputFont: {
    height: RFValue(40),
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
  },
  inputFontLight: {
    height: RFValue(40),
    borderColor: "black",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "black",
  },
  inputFontExtra: {
    marginTop: RFValue(15),
  },
  inputTextBig: {
    textAlignVertical: "top",
    padding: RFValue(5),
  },
});
