import { View, Text, Image } from 'react-native'
import React from 'react'
import { COLORS, images } from '../constants'

const Header = ({containerStyle}) => {
    return (
        <View style={{
            ...containerStyle
        }}>
            <View style={{
                flexDirection: 'row'
            }}>
                <Image
                    source={images.tooth}
                    style={{
                        height: 30,
                        width: 30
                    }}
                />
                <View style={{
                    marginLeft: 5,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        color: COLORS.black,
                        fontWeight: 'bold',
                        fontSize: 12,
                    }}>Dental</Text>
                    <Text style={{
                        color: COLORS.black,
                        fontWeight: 'bold',
                        fontSize: 8,
                        textAlign: 'center'
                    }}>Care</Text>
                </View>

            </View>
        </View>
    )
}

export default Header