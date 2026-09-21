export interface NavItem {
  label: string;
  icon: string;
  to: string;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}
