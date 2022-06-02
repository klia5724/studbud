// open and close sidebar from W3 School How TO - Collapse Sidebar Tutorial:
// https://www.w3schools.com/howto/howto_js_collapse_sidebar.asp
  function openFeat() {
    document.querySelector(".features").style.width = "300px";
    document.querySelector(".container").style.marginRight= "300px";
  }
  
  function closeFeat() {
    document.querySelector(".features").style.width = "0";
    document.querySelector(".container").style.marginRight= "0";
  }