import { useMutation, useQuery } from "@tanstack/react-query"
import { createProduct, deleteProduct, getAllProducts, getProductsById,getMyProducts, updateProducts } from "../lib/api"
import { useQueryClient } from "@tanstack/react-query"

export const useProducts=()=>{
    const result =useQuery({queryKey:["products"],queryFn:getAllProducts})
    return result
}

export const useCreateProducts=()=>{
    return useMutation({mutationFn:createProduct})
}

export const useProduct=(id)=>{
    return useQuery({
        queryKey:["product",id],
        queryFn:()=>getProductsById(id),
        enabled:!!id
    })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProducts"] });
    },
  });
};

export const useMyProducts = () => {
  return useQuery({ queryKey: ["myProducts"], queryFn: getMyProducts });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProducts,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["myProducts"] });
    },
  });
};