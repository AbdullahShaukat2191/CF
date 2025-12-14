"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PDFUpload } from "./PDFUpload"
import { api } from "@/lib/api"
import { CheckCircle } from "lucide-react"

interface CreditIntakeFormProps {
  clientId: string
  onSuccess?: () => void
}

export function CreditIntakeForm({ clientId, onSuccess }: CreditIntakeFormProps) {
  const [mode, setMode] = useState<"VENDOR_API" | "PDF">("VENDOR_API")
  const [formData, setFormData] = useState({
    ssn: "",
    dob: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSoftPull = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      await api.startCreditProcess(clientId, {
        mode: "VENDOR_API",
        vendor: "FAKE",
        input: formData,
      })
      setSuccess(true)
      onSuccess?.()
    } catch (err: any) {
      setError(err.message || "Failed to initiate credit pull")
    } finally {
      setLoading(false)
    }
  }

  const handlePDFUpload = async (file: File) => {
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      await api.uploadCreditReport(clientId, file)
      setSuccess(true)
      onSuccess?.()
    } catch (err: any) {
      setError(err.message || "Failed to upload credit report")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Intake</CardTitle>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Credit Report Initiated</h3>
            <p className="text-gray-600">
              Your credit report is being processed. This may take a few moments.
            </p>
          </div>
        ) : (
          <>
            {error && (
              <div className="rounded-md bg-error/10 p-3 text-sm text-error mb-4">
                {error}
              </div>
            )}
            <Tabs value={mode} onValueChange={(v) => setMode(v as any)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="VENDOR_API">API Soft Pull</TabsTrigger>
                <TabsTrigger value="PDF">PDF Upload</TabsTrigger>
              </TabsList>
              <TabsContent value="VENDOR_API" className="space-y-4 mt-4">
                <div className="rounded-md bg-blue-50 p-4 mb-4">
                  <p className="text-sm text-blue-900">
                    By proceeding, you authorize us to perform a soft credit pull. This will not
                    affect your credit score.
                  </p>
                </div>
                <form onSubmit={handleSoftPull} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ssn">SSN *</Label>
                    <Input
                      id="ssn"
                      placeholder="XXX-XX-XXXX"
                      value={formData.ssn}
                      onChange={(e) => setFormData({ ...formData, ssn: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth *</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Processing..." : "Initiate Soft Pull"}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="PDF" className="space-y-4 mt-4">
                <PDFUpload onUpload={handlePDFUpload} loading={loading} />
              </TabsContent>
            </Tabs>
          </>
        )}
      </CardContent>
    </Card>
  )
}

