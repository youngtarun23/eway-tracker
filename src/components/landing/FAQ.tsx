
import React from 'react';
import { HelpCircle } from 'lucide-react';

const FAQ = () => {
  return (
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
                <li>ISO 27001 certified security</li>
                <li>End-to-end encryption</li>
                <li>Private tracking links</li>
                <li>Secure login system</li>
                <li>Regular security audits</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Q: Who can access my truck's data?</h4>
              <ul className="text-muted-foreground space-y-1 pl-5 list-disc">
                <li>Only authorized users with proper permissions</li>
                <li>Role-based access control system</li>
                <li>Detailed activity audit logs</li>
                <li>Data deletion option</li>
                <li>Granular permission settings</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Q: How do role-based permissions work?</h4>
              <ul className="text-muted-foreground space-y-1 pl-5 list-disc">
                <li>Create custom roles for different team members</li>
                <li>Control access to sensitive information</li>
                <li>Limit actions based on responsibility</li>
                <li>Client-specific restricted views available</li>
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
  );
};

export default FAQ;
