import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { FormInput, InputCode, TextButton } from '../../components'
import AuthLayout from './AuthLayout'
import { COLORS, images, SIZES } from '../../constants'
import { utils } from '../../utils'

const ForgetPassword = () => {
    const [Email, setEmail] = useState("")
    const [emailError, setemailError] = useState("")
    return (
        <AuthLayout
            title={"Let's confirm your account"}
            subtitle={"Please enter your account details"}
        >

            <View style={{
                marginTop: 80,
            }}>
                <FormInput
                    label={"Email"}
                    keyboardType="email-address"
                    autoCompleteType="email"
                    onChange={(value) => {
                        utils.validateEmail(value, setemailError)
                        setEmail(value)
                    }}
                    errorMsg={emailError}
                    appendComponent={
                        <View style={{
                            justifyContent: 'center'
                        }}>
                            <Image
                                source={Email == "" || (Email != "" && emailError == "") ? images.correct : images.cancel}
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: Email == "" ? COLORS.gray : (Email != "" && emailError == "") ? COLORS.green : COLORS.red
                                }}
                            />
                        </View>
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

export default ForgetPassword