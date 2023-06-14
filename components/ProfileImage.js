import React, { useState } from  'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import userImage from '../assets/images/userImage.jpg'
import colors from '../constants/colors';
import { launchImagePicker, uploadImageAsync } from '../untils/imagePickerHelper';
import { updateSignedInUserData } from '../untils/actions/authAction';
import { updateLoggedInUserData } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { ActivityIndicator } from 'react-native';

const ProfileImage = props => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const showEditButton = props.showEditButton && props.showEditButton === true;
    

    const source = props.uri ?  { uri: props.uri } : userImage;
    const [image, setImage] = useState(source);


    const userId = props.userId;

    const pickImage = async () => {
        try {
            const tempUri = await launchImagePicker();

            if (!tempUri) return;

            setIsLoading(true);
            // Upload the image
            const uploadUrl = await uploadImageAsync(tempUri);
            setIsLoading(false);

            if (!uploadUrl) {
                throw new Error("Could not upload image");
            }

            const newData = {profilePicture: uploadUrl}
            
            await updateSignedInUserData(userId, newData);

            dispatch(updateLoggedInUserData({newData}));


            setImage({ uri: uploadUrl });
        }
        catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    const Container = showEditButton ? TouchableOpacity : View;

    return (
        <Container onPress={pickImage}>
            {isLoading ? 
                <View height={props.size} width={props.size} style={styles.loadingContainer}>
                    <ActivityIndicator size={'small'} color={colors.primary} style={{marginTop: 10}} /> 
                </View> :
                <Image
                style={{ ...styles.image, ...{ width: props.size, height: props.size } }}
                source={image}/>
            }

            {showEditButton && !isLoading && <View style={styles.editIconContainer}>
                <FontAwesome name="pencil" size={15} color="black" />
            </View>}

            
           
        </Container>
    )
};

const styles = StyleSheet.create({
    image: {
        borderRadius: 50,
        borderColor: colors.grey,
        borderWidth: 1
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: colors.lightGrey,
        borderRadius: 20,
        padding: 8
    }, 
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default ProfileImage;