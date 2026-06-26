import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

import { loginRequest } from "../authConfig";
import { getGraphToken, getMyProfile } from "../services/graphService";

const Login = () => {
    const { instance, accounts } = useMsal();
    const navigate = useNavigate();

    console.log("Accounts", accounts);

    useEffect(() => {
        if (accounts.length > 0) {
            navigate("/");
        }
    }, [accounts, navigate]);

    const handleLogin = async () => {
        try {
            await instance.loginRedirect(loginRequest);
        } catch (error) {
            console.log(error);
        }
    };

    const handleGetToken = async () => {
        try {
            const token = await getGraphToken(
                instance,
                accounts[0]
            );

            console.log("Access Token:", token);

            const profile =
                await getMyProfile(token);

            console.log(
                "Microsoft Profile:",
                profile
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
            }}
        >
            <button onClick={handleLogin}>
                Login with Microsoft
            </button>

            {accounts.length > 0 && (
                <button onClick={handleGetToken}>
                    Get Access Token
                </button>
            )}
        </div>
    );
};

export default Login;