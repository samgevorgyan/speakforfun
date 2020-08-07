export interface AssortmentsInterface {
  title: {
    am: string;
    en: string;
  };
  description: {
    am: string;
    en: string;
  };
  price: string;
  urls: Array<{ main: boolean; url: string }>;
}
