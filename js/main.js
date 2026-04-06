function navBar() {
  var nav = document.createElement("div");
  nav.id = "navbar";
  var nav_classes = ["navbar", "navbar-expand-md", "bg-dark", "navbar-dark"];
  $.each(nav_classes, function (i) {
    nav.classList.add(nav_classes[i]);
  });

  var nav_container_fluid = document.createElement("div");
  nav_container_fluid.classList.add("container-fluid");

  var nav_col1 = document.createElement("div");
  nav_col1.id = "nav_col1";
  nav_col1.innerHTML =
    '<span class="navbar-brand mb-0 h1" style="font-size: x-large;">' +
    '<img class="seaGrantLogo" src="static/images/MIT_MITSG_EqualFocus_Logo_White_large-copy.png">' +
    '<a href="https://space2sea.mit.edu" class="spaceToSeaText" style="text-decoration: none; color: inherit;"><b>SPACE TO SEA</b><img src="static/images/dino_drawing.png" width="35px"></a>' +
    "</span>" +
    '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">' +
    '<span class="navbar-toggler-icon"></span>' +
    "</button>";

  var navbarNav = document.createElement("div");
  navbarNav.id = "navbarNav";
  navbarNav.classList.add("collapse");
  navbarNav.classList.add("navbar-collapse");

  var navbarNavList = document.createElement("ul");
  navbarNavList.classList.add("nav");
  navbarNavList.classList.add("navbar-nav");

  var navbarItems = [
    ["Satellite Visualization", "index.html"],
    ["Gallery", "gallery.html"],
    ["Ocean Color", "oceancolor.html"],
    ["Process", "process.html"],
    ["Remote Sensing", "satellites.html"],
    ["Data", "data.html"],
    ["About Us", "about_us.html"],
  ];
  $.each(navbarItems, function (i) {
    var navbarNavListItem = document.createElement("li");
    navbarNavListItem.classList.add("nav-item");
    if (location.href.split("/").pop() === navbarItems[i][1]) {
      navbarNavListItem.classList.add("active");
    }
    var a_link = document.createElement("a");
    a_link.classList.add("nav-link");
    a_link.href = navbarItems[i][1];
    a_link.innerHTML = navbarItems[i][0];
    navbarNavListItem.appendChild(a_link);
    navbarNavList.appendChild(navbarNavListItem);
  });
  navbarNav.appendChild(navbarNavList);
  nav_container_fluid.appendChild(nav_col1);
  nav_container_fluid.appendChild(navbarNav);
  nav.appendChild(nav_container_fluid);
  document.body.appendChild(nav);
}

function createColorSpectrum(rangeType, units) {
  let colorSpectrumSection = document.getElementById("color-spectrum");
  if (colorSpectrumSection === undefined)
    throw new Error("should not be undefined");
  let spectrumColumn = document.createElement("div");
  spectrumColumn.classList.add("column");
  spectrumColumn.classList.add("color-columns");
  let innerHTML =
    "<div class='names'><p style='position: relative; color: lightgray;'>" +
    rangeType +
    "</p></div>";
  let classForBox = "microorganism";
  if (rangeType === "Chlorophyll-a Spectrum") classForBox = "chlorophyll";
  const colorsAndPercents = colorStyle.get(rangeType);
  if (colorsAndPercents === undefined)
    throw new Error("invalid rangeType put in");
  for (const concAndColor of colorsAndPercents) {
    let concentration = concAndColor[0];
    let color = concAndColor[1];
    let textColor = concAndColor[2];
    innerHTML =
      innerHTML +
      "<div class='" +
      classForBox +
      "' style='background-color: rgb(" +
      color[0] +
      "," +
      color[1] +
      "," +
      color[2] +
      "); color: " +
      textColor +
      ";'><span><b class='color-text'>RGB (" +
      color[0] +
      ", " +
      color[1] +
      ", " +
      color[2] +
      ")</b><b class='conc-text'>" +
      concentration +
      " " +
      units +
      "</b></span></div>";
  }
  innerHTML =
    innerHTML +
    "<img src='" +
    picsForColors.get(rangeType) +
    "' alt='" +
    rangeType +
    "' style='width: 100%;'>";
  spectrumColumn.innerHTML = innerHTML;
  colorSpectrumSection.appendChild(spectrumColumn);
}

function createBands() {
  let bandsSection = document.getElementById("band-process");
  if (bandsSection === undefined) throw new Error("should not be undefined");
  for (const process of processPhotos) {
    let bandsColumn = document.createElement("div");
    bandsColumn.classList.add("col");
    const innerHTML =
      "<div style='text-align: center'><img src='" +
      process.url +
      "' style = 'width: 90px; height: 90px; z-index: 10;'></div> <p style='color: lightgray; position: relative; text-align: center;'>" +
      `Band ${process.band}` +
      "</p> <p style='color: lightgray; position: relative; text-align: center; bottom: 20px;'>" +
      process.spectrum +
      "</p> <p style='color: lightgray; position: relative; text-align: center; bottom: 40px;'>" +
      process.range +
      "</p>";
    bandsColumn.innerHTML = innerHTML;
    bandsSection.appendChild(bandsColumn);
  }
}

var names = [
  { longname: "Truecolor", shortname: "truecolor" },
  { longname: "Chlorophyll-a", shortname: "chlor_a" },
  { longname: "Diatoms", shortname: "diatoms" },
  { longname: "Dinoflagellates", shortname: "dinoflagellates" },
  { longname: "Green Algae", shortname: "greenalgae" },
  { longname: "Haptophytes", shortname: "prymnesiophytes" },
];

var months = [
  { shortname: "JAN", longname: "January" },
  { shortname: "FEB", longname: "Febuary" },
  { shortname: "MAR", longname: "March" },
  { shortname: "APR", longname: "April" },
  { shortname: "MAY", longname: "May" },
  { shortname: "JUN", longname: "June" },
  { shortname: "JUL", longname: "July" },
  { shortname: "AUG", longname: "August" },
  { shortname: "SEP", longname: "September" },
  { shortname: "OCT", longname: "October" },
  { shortname: "NOV", longname: "November" },
  { shortname: "DEC", longname: "December" },
];

const colorStyle = new Map([
  [
    "Haptophyte Blues",
    [
      [0, [230, 249, 255], "black"],
      [0.015, [215, 240, 255], "black"],
      [0.044, [181, 222, 253], "black"],
      [0.058, [148, 203, 251], "black"],
      [0.087, [115, 185, 249], "black"],
      [0.117, [82, 166, 247], "black"],
      [0.146, [66, 157, 247], "black"],
      [0.175, [16, 129, 243], "black"],
      [0.204, [16, 129, 243], "black"],
      [0.233, [0, 78, 149], "black"],
      [0.262, [0, 62, 113], "black"],
      [0.306, [0, 44, 77], "gray"],
      [0.35, [0, 35, 53], "gray"],
    ],
  ],
  [
    "Green Algae Greens",
    [
      [0, [233, 255, 155], "black"],
      [0.016, [220, 246, 115], "black"],
      [0.032, [210, 248, 50], "black"],
      [0.047, [160, 255, 10], "black"],
      [0.063, [134, 255, 6], "black"],
      [0.079, [109, 255, 4], "black"],
      [0.095, [62, 251, 1], "black"],
      [0.111, [8, 220, 0], "black"],
      [0.126, [0, 220, 0], "black"],
      [0.142, [0, 160, 0], "black"],
      [0.158, [0, 130, 0], "black"],
      [0.174, [0, 110, 0], "black"],
      [0.2, [0, 100, 0], "black"],
    ],
  ],
  [
    "Dinoflagellate Yellows",
    [
      [0, [255, 229, 0], "black"],
      [0.013, [255, 210, 0], "black"],
      [0.025, [255, 203, 17], "black"],
      [0.038, [255, 184, 0], "black"],
      [0.05, [255, 176, 0], "black"],
      [0.075, [255, 165, 0], "black"],
      [0.1, [255, 156, 0], "black"],
      [0.125, [255, 135, 0], "black"],
      [0.15, [255, 117, 0], "black"],
      [0.175, [255, 96, 0], "black"],
      [0.2, [255, 75, 0], "black"],
      [0.225, [255, 57, 0], "black"],
      [0.25, [255, 6, 0], "black"],
    ],
  ],
  [
    "Diatom Purples",
    [
      [0, [207, 122, 209], "black"],
      [0.04, [200, 97, 203], "black"],
      [0.07, [199, 78, 200], "black"],
      [0.14, [196, 74, 198], "black"],
      [0.21, [187, 56, 191], "black"],
      [0.28, [165, 48, 177], "black"],
      [0.35, [145, 41, 162], "black"],
      [0.42, [123, 33, 148], "black"],
      [0.49, [107, 25, 133], "black"],
      [0.56, [80, 21, 108], "gray"],
      [0.63, [56, 16, 82], "gray"],
      [0.7, [34, 9, 57], "gray"],
      [0.77, [28, 6, 47], "gray"],
    ],
  ],
  [
    "Chlorophyll-a Spectrum",
    [
      [0.01, [147, 0, 108], "black"],
      [0.014, [111, 0, 144], "black"],
      [0.021, [72, 0, 183], "black"],
      [0.031, [33, 0, 222], "black"],
      [0.046, [0, 10, 255], "black"],
      [0.065, [0, 74, 255], "black"],
      [0.096, [0, 144, 255], "black"],
      [0.142, [0, 213, 255], "black"],
      [0.209, [0, 255, 215], "black"],
      [0.299, [0, 255, 119], "black"],
      [0.44, [0, 255, 15], "black"],
      [0.649, [96, 255, 0], "black"],
      [0.956, [220, 255, 0], "black"],
      [1.368, [255, 235, 0], "black"],
      [2.014, [255, 183, 0], "black"],
      [2.968, [255, 131, 0], "black"],
      [4.373, [255, 79, 0], "black"],
      [6.256, [255, 31, 0], "black"],
      [9.211, [233, 0, 0], "black"],
      [13.573, [165, 0, 0], "black"],
      [20, [205, 0, 0], "black"],
    ],
  ],
]);

const picsForColors = new Map([
  [
    "Haptophyte Blues",
    "./static/images/reduced/thumbnails/02.24.2020/prymnesiophytes.jpg",
  ],
  [
    "Green Algae Greens",
    "./static/images/reduced/thumbnails/02.24.2020/greenalgae.jpg",
  ],
  [
    "Dinoflagellate Yellows",
    "./static/images/reduced/thumbnails/02.24.2020/dinoflagellates.jpg",
  ],
  [
    "Diatom Purples",
    "./static/images/reduced/thumbnails/02.24.2020/diatoms.jpg",
  ],
  [
    "Chlorophyll-a Spectrum",
    "./static/images/reduced/thumbnails/02.24.2020/chlor_a.jpg",
  ],
]);

const processPhotos = [
  {
    band: 1,
    url: "static/images/process/Band_1_Process.png",
    spectrum: "Visible",
    range: "(0.43 - 0.45 µm)",
  },
  {
    band: 2,
    url: "static/images/process/Band_2_Process.png",
    spectrum: "Visible",
    range: "(0.45 - 0.51 µm)",
  },
  {
    band: 3,
    url: "static/images/process/Band_3_Process.png",
    spectrum: "Visible",
    range: "(0.53 - 0.59 µm)",
  },
  {
    band: 4,
    url: "static/images/process/Band_4_Process.png",
    spectrum: "Red",
    range: "(0.64 - 0.67 µm)",
  },
  {
    band: 5,
    url: "static/images/process/Band_5_Process.png",
    spectrum: "Near-Infrared",
    range: "(0.85 - 0.88 µm)",
  },
  {
    band: 6,
    url: "static/images/process/Band_6_Process.png",
    spectrum: "SWIR 1",
    range: "(1.57 - 1.65 µm)",
  },
  {
    band: 7,
    url: "static/images/process/Band_7_Process.png",
    spectrum: "SWIR 2",
    range: "(2.11 - 2.29 µm)",
  },
  {
    band: 8,
    url: "static/images/process/Band_8_Process.png",
    spectrum: "Panchromatic",
    range: "(0.50 - 0.68 µm)",
  },
  {
    band: 9,
    url: "static/images/process/Band_9_Process.png",
    spectrum: "Cirrus",
    range: "(1.36 - 1.38 µm)",
  },
  {
    band: 10,
    url: "static/images/process/Band_10_Process.png",
    spectrum: "TIRS 1",
    range: "(10.6 - 11.19 µm)",
  },
  {
    band: 11,
    url: "static/images/process/Band_11_Process.png",
    spectrum: "TIRS 2",
    range: "(11.5 - 12.51 µm)",
  },
];
