import React, { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from '@/components/LoadingSpinner';
import { Check, X } from 'lucide-react';
import axios from 'axios';

const DashboardVerify = () => {
  const [hash, setHash] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!hash) {
      toast({
        title: "Error",
        description: "Please enter a certificate hash",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    setResult(null);
    try {
      const res = await axios.post('https://cert-verification-backend-ny9g.onrender.com/verify', 
        { certificateHash: hash }
      );
      console.log('Verify response:', res.data); // Debug
      setResult({
        isValid: res.data.isValid,
        certificateData: {
          id: res.data.id,
          studentName: res.data.metadata.studentName,
          matricNumber:res.data.metadata.matricNumber,
          course: res.data.metadata.course,
          issueDate: res.data.metadata.dateIssued,
          issuer: res.data.metadata.organization
        }
      });
      toast({
        title: res.data.isValid ? "Verification Successful" : "Verification Failed",
        description: res.data.isValid ? "Certificate verified successfully" : "Certificate not found or invalid",
        variant: res.data.isValid ? "default" : "destructive"
      });
    } catch (error) {
      console.error('Verify error:', error.response?.data || error.message); // Debug
      setResult({
        isValid: false,
        error: error.response?.data?.error || "Failed to verify certificate"
      });
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to verify certificate",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader title="Verify Certificate" />
      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Certificate Verification</CardTitle>
              <CardDescription>Enter the certificate hash to verify its authenticity</CardDescription>
            </CardHeader>
            <form onSubmit={handleVerify}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hash">Certificate Hash</Label>
                  <Input
                    id="hash"
                    placeholder="Enter certificate hash"
                    value={hash}
                    onChange={(e) => setHash(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
                  {isLoading ? "Verifying..." : "Verify Certificate"}
                </Button>
              </CardFooter>
            </form>
          </Card>
          {result && (
            <Card className={`mt-8 border-2 ${result.isValid ? 'border-green-500' : 'border-red-500'}`}>
              <CardHeader className="flex flex-row items-center gap-4">
                {result.isValid ? (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <X className="h-6 w-6 text-red-600" />
                  </div>
                )}
                <div>
                  <CardTitle>
                    {result.isValid ? "Certificate is Valid" : "Certificate is Invalid"}
                  </CardTitle>
                  <CardDescription>
                    {result.isValid ? "This certificate has been verified on the blockchain" : result.error}
                  </CardDescription>
                </div>
              </CardHeader>
              {result.isValid && result.certificateData && (
                <CardContent>
                  <div className="rounded-md border p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs">Certificate ID</Label>
                        <p className="font-medium">{result.certificateData.id}</p>
                      </div> <br />
                      <div>
                        <Label className="text-xs">Issue Date</Label>
                        <p className="font-medium">{result.certificateData.issueDate}</p>
                      </div>
                      <div>
                        <Label className="text-xs">Student Name</Label>
                        <p className="font-medium">{result.certificateData.studentName}</p>
                      </div>
                       <div>
                        <Label className="text-xs">Matric Number</Label>
                        <p className="font-medium">{result.certificateData.matricNumber}</p>
                      </div>
                      <div>
                        <Label className="text-xs">Course</Label>
                        <p className="font-medium">{result.certificateData.course}</p>
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-xs">Issuer</Label>
                        <p className="font-medium">{result.certificateData.issuer}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardVerify;