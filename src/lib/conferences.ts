import cfpTipsData from '@/data/cfp-tips.json';
import conferencesData from '@/data/conferences.json';
import meetupsData from '@/data/meetups.json';
import { CfpTip, Conference, Meetup } from '@/data/types';

export type { CfpTip, Conference, Meetup };

export function getAllConferences(): Conference[] {
  return conferencesData as Conference[];
}

export function getAllMeetups(): Meetup[] {
  return meetupsData as Meetup[];
}

export function getCfpTips(): CfpTip[] {
  return cfpTipsData as CfpTip[];
}
