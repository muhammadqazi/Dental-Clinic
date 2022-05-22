
import React from 'react'
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    View
} from 'react-native'
import { COLORS, FONTS, icons } from '../constants'

const SocialButton = ({
    containerStyle,
    label,
    labelStyle,
    icon,
    iconPosition,
    iconStyle,
    onPress
}) => {
    return (
        <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            ...containerStyle
        }}
            onPress={onPress}
        >
            {iconPosition == "LEFT" &&
                <Image
                    source={icon}
                    style={{
                        ...styles.image,
                        ...iconStyle
                    }}
                />
            }

            <Text style={{
                ...FONTS.body3,
                ...labelStyle
            }}>
                {label}
            </Text>

            {iconPosition == "RIGHT" &&
                <Image
                    source={icon}
                    style={{
                        ...styles.image,
                        ...iconStyle
                    }}
                />
            }


        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 20,
        width: 20,
        marginLeft: 5,
    }
})

export default SocialButton
