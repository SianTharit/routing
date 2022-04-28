import axios from "axios";
import validator from "validator";
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

    //------------- state ค่่า catagories ทั้งหมดออกมา -------//
    const [categories, setCategories] = useState([]);

    //---------------- state กำหนด type -------------------//
    const [categoryType, setCategoryType] = useState(EXPENSE);

    //--------------- state เก็บค่า input -------------------//
    const [payeeInput, setPayeeInput] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [amountInput, setAmountInput] = useState("");
    const [dateInput, setDateInput] = useState("");

    //-------------
    const [error, setError] = useState({});

    //-- state list ของ Expense, list ของ Income ----------//
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);

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
            const resultExpenses = res.data.categories.filter(
                (el) => el.type === EXPENSE
            );
            const resultIncomes = res.data.categories.filter(
                (el) => el.type === INCOME
            );
            setCategories(res.data.categories);
            setExpenses(resultExpenses);
            setIncomes(resultIncomes);

            if (categoryType === EXPENSE) {
                setCategoryId(resultExpenses[0].id);
            } else {
                setCategoryId(resultIncomes[0].id);
            }
        };
        fetchCategory();
    }, []);

    const location = useLocation();
    console.log(location);

    // เขียนแบบนี้ก็ได้ แต่มันจะ rerender 2 ครั้ง
    // useEffect(() => {
    //     setCategoryId(
    //         categoryType === EXPENSE ? expenses[0].id : incomes[0].id
    //     );
    // }, [categoryType]);

    // function ที่เมื่อกดแล้วจะ reDirect ไปที่หน้า Home
    const handleSubmitFrom = async (event) => {
        event.preventDefault();
        //Create Transaction Completed
        //validate input before request to server
        const inputError = {};
        if (validator.isEmpty(payeeInput)) {
            inputError.payee = "Payee is required";
        }
        if (validator.isEmpty(amountInput)) {
            inputError.amount = "Amount is required";
        } else if (!validator.isNumeric(amountInput)) {
            inputError.amount = "Amount must be numeric";
        }
        if (validator.isEmpty(dateInput)) {
            inputError.date = "Date is required";
        }
        if (Object.keys(inputError).length > 0) {
            setError(inputError);
        } else {
            setError({});
        }
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

    //ไม่ดีเพราะเวลา render มันจะทำงานทุกครั้ง เราจึงควรสร้างเป็น state list --> expenses, incomes
    // const filteredCategories = categories.filter(
    //     (el) => el.type === categoryType
    // );

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
                            onChange={() => {
                                setCategoryType(EXPENSE);
                                setCategoryId(expenses[0].id);
                            }}
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
                            onChange={() => {
                                setCategoryType(INCOME);
                                setCategoryId(incomes[0].id);
                            }}
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
                            onChange={(event) =>
                                setPayeeInput(event.target.value)
                            }
                        />
                    </div>

                    {/* ------------------------------------------------------ */}
                    <div className="col-sm-6">
                        <label className="form-lable">Category</label>
                        <select
                            className="form-select"
                            value={categoryId}
                            onChange={(event) => {
                                setCategoryId(event.target.value);
                            }}
                        >
                            {(categoryType === EXPENSE
                                ? expenses
                                : incomes
                            ).map((el) => (
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
                            onChange={(event) =>
                                setAmountInput(event.target.value)
                            }
                        />
                    </div>

                    {/* ------------------------------------------------------ */}
                    <div className="col-sm-6">
                        <label className="form-lable">Date</label>
                        <input
                            className="form-control"
                            type="date"
                            value={dateInput}
                            onChange={(event) =>
                                setDateInput(event.target.value)
                            }
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
