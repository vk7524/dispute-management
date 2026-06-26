import { loginRequest } from "../authConfig";
import axios from "axios";
export const getGraphToken = async (
  instance,
  account
) => {
  try {
    const response =
      await instance.acquireTokenSilent({
        ...loginRequest,
        account,
      });

    return response.accessToken;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getMyProfile = async (
  accessToken
) => {
  const response = await axios.get(
    "https://graph.microsoft.com/v1.0/me",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};