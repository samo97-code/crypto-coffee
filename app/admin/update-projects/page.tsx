"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function UpdateProjectsPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

    const handleUpdateProjects = async () => {
        setIsLoading(true)
        setResult(null)

        try {
            const response = await fetch("/api/update-projects")
            const data = await response.json()

            setResult({
                success: data.success,
                message: data.success ? data.message : data.error || "An error occurred",
            })
        } catch (error) {
            setResult({
                success: false,
                message: error instanceof Error ? error.message : "An error occurred",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container mx-auto py-10">
            <Card className="max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Update Projects</CardTitle>
                    <CardDescription>Update the projects table with new fields and data from the projects array.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-500 mb-4">
                        This will update all projects with the latest information, including chain IDs, explorer URLs, and chain
                        keys.
                    </p>

                    {result && (
                        <Alert className={result.success ? "bg-green-50" : "bg-red-50"}>
                            {result.success ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                                <AlertCircle className="h-4 w-4 text-red-600" />
                            )}
                            <AlertTitle>{result.success ? "Success" : "Error"}</AlertTitle>
                            <AlertDescription>{result.message}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
                <CardFooter>
                    <Button onClick={handleUpdateProjects} disabled={isLoading} className="w-full">
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                            </>
                        ) : (
                            "Update Projects"
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
