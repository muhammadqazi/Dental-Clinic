import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { InputCode, TextButton } from '../../components'
import AuthLayout from './AuthLayout'
import { COLORS, SIZES } from '../../constants'

const CodeConfirm = () => {
    const [value, setValue] = useState("")
    return (
        <AuthLayout
            title={"Let's confirm your account"}
            subtitle={"Please enter the verification code sent to you by email"}
        >

            <View style={{
                marginTop:80,
                marginHorizontal:40
            }}>
                <InputCode
                    value={value}
                    setValue={setValue}
                />
            </View>
            <TextButton
                label="Confirm"
                buttonContainerStyle={{
                    height: 55,

                    alignItems: 'center',
                    marginTop: 200,
                    borderRadius: 25,
                    backgroundColor: COLORS.primary
                }}
            />
        </AuthLayout>
    )
}

export default CodeConfirm