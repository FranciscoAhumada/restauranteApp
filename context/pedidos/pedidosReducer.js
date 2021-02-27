import {SELECCIONAR_PRODUCTO, CONFIRMAR_ORDEN_PEDIDO, MOSTRAR_RESUMEN, 
    ELIMINAR_PRODUCTO, PEDIDO_ORDENADO} from '../../types';

export default (state,action) => {
    switch (action.type) {
        case SELECCIONAR_PRODUCTO : 
            return {...state, platillo: action.payload}
        case CONFIRMAR_ORDEN_PEDIDO : 
            return {...state, pedido: [...state.pedido,action.payload]}
        case ELIMINAR_PRODUCTO : 
            return {
                ...state, 
                pedido: state.pedido.filter(articulo => articulo.id != action.payload)
            }
        case PEDIDO_ORDENADO : 
            return {
                ...state,
                pedido:[],
                total : 0, 
                idPedido: action.payload
            }
        case MOSTRAR_RESUMEN : 
            return {...state, total: action.payload}
        default:
            return state;
    }
}