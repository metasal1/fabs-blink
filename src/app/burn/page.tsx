'use client'
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const url = "https://dial.to/?action=solana-action:https://run.fabs.fun/api/burn/";
    const router = useRouter();

    useEffect(() => {
        // Redirect the user to the URL
        router.push(url);
    }, []);

    return (
        <div className="flex justify-center items-center h-screen">
            <Image src="/fabs-burn.png" alt="FABS.fun" width={256} height={256} />
        </div>
    );
}