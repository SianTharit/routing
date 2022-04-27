import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import { TransactionContextProvider } from "./context/TransactionContext";
import Homepage from "./pages/Homepage";
import TransactionAction from "./pages/TransactionAction";

function App() {
    return (
        <TransactionContextProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="home" element={<Homepage />} />
                    <Route path="new" element={<TransactionAction />} />
                    <Route
                        path="transaction/:transactionId"
                        element={<TransactionAction />}
                    />
                    <Route
                        index
                        // element={
                        // <div className="text-white">This is default page</div>
                        // }
                        element={<Navigate to="/home" />}
                    />
                </Route>
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
        </TransactionContextProvider>
    );
}

export default App;
