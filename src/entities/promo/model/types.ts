export interface PromoCampaign {
  id: string;
  title: string;
  description: string;
  badge?: string;
  active: boolean;
  startsAt: string;
  endsAt: string;
}
