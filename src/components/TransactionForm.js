import { useNavigate } from "react-router-dom";

function TransactionForm() {
    const navigate = useNavigate();

    // function ที่เมื่อกดแล้วจะ reDirect ไปที่หน้า Home
    const handleSubmitFrom = (event) => {
        event.preventDefault();
        //Create Transaction Completed
        navigate("/home");
    };
    return (
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
                    <input className="form-control" type="text" />
                </div>

                {/* ------------------------------------------------------ */}
                <div className="col-sm-6">
                    <label className="form-lable">Category</label>
                    <select className="form-select">
                        <option>Food</option>
                        <option>Transport</option>
                    </select>
                </div>

                {/* ------------------------------------------------------ */}
                <div className="col-sm-6">
                    <label className="form-lable">Amount</label>
                    <input className="form-control" type="text" />
                </div>

                {/* ------------------------------------------------------ */}
                <div className="col-sm-6">
                    <label className="form-lable">Date</label>
                    <input className="form-control" type="date" />
                </div>

                {/* ------------------------------------------------------ */}
                <div className="col-12">
                    <div className="d-grid mt-3">
                        <button className="btn btn-primary">Save</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default TransactionForm;
