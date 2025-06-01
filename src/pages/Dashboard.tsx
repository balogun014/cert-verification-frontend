import React, { useState, useEffect } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminDashboard from './AdminDashboard';
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from '@/components/LoadingSpinner';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState([
    { label: "Total Certificates", value: "0", change: "0%" },
    { label: "Certificates Verified", value: "0", change: "0%" },
    { label: "Active Users", value: "0", change: "0%" },
    { label: "Recent Issues", value: "0", change: "0%" }
  ]);
  const [recentCertificates, setRecentCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token'); 
        if (!token) {
          throw new Error('No authentication token found');
        }

        // Fetch certificates
        const certResponse = await axios.get('https://cert-verification-backend-ny9g.onrender.com/certificates', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const certificates = certResponse.data;

        // Fetch users (admin-only)
        let users = [];
        try {
          const userResponse = await axios.get('https://cert-verification-backend-ny9g.onrender.com/users', {
            headers: { Authorization: `Bearer ${token}` }
          });
          users = userResponse.data;
        } catch (userError) {
          console.warn('Failed to fetch users (non-admin?):', userError.response?.data || userError.message);
        }

        // Compute stats
        const totalCertificates = certificates.length;
        const verifiedCertificates = certificates.filter(cert => cert.is_valid).length;
        const activeUsers = users.length;
        const recentIssues = certificates.filter(cert => {
          const issuedDate = new Date(cert.date_issued);
          const oneMonthAgo = new Date();
          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
          return issuedDate >= oneMonthAgo;
        }).length;

        setStats([
          { label: "Total Certificates", value: totalCertificates.toString(), change: "+0%" }, 
          { label: "Certificates Verified", value: verifiedCertificates.toString(), change: "+0%" },
          { label: "Active Users", value: activeUsers.toString(), change: "+0%" },
          { label: "Recent Issues", value: recentIssues.toString(), change: "+0%" }
        ]);

        // Get recent certificates (last 4, sorted by date_issued)
        const sortedCertificates = certificates
          .sort((a, b) => new Date(b.date_issued) - new Date(a.date_issued))
          .slice(0, 4)
          .map(cert => ({
            id: cert.id,
            student: cert.student_name,
            course: cert.course,
            date: new Date(cert.date_issued).toISOString().split('T')[0]
          }));
        setRecentCertificates(sortedCertificates);

      } catch (error) {
        console.error('Dashboard fetch error:', error.response?.data || error.message);
        toast({
          title: "Error",
          description: error.response?.data?.error || "Failed to load dashboard data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader title="Dashboard" />
      
      <main className="flex-1 p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline justify-between">
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-xs font-medium text-green-500">{stat.change}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Certificates</CardTitle>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/AdminDashboard">View All</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="min-w-full divide-y divide-border">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Certificate ID
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Student
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                            Course
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-card divide-y divide-border">
                        {recentCertificates.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="px-4 py-3 text-sm text-center">
                              No certificates found
                            </td>
                          </tr>
                        ) : (
                          recentCertificates.map((cert, index) => (
                            <tr key={index} className="hover:bg-muted/30 transition-colors">
                              <td className="px-4 py-3 text-sm whitespace-nowrap font-medium text-primary">
                                {cert.id.substring(0, 12)}...
                              </td>
                              <td className="px-4 py-3 text-sm whitespace-nowrap">
                                {cert.student}
                              </td>
                              <td className="px-4 py-3 text-sm whitespace-nowrap hidden md:table-cell">
                                {cert.course}
                              </td>
                              <td className="px-4 py-3 text-sm whitespace-nowrap">
                                {cert.date}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <Button className="h-auto py-4 flex flex-col" asChild>
                        <Link to="/dashboard/issue">
                          <span className="text-sm">Issue Certificate</span>
                        </Link>
                      </Button>
                      <Button className="h-auto py-4 flex flex-col" variant="outline" asChild>
                        <Link to="/dashboard/verify">
                          <span className="text-sm">Verify Certificate</span>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
              
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;