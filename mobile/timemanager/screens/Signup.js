import React, {Component} from 'react';
import {Text, View} from 'react-native';
import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/Theme'
import { EmailValidator } from '../helpers/EmailValidator'
import { PasswordValidator } from '../helpers/PasswordValidator'
import { UsernameValidator } from '../helpers/PasswordValidator'
import BackButton from "../components/BackButton";
import Header from "../components/Header";
import Logo from "../components/Logo";

export default function Signup({ navigation }) {
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [username, setUsername] = useState({ value: '', error: '' })

    const onSignupPressed = () => {
        const emailError = EmailValidator(email.value)
        const passwordError = PasswordValidator(password.value)
        const usernameError = UsernameValidator(username.value)
        if (emailError || passwordError || usernameError) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            setUsername({ ...username, error: usernameError })
            return
        }
        navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
        })
    }
        return (
            <View>              
                <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Hello SIGNUP</Header>
            <TextInput
                label="Username"
                returnKeyType="next"
                value={username.value}
                onChangeText={(text) => setUsername({ value: text, error: '' })}
                error={!!username.error}
                errorText={username.error}
                autoCapitalize="none"
                autoCompleteType="username-new"
                textContentType="username"
                keyboardType="default"
            />
            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />
            <Button mode="contained" onPress={onSignupPressed}>
                Sign up
            </Button>
            </View>
        )
    }

