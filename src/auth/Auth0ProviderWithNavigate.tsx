import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectURI = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
  const navigate = useNavigate();

  if (!domain || !clientId || !redirectURI || !audience) {
    throw new Error(
      "Please define the VITE_AUTH0_DOMAIN, VITE_AUTH0_CLIENT_ID and VITE_AUTH0_CALLBACK_URL and VITE_AUTH0_AUDIENCE environment variables inside .env file"
    );
  }

  const onRedirectCallBack = (appState?: AppState) => {
    navigate(appState?.returnTo || "/auth/callback");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectURI, audience: audience }}
      onRedirectCallback={onRedirectCallBack}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
