export interface IProduct {
  id:       string;
  category: string;
  title:    string;
  price:    string;
  images:   string[];
}
export interface ICategory {
  id:    string;
  title: string;
}
export interface IProducts {
  productList: IProduct[],
  curentCategory: string,
  curentFetchProducts: IProduct[],
  savedSearchRequest: string,
  statusProducts: string,
  errorProducts: any,
}
export interface ISelectedCategoryProducts {
  selectedCategoryProductsList: IProduct[],
  statusSelectedCategoryProducts: string,
  errorSelectedCategoryProducts: any,
}
export interface ICategories {
  categoriesList: ICategory[], 
  statusCategories: string,
  errorCategories: any,
}
export interface ITopSales {
  topSalesList: IProduct[],
  statusTopSales: string,
  errorTopSales: any,
}
export interface IProductCardProps {
  product: IProduct
}
export interface IFullProduct {
  id:           string;
  category:     string;
  title:        string;
  images:      string[];
  sku:          string;
  manufacturer: string;
  color:        string;
  material:     string;
  reason:       string;
  season:       string;
  heelSize:     string;
  price:        number;
  sizes:       Size[];
}
export interface Size {
  size:      string;
  available: boolean;
}
export interface ICartProduct {
  product: IFullProduct;
  pickedSize: string,
  count: number,
}
export interface ICartProducts {
  cartProducts: ICartProduct[],
  statusCart: string,
  errorCart: any,
  order: IOrder,
}
export interface IOrder{
  owner: {
    phone: string,
    address: string,
  },
  items: IOrderItem[]
}
export interface IOrderItem{
  id: number,
  price: number,
  count: number,
}
export interface ISelectedProduct {
  product: IFullProduct,
  statusSelectedProduct: string,
  errorSelectedProduct: any,
  selectedSize: string,
  selectedAmount: number,
}
export interface ICatalogProps {
  children: React.ReactElement;
};

export interface IPlaceOrderProps {
  userPhone: string, 
  userAddress: string,
}