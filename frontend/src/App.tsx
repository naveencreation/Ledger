import { useState } from "react"
import { CreditForm } from "./components/CreditForm"
import { DebitForm } from "./components/DebitForm"
import { BalanceView } from "./components/BalanceView"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function App() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Ledger App</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow">
          <Tabs defaultValue="credit" className="w-full">
            <TabsList className="w-full grid grid-cols-3 h-12">
              <TabsTrigger value="credit" className="text-lg">Credit Entry</TabsTrigger>
              <TabsTrigger value="debit" className="text-lg">Debit Entry</TabsTrigger>
              <TabsTrigger value="balance" className="text-lg">Balance</TabsTrigger>
            </TabsList>
            <TabsContent value="credit" className="mt-0">
              <CreditForm onSuccess={handleSuccess} />
            </TabsContent>
            <TabsContent value="debit" className="mt-0">
              <DebitForm onSuccess={handleSuccess} />
            </TabsContent>
            <TabsContent value="balance" className="mt-0">
              <BalanceView refreshTrigger={refreshKey} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

export default App
