'use client'
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default function Home() {
    const router = useRouter()
    const url = "https://dial.to/?action=solana-action:https://run.fabs.fun/burn"

    // Redirect the user to the specified URL
    useEffect(() => {
        router.push(url)
    })

    return null
}
