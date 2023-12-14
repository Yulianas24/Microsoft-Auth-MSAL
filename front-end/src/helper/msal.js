import { PublicClientApplication } from "@azure/msal-browser"

const msalConfig = {
  auth: {
    clientId: `${import.meta.env.VITE_CLIENT_ID}`,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_TENANT_ID}`,
    redirectUri: "http://localhost:3000/auth/redirect",
  }
};

const msalInstance = new PublicClientApplication(msalConfig);
export default msalInstance;
