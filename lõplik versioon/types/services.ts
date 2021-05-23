export interface Service {
  service: string;
  url: string;
  platform: string;
  version: string;
  server: string;
  location: string;
  contact: string;
  client: string;
  comment?: string;
  notifications?: boolean;
}
