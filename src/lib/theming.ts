export let themes = ["sunset", "halloween", "lemonade", "garden", "black", "cupcake"];
export let modes: { [index: string]: string } = {
    sunset: "dark",
    halloween: "dark",
    lemonade: "light",
    garden: "light",
    black: "dark",
    cupcake: "light",
};

export function themeBtn() {
    var btnEl: HTMLButtonElement | null = document.querySelector("[data-set-theme='']")
    var dataKey = btnEl ? btnEl.getAttribute('data-key') : null;
    (function (theme = localStorage.getItem(dataKey ? dataKey : "theme"), mode = localStorage.getItem("theme-mode")) {
        if (theme != undefined && theme != '') {
            if (localStorage.getItem(dataKey ? dataKey : "theme") && localStorage.getItem(dataKey ? dataKey : "theme") != '') {
                document.documentElement.setAttribute("data-theme", theme);
                var btnEl = document.querySelector("[data-set-theme='" + theme.toString() + "']")
                if (btnEl) {
                    [...document.querySelectorAll("[data-set-theme]")].forEach((el) => {
                        let actClass = el.getAttribute('data-act-class');
                        if (actClass) {
                            el.classList.remove(actClass);
                        }
                    });
                    let actClass = btnEl.getAttribute('data-act-class')
                    if (actClass) {
                        btnEl.classList.add(actClass)
                    }
                }
            } else {
                var btnEl = document.querySelector("[data-set-theme='']");
                if (btnEl) {
                    let actClass = btnEl.getAttribute('data-act-class');
                    if (actClass) {
                        btnEl.classList.add(actClass);
                    }
                }
            }

            if (localStorage.getItem("theme-mode") && localStorage.getItem("theme-mode") != '') {
                //@ts-ignore
                document.documentElement.setAttribute("data-theme-mode", localStorage.getItem("theme-mode"));
            } else {
                //@ts-ignore
                document.documentElement.setAttribute("data-theme-mode", btnEl?.getAttribute('data-set-theme-mode'));
            }
        }
    })();
    [...document.querySelectorAll("[data-set-theme]")].forEach((el) => {
        el.addEventListener("click", function (this: HTMLButtonElement) {
            //@ts-ignore
            document.documentElement.setAttribute("data-theme", this.getAttribute('data-set-theme'));
            //@ts-ignore
            localStorage.setItem(dataKey ? dataKey : "theme", document.documentElement.getAttribute('data-theme'));

            if (this.getAttribute('data-set-theme-mode')) {
                //@ts-ignore
                document.documentElement.setAttribute("data-theme-mode", this.getAttribute('data-set-theme-mode'));
                //@ts-ignore
                localStorage.setItem("theme-mode", document.documentElement.getAttribute('data-theme-mode'));
            }

            [...document.querySelectorAll("[data-set-theme]")].forEach((el) => {
                //@ts-ignore
                el.classList.remove(el.getAttribute('data-act-class'));
            });
            if (el.getAttribute('data-act-class')) {
                //@ts-ignore
                el.classList.add(el.getAttribute('data-act-class'));
            }
        });
    });
}