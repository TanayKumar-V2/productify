import { useMutation, useQuery } from "@tanstack/react-query"
import { createProduct, deleteProduct, getAllProducts, getProductsById } from "../lib/api"
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
