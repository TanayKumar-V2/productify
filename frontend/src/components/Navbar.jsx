import { Link } from "react-router-dom"
import { SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/clerk-react"
import { ShoppingBagIcon, PlusIcon, UserIcon } from 'lucide-react'
import ThemeSelector from "./ThemeSelector"

function Navbar() {

    const { isSignedIn } = useAuth()

    return (
        <div className="navbar bg-base-300">
            <div className="max-w-5xl mx-auto w-full px-4 flex justify-between items-center">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost gap-2">
                        <ShoppingBagIcon className="size-5 text-primary flex" />
                        <span className="text-lg font-bold font-mono flex tracking-widest">ProductStore</span>
                    </Link>
                </div>
                <div className="flex gap-2 items-center">
                    <ThemeSelector/>
                    {isSignedIn?(
                        <>
                            <Link to="/create" className="btn btn-primary btn-sm gap-1">
                                <PlusIcon className="size-5"/>
                                <span className="hidden sm:inline">New Product</span>
                            </Link>
                            <Link to="/profile" className="btn btn-ghost btn-sm gap-1">
                                <UserIcon className="size-5"/>
                                <span className="hidden sm:inline">Profile</span>
                            </Link>
                            <UserButton/>
                        </>
                    ):(
                        <>
                            <SignInButton mode="modal">
                                <button className="btn btn-ghost btn-sm">Sign In</button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className="btn btn-ghost btn-sm rounded-3xl bg-green-500 text-black">Get Started</button>
                            </SignUpButton>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar