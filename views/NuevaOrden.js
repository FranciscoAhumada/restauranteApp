import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import {Container, Button, Text} from 'native-base';
import globalStyle from '../styles/global';
import {useNavigation} from '@react-navigation/native'; 


const NuevaOrden = () => {

    const navigation = useNavigation();

    return(
        <Container style={globalStyle.contenedor}>
            <View style={[globalStyle.contenido,styles.contenido]}>
                <Button
                    style={globalStyle.boton}
                    rounded
                    block
                    onPress = {()=> navigation.navigate('Menu')}
                >
                    <Text style={globalStyle.botonTexto}>Crear Nueva Orden</Text>
                </Button>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    contenido : {
        flexDirection : 'column',
        justifyContent : 'center'
    }
})

export default NuevaOrden;