"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Send,
  Receipt,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const items = [
    { href: "/dashboard", title: "Home", icon: Home },
    { href: "/transfer", title: "Transfer", icon: Send },
    { href: "/transactions", title: "Transactions", icon: Receipt },
    { href: "/p2p", title: "P2P Transfer", icon: Users },
  ];

  return (
    <aside
      className={`
        h-full bg-white border-r border-slate-200
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-20" : "w-72"}
      `}
    >
      {/* Header - Brand/Toggle Section */}
      <div className="flex items-center justify-between h-16 px-6">
        {!collapsed && (
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">
            Menu
          </span>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`
            p-2 rounded-xl transition-all duration-200
            ${collapsed ? "mx-auto" : ""}
            hover:bg-slate-50 text-slate-400 hover:text-indigo-600
          `}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="px-4 space-y-1.5">
        
        
        {items.map(({ href, title, icon: Icon }) => {
          const isActive =
            pathname === href ||
            (href !== "/" && pathname.startsWith(href));

          return (
            <button
              key={href}
              onClick={() => router.push(href)}
              className={`
                group relative w-full flex items-center gap-4
                px-3 py-3 rounded-2xl text-left
                transition-all duration-300
                ${
                  isActive
                    ? "bg-indigo-50/50 text-indigo-600"
                    : "text-slate-500 hover:bg-slate-50/80 hover:text-slate-900"
                }
              `}
            >
              {/* Active Glow Indicator */}
              {isActive && (
                <span className="absolute -left-1 top-1/2 -translate-y-1/2 h-6 w-1.5 bg-indigo-600 rounded-full shadow-[0_0_12px_rgba(79,70,229,0.5)]" />
              )}

              {/* Icon Container with subtle animation */}
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300
                ${isActive ? "bg-white shadow-sm ring-1 ring-black/5" : "bg-transparent"}
              `}>
                <Icon 
                  size={20} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className={isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"}
                />
              </div>

              {/* Text Label */}
              {!collapsed && (
                <span className={`text-[13.5px] tracking-tight transition-all duration-200 ${isActive ? "font-bold" : "font-medium"}`}>
                  {title}
                </span>
              )}

              {/* Tooltip for collapsed view */}
              {collapsed && (
                <div className="
                  absolute left-full ml-6 px-3 py-2 text-[11px] font-bold
                  bg-slate-900 text-white rounded-xl shadow-2xl
                  opacity-0 group-hover:opacity-100
                  translate-x-[-10px] group-hover:translate-x-0
                  transition-all duration-200
                  whitespace-nowrap pointer-events-none z-[100]
                ">
                  {title}
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-8 border-transparent border-r-slate-900" />
                </div>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
