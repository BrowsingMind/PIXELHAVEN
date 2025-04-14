
export interface Artwork {
  id: string;
  title: string;
  artist: string;
  price: number;
  description: string;
  imageUrl: string;
  dimensions: string; // e.g., "32x32px"
  category: string;
  tags: string[];
  createdAt: string;
}

export interface CartItem {
  artwork: Artwork;
  quantity: number;
}

export interface WishlistItem {
  artwork: Artwork;
  addedAt: string;
}

export interface Purchase {
  items: CartItem[];
  total: number;
  purchaseDate: string;
  orderId: string;
}

export interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  email: string;
  wishlist: WishlistItem[];
  purchases: Purchase[];
}

export interface AppSettings {
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  primaryButtonColor: string;
}
