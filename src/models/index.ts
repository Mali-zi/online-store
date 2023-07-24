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
  products: IProduct[],
  selectedProduct: IProduct,
  categories: ICategory[], 
  selectedCategory: ICategory,
  status: string,
  error: IError,
}

export interface IError {
  isError: boolean;
  message: string;
};

export interface ITopSales {
  topSales: IProduct[],
  status: string,
  error: IError,
}

// export interface NewPostProps {
//   setPosts: (val: Post[]) => void,
// }

// export interface EditPostProps {
//   post: Post, 
//   setPost: (val: Post) => void,
//   setEdit: (val: boolean) => void, 
// }

export interface LinkProps
  extends Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href"
  > {
  replace?: boolean;
  state?: any;
  to: To;
  reloadDocument?: boolean;
  preventScrollReset?: boolean;
  relative?: "route" | "path";
}

type To = string | Partial<Path>;

interface Path {
  pathname: string;
  search: string;
  hash: string;
}

// export interface IProps1 {
//   event: React.FormEvent<HTMLFormElement>
//   massage: string, 
//   setMassage: (val: string) => void, 
//   handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
// };

// export interface IProps2 {
//   posts: IPost[], 
//   setPosts: (val: IPost[]) => void,
// };

// export interface ButtonProps {
//   handleDelete?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
//   handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
//   handleUpdate?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
// }
