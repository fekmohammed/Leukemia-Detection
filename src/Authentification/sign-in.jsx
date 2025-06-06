import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

const SignIn = ({ setAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        setAuthenticated(true);
        navigate("/");
    };

    const handleGoogleSignIn = () => {
        alert("Google Sign-In clicked");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md shadow-2xl p-6 bg-[#FFFFFF] border-none">
                <CardContent>
                    <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <Input type="email" placeholder="Email" required />
                        <Input type="password" placeholder="Password" required />

                        <div className="text-right text-sm">
                            <Link to="/forgot-password" className="text-blue-600 hover:underline">
                                Forgot password?
                            </Link>
                            <p className="text-sm text-center mt-4">
                                Don’t have an account?{" "}
                                <Link to="/register" className="text-blue-500 hover:underline">
                                    Create one
                                </Link>
                            </p>
                        </div>

                        <Button type="submit" className="w-full">Sign In</Button>

                        <div className="flex items-center justify-center my-2 text-gray-500 text-sm">or</div>

                        <Button type="button" variant="outline" className="w-full" onClick={handleGoogleSignIn}>
                            Continue with Google
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignIn;
