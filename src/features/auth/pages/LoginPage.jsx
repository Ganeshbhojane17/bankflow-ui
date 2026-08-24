import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    TextField,
    Typography
} from "@mui/material";

import AuthLayout from "../../../layouts/AuthLayout";
import { loginUser } from "../services/authService";
import { loginSuccess } from "../authSlice";
import tokenStorage from "../../../utils/tokenStorage";

function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (formData) => {

        setError("");

        try {

            setLoading(true);

            const response = await loginUser(formData);

            tokenStorage.save(
                response.data.accessToken,
                response.data.refreshToken
            );

            dispatch(
                loginSuccess({
                    user: response.data,
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken
                })
            );

            navigate("/dashboard");

        }
        catch (err) {

            setError(
                err?.response?.data?.message ||
                "Unable to login. Please try again."
            );

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <AuthLayout>

            <Typography
                variant="h4"
                fontWeight="bold"
                textAlign="center"
                gutterBottom
            >
                Welcome Back
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                mb={3}
            >
                Sign in to continue to BankFlow CRM
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >

                <TextField
                    label="Email Address"
                    fullWidth
                    margin="normal"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Enter a valid email address"
                        }
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading}
                    sx={{ mt: 3, py: 1.5 }}
                >
                    {loading ? "Signing In..." : "Sign In"}
                </Button>

                <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>Don't have an account?{" "}

                     <Button variant="text" onClick={() => navigate("/register")}
                       sx={{
                            textTransform: "none",
                            fontWeight: "bold"
                          }}
                          >
                           Register
                     </Button>
                </Typography>

            </Box>

        </AuthLayout>

    );

}

export default LoginPage;