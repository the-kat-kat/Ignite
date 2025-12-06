import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

//import CodeGuide from "./pages/CodeGuide.mdx";
//import Submitting from "./pages/Submitting.mdx";
//import Faq from "./pages/Faq.mdx";
//import EnvSetup from "./pages/EnvSetup.mdx";
//import Art from "./pages/Art.mdx";

//import DocPage from "./layouts/DocPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);