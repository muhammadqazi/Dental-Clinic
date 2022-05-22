import { View, Text, Image , TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { FormInput, InputCode, TextButton } from '../../components'
import AuthLayout from './AuthLayout'
import { COLORS, images, SIZES } from '../../constants'
import { utils } from '../../utils'

const NewPassword = () => {


    const [password, setPassword] = React.useState("")
    const [showPass, setShowPass] = React.useState(false)
    return (
        <AuthLayout
            title={"Let's confirm your account"}
            subtitle={"Please enter your account details"}
        >

            <View style={{
                marginTop: 80,
            }}>
                <FormInput
                    label="Password"
                    secureTextEntry={!showPass}
                    autoCompleteType="password"
                    containerStyle={{
                        marginTop: SIZES.radius
                    }}
                    onChange={(value) => setPassword(value)}
                    appendComponent={
                        <TouchableOpacity style={{
                            width: 40,
                            alignItems: 'flex-end',
                            justifyContent: 'center'

                        }}
                            onPress={() => setShowPass(!showPass)}
                        >
                            <Image
                                source={showPass ? images.eye_slash : images.eye_fill}
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: COLORS.gray
                                }}
                            />
                        </TouchableOpacity>
                    }
                />


                <TextButton
                    label="Confirm"
                    buttonContainerStyle={{
                        height: 55,
                        alignItems: 'center',
                        marginTop: 100,
                        borderRadius: 25,
                        backgroundColor: COLORS.primary
                    }}
                />
            </View>

        </AuthLayout>
    )
}

export default NewPassword