import React, {useContext, useEffect, Fragment} from 'react';
import { StyleSheet} from 'react-native';
import FirebaseContext from '../context/firebase/firebaseContext';
import PedidoContext from '../context/pedidos/pedidosContext';
import {Container, Separator, Content, List, ListItem,Thumbnail, Text, Body} from 'native-base';
import globalStyle from '../styles/global';
import {useNavigation} from '@react-navigation/native';

const Menu = () => {

    const{menu, obtenerProductos} = useContext(FirebaseContext);

    const {seleccionarPlatillo} = useContext(PedidoContext);

    const navigation = useNavigation();

    useEffect(()=>{
        obtenerProductos();

        console.log('nuevo',menu);
    }, []);

    const mostrarHeading = (categoria, i) => {

        if(i>0){
            const categoriaAnterior = menu[i-1].categoria;
            if(categoriaAnterior != categoria){
                return (
                    <Separator style={styles.separador}>
                        <Text style={styles.separadorTexto}>
                            {categoria}
                        </Text>
                    </Separator>
                )
            }
        }else{
            return (
                <Separator style={styles.separador}>
                    <Text style={styles.separadorTexto}>
                        {categoria}
                    </Text>
                </Separator>
            )
        }
        
    }

    return(
        <Container style={globalStyle.contenedor}>
            <Content style={{backgroundColor:'#FFF'}}>
                <List>
                    {menu.map((platillo,i) =>{
                        const {imagen, nombre, descripcion, categoria, id, precio } = platillo;
                        return(
                            <Fragment key={id}>
                                {mostrarHeading(categoria, i)}
                                <ListItem
                                    onPress = {()=> {
                                        seleccionarPlatillo(platillo);
                                        navigation.navigate('DetallePlatillo');
                                    }}
                                >
                                    <Thumbnail large square source = {{uri:imagen}}/>
                                    <Body>
                                        <Text>{nombre}</Text>
                                        <Text
                                            note
                                            numberOfLines = {2}
                                        >{descripcion}</Text>
                                        <Text>Precio $ {precio}</Text>
                                    </Body>
                                </ListItem>
                            </Fragment>
                        )
                    })}
                </List>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    separador:{
        backgroundColor:'#000'
    },
    separadorTexto : {
        color: '#FFDA00',
        fontWeight : 'bold',
        textTransform : 'uppercase'
    }
})

export default Menu;