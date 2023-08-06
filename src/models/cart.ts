export interface ICartProducts {
  cartProducts: ICartProduct[];
  statusCart: string;
  errorCart: any;
  order: IOrder;
}

export interface ICartProduct {
  product: IFullProduct;
  pickedSize: string;
  count: number;
}

export interface IFullProduct {
  id: string;
  category: string;
  title: string;
  images: string[];
  sku: string;
  manufacturer: string;
  color: string;
  material: string;
  reason: string;
  season: string;
  heelSize: string;
  price: number;
  sizes: Size[];
}

export interface Size {
  size: string;
  available: boolean;
}

export interface ISelectedProduct {
  product: IFullProduct;
  statusSelectedProduct: string;
  errorSelectedProduct: any;
  selectedSize: string;
  selectedAmount: number;
}


export interface IOrder {
  owner: {
    phone: string;
    address: string;
  };
  items: IOrderItem[];
}
export interface IOrderItem {
  id: number;
  price: number;
  count: number;
}
