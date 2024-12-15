import { useCallback, useEffect, useState } from "react";

export const useFullscreen = () => {
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

    // useEffect(() => {
    //     const listener = () => {
    //         console.log("fullscreen change");
    //         const fullscreenElement = document.fullscreenElement;
    //         // || document.mozFullScreenElement
    //         // || document.webkitFullscreenElement
    //         // || document.msFullscreenElement;
    //         setIsFullscreen(Boolean(fullscreenElement));
    //     };
    //     document.addEventListener("fullscreenchange", listener);
    //     return () => {
    //         document.removeEventListener("fullscreenchange", listener);
    //     };
    // }, []);

    useEffect(() => {
        const onWindowResize = () => {
            setIsFullscreen(window.innerHeight === screen.height);
        };
        window.addEventListener("resize", onWindowResize);
        return () => {
            window.removeEventListener("resize", onWindowResize);
        };
    }, []);

    const outerSetIsFullscreen = useCallback((newIsFullscreen: boolean) => {
        setIsFullscreen(newIsFullscreen);
        if (newIsFullscreen) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }, []);

    return { isFullscreen, setIsFullscreen: outerSetIsFullscreen };
};
