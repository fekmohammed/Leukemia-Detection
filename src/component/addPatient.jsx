import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp } from "lucide-react";

// Schema
const formSchema = z.object({
    patientId: z.number().int().min(0).max(120000),
    fullname: z.string().min(2).max(50),
    phone: z.string().min(6).max(100),
    email: z.string().email(),
    gender: z.enum(["Male", "Female"]),
    age: z.coerce.number().int().min(0).max(120),
    address: z.string().min(2),
    bloodType: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
    medicalConditions: z.string().optional(),
    currentMedications: z.string().optional(),
    emergencyName: z.string().min(2),
    emergencyPhone: z.string().min(6),
});

const defaultValues = {
    patientId: 56658,
    fullname: "",
    phone: "",
    email: "",
    gender: "Male",
    age: 0,
    address: "",
    bloodType: "O+",
    medicalConditions: "",
    currentMedications: "",
    emergencyName: "",
    emergencyPhone: "",
};

const AddPatient = ({ patientData = null }) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const [showPatientInfo, setShowPatientInfo] = useState(true);
    const [showMedical, setShowMedical] = useState(false);
    const [showEmergency, setShowEmergency] = useState(false);

    // Prefill form if editing
    useEffect(() => {
        if (patientData) {
            form.reset(patientData);
        }
    }, [patientData]);

    const onSubmit = (values) => {
        fetch("/api/add-patient", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((data) => console.log("Saved!", data))
            .catch((err) => console.error("Error saving patient", err));
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-6 py-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-semibold text-primary">Patients</h1>
                    <Button type="submit">{patientData ? "Update" : "Add"} Patient</Button>
                </div>

                <Section title="Patient Information" open={showPatientInfo} toggle={() => setShowPatientInfo(!showPatientInfo)}>
                    <PatientInfo form={form} />
                </Section>

                <Section title="Medical-Related Info" open={showMedical} toggle={() => setShowMedical(!showMedical)}>
                    <MedicalInfo form={form} />
                </Section>

                <Section title="Emergency Contact" open={showEmergency} toggle={() => setShowEmergency(!showEmergency)}>
                    <EmergencyInfo form={form} />
                </Section>
            </form>
        </Form>
    );
};

// Reusable collapsible section
const Section = ({ title, open, toggle, children }) => (
    <div className="bg-[#FFFFFF] rounded-md shadow-md p-6 space-y-4">
        <div onClick={toggle} className="flex justify-between items-center cursor-pointer">
            <h3 className="text-xl font-semibold text-primary">{title}</h3>
            {open ? <ChevronUp /> : <ChevronDown />}
        </div>
        <div className={`transition-all duration-300 overflow-hidden ${open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="mt-4 space-y-4">{children}</div>
        </div>
    </div>
);

// Patient Info Fields
const PatientInfo = ({ form }) => (
    <>
        <FormField name="patientId" control={form.control} render={({ field }) => (
            <FormItem>
                <FormLabel>Patient ID</FormLabel>
                <FormControl><Input disabled {...field} /></FormControl>
                <FormMessage />
            </FormItem>
        )} />
        <FormField name="fullname" control={form.control} render={({ field }) => (
            <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl><Input placeholder="e.g. Alice Smith" {...field} /></FormControl>
                <FormMessage />
            </FormItem>
        )} />
        <FormField name="phone" control={form.control} render={({ field }) => (
            <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl><Input placeholder="e.g. +123456789" {...field} /></FormControl>
                <FormMessage />
            </FormItem>
        )} />
        <FormField name="email" control={form.control} render={({ field }) => (
            <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input type="email" {...field} /></FormControl>
                <FormMessage />
            </FormItem>
        )} />
        <FormField name="gender" control={form.control} render={({ field }) => (
            <FormItem>
                <FormLabel>Gender</FormLabel>
                <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Male" id="male" />
                        <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Female" id="female" />
                        <Label htmlFor="female">Female</Label>
                    </div>
                </RadioGroup>
                <FormMessage />
            </FormItem>
        )} />
        <FormField name="age" control={form.control} render={({ field }) => (
            <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl><Input type="number" placeholder="e.g. 30" {...field} /></FormControl>
                <FormMessage />
            </FormItem>
        )} />
        <FormField name="address" control={form.control} render={({ field }) => (
            <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl><Input placeholder="e.g. 123 Main St" {...field} /></FormControl>
                <FormMessage />
            </FormItem>
        )} />
    </>
);

// Medical Info
const MedicalInfo = ({ form }) => (
    <>
        <FormField name="bloodType" control={form.control} render={({ field }) => (
            <FormItem>
                <FormLabel>Blood Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-white text-black">
                        {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map(bt => (
                            <SelectItem key={bt} value={bt}>{bt}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        )} />
        <FormField name="medicalConditions" control={form.control} render={({ field }) => (
            <FormItem>
                <FormLabel>Known Medical Conditions</FormLabel>
                <FormControl><Textarea placeholder="e.g. diabetes, allergies" {...field} /></FormControl>
                <FormMessage />
            </FormItem>
        )} />
        <FormField name="currentMedications" control={form.control} render={({ field }) => (
            <FormItem>
                <FormLabel>Current Medications</FormLabel>
                <FormControl><Textarea placeholder="e.g. insulin, aspirin" {...field} /></FormControl>
                <FormMessage />
            </FormItem>
        )} />
    </>
);

// Emergency Info
const EmergencyInfo = ({ form }) => (
    <>
        <FormField name="emergencyName" control={form.control} render={({ field }) => (
            <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl><Input placeholder="e.g. John Doe" {...field} /></FormControl>
                <FormMessage />
            </FormItem>
        )} />
        <FormField name="emergencyPhone" control={form.control} render={({ field }) => (
            <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl><Input placeholder="e.g. +123456789" {...field} /></FormControl>
                <FormMessage />
            </FormItem>
        )} />
    </>
);

export default AddPatient;
