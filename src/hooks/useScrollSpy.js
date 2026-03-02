import {
    useEffect,
    useState
} from "react";

const sections = ["beranda", "tutorial", "program", "gallery", "contact"];

const useScrollSpy = () => {
    const [active, setActive] = useState("beranda");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActive(entry.target.id);
                    }
                });
            }, {
                rootMargin: "-50% 0px -40% 0px",
                threshold: 0,
            }
        );

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return active;
};

export default useScrollSpy;