import { useAuthorization } from "./client/hooks/useAuthorization";
import { AuthenticatedRoutes, UnauthenticatedRoutes } from "./client/route";
import "./index.css";

function App() {
  /*const { isAuthenticated, isLoading } = useAuthorization();

  if (isLoading) {
    return <div>Loading...</div>;
  }*/

  return (
    <>
      {
        /*isAuthenticated ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />*/ <UnauthenticatedRoutes />
      }
    </>
  );
}

export default App;
