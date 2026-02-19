export interface Conference {
  name: string;
  location: string;
  date: string;
  dateDetail: string;
  description: string;
  url: string;
  tags: string[];
  recurring: string;
  cfpStatus: string;
  cfpUrl?: string;
}

export interface Meetup {
  name: string;
  location: string;
  description: string;
  url: string;
  frequency: string;
}

export interface CfpTip {
  title: string;
  description: string;
}

export interface Speaker {
  name: string;
  slug?: string;
}

export interface Talk {
  title: string;
  description: string;
  level?: string;
  speaker: Speaker;
}

export interface EventData {
  slug: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
  venue: {
    name: string;
    address: string;
    city: string;
  };
  host: string;
  description: string;
  talks: Talk[];
}

export interface Event extends EventData {
  isPast: boolean;
}

export interface Developer {
  slug: string;
  name: string;
  role: string;
  location?: string;
  imageUrl: string;
  bio: string;
  xUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  expertise?: string[];
  availability?: string;
}
