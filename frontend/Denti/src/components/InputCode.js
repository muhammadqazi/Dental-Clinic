import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { COLORS } from '../constants';
const CELL_COUNT = 6;

const InputCode = ({ value, setValue }) => {


    const [timerCount, setTimer] = useState(60)

    useEffect(() => {
        let interval = setInterval(() => {
            setTimer(lastTimerCount => {
                lastTimerCount <= 1 && clearInterval(interval)
                return lastTimerCount - 1
            })
        }, 1000) //each count lasts for a second
        //cleanup the interval on complete
        return () => clearInterval(interval)
    }, []);


    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <View style={{ margin: '10%', ...styles.shadow }}>
                <CodeField
                    ref={ref}
                    {...props}
                    // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                    maxLength={6}
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({ index, symbol, isFocused }) => (
                        <Text
                            key={index}
                            style={[{ color: COLORS.black }, styles.cell, isFocused && styles.focusCell]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    )}
                />
            </View>
        </View>
    )
}

export default InputCode

const styles = StyleSheet.create({
    root: { flex: 1, padding: 20, },
    title: { textAlign: 'center', fontSize: 30, },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        backgroundColor: COLORS.white,
        width: 55,
        height: 55,
        borderRadius: 10,
        overflow: 'hidden',
        lineHeight: 50,
        fontSize: 24,
        textAlign: 'center',
        marginRight: 5
    },
    focusCell: {
        borderColor: COLORS.primary,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.07,
        shadowRadius: 4.65,

        elevation: 8,
    }
})