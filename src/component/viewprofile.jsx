import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";

const ViewProfile = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("overview");
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm({
        defaultValues: {
            fullname: "",
            age: "",
            gender: "",
            phone: "",
            email: "",
            address: "",
            bloodType: "",
            medicalConditions: "",
            currentMedications: "",
            emergencyName: "",
            emergencyPhone: "",
        },
    });

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await fetch("/patients.json");
                if (!response.ok) throw new Error("Failed to load patients data");

                const patients = await response.json();
                const found = patients.find(p => p.patientId.toString() === id);

                if (!found) throw new Error("Patient not found");

                setPatient(found);
                form.reset(found);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPatient();
    }, [id, form]);

    const renderField = (name, label) => (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input {...field} readOnly={!isEditing} className={!isEditing ? "bg-gray-100" : ""} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );

    const renderContent = () => {
        if (!patient) return null;

        switch (activeTab) {
            case "medical":
                return (
                    <div className="space-y-4">
                        {renderField("medicalConditions", "Medical Conditions")}
                        {renderField("currentMedications", "Current Medications")}
                    </div>
                );
            case "overview":
                return (
                    <div className="space-y-4">
                        {renderField("fullname", "Full Name")}
                        {renderField("age", "Age")}
                        {renderField("gender", "Gender")}
                        {renderField("phone", "Phone")}
                        {renderField("email", "Email")}
                        {renderField("address", "Address")}
                        {renderField("bloodType", "Blood Type")}
                        {renderField("emergencyName", "Emergency Contact Name")}
                        {renderField("emergencyPhone", "Emergency Contact Phone")}
                    </div>
                );

            case "lab":
                return <p>Lab results not available in JSON data.</p>;
            default:
                return <p>Select a section.</p>;
        }
    };

    const handleSubmit = form.handleSubmit(data => {
        console.log("Updated data:", data);
        setIsEditing(false);
    });

    if (loading) return <div className="p-6">Loading patient profile...</div>;
    if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold text-primary">Patient Profile</h1>
                <div className="flex gap-2">
                    {!isEditing && (
                        <Button onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </Button>
                    )}

                </div>
            </div>

            <div className="flex gap-6">
                {/* Sidebar */}
                <Card className="w-1/4 p-4 flex flex-col items-center gap-4 bg-[#FFFFFF] border-none  h-fit">
                    <img
                        src="/profile.jpg"
                        alt="Patient"
                        className="w-32 h-32 rounded-full object-cover shadow-md"
                    />
                    {patient && (
                        <div className="text-center space-y-1">
                            <p className="font-semibold text-lg">{patient.fullname}</p>
                            <p className="text-sm text-gray-600">{patient.email}</p>
                            <p className="text-sm text-gray-600">{patient.phone}</p>
                        </div>
                    )}
                    <div className="flex flex-col gap-2 w-full mt-4">
                        {["overview", "medical", "lab"].map(tab => (
                            <Button
                                key={tab}
                                variant={activeTab === tab ? "default" : "outline"}
                                className="capitalize"
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </Button>
                        ))}
                    </div>
                </Card>

                {/* Main Content */}
                <Card className="w-3/4 p-6 bg-[#FFFFFF] border-none">
                    <h2 className="text-2xl font-semibold mb-4 capitalize">{activeTab}</h2>
                    <Form {...form}>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {renderContent()}
                            {isEditing && (
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">Save Changes</Button>
                                </div>
                            )}
                        </form>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default ViewProfile;
