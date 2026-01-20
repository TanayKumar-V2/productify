import { useNavigate } from "react-router-dom"
import { useCreateProducts } from "../hooks/useProducts"
import { useState } from "react"
import { ArrowLeftIcon, FileTextIcon, ImageIcon, Link, SparkleIcon, TypeIcon } from "lucide-react"

function CreatePage() {

  const navigate=useNavigate()
  const createProduct=useCreateProducts()
  const[formdata,setFormData]=useState({title:"",description:"",imageUrl:""})

  const handleSubmit=async(e)=>{
    e.preventDefault
    createProduct.mutate(formdata,{
      onSuccess:()=>navigate("/"),
    })
  }

  return (
    <div className="max-w-lg mx-auto">
      <Link to="/" className="btn btn-ghost btn-sm gap-1 mb-4">
        <ArrowLeftIcon className="size-4"/>
      </Link>
      <div className="card bg-base-300">
        <div className="card-body">
          <h1 className="card-title">
            <SparkleIcon className="size-5 text-primary"/>
            New Product
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <label className="input input-bordered flex items-center gap-2 bg-base-200">
              <TypeIcon className="size-4 text-base-content/50"/>
              <input
                type="text"
                placeholder="product title"
                className="grow"
                value={formdata.title}
                onChange={(e)=>setFormData({...formdata,title:e.target.value})}
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 bg-base-200">
              <ImageIcon className="size-4 text-base-content/50"/>
              <input
                type="url"
                placeholder="Image Url"
                className="grow"
                value={formdata.imageUrl}
                onChange={(e)=>setFormData({...formdata,imageUrl:e.target.value})}
                required
              />
            </label>
             {formdata.imageUrl && (
              <div className="rounded-box overflow-hidden">
                <img
                  src={formdata.imageUrl}
                  alt="Preview"
                  className="w-full h-40 object-cover"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            )}
             <div className="form-control">
              <div className="flex items-start gap-2 p-3 rounded-box bg-base-200 border border-base-300">
                <FileTextIcon className="size-4 text-base-content/50 mt-1" />
                <textarea
                  placeholder="Description"
                  className="grow bg-transparent resize-none focus:outline-none min-h-24"
                  value={formdata.description}
                  onChange={(e) => setFormData({ ...formdata, description: e.target.value })}
                  required
                />
              </div>
            </div>
            {createProduct.isError && (
              <div role="alert" className="alert alert-error alert-sm">
                <span>Failed to create. Try again.</span>
              </div>
            )}
             <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={createProduct.isPending}
            >
              {createProduct.isPending ? (
                <span className="loading loading-spinner" />
              ) : (
                "Create Product"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePage