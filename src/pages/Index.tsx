
import { useState, useRef } from 'react';
import { useTruckData } from '@/hooks/useTruckData';
import { useTruckSearch } from '@/hooks/useTruckSearch';
import { useTruckFilters } from '@/hooks/useTruckFilters';
import { useCSVUpload } from '@/hooks/useCSVUpload';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CompanySidebar } from '@/components/CompanySidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { DashboardContent } from '@/components/DashboardContent';
import { ManageAccessFlow } from '@/components/ManageAccessFlow';
import { TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { generateCSVTemplate } from '@/utils/CSVUtils';

const ITEMS_PER_PAGE = 5;

const Index = () => {
  const { trucks, summary, addTruck, importTrucksFromCSV } = useTruckData();
  const { searchQuery, setSearchQuery, filteredTrucks: searchedTrucks } = useTruckSearch(trucks);
  const { 
    statusFilter, 
    setStatusFilter, 
    startDate, 
    setStartDate, 
    endDate, 
    setEndDate, 
    sortBy,
    setSortBy,
    filteredTrucks 
  } = useTruckFilters(searchedTrucks);
  const { isLoading, handleFileUpload } = useCSVUpload(importTrucksFromCSV);
  const [companyName, setCompanyName] = useState("Transport Co.");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('dashboard');
  const csvTemplateUrl = generateCSVTemplate();

  const totalPages = Math.ceil(filteredTrucks.length / ITEMS_PER_PAGE);
  const paginatedTrucks = filteredTrucks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-secondary/30">
        <CompanySidebar companyName={companyName} />

        <div className="flex-1">
          <div className="container py-8 space-y-8 max-w-6xl">
            <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <TabsContent value="dashboard">
              <DashboardContent
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                sortBy={sortBy}
                setSortBy={setSortBy}
                filteredTrucks={filteredTrucks}
                paginatedTrucks={paginatedTrucks}
                summary={summary}
                currentPage={currentPage}
                totalPages={totalPages}
                goToPage={goToPage}
                isLoading={isLoading}
                handleFileUpload={handleFileUpload}
                addTruck={addTruck}
                csvTemplateUrl={csvTemplateUrl}
                trucks={trucks}
              />
            </TabsContent>
            
            <TabsContent value="manage-access" className="mt-0">
              <ManageAccessFlow />
            </TabsContent>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
