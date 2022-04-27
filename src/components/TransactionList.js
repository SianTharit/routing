import { useContext } from "react";
import Transaction from "./Transaction";
import { TransactionContext } from "../context/TransactionContext";

function TransactionList() {
    const { transactions } = useContext(TransactionContext);
    return (
        <ul className="list-group">
            {transactions.map((el) => (
                <Transaction />
            ))}
        </ul>
    );
}

export default TransactionList;
