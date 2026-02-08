import { useRouteError } from "react-router-dom"

function ErrorHandlerPage() {
  const error = useRouteError();
  return <h1>{error.message || error.statusText || `Something went wrong`}</h1>
}

export default ErrorHandlerPage