import "@hotwired/turbo-rails"
import './add_jquery'

import "popper"
import "bootstrap"
import "channels"

import ConceptMap from "./ConceptMap"

export let cm

window.$ = $
window.bootstrap = bootstrap

// DH: Detect the user browser by using duck-typing: https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browsers
// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]"
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1 - 79
var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

// Edge (based on chromium) detection
var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;

//DH: Needed to detect a refresh
window.onload = function(){
  if(localStorage.getItem('refresh')== "yes"){
    // It's a refresh from an edit site -> The student should get back to login
    localStorage.removeItem('refresh');
    window.location.href="/"
  }
}
// DH
window.onbeforeunload = function () {
  // DH: If the edit window is open, the student should be asked if he is sure to leave
  if($("#edit-dialog").is(':visible')){
    // If a browser closed or reload, make sure to release the lock!
    window.hideForm()
    // Doesnt matter what stands here: The browsers have their own fixed text
    return "Are you sure?"
  }
};

// DH: After a user closed the window / browser
window.onunload = function () {
  // DH: Check if it is the edit site
  if (window.location.href.indexOf(window.location.href.substring(0,window.location.href.indexOf("/maps")) + '/maps') == 0) {
    // DH: Set the refresh flag
    localStorage.setItem('refresh', 'yes');
    // DH: We need to distinguish between the browser
    if(!isFirefox){
         // If it is not firefox and ....
         $.ajax({
           url: "/",
           type: "GET",
           "headers": {
             'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
           },
           success: function(){
           },
         });
     }else{
       // Firefox Browser: Make sure user gets deleted when leaving the Browser
       /*
       $.ajax({
         url: "/",

         // Fierfox needs async: false!
         async: false,
         type: "GET",
         "headers": {
           'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
         },
         success: function(){

           console.log("Gelöscht")
         },
       });
       */

     }
  }
};



export const init = (edgeData, nodeData) => {
  cm = new ConceptMap(edgeData, nodeData)

  // expose handlers needed for DOM events
  window.hideForm = cm.hideForm
  window.validateForm = cm.validateForm
  window.searchConcept = cm.searchConcept
  window.sendMail = cm.sendMail
  window.destroy = cm.destroy
  // Beim Speichern
  window.submitChanges = (event) => {
    event.preventDefault()
    event.stopPropagation()
    cm.onSubmit()
    return false
  }
  window.edges = cm.edges
  window.nodes = cm.nodes
  window.changeColor = cm.changeColor
  window.setNodeData = cm.setNodeData
  window.setEdgeData = cm.setEdgeData

  //DH Make the mode available
  window.setMode = cm.setMode

  // DH: Get the language
  function getLanguage(){
    return navigator.userLanguage || (navigator.languages && navigator.languages.length && navigator.languages[0]) || navigator.language || navigator.browserLanguage || navigator.systemLanguage
  }
  //DH: Toogle between Active Students and canvas in mobile devices
  let i = 0
  $( "#toggle_button" ).click(function() {
    $("#map-canvas" ).toggle()
    $("#header-code" ).toggle()
    $("#header-search").toggle()
    $("#header-nav").toggle()

    if(i % 2 == 0) {
      if(getLanguage() == "de") {
        $( "#toggle_button").html("ZEIGE MAP<br><br>")
      }else{
        $( "#toggle_button").html("SHOW CANVAS<br><br>")
      }
    }else{
      if(getLanguage() == "de") {
        $( "#toggle_button").html("ZEIGE NUTZER<br><br>")
      }else{
        $( "#toggle_button").html("SHOW Users<br><br>")
      }

    }
    i++;
  });

  // DH: If the student wants to logout, make sure that the edit-dialog closes
  $( "#header-nav" ).click(function() {
    if($("#edit-dialog").is(':visible')){
      // If browser closed or reload, make sure to release the lock!
      window.hideForm()
    }
  })

  // DH: filter the student logs
  // DH: Check if a change happened
  $( "#students" ).click(function() {
    // Go through all the students
    $(".filter_students:checkbox").each(function() {
    if ($(this).is(':checked')) {
      // Show all checked
      $('*[data-student="' + this.id + '"]').show();
    }else {
      // Hide all unchecked
      $('*[data-student="' + this.id + '"]').hide();
    }
    })
  })
  // DH: Check all filters
  $('#checkAll').click(function () {
     $(".filter_students").prop('checked', true);
       $( "#students" ).click()
  });
  // DH: Uncheck all filters
  $('#uncheckAll').click(function () {
     $(".filter_students").prop('checked', false);
       $( "#students" ).click()
  });
  // DH: filter students, who left the map
  $('#label_filter_left_students').click(function () {
       $( "#students" ).click()
  });

}
