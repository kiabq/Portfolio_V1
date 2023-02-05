export function getTheme() {
    const LOCAL_THEME = localStorage.getItem("theme");
    const PREFERRED_THEME = (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    if (LOCAL_THEME !== null) {
        return LOCAL_THEME;
    } else {
        return PREFERRED_THEME;
    }
}

function theme() {
    const page = document.getElementsByTagName("html")[0];
    const theme = document.querySelector(".nav-theme");
    const toggle = document.querySelector(".nav-theme-toggle");

    if (page !== null && toggle !== null && theme !== null) {
        setThemeId();

        toggle.classList.remove("preload");
        page.classList.add("animate");
        toggle.classList.add("animate");
        
        function setThemeId() {
            if (getTheme() === "dark") {
                page.dataset["theme"] = "dark";
            } else {
                page.dataset["theme"] = "light";
            }

            toggle!.id = getTheme();
            theme!.addEventListener("click", setTheme);
        }
        
        function setTheme() {
            getTheme() === "light" ? 
                localStorage.setItem("theme", "dark") : 
                localStorage.setItem("theme", "light");
        
            setThemeId();
        }

        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", ({ matches }) => {
                if (matches && getTheme() === "light" || !matches && getTheme() === "dark") {
                    setTheme();
                }
            })

        window.addEventListener("load", () => {
            localStorage.setItem("theme", getTheme());
        })
    }
}

theme();

export default theme
