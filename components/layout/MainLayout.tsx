import Sidebar from './Sidebar';
import Header from './Header';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface MainLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  title?: string;
}

export default function MainLayout({ children, breadcrumbs, title }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFB]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header breadcrumbs={breadcrumbs} title={title} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
