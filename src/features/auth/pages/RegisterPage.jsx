import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Typography, TextField, Button, Alert, Box } from "@mui/material";
import { registerUser } from "../services/authService";
import AuthLayout from "../../../layouts/AuthLayout";


function RegisterPage() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      setSuccessMessage("");
      setErrorMessage("");

      const result = await registerUser(data);

      setSuccessMessage(result.message);
      reset();
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
   <AuthLayout>

        <Typography variant="h4" gutterBottom>Register User</Typography>

        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="First Name" {...register("firstName", { required: "First Name is required" })} error={!!errors.firstName} helperText={errors.firstName?.message} />

          <TextField label="Last Name" {...register("lastName", { required: "Last Name is required" })} error={!!errors.lastName} helperText={errors.lastName?.message} />

          <TextField label="Email" {...register("email", { required: "Email is required" })} error={!!errors.email} helperText={errors.email?.message} />

          <TextField
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button variant="contained" type="submit">Register</Button>

          <Typography variant="body2" textAlign="center"sx={{ mt: 2 }}>
                Already have an account?{" "}

              <Button variant="text" onClick={() => navigate("/login")}
                     sx={{
                        textTransform: "none",
                        fontWeight: "bold"
                       }} >
                  Sign In
              </Button>
          </Typography>
        </Box>
      </AuthLayout>
  );
}

export default RegisterPage;