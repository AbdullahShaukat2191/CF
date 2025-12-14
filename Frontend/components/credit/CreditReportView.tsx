import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CreditReportViewProps {
  creditData: any
}

export function CreditReportView({ creditData }: CreditReportViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Report Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="scores" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
            <TabsTrigger value="scores" className="text-xs sm:text-sm">Scores</TabsTrigger>
            <TabsTrigger value="accounts" className="text-xs sm:text-sm">Accounts</TabsTrigger>
            <TabsTrigger value="utilization" className="text-xs sm:text-sm">Utilization</TabsTrigger>
            <TabsTrigger value="inquiries" className="text-xs sm:text-sm">Inquiries</TabsTrigger>
          </TabsList>
          <TabsContent value="scores" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-gray-500">Experian</p>
                <p className="text-2xl font-bold">{creditData.score?.experian || "N/A"}</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-gray-500">Equifax</p>
                <p className="text-2xl font-bold">{creditData.score?.equifax || "N/A"}</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-gray-500">TransUnion</p>
                <p className="text-2xl font-bold">{creditData.score?.transunion || "N/A"}</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-gray-500">Summary</p>
                <p className="text-2xl font-bold">{creditData.score?.summary || "N/A"}</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="accounts" className="space-y-4 mt-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Open Accounts: {creditData.openAccounts || 0}</p>
              <p className="text-sm text-gray-500">Derogatories: {creditData.derogatories || 0}</p>
            </div>
          </TabsContent>
          <TabsContent value="utilization" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-500 mb-2">Overall Utilization</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${Math.min(creditData.utilization?.overall || 0, 100)}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-lg font-bold">
                    {creditData.utilization?.overall?.toFixed(1) || "0"}%
                  </span>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-500 mb-2">Revolving Utilization</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${Math.min(creditData.utilization?.revolving || 0, 100)}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-lg font-bold">
                    {creditData.utilization?.revolving?.toFixed(1) || "0"}%
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="inquiries" className="space-y-4 mt-4">
            <p className="text-sm text-gray-500">Inquiry information will be displayed here</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

