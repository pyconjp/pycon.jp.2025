import {Menu} from "@/types/menu";

export const menu: Menu[] = [
  {
    'key': 'home',
    'href': '/',
  },
  {
    'key': 'about',
    'href': '/venue',
  },
  {
    'key': 'timetable',
    'href': '/timetable',
    'isComingSoon': true,
  },
  {
    'key': 'speakers',
    'href': '/speakers/practice',
  },
  {
    'key': 'map',
    'href': '/map',
    'isComingSoon': true,
  }
];

export const footerMenu: { key: 'cfp' | 'cfs' | 'buy_ticket', href: string, isClosed?: boolean }[] = [
  {
    'key': 'cfp',
    'href': 'https://pretalx.com/pycon-jp-2025/cfp',
    'isClosed': true,
  },
  {
    'key': 'cfs',
    'href': 'https://docs.google.com/forms/d/e/1FAIpQLSfCVLHY3zMR1z7YGy8aRyJiSa64pnVpById6UjNDiwD5K0VmQ/viewform',
  },
  {
    'key': 'buy_ticket',
    'href': 'https://pyconjp.connpass.com/event/359523/',
  },
]
