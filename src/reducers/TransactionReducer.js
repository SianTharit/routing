const FETCH_TRANSACTION = "FETCH_TRANSACTION";

function TransactionReducer(state, action) {
    switch (action.type) {
        case FETCH_TRANSACTION: {
            //dispatch({type: FETCH_TRANSACTION, value: { transaction: [] }})
            return [...action.value.transactions];
        }
        default:
            return state;
    }
}

export { TransactionReducer, FETCH_TRANSACTION };
