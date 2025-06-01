import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative hero-gradient py-24 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold gradient-heading">
                Verify Certificates Instantly with Blockchain
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Secure, tamper-proof verification of academic and professional achievements with blockchain technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" asChild>
                  <Link to="/verify">Verify Certificate</Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute left-1/4 top-1/4 h-32 w-32 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute right-1/4 bottom-1/4 h-32 w-32 bg-secondary/5 rounded-full blur-3xl"></div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
              <p className="text-muted-foreground">
                Our platform provides a comprehensive solution for certificate verification and issuance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                title="Instant Verification" 
                description="Verify certificates in seconds with our blockchain-based system."
              />
              <FeatureCard 
                title="Tamper-Proof" 
                description="Once issued, certificates cannot be altered or falsified."
              />
              <FeatureCard 
                title="Easy Integration" 
                description="Seamlessly integrate with existing systems via our API."
              />
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground">
                Our blockchain certificate verification system ensures security and authenticity at every step.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
              <StepCard 
                step={1} 
                title="Issue Certificate" 
                description="Create and issue certificates that are instantly stored on the blockchain."
              />
              <StepCard 
                step={2} 
                title="Generate Hash" 
                description="A unique hash is generated for each certificate ensuring authenticity."
              />
              <StepCard 
                step={3} 
                title="Verify Anytime" 
                description="Anyone can verify the certificate's authenticity using the hash."
              />
            </div>
          </div>
        </section>
        
    
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground">
                Join thousands of organizations already using CertiChain for secure certificate verification.
              </p>
              <Button size="lg" asChild>
                <Link to="/signup">Sign Up Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

const FeatureCard = ({ title, description }: { title: string; description: string }) => (
  <Card className="card-hover">
    <CardHeader className="pb-2">
      <CardTitle className="text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const StepCard = ({ step, title, description }: { step: number; title: string; description: string }) => (
  <div className="text-center">
    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
      <span className="text-primary font-bold">{step}</span>
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const TestimonialCard = ({ quote, author, role }: { quote: string; author: string; role: string }) => (
  <Card className="card-hover">
    <CardContent className="pt-6">
      <blockquote className="relative">
        <p className="text-muted-foreground mb-4 italic">"{quote}"</p>
        <footer>
          <div className="font-medium">{author}</div>
          <div className="text-sm text-muted-foreground">{role}</div>
        </footer>
      </blockquote>
    </CardContent>
  </Card>
);

export default Index;
