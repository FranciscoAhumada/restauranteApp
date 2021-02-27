import React, {useState, useContext, useEffect} from 'react';
import { Alert } from 'react-native';
import {Container, Content, Form, Icon, Input, Grid, Col, Button,Text, Footer, FooterTab} from 'native-base';
import PedidoContext from '../context/pedidos/pedidosContext';
import globalStyle from '../styles/global';
import {useNavigation} from '@react-navigation/native';


const FormularioPlatillo = () => {

    const [cantidad, guardarCantidad] = useState(1);
    const [total, guardarTotal] = useState(1);

    const {platillo, guardarPedido} = useContext(PedidoContext);
    const {precio} = platillo;

    const navigation = useNavigation();

    useEffect(()=>{
        calcularTotal();
    },[cantidad]);

    const calcularTotal = () => {
        const totalPagar = precio * cantidad;
        guardarTotal(totalPagar);
    }

    const incrementar = () => {
        const nuevaCantidad = parseInt(cantidad) + 1;
        guardarCantidad(nuevaCantidad);
    }

    const decrementar = () => {
        if(cantidad>1){
            const nuevaCantidad = parseInt(cantidad) - 1;
            guardarCantidad(nuevaCantidad);
        }
    }

    const consfirmarOrden = () => {
        Alert.alert(
            '¿Deseas confirmar tu pedido?',
            'un pedido echo no se puedemodificar',
            [
                {
                    text : 'Confirmar',
                    onPress : () => {
                        const pedido = {
                            ...platillo,
                            cantidad,
                            total
                        }
                        guardarPedido(pedido);
                        navigation.navigate('ResumenPedido');
                    },
                },
                {text : 'Cancelar', style:'cancel'}
            ]
        )
    }

    return (
            <Container>
                <Content>
                    <Form>
                        <Text style={globalStyle.titulo}>Cantidad</Text>
                        <Grid>
                            <Col>
                                <Button
                                    props
                                    dark
                                    style={{ height: 80, justifyContent: 'center', width:'100%' }}
                                    onPress={()=>decrementar()}
                                >
                                    <Icon style={{fontSize : 40}} name='remove'></Icon>
                                </Button>
                            </Col>
                            <Col>
                                <Input
                                    value={cantidad.toString()}
                                    style={{
                                        textAlign: 'center',
                                        fontSize:20
                                    }}
                                    keyboardType = 'numeric'
                                    onChangeText={(cantidad)=>guardarCantidad(cantidad)}
                                />
                            </Col>
                            <Col>
                                <Button
                                    props
                                    dark
                                    style={{ height: 80, justifyContent: 'center', width:'100%' }}
                                    onPress={()=>incrementar()}
                                >
                                    <Icon style={{fontSize : 40}} name='add'></Icon>
                                </Button>
                            </Col>
                        </Grid>
                        <Text style={globalStyle.cantidad}>Total: $ {total}</Text>
                    </Form>
                </Content>
                <Footer>
                <FooterTab>
                    <Button
                        style={globalStyle.boton}
                        onPress={()=>{consfirmarOrden()}}
                    >
                        <Text style={globalStyle.botonTexto}>Agregar al Pedido</Text>
                    </Button>
                </FooterTab>
                </Footer>
            </Container>
        )
}

export default FormularioPlatillo;