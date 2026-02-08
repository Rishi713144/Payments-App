
"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthForm() {
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session.status === "authenticated") {
            router.replace("/dashboard");
        }
    }, [session.status, router]);

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    if (session.status === "authenticated") {
        return null;
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50 px-4">
            <div className="w-full max-w-md">
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-2xl mb-4 shadow-xl shadow-indigo-100">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome to PaySafe</h1>
                    <p className="mt-2 text-slate-500 font-medium">Please sign in to your bank account</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
                    <div className="space-y-6">
                        <TextInput 
                            label="Phone Number" 
                            placeholder="1231231231" 
                            onChange={(val) => setPhone(val)} 
                        />
                        
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-700">Password</label>
                            <input 
                                onChange={(e) => setPassword(e.target.value)} 
                                type="password" 
                                className="bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent block w-full p-3.5 transition-all outline-none" 
                                placeholder="••••••••" 
                            />
                        </div>

                        <div className="pt-2">
                            <Button onClick={async () => {
                                const res = await signIn("credentials", {
                                    phone: phone,
                                    password: password,
                                    redirect: false,
                                });
                                if (res?.ok) {
                                    router.push("/dashboard");
                                } else {
                                    alert("Login failed. Please check your credentials.");
                                }
                            }}>
                                Sign In to Wallet
                            </Button>
                        </div>
                    </div>
                </div>

                <p className="mt-8 text-center text-sm text-slate-500">
                    Don't have an account? <span className="text-indigo-600 font-bold cursor-pointer hover:underline">Contact sales</span>
                </p>
            </div>
        </div>
    );
}
