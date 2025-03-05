
import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CompanySidebar } from '@/components/CompanySidebar';
import Dashboard from '@/components/dashboard/Dashboard';
import { AnalyticsPlaceholder } from '@/components/analytics/AnalyticsPlaceholder';
import { CompanyProfilePlaceholder } from '@/components/profile/CompanyProfilePlaceholder';
import { SettingsPlaceholder } from '@/components/settings/SettingsPlaceholder';
import { ManageAccessFlow } from '@/components/ManageAccessFlow';

const Index = () => {
  const [companyName, setCompanyName] = useState("Transport Co.");
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-secondary/30">
        <CompanySidebar 
          companyName={companyName} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        <div className="flex-1">
          <div className="container py-8 space-y-8 max-w-6xl">
            <header className="mb-6">
              <h1 className="text-2xl font-semibold">Truck Tracking Dashboard</h1>
            </header>
            
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'analytics' && <AnalyticsPlaceholder />}
            {activeTab === 'profile' && <CompanyProfilePlaceholder />}
            {activeTab === 'manage-access' && <ManageAccessFlow />}
            {activeTab === 'settings' && <SettingsPlaceholder />}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
