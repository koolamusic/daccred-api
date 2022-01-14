import * as React from 'react';

import { MobileSidebar } from '@/components/sidebar/MobileSidebar';
import { StaticSidebar } from '@/components/sidebar/StaticSidebar';

import { navigation, subnav } from '@/config/constants';

const AdminLayout: React.FC = ({ children }) => {
  return (
    <section className='h-full bg-gray-100'>
      <div className='min-h-full'>
        {/* ======= Embed Mobile version of Static Sidebar ============ */}
        <MobileSidebar options={{ navigation, teams: subnav }} />
        {/* ======= Embed Mobile version of Static Sidebar ============ */}

        {/* ======= Embed the Static Sidebar for Desktops ============ */}
        <StaticSidebar options={{ navigation, teams: subnav }} />
        {/* ======= Embed the Static Sidebar for Desktops ============ */}

        {/* Main column */}
        <div className='flex flex-col min-h-screen lg:pl-64'>
          {/* ----------------- Render React Children in this layout from here --------------- */}
          <main className='flex-1'>{children}</main>
          {/* ----------------- Render React Children in this layout from here --------------- */}
        </div>
      </div>
    </section>
  );
};

export default AdminLayout;
