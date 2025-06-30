export type Lang = 'ja' | 'en';

export type Dictionary = {
  top: {
    title: string,
    description: string,
    sprint_day: string,
    see_all: string,
    about_conference: string,
    sponsor_recruitment: string,
    speaker_recruitment: string,
    sponsor_registration: string,
    speaker_registration: string,
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
    ended: string,
    cfs: string,
    cfp: string,
    buy_ticket: string,
  },
  NavBar_About: {
    venue: string,
    coc: string,
    member: string,
    sponsor: string,
  },
  header: {
    venue: string,
  },
  footer: {
    contact_us: string,
    description: string,
    past_events: string,
  },
  members: {
    team: {
      chair: string,
      program: string,
      venue: string,
      pr: string,
      sponsor: string,
      attendee: string,
    },
    role: string,
    roles: {
      1: string,
      2: string,
      99: string,
    }
  },
  button: {
    buy_ticket: string,
  }
};