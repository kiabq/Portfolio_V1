export function getTheme() {
    const LOCAL_THEME = localStorage.getItem("theme");
    const PREFERRED_THEME = (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    if (LOCAL_THEME) {
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
            theme!.addEventListener("click", handleThemeChange);
        }
        
        function setTheme() {
            if (getTheme() === "light") {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }
        
            setThemeId();
        }
    
        function handleThemeChange() {
            setTheme();
        }
    
        window.addEventListener("DOMContentLoaded", setThemeId);
    }
}

theme();
export default theme
