export type Ticket = {
  id: string;
  title: string;
  body: string;
  priority: 'low' | 'medium' | 'high';
  user_email: string;
};
