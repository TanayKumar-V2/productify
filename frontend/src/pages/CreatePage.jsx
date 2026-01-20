import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createProduct } from "../lib/api";
import { useNavigate } from "react-router"; 
import { PlusIcon, ImageIcon, TypeIcon, FileTextIcon, Loader2Icon } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

function CreatePage() {
  const { user } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    description: "",
  });

  const { mutate: createProductMutation, isPending, error } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      console.log("Product created successfully!");
      navigate("/"); 
    },
    onError: (err) => {
      console.error("Failed to create product:", err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.imageUrl || !formData.description) {
      return; 
    }
    createProductMutation(formData);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-xl font-semibold text-base-content/50">
          Please sign in to create a product.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pt-10 pb-20">
      <div className="card bg-base-200 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">Create New Product</h2>
          {error && (
            <div className="alert alert-error mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error.response?.data?.message || "Something went wrong"}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <TypeIcon className="size-4" /> Product Title
                </span>
              </label>
              <input
                type="text"
                placeholder="e.g. Modern UI Kit"
                className="input input-bordered w-full"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <ImageIcon className="size-4" /> Image URL
                </span>
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                className="input input-bordered w-full"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                required
              />
              {formData.imageUrl && (
                <div className="mt-4 relative aspect-video rounded-lg overflow-hidden bg-base-300 border border-base-content/10">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                </div>
              )}
            </div>

             <div className="form-control">
              <div className="flex items-start gap-2 p-3 rounded-box bg-base-200 border border-base-300">
                <FileTextIcon className="size-4 text-base-content/50 mt-1" />
                <textarea
                  placeholder="Description"
                  className="grow bg-transparent resize-none focus:outline-none min-h-24"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full mt-4"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2Icon className="size-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <PlusIcon className="size-5" />
                  Create Product
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;