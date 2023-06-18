import React, { useEffect } from "react";
import { Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import PageContainer from "../components/PageContainer";
import DataItem from "../components/DataItem";

const DataListScreen = (props) => {
  const { title, data, type, chatId } = props.route.params;

  const storedUsers = useSelector((state) => state.users.storedUsers);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: title,
      headerTitleAlign: "center",
    });
  }, [title]);

  return (
    <PageContainer>
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={(itemData) => {
          let key, onPress, image, title, subTitle, itemType;

          if (type === "users") {
            const uid = itemData.item;
            const currentUser = storedUsers[uid];

            if (!currentUser) return;

            const isLoggedInUser = uid === userData.userId;

            key = uid;
            image = currentUser.profilePicture;
            title = `${currentUser.firstName} ${currentUser.lastName}`;
            subTitle = currentUser.about;
            itemType = isLoggedInUser ? undefined : "link";
            onPress = isLoggedInUser
              ? undefined
              : props.navigation.navigate("Contact", { uid, chatId });
          }

          return (
            <DataItem
              key={key}
              onPress={onPress}
              image={image}
              title={title}
              subTitle={subTitle}
              itemType={itemType}
            />
          );
        }}
      />
    </PageContainer>
  );
};

export default DataListScreen;
