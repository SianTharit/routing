import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import {
    TransactionReducer,
    FETCH_TRANSACTION,
} from "../reducers/TransactionReducer";

const TransactionContext = createContext();

function TransactionContextProvider({ children }) {
    const [state, dispatch] = useReducer(TransactionReducer, []);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:8080/transactions"
                );
                dispatch({
                    type: FETCH_TRANSACTION,
                    value: { transactions: res.data.transactions },
                });
            } catch (err) {
                console.log(err);
            }
        };
        fetchTransactions();
    }, []);

    // useEffect(() => {
    //     axios
    //         .get("http://localhost:8080/transactions")
    //         .then((res) => {
    //             dispatch({
    //                 type: FETCH_TRANSACTION,
    //                 value: { transactions: res.data.transactions },
    //             });
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    return (
        <TransactionContext.Provider value={{ transactions: state, dispatch }}>
            {children}
        </TransactionContext.Provider>
    );
}
export { TransactionContext, TransactionContextProvider };
