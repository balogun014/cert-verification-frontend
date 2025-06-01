import React, { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from '@/components/LoadingSpinner';
import DigitalCertificatePreview from '@/components/DigitalCertificatePreview';
import axios from 'axios';

const DashboardIssue = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    matricNumber:'',
    course: '',
    dateIssued: '',
    recipientEmail: '',
    organization: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) {
        toast({
          title: "Error",
          description: `Please fill in the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
          variant: "destructive"
        });
        return;
      }
    }
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      formDataToSend.append('studentName', formData.studentName);
      formDataToSend.append('matricNumber', formData.matricNumber);
      formDataToSend.append('course', formData.course);
      formDataToSend.append('dateIssued', formData.dateIssued);
      formDataToSend.append('recipientEmail', formData.recipientEmail);
      formDataToSend.append('organization', formData.organization);

      const res = await axios.post('https://cert-verification-backend-ny9g.onrender.com/issue', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Issue response:', res.data); // Debug
      toast({
        title: "Certificate Issued",
        description: `Certificate created with ID: ${res.data.certificateId}`,
      });
      setFormData({
        studentName: '',
        matricNumber:'',
        course: '',
        dateIssued: '',
        recipientEmail: '',
        organization: ''
      });
    } catch (error) {
      console.error('Issue error:', error.response?.data || error.message); // Debug
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to issue certificate.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader title="Issue Certificate" />
      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Certificate Details</CardTitle>
              <CardDescription>Fill in the information for the new certificate</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="studentName">Student Name</Label>
                  <Input
                    id="studentName"
                    name="studentName"
                    placeholder="Enter student's full name"
                    value={formData.studentName}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="studentName">Matric Number</Label>
                  <Input
                    id="matricNumber"
                    name="matricNumber"
                    placeholder="Enter student's Matric Number"
                    value={formData.matricNumber}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Input
                    id="course"
                    name="course"
                    placeholder="Enter course or program name"
                    value={formData.course}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateIssued">Date Issued</Label>
                  <Input
                    id="dateIssued"
                    name="dateIssued"
                    type="date"
                    value={formData.dateIssued}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipientEmail">Recipient Email</Label>
                  <Input
                    id="recipientEmail"
                    name="recipientEmail"
                    type="email"
                    placeholder="Enter recipient's email address"
                    value={formData.recipientEmail}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    name="organization"
                    placeholder="Enter organization name"
                    value={formData.organization}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
                  {isLoading ? "Issuing Certificate..." : "Issue Certificate"}
                </Button>
              </CardFooter>
            </form>
          </Card>
          <div className="mt-10">
            <h2 className="text-lg font-semibold mb-4 text-center text-muted-foreground">
              Certificate Preview
            </h2>
            <DigitalCertificatePreview
              studentName={formData.studentName}
              course={formData.course}
              dateIssued={formData.dateIssued}
              recipientEmail={formData.recipientEmail}
              organization={formData.organization}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardIssue;