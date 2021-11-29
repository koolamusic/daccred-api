import * as React from 'react';

interface QuickActionNavProps {
  name: string;
  href: string;
  bgColorClass: string;
}
interface DashboardNavProps {
  name: string;
  href: string;
  icon: JSX.Element | React.ReactNode | React.ReactSVGElement; // JSX.Element React.SVGProps<SVGSVGElement>
  current: boolean;
}

type NavOpts = {
  navigation: DashboardNavProps[];
  teams: QuickActionNavProps[];
};

export interface LayoutNavProps {
  options: NavOpts;
}
