import { useAuthorization } from "./client/hooks/useAuthorization";
import { AuthenticatedRoutes, UnauthenticatedRoutes } from "./client/route";

function App() {
  const { isAuthenticated, isLoading } = useAuthorization();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>{isAuthenticated ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}</>
  );
}

export default App;
