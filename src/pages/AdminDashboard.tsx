import React from 'react';
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AdminDashboard = () => {
  const { data: certificates, isLoading, error } = useQuery({
    queryKey: ['certificates'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://cert-verification-backend-ny9g.onrender.com/certificates', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Issued Certificates</CardTitle>
          <CardDescription>List of all certificates issued through the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of issued certificates</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Certificate ID</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Date Issued</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certificates.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell>{cert.id}</TableCell>
                  <TableCell>{cert.student_name}</TableCell>
                  <TableCell>{cert.recipient_email}</TableCell>
                  <TableCell>{cert.course}</TableCell>
                  <TableCell>{cert.organization}</TableCell>
                  <TableCell>{cert.date_issued}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6}>Total Certificates: {certificates.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;