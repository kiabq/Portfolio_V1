function getTheme() {
    const LOCAL_THEME = localStorage.getItem("theme");
    const PREFERRED_THEME = (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    if (LOCAL_THEME) {
        return LOCAL_THEME;
    } else {
        return PREFERRED_THEME;
    }
}

function theme() {
    const PAGE = document.getElementsByTagName("html")[0];
    const THEME = document.querySelector(".nav-theme");
    const TOGGLE = document.querySelector(".nav-theme-toggle");

    if (PAGE !== null && TOGGLE !== null && THEME !== null) {
        TOGGLE.classList.remove("preload");
        PAGE.classList.add("animate");
        TOGGLE.classList.add("animate");
        
        function setThemeId() {

            if (getTheme() === "dark") {
                PAGE.dataset["theme"] = "dark";
            } else {
                PAGE.dataset["theme"] = "light";
            }

            TOGGLE!.id = getTheme();
            THEME!.addEventListener("click", handleThemeChange);
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