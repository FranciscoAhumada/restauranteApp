import React, {useContext} from 'react';
import { Image } from 'react-native';
import {Container, Content, Footer,FooterTab, Button,Body,Text,H1, Card, CardItem} from 'native-base';
import PedidoContext from '../context/pedidos/pedidosContext';
import globalStyle from '../styles/global';
import {useNavigation} from '@react-navigation/native';


const DetalePedido = () => {

    const {platillo} = useContext(PedidoContext);
    const {nombre, imagen, descripcion, precio} = platillo;

    const navigation = useNavigation();

    return (
        <Container style={globalStyle.contenedor}>
            <Content style={globalStyle.contenido}>
                <H1 style={globalStyle.titulo}>{nombre}</H1>
                <Card>
                    <CardItem>
                        <Body>
                            <Image style={globalStyle.imagen} source={{uri : imagen}}/>
                            <Text style={{marginTop: 20}}>{descripcion}</Text>
                            <Text style={globalStyle.cantidad}>Precio : $ {precio}</Text>
                        </Body>
                    </CardItem>
                </Card>
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                        style={globalStyle.boton}
                        onPress={()=>{navigation.navigate('FormularioPlatillo')}}
                    >
                        <Text style={globalStyle.botonTexto}>Ordenar Pedido</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    )
}

export default DetalePedido;