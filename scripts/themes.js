function loadTheme()
{
    var preferredThemeIndex = localStorage.getItem("preferred_theme_index") || "none";

    // Indexes for Light/Dark Themes
    var defaultLightThemeIndex =     "1";
    var defaultDarkThemeIndex =      "2";

    if(preferredThemeIndex != "none")
    {
        // LOAD PREFERRED
        console.log("LOAD PREFERRED THEME");
        changeThemeTo(preferredThemeIndex);
    }
    else
    {
        var isDarkThemePreffered = window.matchMedia("(prefers-color-scheme: dark)").matches || true;

        if (isDarkThemePreffered)
        {
            // LOAD DARK
            console.log("LOAD DARK THEME");
            changeThemeTo(defaultDarkThemeIndex);
        }
        else
        {
            // LOAD LIGHT
            console.log("LOAD LIGHT THEME");
            changeThemeTo(defaultLightThemeIndex);
        }
    }
}


function changeThemeTo(index)
{
    var css = document.getElementById("theme-css");
    css.href = "./css/themes/styles_theme_"+index+".css";

    // Remember Theme
    localStorage.setItem("preferred_theme_index",index); 

    // Check Radio
    var radio = document.getElementById("theme-"+index);
    radio.checked= true;

}
