
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { Button } from "./button";
import { Separator } from "./separator";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

// Sidebar context
const SidebarContext = React.createContext<{
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

function SidebarProvider({ 
  children, 
  defaultCollapsed = false 
}: { 
  children: React.ReactNode; 
  defaultCollapsed?: boolean;
}) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

function SidebarTrigger() {
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={() => setCollapsed(!collapsed)}
      className="md:hidden"
    >
      <Menu />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  );
}

// Sidebar component
function Sidebar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { collapsed } = useSidebar();

  return (
    <div
      className={cn(
        "hidden md:block h-screen border-r bg-background shadow-sm transition-all duration-300",
        collapsed ? "w-0 opacity-0" : "w-64 opacity-100",
        className
      )}
      {...props}
    />
  );
}

// Mobile Sidebar component
function MobileSidebar({ 
  className, 
  children, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <Collapsible
      open={!collapsed}
      onOpenChange={(open) => setCollapsed(!open)}
      className={cn("md:hidden", className)}
      {...props}
    >
      <CollapsibleTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="data-[state=open]:animate-slide-in-left">
        <div className="h-[calc(100vh-4rem)] w-64 border-r bg-background shadow-md">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

// Sidebar header
function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("py-4", className)} {...props} />;
}

// Sidebar content
function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 overflow-auto", className)} {...props} />;
}

// Sidebar footer
function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mt-auto border-t py-4", className)} {...props} />
  );
}

// Sidebar section
function SidebarSection({ 
  title, 
  children, 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement> & { title?: string }) {
  return (
    <div className={cn("py-2", className)} {...props}>
      {title && (
        <h3 className="mb-2 px-4 text-sm font-semibold text-muted-foreground">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

// Sidebar menu
function SidebarMenu({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("space-y-1 px-2", className)} {...props} />;
}

// Sidebar menu item
function SidebarMenuItem({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn("", className)} {...props} />;
}

// Sidebar menu button
const sidebarMenuButtonVariants = cva(
  "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "hover:bg-accent hover:text-accent-foreground",
        active: "bg-accent text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean;
}

const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button";
    return (
      <Comp
        ref={ref}
        className={cn(sidebarMenuButtonVariants({ variant, className }))}
        {...props}
      />
    );
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";

export {
  SidebarProvider,
  useSidebar,
  SidebarTrigger,
  Sidebar,
  MobileSidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarSection,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
};
