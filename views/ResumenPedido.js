import React, {useContext, useEffect} from 'react';
import { Alert, StyleSheet } from 'react-native';
import {Container, Content, List, ListItem, Thumbnail, Text,Left,
Body, H1, Footer, FooterTab, Button} from 'native-base';
import PedidoContext from '../context/pedidos/pedidosContext';
import globalStyle from '../styles/global';
import {useNavigation} from '@react-navigation/native';
import firebase from '../firebase';


const ResumenPedido = () => {
    const {pedido, total, mostrarTotal, eliminarProducto, pedidoOrdenado} = useContext(PedidoContext);

    const navigation = useNavigation();
    
    useEffect(()=>{
        calcularTotal();
    },[pedido]);

    const calcularTotal = () => {
        let nuevoTotal = 0;
        nuevoTotal = pedido.reduce((nuevoTotal, articulo)=>nuevoTotal + articulo.total, 0);
        mostrarTotal(nuevoTotal);
    }

    const progresoPedido = () => {
        Alert.alert(
            'Revisa tu pedido',
            'Una vez echo no se puede cambiar',
            [
                {
                    text : 'Confirmar',
                    onPress: async () =>{
                        const pedidoObj = {
                            tiempoentrega : 0,
                            completado : false,
                            total : Number(total),
                            orden : pedido,
                            creado : Date.now() 
                        }

                        try {
                            const pedido = await firebase.db.collection('ordenes').add(pedidoObj);
                            pedidoOrdenado(pedido.id);
                            navigation.navigate('ProgresoPedido');
                        } catch (error) {
                            console.log(error);
                        }

                        
                    }
                },
                {text : 'Revisar', style:'cancel'}
            ]
        )
    }

    const confirmarEliminar = (id) => {
        Alert.alert(
            'Deseas Eliminar',
            'Una vez eliminado se debe pedir otra vez',
            [
                {
                    text : 'Confirmar',
                    onPress: () =>{
                        eliminarProducto(id)
                    }
                },
                {text : 'Cancelar', style:'cancel'}
            ]
        )
    }

    return (
        <Container style={globalStyle.contenedor}>
            <Content style={globalStyle.contenido}>
                <H1 style={globalStyle.titulo}>Resumen Pedido</H1>
                {pedido.map((platillo, i) => {
                    const {cantidad, nombre, imagen, id, precio} = platillo;
                    return(
                        <List key = {id+i}>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail large square source={{uri: imagen}}/>
                                </Left>
                                <Body>
                                    <Text>{nombre}</Text>
                                    <Text>Cantidad : {cantidad}</Text>
                                    <Text>Precio : $ {precio}</Text>
                                    <Button
                                        onPress = {()=>confirmarEliminar(id)}
                                        full
                                        danger
                                        style={{marginTop:20}}
                                    >
                                        <Text style={[globalStyle.botonTexto, {color : '#FFF'}]}>Eliminar</Text>
                                    </Button>
                                </Body>
                            </ListItem>
                        </List>
                    )
                })

                }
                <Text style={globalStyle.cantidad}>Total a Pagar: $ {total}</Text>
                <Button
                    onPress={()=>navigation.navigate('Menu')}
                    style={{marginTop:30}}
                    dark
                    full
                >
                    <Text style={[globalStyle.botonTexto,{color:'#FFF'}]}>Seguir Pidiendo</Text>
                </Button>
            </Content>
            <Footer>
                <FooterTab>
                <Button
                    onPress={()=>progresoPedido()}
                    style={globalStyle.boton}
                    full
                >
                    <Text style={globalStyle.botonTexto}>Ordenar Pedido</Text>
                </Button>
                </FooterTab>
                </Footer>
        </Container>
        );
}

export default ResumenPedido;