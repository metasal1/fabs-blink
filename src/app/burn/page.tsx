import Image from 'next/image';
export default function Home() {
    return (
        <div className="flex justify-center items-center h-screen">
            <Image src="/fabs-burn.png" alt="FABS.fun" width={256} height={256} />
        </div>
    );
}
