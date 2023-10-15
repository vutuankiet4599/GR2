import { RouterProvider } from "react-router-dom";
import "./App.css";
import Router from "./routes/Router";
import AppProvider from "./context/AppProvider";
import { ToastContainer } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <AppProvider>
            <RouterProvider router={Router} />
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </AppProvider>
    );
}

export default App;
