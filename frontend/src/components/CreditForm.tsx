import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import axios from "axios"
import { useState } from "react"

const formSchema = z.object({
    name_or_purpose: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    amount: z.coerce.number().min(1, {
        message: "Amount must be at least 1.",
    }),
    towards: z.string().min(1, {
        message: "Please select a value.",
    }),
    payment_mode: z.enum(["CASH", "CHEQUE"]),
    reference_no: z.string().min(1, {
        message: "Receipt No is required.",
    }),
})

type FormData = z.infer<typeof formSchema>

export function CreditForm({ onSuccess }: { onSuccess: () => void }) {
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name_or_purpose: "",
            amount: 0,
            towards: "Sasthapreethi",
            payment_mode: "CASH",
            reference_no: "",
        },
    })

    async function onSubmit(values: FormData) {
        setLoading(true)
        setSuccessMessage("")
        try {
            await axios.post("http://localhost:8000/api/credit", values)
            form.reset()
            setSuccessMessage("✔ Credit entry saved successfully")
            onSuccess()
        } catch (error) {
            console.error(error)
            setSuccessMessage("")
            alert("Failed to submit")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">CREDIT ENTRY</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name_or_purpose"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter name" {...field} className="text-lg p-6" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        className="text-lg p-6"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="towards"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Towards</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="text-lg p-6">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Sasthapreethi">Sasthapreethi</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="payment_mode"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Payment Mode</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        className="flex space-x-6"
                                    >
                                        <FormItem className="flex items-center space-x-2 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="CASH" />
                                            </FormControl>
                                            <FormLabel className="font-normal text-lg">Cash</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-2 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="CHEQUE" />
                                            </FormControl>
                                            <FormLabel className="font-normal text-lg">Cheque</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="reference_no"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Receipt No</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter receipt number" {...field} className="text-lg p-6" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={loading} className="w-full text-lg py-6">
                        Submit Credit
                    </Button>
                    {successMessage && (
                        <p className="text-green-600 font-medium text-center">{successMessage}</p>
                    )}
                </form>
            </Form>
        </div>
    )
}
