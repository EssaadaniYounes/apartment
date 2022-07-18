import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react';
function PageLoader() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleRouteChange = (url, { shallow }) => {
            setLoading(true);
        }
        const handleRouteComplete = (url, { shallow }) => {
            setLoading(false);
        }


        router.events.on('routeChangeStart', handleRouteChange)
        router.events.on('routeChangeComplete', handleRouteComplete)

        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
            router.events.off('routeChangeComplet', handleRouteComplete)
        }
    }, [])

    return (loading && <div className="absolute z-[400] bg-red-400 h-2 w-32 rounded-md  animate-[leftToRight_1.2s_ease_infinite]">
    </div>)
}

export default PageLoader;