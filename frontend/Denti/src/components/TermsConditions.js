import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'

const TermsConditions = ({ label, onPress, imageContainer, containerStyle }) => {
    return (
        <View style={{
            marginTop: 30,
            flexDirection: 'row',
            ...containerStyle
        }}>

            <TouchableOpacity onPress={onPress} >
                <Image source={images.tick} style={{
                    height: 17,
                    width: 17,
                    marginRight: 10,
                    ...imageContainer
                }} />
            </TouchableOpacity>

            <Text>{label}</Text>
        </View>
    )
}

export default TermsConditions
