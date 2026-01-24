export const useRedirectingBackButton = () => {
  function disableBack() {
    window.history.forward();
  }
  setTimeout(disableBack, 0);
  window.onunload = () => null;
};

export const usePreventBackButton = () => {
  /*     window.history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
        window.history.pushState(null, null, document.URL);
    }); */

  window.history.pushState(null, document.title, window.location.href);
  window.addEventListener("popstate", function (event) {
    window.history.pushState(null, document.title, window.location.href);
  });
};
