function setImage(shortname, longname) {
  if (shortname === "truecolor") {
    document.getElementById("zoom").src =
      "static/images/original/" +
      document.getElementById("zoom").alt +
      "/truecolor.jpg";
    document.getElementById("colorbar").src = "";
    document.getElementById("colorbar").style.width = "0px";
    document.getElementById("colorbar_name").innerHTML = "";
    document.getElementById("title").innerHTML =
      "Ocean Phytoplankton: Truecolor";
  } else {
    document.getElementById("colorbar_name").style =
      "position: fixed; right: -20px; bottom: 52%; color: white; background-color: rgba(2, 17, 27, .7); z-index: 5; padding: 8px; border-radius: 10px; font-size: small;";
    /* I don't think this style actually changes things though ?!*/
    document.getElementById("colorbar").style = "height: 500px";
    document.getElementById("zoom").src =
      "static/images/original/" +
      document.getElementById("zoom").alt +
      "/" +
      shortname +
      ".jpg";
    document.getElementById("colorbar").src =
      "static/images/" + shortname + "_colorbar.png";
    document.getElementById("title").innerHTML =
      "Ocean Phytoplankton: " + longname;
    if (shortname === "chlor_a") {
      document.getElementById("colorbar").style.width = "80px";
      document.getElementById("colorbar_name").innerHTML =
        "Chlorophyll-a Concentration (mg/m<sup>3</sup>)";
    } else {
      document.getElementById("colorbar_name").innerHTML =
        longname + " (% Chl-a)";
      document.getElementById("colorbar").style.width = "70px";
    }
  }
}

function setFolder(folder, iniName, dateDisplay) {
  document.getElementById("zoom").src =
    "static/images/original/" + folder + "/" + iniName + ".jpg";
  document.getElementById("zoom").alt = folder;
  document.getElementById("colorbar").src = "";
  document.getElementById("colorbar").style.width = "0px";
  document.getElementById("colorbar_name").innerHTML = "";
  //document.getElementById('date').innerHTML=dateDisplay;  // where is this supposed to be?
  $.each(names, function (i) {
    document.getElementById(names[i].shortname + "_thumb").src =
      "static/images/reduced/thumbnails/" +
      folder +
      "/" +
      names[i].shortname +
      ".jpg";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  var imageElement = document.getElementById("myContent").querySelector("img");

  if (imageElement.complete) {
    init();
  } else {
    imageElement.onload = init;
  }

  function init() {
    var rangeElement = document.querySelector("[data-zoom-range]");

    var wzoom = WZoom.create("#myContent", {
      type: "html",
      width: imageElement.naturalWidth,
      height: imageElement.naturalHeight,
      dragScrollableOptions: {
        onGrab: function () {
          document.getElementById("myWindow").style.cursor = "grabbing";
        },
        onDrop: function () {
          document.getElementById("myWindow").style.cursor = "grab";
        },
      },
      prepare: function () {
        setTimeout(() => {
          rangeElement.min = wzoom.content.minScale;
          rangeElement.defaultValue = wzoom.content.minScale;
          rangeElement.max = wzoom.content.maxScale;
          rangeElement.step = 1 / this.speed;
        }, 0);
      },
      rescale: function () {
        rangeElement.value = wzoom.content.currentScale;
        document.getElementById("altitude").innerHTML =
          "Camera Altitude: " +
          (227 - Math.round(rangeElement.value * 120)) +
          " km";
      },
    });
    window.addEventListener("resize", function () {
      wzoom.prepare();
    });
    rangeElement.addEventListener("input", function () {
      let newScale = Number(rangeElement.value);

      if (newScale > wzoom.content.currentScale) {
        wzoom.zoomUp();
      } else {
        wzoom.zoomDown();
      }
    });
  }
});
