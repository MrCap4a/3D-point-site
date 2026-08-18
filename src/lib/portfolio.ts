export type PortfolioCaseData = {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string | null;
  images: { id: string }[];
};
