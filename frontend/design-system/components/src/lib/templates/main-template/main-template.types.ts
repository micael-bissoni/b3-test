export interface NavigationItem {
  id: string;
  label: string;
  icon?: string;
  route?: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  avatarSrc: string | null;
}
