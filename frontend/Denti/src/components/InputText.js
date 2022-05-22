import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const InputText = ({ placeholder, cons, setCons, icon, hidePassword, setHidePassword, eyefill, eyeslash, passicon, placeholderTextColor, eyePress, containerstyle, imageStyle, isPassword }) => {
    return (
        <View style={{
            backgroundColor: '#fff',
            width: '90%',
            height: 40,
            borderRadius: 15,
            justifyContent: 'center',
            ...styles.shadow,
            ...containerstyle
        }}>
            <View style={{
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
            }}>

                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={'gray'}
                    defaultValue={cons}
                    autoCapitalize={'none'}
                    selectionColor={'white'}
                    secureTextEntry={hidePassword}
                    setHidePassword={setHidePassword}
                    onChangeText={(text) => setCons(text)}
                    style={{
                        color: COLORS.white,
                        marginLeft: 10,
                        width: "84%",
                        fontWeight: 'bold',
                    }} />
                <View style={{
                    position: 'absolute',
                    right: 10,
                }}>

                    {!isPassword &&
                        <Image source={icon} style={{
                            height: 20,
                            width: 20,
                            ...imageStyle
                        }} />
                    }


                    {isPassword &&
                        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                            {hidePassword &&

                                <Image source={eyeslash} style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: COLORS.white,
                                    ...imageStyle
                                }} />
                            }
                            {!hidePassword &&
                                <Image source={eyefill} style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: COLORS.white,
                                    ...imageStyle
                                }} />
                            }

                        </TouchableOpacity>
                    }

                </View>

            </View>
        </View>
    )
}

export default InputText

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4.65,

        elevation: 8,

    }
})