import { useAuthorization } from "./client/hooks/useAuthorization";
import { AuthenticatedRoutes, UnauthenticatedRoutes } from "./client/route";

function App() {
  const { isAuthenticated } = useAuthorization();
  console.log("isAuthenticated in App.tsx:", isAuthenticated);
  return (
    <>{isAuthenticated ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}</>
  );
}

export default App;
