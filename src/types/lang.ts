export type Lang = 'ja' | 'en';

export type Dictionary = {
  top: {
    title: string,
    description: string,
  },
  menu: {
    home: string,
    about: string,
    timetable: string,
    speakers: string,
    map: string,
    venue: string,
    coc: string,
    members: string,
    sponsors: string,
    coming_soon: string,
  },
  NavBar_About: {
    venue: string,
    coc: string,
    member: string,
    sponsor: string,
  },
  footer: {
    contact_us: string,
    description: string,
    past_events: string,
  }
};