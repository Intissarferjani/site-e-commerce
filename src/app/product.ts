
export interface Product {


imageUrl: any;
  id?: string | null;
  name: string;
  image?: string; // Rendre 'image' facultative en ajoutant '?'
  description: string;
  price: number;
  quantity: number;
  category: string;
  
 
}
