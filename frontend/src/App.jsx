import { RouterProvider } from "react-router-dom";
import { routers } from "./routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
<Toaster
  position="top-right"
  toastOptions={{
    style: {
      marginTop: '70px',  
    }
  }}
/>
      <div>
        <RouterProvider router={routers} />
      </div>
    </>
  );
}

export default App;
