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
    transaction_type: "CREDIT" | "DEBIT"
    name_or_purpose: string
    amount: number
    payment_mode: string
    reference_no: string
    created_at: string
}

interface BalanceSummary {
    total_credit: number
    total_debit: number
    balance: number
}

export function BalanceView({ refreshTrigger }: { refreshTrigger: number }) {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [balanceSummary, setBalanceSummary] = useState<BalanceSummary | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [refreshTrigger])

    async function fetchData() {
        setLoading(true)
        try {
            const [txnRes, balRes] = await Promise.all([
                axios.get("http://localhost:8000/api/transactions"),
                axios.get("http://localhost:8000/api/balance"),
            ])
            setTransactions(txnRes.data)
            setBalanceSummary(balRes.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <div className="p-6">Loading...</div>

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">BALANCE SUMMARY</h2>

            {balanceSummary && (
                <div className="mb-8 bg-gray-50 p-6 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-lg">
                        <div>Total Credit</div>
                        <div className="text-right text-green-600 font-semibold">
                            ₹ {balanceSummary.total_credit.toFixed(2)}
                        </div>
                        <div>Total Debit</div>
                        <div className="text-right text-red-600 font-semibold">
                            ₹ {balanceSummary.total_debit.toFixed(2)}
                        </div>
                        <div className="border-t pt-2 font-bold">Balance</div>
                        <div
                            className={cn(
                                "border-t pt-2 text-right font-bold",
                                balanceSummary.balance >= 0 ? "text-green-600" : "text-red-600"
                            )}
                        >
                            ₹ {balanceSummary.balance.toFixed(2)}
                        </div>
                    </div>
                </div>
            )}

            <h3 className="text-xl font-bold mb-4">TRANSACTION HISTORY</h3>

            <div className="rounded-md border overflow-auto max-h-96">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Name / Purpose</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Mode</TableHead>
                            <TableHead>Ref</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8">
                                    No transactions found
                                </TableCell>
                            </TableRow>
                        ) : (
                            transactions.map((txn) => (
                                <TableRow key={txn.id}>
                                    <TableCell>
                                        {new Date(txn.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={cn(
                                                "font-bold",
                                                txn.transaction_type === "CREDIT"
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            )}
                                        >
                                            {txn.transaction_type === "CREDIT" ? "CR" : "DR"}
                                        </span>
                                    </TableCell>
                                    <TableCell>{txn.name_or_purpose}</TableCell>
                                    <TableCell>
                                        <span
                                            className={cn(
                                                "font-medium",
                                                txn.transaction_type === "CREDIT"
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            )}
                                        >
                                            {txn.amount.toFixed(2)}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {txn.payment_mode === "CHEQUE" ? "Chq" : "Cash"}
                                    </TableCell>
                                    <TableCell>{txn.reference_no}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
