export type Menu = {
  key: MenuKey;
  href: string;
  isComingSoon?: boolean;
}

export type MenuKey = 'home' | 'about' | 'timetable' | 'speakers' | 'map' | 'sightseeing';