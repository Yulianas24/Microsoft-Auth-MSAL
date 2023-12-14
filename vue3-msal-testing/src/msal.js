import { PublicClientApplication,EventType } from "@azure/msal-browser"

// let account
// or set this to a store

const msalConfig = {
  auth: {
      // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
      clientId: "8f4dd80f-4039-4341-b9e4-b157efea9996",
      // Full directory URL, in the form of https://login.microsoftonline.com/<tenant-id>
      authority: "https://login.microsoftonline.com/bf66caa3-454c-4b7d-8ca9-f1ace6d76751",
      // Full redirect URL, in form of http://localhost:3000
      redirectUri: "http://localhost:3000/",
  }
};

// TENANT_ID="bf66caa3-454c-4b7d-8ca9-f1ace6d76751"
// CLIENT_ID="8f4dd80f-4039-4341-b9e4-b157efea9996"
// CLIENT_SECRET="66d8Q~7vyHcQEThPP7PgAX8vuqoH-4LjKvkOWcJM"

// REDIRECT_URI="http://localhost:3000/auth/redirect"
// POST_LOGOUT_REDIRECT_URI="http://localhost:3000"

const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.addEventCallback((event) => {
  // set active account after redirect
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    const account = event.payload.account;
    console.log(account)
    msalInstance.setActiveAccount(account);
  }
}, error=>{
  console.log('error', error);
});

export default msalInstance;
