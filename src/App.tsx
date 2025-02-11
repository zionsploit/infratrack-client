import { MantineProvider } from "@mantine/core"
import { mantineTheme } from "./provider/mantineProvider"
import { Router } from "./router/index.router"
import { ToastContainer } from "react-toastify"

function App() {

  return (
    <>
      <MantineProvider theme={mantineTheme}>
        <ToastContainer position='top-right' />
        <Router />
      </MantineProvider>
    </>
  )
}

export default App
