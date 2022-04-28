import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { DELETE_TRANSACTON } from "../reducers/TransactionReducer";

const INCOME = "INCOME";
const EXPENSE = "EXPENSE";

function TransactionForm() {
    const [transaction, setTransaction] = useState({});
    const [notFoundError, setNotFoundError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryType, setCategoryType] = useState(EXPENSE);
    const [payeeInput, setPayeeInput] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [amountInput, setAmountInput] = useState(0);
    const [dateInput, setDateInput] = useState("");

    const { dispatch } = useContext(TransactionContext);

    const navigate = useNavigate();

    const params = useParams();
    console.log(params.transactionId);

    useEffect(() => {
        if (params.transactionId) {
            axios
                .get(
                    "http://localhost:8080/transactions/" + params.transactionId
                )
                .then((res) => {
                    if (res.data.transaction === null) {
                        setNotFoundError(true);
                    } else {
                        setTransaction(res.data.transaction);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setNotFoundError(true);
                });
        }
    }, [params.transactionId]);

    useEffect(() => {
        const fetchCategory = async () => {
            const res = await axios.get("http://localhost:8080/categories");
            setCategories(res.data.categories);
            setCategoryId(res.data.categories[0].id);
        };
        fetchCategory();
    }, []);

    const location = useLocation();
    console.log(location);

    // function ที่เมื่อกดแล้วจะ reDirect ไปที่หน้า Home
    const handleSubmitFrom = async (event) => {
        event.preventDefault();
        //Create Transaction Completed
        const res = await axios.post("http://localhost:8080/transactions", {
            payee: payeeInput,
            amount: Number(amountInput),
            date: dateInput,
            categoryId: categoryId,
        });
        navigate("/home");
    };

    const handleClickDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(
                "http://localhost:8080/transactions/" + params.transactionId
            );
            dispatch({
                type: DELETE_TRANSACTON,
                value: { id: params.transactionId },
            });
            setLoading(false);
            navigate("/home");
        } catch (err) {
            console.log(err);
        }
    };

    const filteredCategories = categories.filter(
        (el) => el.type === categoryType
    );

    if (notFoundError)
        return <h1 className="text-white">404 Transaction is not found</h1>;

    return (
        <>
            <div className="border bg-white rounded-2 p-3">
                <form className="row g-3" onSubmit={handleSubmitFrom}>
                    {/* ------------------------------------------------------ */}
                    <div className="col-6">
                        <input
                            type="radio"
                            className="btn-check"
                            id="cbx-expense"
                            name="type"
                            defaultChecked
                            onChange={() => setCategoryType(EXPENSE)}
                        />
                        <label
                            className="btn btn-outline-danger rounded-0 rounded-start"
                            htmlFor="cbx-expense"
                        >
                            Expense
                        </label>
                        <input
                            type="radio"
                            className="btn-check"
                            id="cbx-income"
                            name="type"
                            onChange={() => setCategoryType(INCOME)}
                        />
                        <label
                            className="btn btn-outline-success rounded-0 rounded-end"
                            htmlFor="cbx-income"
                        >
                            Income
                        </label>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <i className="fa-solid fa-xmark" role="button" />
                    </div>

                    {/* ------------------------------------------------------ */}
                    <div className="col-sm-6">
                        <label className="form-lable">Payee</label>
                        <input
                            className="form-control"
                            type="text"
                            value={payeeInput}
                            onChange={(el) => setPayeeInput(el.target.value)}
                        />
                    </div>

                    {/* ------------------------------------------------------ */}
                    <div className="col-sm-6">
                        <label className="form-lable">Category</label>
                        <select
                            className="form-select"
                            onChange={(el) => {
                                setCategoryId(el.target.value);
                            }}
                        >
                            {filteredCategories.map((el) => (
                                <option key={el.id} value={el.id}>
                                    {el.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* ------------------------------------------------------ */}
                    <div className="col-sm-6">
                        <label className="form-lable">Amount</label>
                        <input
                            className="form-control"
                            type="text"
                            value={amountInput}
                            onChange={(el) => setAmountInput(el.target.value)}
                        />
                    </div>

                    {/* ------------------------------------------------------ */}
                    <div className="col-sm-6">
                        <label className="form-lable">Date</label>
                        <input
                            className="form-control"
                            type="date"
                            value={dateInput}
                            onChange={(el) => setDateInput(el.target.value)}
                        />
                    </div>

                    {/* ------------------------------------------------------ */}
                    <div className="col-12">
                        <div className="d-grid mt-3">
                            <button className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>
            {params.transactionId && (
                <div className="d-grid mt-5">
                    <button
                        className="btn btn-danger"
                        onClick={handleClickDelete}
                        disabled={loading}
                    >
                        Delete Transaction
                    </button>
                </div>
            )}
        </>
    );
}

export default TransactionForm;
