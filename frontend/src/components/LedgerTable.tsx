import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import axios from "axios"
import { cn } from "@/lib/utils"

interface Transaction {
    id: number
    type: "CREDIT" | "DEBIT"
    amount: number
    payment_mode: string
    reference_number: string
    date: string
    notes: string
    credit_details?: {
        name: string
        towards: string
    }
    debit_details?: {
        purpose: string
    }
}

export function LedgerTable({ refreshTrigger }: { refreshTrigger: number }) {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchTransactions()
    }, [refreshTrigger])

    async function fetchTransactions() {
        setLoading(true)
        try {
            const res = await axios.get("http://localhost:8000/api/transactions")
            setTransactions(res.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <div>Loading...</div>

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Name / Purpose</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Payment Mode</TableHead>
                        <TableHead>Reference</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                No transactions found
                            </TableCell>
                        </TableRow>
                    ) : (
                        transactions.map((txn) => (
                            <TableRow key={txn.id}>
                                <TableCell>{txn.date}</TableCell>
                                <TableCell>
                                    <span
                                        className={cn(
                                            "font-bold",
                                            txn.type === "CREDIT" ? "text-green-600" : "text-red-600"
                                        )}
                                    >
                                        {txn.type}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {txn.type === "CREDIT"
                                        ? txn.credit_details?.name
                                        : txn.debit_details?.purpose}
                                </TableCell>
                                <TableCell>
                                    <span
                                        className={cn(
                                            "font-medium",
                                            txn.type === "CREDIT" ? "text-green-600" : "text-red-600"
                                        )}
                                    >
                                        {txn.type === "DEBIT" ? "-" : "+"}
                                        {txn.amount.toFixed(2)}
                                    </span>
                                </TableCell>
                                <TableCell>{txn.payment_mode}</TableCell>
                                <TableCell>{txn.reference_number || "-"}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
