export const FETCH_TRANSACTION = "FETCH_TRANSACTION";

export const DELETE_TRANSACTON = "DELETE_TRANSACTION";

export function TransactionReducer(state, action) {
    switch (action.type) {
        case FETCH_TRANSACTION: {
            //dispatch({type: FETCH_TRANSACTION, value: { transaction: [] }})
            return [...action.value.transactions];
        }
        case DELETE_TRANSACTON: {
            // dispatch({ type: DELETE_TRANSACTION, value: { id: '...'} })
            const idx = state.findIndex((el) => el.id === action.value.id);
            if (idx !== -1) {
                const cloneState = [...state];
                cloneState.splice(idx, 1);
                return cloneState;
            }
            return state;
        }
        default:
            return state;
    }
}
