import { formatThaiCurrency } from "../utils/currency";
import { formatShortMonthShortYear } from "../utils/date";
function Transaction({
    transaction: {
        payee,
        category: { name },
        amount,
        date,
    },
}) {
    //------------ แปลงตัวเลข ----------------//
    // const number = 2500;
    // const result = new Intl.NumberFormat("en-US", {
    //     style: "currency",
    //     currency: "THB",
    //     currencyDisplay: "narrowSymbol",
    // }).format(number);
    // console.log(result);

    //----------- แปลง Date ------------------//
    const dateObj = new Date(date);
    // const result = new Intl.DateTimeFormat("en-US", {
    //     year: "2-digit",
    //     month: "short",
    // }).format(dateObj);
    // console.log(result);

    return (
        <li className="list-group-item d-flex align-items-center bd-callout bd-callout-success">
            <div className="d-flex flex-fill" role="button">
                <div className="border border-1 border-dark rounded-2 bg-warning p-2 text-center w-15">
                    <p className="p-0 m-0 text-black-50 text-3">
                        {formatShortMonthShortYear(dateObj)}
                    </p>
                    <p className="p-0 m-0">{dateObj.getDate()}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center ps-4 flex-fill">
                    <div>
                        <p className="mb-1 fw-bold">{payee}</p>
                        <p className="mb-0 text-3 text-black-50">{name}</p>
                    </div>
                    <span className="badge bg-success">
                        {formatThaiCurrency(amount)}
                    </span>
                </div>
            </div>
        </li>
    );
}
export default Transaction;
