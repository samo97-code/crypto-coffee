'use client'
import React, {useState} from 'react';
import {Search} from "lucide-react";
import {useDispatch} from "react-redux";
import {setSearchedProject} from "@/store/slices/projectSlice";
import {usePathname} from "next/navigation";

const HeaderSearch = () => {
    const dispatch = useDispatch();
    const path = usePathname()

    const [searchFocused, setSearchFocused] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const changeHandler = (val: string)=>{
        setSearchQuery(val)
        dispatch(setSearchedProject(val))
    }

    const resetInput = ()=>{
        setSearchQuery("")
        dispatch(setSearchedProject(''))
    }

    return(
        <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative group">
                <div
                    className={`flex items-center overflow-hidden rounded-full border border-coffee-200 bg-card/80 px-3 py-1.5 shadow-sm transition-all duration-300 focus-within:border-coffee-400 focus-within:shadow-md ${
                        searchFocused ? "w-[300px]" : "w-[200px]"
                    }`}
                    style={{
                        animation: searchFocused
                            ? "expandWidth 0.3s forwards"
                            : searchQuery
                                ? "contractWidth 0.3s forwards"
                                : "none",
                    }}
                >

                    <div className="min-w-4">
                        <Search className={`transition-all h-4 min-w-4 text-coffee-400 dark:text-coffee-600`} />
                    </div>
                    <input
                        type="text"
                        disabled={path !== '/'}
                        placeholder="Search projects..."
                        className="pl-2 flex-1 bg-transparent text-sm text-coffee-800 outline-none placeholder:text-coffee-400 dark:placeholder:text-coffee-600"
                        value={searchQuery}
                        onChange={(e) => changeHandler(e.target.value)}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                    />
                    {searchQuery && (
                        <button
                            onClick={() => resetInput()}
                            className="ml-1 rounded-full p-1 text-coffee-400 hover:bg-coffee-100 hover:text-coffee-600"
                        >
                            <span className="sr-only">Clear search</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Coffee bean animation on focus */}
                {searchFocused && (
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute h-3 w-2 rounded-full bg-coffee-300/60 blur-sm"
                                style={{
                                    animation: `brewCoffee 1.5s ease-out infinite`,
                                    animationDelay: `${i * 0.2}s`,
                                }}
                            ></div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
    }

export default HeaderSearch;
