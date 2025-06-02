import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { z } from "zod";

import {
    Form, FormField, FormItem, FormLabel, FormControl, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
const registrationSchema = z.object({
    role: z.enum(["admin", "user"]),
    userType: z.string().optional(),
    fullName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
});

const Registration = () => {
    const form = useForm({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            role: "user",
            fullName: "",
            email: "",
            password: "",
            userType: "",
        },
    });

    const watchRole = form.watch("role");

    const onSubmit = (values) => {
        console.log("Submitted:", values);
        // Submit to backend
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6 bg-white rounded shadow">
                <h2 className="text-2xl font-semibold">Register</h2>

                {/* Role Selection */}
                <FormField name="role" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger><SelectValue placeholder="Select Role" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />

                {/* User Type Selection */}
                {watchRole === "user" && (
                    <FormField name="userType" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>User Type</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="hospital">Hospital</SelectItem>
                                    <SelectItem value="clinic">Private Clinic</SelectItem>
                                    <SelectItem value="lab">Lab</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                )}

                {/* Full Name */}
                <FormField name="fullName" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                {/* Email */}
                <FormField name="email" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input type="email" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                {/* Password */}
                <FormField name="password" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl><Input type="password" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <Button type="submit" className="w-full">Register</Button>
            </form>
        </Form>
    );
};

export default Registration;
