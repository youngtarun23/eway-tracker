
import React from 'react';
import { Check, Lock, UserCheck } from 'lucide-react';

const Security = () => {
  return (
    <section id="security" className="py-16 container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Enterprise-Grade Security</h2>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
        We take your data security seriously with industry-leading standards and practices
      </p>
      
      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="bg-muted p-8 rounded-lg">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <Lock className="h-6 w-6 text-primary mr-2" />
            ISO Certified Security
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-success mr-3 mt-0.5" />
              <div>
                <p className="font-medium">ISO 27001 Compliance</p>
                <p className="text-muted-foreground text-sm">Internationally recognized standard for information security management</p>
              </div>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-success mr-3 mt-0.5" />
              <div>
                <p className="font-medium">ISO 27017 & 27018</p>
                <p className="text-muted-foreground text-sm">Cloud service security and protection of personally identifiable information (PII)</p>
              </div>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-success mr-3 mt-0.5" />
              <div>
                <p className="font-medium">Regular Security Audits</p>
                <p className="text-muted-foreground text-sm">Independent third-party security assessments</p>
              </div>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-success mr-3 mt-0.5" />
              <div>
                <p className="font-medium">Advanced Encryption</p>
                <p className="text-muted-foreground text-sm">AES-256 bit encryption for data at rest and TLS for data in transit</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="bg-muted p-8 rounded-lg">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <UserCheck className="h-6 w-6 text-primary mr-2" />
            Role-Based Access Control
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-success mr-3 mt-0.5" />
              <div>
                <p className="font-medium">Granular Permission Settings</p>
                <p className="text-muted-foreground text-sm">Control exactly what each user can see and do within your account</p>
              </div>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-success mr-3 mt-0.5" />
              <div>
                <p className="font-medium">Custom User Roles</p>
                <p className="text-muted-foreground text-sm">Create custom roles for fleet managers, dispatchers, finance team, and clients</p>
              </div>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-success mr-3 mt-0.5" />
              <div>
                <p className="font-medium">Multi-Factor Authentication</p>
                <p className="text-muted-foreground text-sm">Additional security layer for sensitive operations</p>
              </div>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-success mr-3 mt-0.5" />
              <div>
                <p className="font-medium">Detailed Access Logs</p>
                <p className="text-muted-foreground text-sm">Comprehensive audit trails of all user actions</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Security;
