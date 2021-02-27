import React, {useContext, useEffect,useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Container, Text, H1 , H3, Button} from 'native-base';
import globalStyle from '../styles/global';
import {useNavigation} from '@react-navigation/native';
import PedidoContext from '../context/pedidos/pedidosContext';
import firebase from '../firebase';
import Countdown from 'react-countdown';

const ProgresoPedido = () => {
    const navigation = useNavigation();
    const {idPedido} = useContext(PedidoContext);
    const [tiempo, guardarTiempo] = useState(0);
    const [completado, guardarCompletado] = useState(false);
    useEffect(()=>{
        const obtenerProducto = () => {
            firebase.db.collection('ordenes').doc(idPedido)
            .onSnapshot(function(doc) {
                guardarTiempo(doc.data().tiempoentrega);
                guardarCompletado(doc.data().completado)
            })
        }
        obtenerProducto();
    },[]);

    const renderer = ({minutes, seconds}) => {
        let segundo = seconds;
        if(segundo <10){
            segundo = '0'+seconds;
        }
        return(
            <Text style={styles.tiempo}>{minutes}:{segundo}</Text>
            )
    }

    return (
        <Container style={globalStyle.contenedor}>
            <View style={[globalStyle.contenido, {marginTop:50}]}>
                {tiempo === 0 && (
                    <>
                        <Text style={{textAlign:'center'}}>Hemos recibido tu orden</Text>
                        <Text style={{textAlign:'center'}}>Calculando Tiempo</Text>
                    </>
                )}
                {!completado && tiempo > 0 &&(
                    <>
                    <Text style={{textAlign:'center'}}>Su orden estara lista en </Text>
                    <Text>
                        <Countdown
                            date={ Date.now() + tiempo * 60000 }
                            renderer={renderer}
                        />
                    </Text>
                    </>
                )}

                {completado && (
                    <>
                        <H1 style={styles.textoCompletado}>Orden Lista</H1>
                        <H3 style={styles.textoCompletado}>Por favor, pase a recoger su pedido</H3>
                        <Button
                            style={[globalStyle.boton, {marginTop : 100}]}
                            rounded
                            block
                            onPress={()=>navigation.navigate('NuevaOrden')}
                        >
                            <Text style={globalStyle.botonTexto}>Comenzar una orden nueva</Text>
                        </Button>
                    </>
                )}
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    tiempo : {
        marginBottom : 20,
        fontSize : 60,
        textAlign: 'center',
        marginTop : 30
    },
    textoCompletado : {
        textAlign : 'center',
        textTransform : 'uppercase',
        marginBottom : 20
    }
})

export default ProgresoPedido;