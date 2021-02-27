import React,{useReducer} from 'react';
import PedidosReducer from './pedidosReducer';
import PedidoContext from './pedidosContext';

import {SELECCIONAR_PRODUCTO, CONFIRMAR_ORDEN_PEDIDO, MOSTRAR_RESUMEN, 
    ELIMINAR_PRODUCTO, PEDIDO_ORDENADO} from '../../types';

const PedidoState = props => {

    const initialState = {
        pedido : [],
        platillo : null,
        total : 0,
        idPedido : ''
    }

    const [state, dispatch] = useReducer(PedidosReducer, initialState);

    const seleccionarPlatillo = (platillo) => {
        dispatch({
            type : SELECCIONAR_PRODUCTO,
            payload : platillo
        })
    }

    const guardarPedido = pedido => {
        dispatch({
            type : CONFIRMAR_ORDEN_PEDIDO,
            payload : pedido
        })
    }

    const mostrarTotal = (total) => {
        dispatch({
            type : MOSTRAR_RESUMEN,
            payload : total
        })
    }

    const eliminarProducto = (id) => {
        dispatch({
            type : ELIMINAR_PRODUCTO,
            payload : id
        })
    }
    
    const pedidoOrdenado = (id) => {
        dispatch({
            type : PEDIDO_ORDENADO,
            payload : id
        })
    }

    return (
        <PedidoContext.Provider
            value={{
                pedido:state.pedido,
                platillo : state.platillo,
                total : state.total,
                seleccionarPlatillo,
                guardarPedido,
                mostrarTotal,
                eliminarProducto,
                pedidoOrdenado,
                idPedido : state.idPedido
            }}
        >
            {props.children}
        </PedidoContext.Provider>
    )
}

export default PedidoState;