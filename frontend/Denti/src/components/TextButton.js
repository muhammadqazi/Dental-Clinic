import React from 'react'
import {
    TouchableOpacity,
    Text,
    ActivityIndicator
} from 'react-native'
import { COLORS, FONTS } from '../constants'

import LinearGradient from 'react-native-linear-gradient';

const TextButton = ({ label, labelStyle, buttonContainerStyle, onPress, disable }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disable}
        >
            <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 6 }}
                colors={[COLORS.primary, COLORS.secondary, COLORS.white]} style={{
                    alignItems: "center",
                    justifyContent: 'center',
                    backgroundColor: COLORS.primary,
                    ...buttonContainerStyle
                }}>



                <Text style={{
                    color: COLORS.white, ...FONTS.h3, ...labelStyle
                }}>{label}</Text>



            </LinearGradient>
        </TouchableOpacity>
    )
}


export default TextButton