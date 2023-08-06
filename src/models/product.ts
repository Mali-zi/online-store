export interface IProduct {
  id: string;
  category: string;
  title: string;
  price: string;
  images: string[];
}
export interface IProducts {
  productList: IProduct[];
  curentCategory: string;
  curentFetchProducts: IProduct[];
  savedSearchRequest: string;
  statusProducts: string;
  errorProducts: any;
}
export interface ISelectedCategoryProducts {
  selectedCategoryProductsList: IProduct[];
  statusSelectedCategoryProducts: string;
  errorSelectedCategoryProducts: any;
}
export interface ITopSales {
  topSalesList: IProduct[];
  statusTopSales: string;
  errorTopSales: any;
}
