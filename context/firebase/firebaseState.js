import React,{useReducer} from 'react';
import firebase from '../../firebase';
import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';
import _ from 'lodash';
import {OBTENER_PRODUCTOS_EXITO} from '../../types';

const FirebaseState = props => {

    const initialState = {
        menu : []
    }

    console.log(firebase);

    const [state, dispatch] = useReducer(FirebaseReducer, initialState);

    const obtenerProductos = () => {
        
        firebase.db.collection('productos').where('existencia', '==' , true).onSnapshot(manejarSnapshot);

        function manejarSnapshot(snapshot) {
            let platillos = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });

            platillos = _.sortBy(platillos, 'categoria');

            dispatch({
                type : OBTENER_PRODUCTOS_EXITO,
                payload : platillos
            });
        }
    }

    return (
        <FirebaseContext.Provider
            value={{
                menu:state.menu,
                firebase,
                obtenerProductos
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState;