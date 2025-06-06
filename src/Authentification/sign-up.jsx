import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // Simulate registration
        alert("Registered successfully!");
        navigate("/login");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md shadow-2xl p-6 bg-[#FFFFFF] border-none">
                <CardContent>
                    <h2 className="text-2xl font-bold mb-4 text-center">Create an Account</h2>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <Input type="text" placeholder="Full Name" required />
                        <Input type="email" placeholder="Email" required />
                        <Input type="password" placeholder="Password" required />
                        <Input type="password" placeholder="Confirm Password" required />

                        <Button type="submit" className="w-full">Register</Button>

                        <p className="text-sm text-center mt-4">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-500 hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignUp;
