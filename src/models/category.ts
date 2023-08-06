export interface ICategory {
  id: string;
  title: string;
}

export interface ICategories {
  categoriesList: ICategory[];
  statusCategories: string;
  errorCategories: any;
}

