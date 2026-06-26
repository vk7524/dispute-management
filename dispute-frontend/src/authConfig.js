// src/authConfig.js

export const msalConfig = {
  auth: {
    clientId: "4ffffb99-f5f1-4795-99d2-4b06dcc188e9",
    authority:
      "https://login.microsoftonline.com/19fe76ea-aab5-4b92-a746-0acaa4e3aae5",
    redirectUri: "http://localhost:5173",
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: [
    // "User.Read",
    // "User.Read.All",
    // "Directory.Read.All",


    "User.Read",
    "User.Read.All",
    "Directory.Read.All",
    "Chat.ReadWrite",
    "ChatMessage.Send"

    // "User.Read",
    // "User.Read.All",
    // "Directory.Read.All",
    // "Chat.Create",
    // "ChatMessage.Send"
  ],
};