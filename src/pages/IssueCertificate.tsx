import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from '@/components/LoadingSpinner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DigitalCertificatePreview from '@/components/DigitalCertificatePreview';
import { Download, Image as ImageIcon } from "lucide-react";
import { toPng } from 'html-to-image';
import axios from 'axios';

const DEFAULT_LOGO = "/placeholder.svg";

const IssueCertificate = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    course: '',
    dateIssued: '',
    recipientEmail: '',
    organization: ''
  });
  const [logoFile, setLogoFile] = useState(null);
  const [logoUrl, setLogoUrl] = useState(DEFAULT_LOGO);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const previewRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && files && files.length) {
      const file = files[0];
      setLogoFile(file);
      setLogoUrl(URL.createObjectURL(file));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
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
      formDataToSend.append('course', formData.course);
      formDataToSend.append('dateIssued', formData.dateIssued);
      formDataToSend.append('recipientEmail', formData.recipientEmail);
      formDataToSend.append('organization', formData.organization);
      if (logoFile) formDataToSend.append('logo', logoFile);

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
        course: '',
        dateIssued: '',
        recipientEmail: '',
        organization: ''
      });
      setLogoUrl(DEFAULT_LOGO);
      setLogoFile(null);
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

  const handleDownload = async () => {
    if (!previewRef.current) return;
    try {
      const dataUrl = await toPng(previewRef.current);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `certificate-${formData.studentName || "preview"}.png`;
      link.click();
      toast({
        title: "Downloaded",
        description: "Certificate image has been downloaded.",
      });
    } catch (e) {
      toast({
        title: "Error",
        description: "Failed to download the certificate image.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 px-4 container mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Issue Certificate</h1>
          <p className="text-muted-foreground">
            Create and store a new certificate on the blockchain
          </p>
        </div>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Certificate Details</CardTitle>
            <CardDescription>Fill in the information for the new certificate</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="organization">Organization Name</Label>
                <Input
                  id="organization"
                  name="organization"
                  placeholder="Enter organization name"
                  value={formData.organization}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>
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
                <Label htmlFor="logo" className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-primary" />
                  Organization Logo
                </Label>
                <Input
                  id="logo"
                  name="logo"
                  type="file"
                  accept="image/png, image/jpeg, image/svg+xml"
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <span className="text-xs text-muted-foreground">
                  Preferred: Square PNG/JPG/SVG, up to 1MB
                </span>
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
          <div className="flex flex-col items-center gap-4">
            <div ref={previewRef}>
              <DigitalCertificatePreview
                studentName={formData.studentName}
                course={formData.course}
                dateIssued={formData.dateIssued}
                recipientEmail={formData.recipientEmail}
                organization={formData.organization}
                logoUrl={logoUrl}
              />
            </div>
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={handleDownload}
              type="button"
            >
              <Download className="w-4 h-4" /> Download Certificate
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default IssueCertificate;