"use client"
import { Button } from "@repo/ui/button";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnRampTransaction } from "../app/lib/actions/createOnRamptxn";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [value, setValue] = useState(0)
    return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Add Money</h2>
            <p className="text-sm text-gray-500">Deposit funds to your wallet</p>
        </div>
        <div className="w-full space-y-6">
            <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val) => {
                setValue(Number(val))
            }} />
            <div>
                <div className="text-sm font-medium text-gray-700 mb-2 text-left">
                    Select Bank
                </div>
                <Select onSelect={(value) => {
                    setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
                    setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
                }} options={SUPPORTED_BANKS.map(x => ({
                    key: x.name,
                    value: x.name
                }))} />
            </div>
            <div className="flex justify-center pt-4">
                <Button onClick={async () => {
                    await createOnRampTransaction(provider, value)
                    window.location.href = redirectUrl || "";
                }}>
                Add Money
                </Button>
            </div>
        </div>
    </div>
    )
}