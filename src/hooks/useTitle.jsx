//hooks/useTitle.jsx
//Custom hook change title browser tab title with underlying mechanism of useEffect.
import { useEffect } from 'react';

export default function useTitle({ currLocation, path, docTitle }) {
    useEffect(() => {
        const originalTitle = document.title;

        if (currLocation === path) {
            document.title = docTitle;
        }
        return () => {
            if (currLocation === path) {
                document.title = originalTitle;
            }
        };
    }, [currLocation, path, docTitle]);
    return currLocation === path;
}