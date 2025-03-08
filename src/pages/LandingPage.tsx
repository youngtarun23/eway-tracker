
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Check, ExternalLink, Phone, Truck, MapPin, Bell, FileText, Fuel, BarChart3, Clock, Shield, Users, HelpCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWaitlistDialog, setShowWaitlistDialog] = useState(false);

  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You've been added to our waitlist. We'll be in touch soon!",
      });
      setIsSubmitting(false);
      setShowWaitlistDialog(false);
      // Clear form
      setEmail('');
      setPhoneNumber('');
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="text-2xl font-bold">eway-tracker</div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#benefits" className="text-sm font-medium hover:text-primary">Benefits</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary">How It Works</a>
            <a href="#faq" className="text-sm font-medium hover:text-primary">FAQ</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/login')}>Login</Button>
            <Button onClick={() => setShowWaitlistDialog(true)}>Join Waitlist</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Your Trucks, Your Control - <span className="text-primary">No Tech Knowledge Required</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Transform your trucking business with India's simplest tracking solution. Built on government's ULIP platform for reliability you can trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" onClick={() => setShowWaitlistDialog(true)}>
                Join Waitlist
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              "1000+ truck owners already on waitlist"
            </p>
          </div>
          <div className="relative h-[400px] bg-muted rounded-lg overflow-hidden shadow-xl">
            {/* This would be the hero image or mockup */}
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <Truck className="h-24 w-24" />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">The Daily Struggles of Truck Owners</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-subtle flex flex-col items-center text-center">
              <Phone className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">"Where is my driver?"</h3>
              <p className="text-muted-foreground">Countless calls to drivers</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-subtle flex flex-col items-center text-center">
              <BarChart3 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">40% Revenue Loss</h3>
              <p className="text-muted-foreground">From idle trucks</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-subtle flex flex-col items-center text-center">
              <Bell className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Real-time Updates</h3>
              <p className="text-muted-foreground">For customers</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-subtle flex flex-col items-center text-center">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Security Concerns</h3>
              <p className="text-muted-foreground">During night halts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Preview */}
      <section className="py-16 container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Solution Preview</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          A complete trucking management platform designed for owners, not tech experts.
        </p>
        
        <div className="relative h-[400px] bg-muted rounded-lg overflow-hidden shadow-xl mb-12">
          {/* This would be the tracking interface image */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
            <Truck className="h-24 w-24 mb-4" />
            <h3 className="text-xl font-semibold">Tracking Interface</h3>
            <ul className="mt-4 text-center">
              <li className="flex items-center justify-center gap-2 mb-2">
                <MapPin className="h-4 w-4" /> Live location on simple maps
              </li>
              <li className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-4 w-4" /> Driver status updates
              </li>
              <li className="flex items-center justify-center gap-2 mb-2">
                <FileText className="h-4 w-4" /> Delivery confirmations
              </li>
              <li className="flex items-center justify-center gap-2 mb-2">
                <Fuel className="h-4 w-4" /> Fuel monitoring
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-16 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-lg shadow-subtle">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <BarChart3 className="h-6 w-6 text-primary mr-2" />
                Save Money
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                  <span>Reduce empty returns by 30%</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                  <span>Cut fuel costs by 25%</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                  <span>Minimize unauthorized stops</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                  <span>Optimize route planning</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                  <span>Increase trips per month</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-background p-8 rounded-lg shadow-subtle">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Shield className="h-6 w-6 text-primary mr-2" />
                Better Control
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                  <span>Real-time truck location</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                  <span>Instant driver communication</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                  <span>Digital proof of delivery</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                  <span>Route deviation alerts</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                  <span>Theft prevention monitoring</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-background p-8 rounded-lg shadow-subtle">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Users className="h-6 w-6 text-primary mr-2" />
                Happy Customers
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                  <span>Live delivery updates</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                  <span>Accurate ETAs</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                  <span>Digital documentation</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                  <span>Professional service</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                  <span>Build trust</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Three Simple Steps
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-muted p-8 rounded-lg text-center">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-4">Register</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>Enter your mobile number</li>
              <li>Add truck details</li>
              <li>Download mobile app</li>
            </ul>
          </div>
          
          <div className="bg-muted p-8 rounded-lg text-center">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-4">Connect</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>Install tracking device OR use driver's phone</li>
              <li>Instant activation</li>
            </ul>
          </div>
          
          <div className="bg-muted p-8 rounded-lg text-center">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-4">Track</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>View all trucks live</li>
              <li>Get automated alerts</li>
              <li>Share live location</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ULIP Integration */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto">
          <div className="bg-background p-8 rounded-lg shadow-subtle max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Powered by ULIP</h2>
            <h3 className="text-center font-medium text-lg mb-6">ULIP Integration</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Government's Unified Logistics Interface Platform</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Secure & reliable infrastructure</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Pan-India coverage</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-4">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Official documentation support</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Integrated with FastTag & Vahan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 max-w-5xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <HelpCircle className="h-5 w-5 text-primary mr-2" />
              Cost & Pricing
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Q: How much does it cost?</h4>
                <ul className="text-muted-foreground space-y-1 pl-5 list-disc">
                  <li>Free trial for 30 days</li>
                  <li>Plans start at ₹299/truck/month</li>
                  <li>No long-term contracts</li>
                  <li>Pay monthly or yearly</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Q: Are there any hidden charges?</h4>
                <ul className="text-muted-foreground space-y-1 pl-5 list-disc">
                  <li>No setup fees</li>
                  <li>No hardware costs if using phone</li>
                  <li>Free updates & support</li>
                  <li>Transparent pricing</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <HelpCircle className="h-5 w-5 text-primary mr-2" />
              Technical Requirements
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Q: What do I need to start?</h4>
                <ul className="text-muted-foreground space-y-1 pl-5 list-disc">
                  <li>Android phone with internet OR basic GPS tracker</li>
                  <li>Valid truck registration</li>
                  <li>Owner's ID proof</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Q: Will it work in remote areas?</h4>
                <ul className="text-muted-foreground space-y-1 pl-5 list-disc">
                  <li>Works on basic internet</li>
                  <li>Offline data backup</li>
                  <li>Pan-India coverage</li>
                  <li>Multiple network support</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <HelpCircle className="h-5 w-5 text-primary mr-2" />
              System Integration
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Q: Can I export data to other systems?</h4>
                <ul className="text-muted-foreground space-y-1 pl-5 list-disc">
                  <li>Excel/PDF reports</li>
                  <li>API integration available</li>
                  <li>Email automation</li>
                  <li>WhatsApp integration</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Q: What about existing tracking devices?</h4>
                <ul className="text-muted-foreground space-y-1 pl-5 list-disc">
                  <li>Compatible with most GPS devices</li>
                  <li>Easy migration process</li>
                  <li>Data transfer support</li>
                  <li>No downtime</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <HelpCircle className="h-5 w-5 text-primary mr-2" />
              Privacy & Security
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Q: Is my data safe?</h4>
                <ul className="text-muted-foreground space-y-1 pl-5 list-disc">
                  <li>Government-grade security</li>
                  <li>End-to-end encryption</li>
                  <li>Private tracking links</li>
                  <li>Secure login system</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Q: Who can access my truck's data?</h4>
                <ul className="text-muted-foreground space-y-1 pl-5 list-disc">
                  <li>Only authorized users</li>
                  <li>Role-based access</li>
                  <li>Activity audit logs</li>
                  <li>Data deletion option</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <HelpCircle className="h-5 w-5 text-primary mr-2" />
              Ease of Use
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Q: Do I need technical knowledge?</h4>
                <ul className="text-muted-foreground space-y-1 pl-5 list-disc">
                  <li>No technical skills needed</li>
                  <li>Simple WhatsApp-like interface</li>
                  <li>24/7 phone support</li>
                  <li>Training provided</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <HelpCircle className="h-5 w-5 text-primary mr-2" />
              Getting Started
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Q: How long to get started?</h4>
                <ul className="text-muted-foreground space-y-1 pl-5 list-disc">
                  <li>5 minutes setup</li>
                  <li>Same day activation</li>
                  <li>Free onboarding support</li>
                  <li>Video tutorials available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Waitlist Now</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Limited time offer: First 100 users get 50% off for life
          </p>
          <Button size="lg" onClick={() => setShowWaitlistDialog(true)}>
            Join Waitlist
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">eway-tracker</h3>
              <p className="text-muted-foreground">
                India's simplest truck tracking solution for truck owners
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#benefits" className="text-muted-foreground hover:text-primary">Benefits</a></li>
                <li><a href="#how-it-works" className="text-muted-foreground hover:text-primary">How It Works</a></li>
                <li><a href="#faq" className="text-muted-foreground hover:text-primary">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-muted-foreground">support@eway-tracker.com</p>
              <p className="text-muted-foreground">+91 98765 43210</p>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground text-sm">
            <p>© {new Date().getFullYear()} eway-tracker. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Waitlist Dialog */}
      <Dialog open={showWaitlistDialog} onOpenChange={setShowWaitlistDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Join Our Waitlist</DialogTitle>
            <DialogDescription>
              Enter your details below to join our waitlist and be notified when we launch.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleJoinWaitlist}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="yourname@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="trucks">Number of Trucks</Label>
                <Input
                  id="trucks"
                  type="number"
                  placeholder="How many trucks do you own?"
                  min="1"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Join Waitlist"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LandingPage;
