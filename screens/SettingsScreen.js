import React, { useMemo } from "react";
import PageContainer from "../components/PageContainer";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import PageTitle from "../components/PageTitle";
import { useReducer } from "react";
import { useCallback } from "react";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";
import Input from "../components/Input";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import SubmitButton from "../components/SubmitButton";
import {
  updateSignedInUserData,
  userLogout,
} from "../utils/actions/authActions";
import colors from "../constants/colors";
import { updateLoggedInUserData } from "../store/authSlice";
import { ScrollView } from "react-native-gesture-handler";
import ProfileImage from "../components/ProfileImage";
import DataItem from "../components/DataItem";

const SettingsScreen = (props) => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);

  const starredMessages = useSelector(
    (state) => state.messages.starredMessages ?? {}
  );

  const sortedStarredMessages = useMemo(() => {
    let result = [];

    const chats = Object.values(starredMessages);

    chats.forEach((chat) => {
      const chatImages = Object.values(chat);
      result = result.concat(chatImages);
    });

    return result;
  }, [starredMessages]);

  const firstName = userData.firstName || "";
  const lastName = userData.lastName || "";
  const email = userData.email || "";
  const about = userData.about || "";

  const initialState = {
    inputValues: {
      firstName,
      lastName,
      email,
      about,
    },
    inputValidities: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      about: undefined,
    },
    formIsValid: false,
  };

  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const inputChangedHandler = useCallback(
    (inputID, inputValue) => {
      const result = validateInput(inputID, inputValue);
      dispatchFormState({
        inputID: inputID,
        validationResult: result,
        inputValue,
      });
    },
    [dispatchFormState]
  );

  const saveHandler = useCallback(async () => {
    const updatedValues = formState.inputValues;

    try {
      setIsLoading(true);
      await updateSignedInUserData(userData.userId, updatedValues);
      dispatch(updateLoggedInUserData({ newData: updatedValues }));

      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [formState, dispatch]);

  const hasChanges = () => {
    const currentValues = formState.inputValues;

    return (
      currentValues.firstName != firstName ||
      currentValues.lastName != lastName ||
      currentValues.email != email ||
      currentValues.about != about
    );
  };

  return (
    <PageContainer>
      <PageTitle title="Settings" />

      <ScrollView contentContainerStyle={styles.formContainer}>
        <ProfileImage
          size={80}
          userId={userData.userId}
          uri={userData.profilePicture}
          showEditButton={true}
        />

        <Input
          label="First name"
          icon="user-o"
          id="firstName"
          autoCapitalize="none"
          iconPack={FontAwesome}
          iconSize={15}
          onInputChanged={inputChangedHandler}
          errorText={formState.inputValidities["firstName"]}
          initialValue={userData.firstName}
        />
        <Input
          label="Last name"
          icon="user-o"
          id="lastName"
          autoCapitalize="none"
          iconPack={FontAwesome}
          iconSize={15}
          onInputChanged={inputChangedHandler}
          errorText={formState.inputValidities["lastName"]}
          initialValue={userData.lastName}
        />
        <Input
          label="Email"
          icon="mail"
          id="email"
          autoCapitalize="none"
          keyboardType="email-address"
          iconPack={Feather}
          iconSize={15}
          onInputChanged={inputChangedHandler}
          errorText={formState.inputValidities["email"]}
          initialValue={userData.email}
        />
        <Input
          label="About"
          icon="user-o"
          id="about"
          autoCapitalize="none"
          iconPack={FontAwesome}
          iconSize={15}
          onInputChanged={inputChangedHandler}
          errorText={formState.inputValidities["about"]}
          initialValue={userData.about}
        />

        <View style={{ marginTop: 20 }}>
          {showSuccessMessage && <Text>Saved!</Text>}

          {isLoading ? (
            <ActivityIndicator
              size={"small"}
              color={colors.primary}
              style={{ marginTop: 10 }}
            />
          ) : (
            hasChanges() && (
              <SubmitButton
                title="Save"
                onPress={saveHandler}
                style={{ marginTop: 20 }}
                disabled={!formState.formIsValid}
              />
            )
          )}
        </View>

        <DataItem
          type={"link"}
          title="Starred messages"
          hideImage={true}
          onPress={() =>
            props.navigation.navigate("DataList", {
              title: "Starred messages",
              data: sortedStarredMessages,
              type: "messages",
            })
          }
        />

        <SubmitButton
          title="Logout"
          onPress={() => dispatch(userLogout(userData))}
          style={{ marginTop: 20 }}
          color={colors.red}
        />
      </ScrollView>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  marginTop20: {
    marginTop: 20,
  },
  formContainer: {
    alignItems: "center",
  },
});

export default SettingsScreen;
