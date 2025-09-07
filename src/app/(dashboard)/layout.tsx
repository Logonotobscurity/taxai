'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/sidebar-nav';
import { Header } from '@/components/header';
import Link from 'next/link';
import { UserNav } from '@/components/user-nav';
import { ProtectedRoute } from '@/components/protected-route';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <Link href="/" className="flex items-center gap-2 p-2">
              <span className="text-lg font-bold text-primary">TaxComply AI</span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarNav />
          </SidebarContent>
          <SidebarFooter className='p-2'>
            {/* @ts-ignore */}
            <UserNav />
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <Header />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
