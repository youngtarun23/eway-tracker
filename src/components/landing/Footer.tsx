
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 border-t">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">TruckSathi</h3>
            <p className="text-muted-foreground">
              India's simplest truck tracking solution for truck owners
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#benefits" className="text-muted-foreground hover:text-primary">Benefits</a></li>
              <li><a href="#how-it-works" className="text-muted-foreground hover:text-primary">How It Works</a></li>
              <li><a href="#security" className="text-muted-foreground hover:text-primary">Security</a></li>
              <li><a href="#faq" className="text-muted-foreground hover:text-primary">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Security</h3>
            <ul className="space-y-2">
              <li><span className="text-muted-foreground">ISO 27001 Certified</span></li>
              <li><span className="text-muted-foreground">Role-Based Access Control</span></li>
              <li><span className="text-muted-foreground">Data Encryption</span></li>
              <li><span className="text-muted-foreground">ULIP Compliance</span></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-muted-foreground">support@trucksathi.com</p>
            <p className="text-muted-foreground">+91 98765 43210</p>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} TruckSathi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
