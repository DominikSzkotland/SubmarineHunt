function setDayTheme() {
  document.getElementById('themeStylesheet').setAttribute('href', '../style/day/day.css');
  document.getElementById('themeShortcutIcon').setAttribute('href', '../images/day/logo.jpeg');
  document.getElementById('welcomeLogo').setAttribute('src', '../images/day/logo.jpeg');
}

function setNightTheme() {
  document.getElementById('themeStylesheet').setAttribute('href', '../style/night/night.css');
  document.getElementById('themeShortcutIcon').setAttribute('href', '../images/night/logo.jpeg');
  document.getElementById('welcomeLogo').setAttribute('src', '../images/night/logo.jpeg');
}

const autoSwitchTheme = () => {
  const hour = new Date().getHours();
  if (hour >= 7 && hour < 19) {
    setDayTheme();
  } else {
    setNightTheme();
  }
};
export default autoSwitchTheme;
