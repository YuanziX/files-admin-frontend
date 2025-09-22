import { useMemo } from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";
import { SetContextLink } from "@apollo/client/link/context";
import { BASE_URL } from "@/utils/constants";
import { useAuth } from "@/hooks/use-auth";
import { ApolloProvider } from "@apollo/client/react";

function useApolloClientWithAuth() {
  const { token } = useAuth();

  return useMemo(() => {
    const httpLink = new HttpLink({ uri: BASE_URL });

    const authLink = new SetContextLink((prevContext) => {
      return {
        headers: {
          ...prevContext.headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }, [token]);
}

export default function ApolloWithAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = useApolloClientWithAuth();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
