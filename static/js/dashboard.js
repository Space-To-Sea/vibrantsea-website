const PLANKTON_CONFIG = {
  diatoms_hirata: { name: "Diatoms", color: "rgb(126, 33, 148)" },
  dinoflagellates_hirata: {
    name: "Dinoflagellates",
    color: "rgb(255, 156, 17)",
  },
  greenalgae_hirata: { name: "Green Algae", color: "rgb(0, 210, 0)" },
  prymnesiophytes_hirata: { name: "Prymnesiophytes", color: "rgb(0, 95, 185)" },
  other: { name: "Other", color: "rgb(255, 182, 193)" },
  chlor_a: { name: "Total Chlorophyll-A", color: "rgb(0, 0, 0)" },
};

let allPlanktonData = null;
let currentChartType = null;
let selectedMonths = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

function setChartType(chartType) {
  currentChartType = chartType;
  render();
}

/************************************************************
 * DATA LOADING
 ************************************************************/

async function loadData() {
  fetch("static/data/phytoplankton_longterm_data.csv")
    .then((response) => response.text())
    .then((text) => {
      const lines = text.split("\n");

      const headerIndex = lines.findIndex((line) =>
        line.trim().startsWith("date"),
      );

      if (headerIndex == -1) {
        throw new Error("Header row starting with 'date' not found");
      }

      const rawHeaders = lines[headerIndex].trim().split(/\s+/);
      const cleanHeaders = rawHeaders.map((h) => h.split(":")[0]);

      const dataRows = lines
        .slice(headerIndex + 1)
        .map((line) => line.trim())
        .map((line) => {
          const values = line.split(/\s+/);
          const obj = {};
          cleanHeaders.forEach((header, i) => {
            obj[header] = values[i];
          });
          return obj;
        });

      allPlanktonData = dataRows;
      calcOtherCategory(allPlanktonData);

      console.log("Data ready!");
      render();
    });
}

function calcOtherCategory(rows) {
  //Calculates the "other" category (chlorophyll-a unaccounted for by the main 4 species) from the main csv data
  rows.forEach((r) => {
    const totalChl = parseFloat(r["chlor_a_avg"]);

    const diatoms = parseFloat(r["diatoms_hirata_avg"]);
    const dino = parseFloat(r["dinoflagellates_hirata_avg"]);
    const green = parseFloat(r["greenalgae_hirata_avg"]);
    const prym = parseFloat(r["prymnesiophytes_hirata_avg"] || 0);

    const sumSpecific = diatoms + dino + green + prym;

    r["other_avg"] = Math.max(0, totalChl - sumSpecific);
  });
}

/************************************************************
 * RENDER VISUALS
 ************************************************************/

function render() {
  if (!allPlanktonData) return;

  // Clear any previous rendered elements
  const chartDiv = document.getElementById("active-chart");
  const controlsDiv = document.getElementById("chart-controls");
  controlsDiv.innerHTML = "";
  chartDiv.innerHTML = "";

  if (currentChartType === "bar") {
    drawStackedBar("active-chart", allPlanktonData, 1);
    setupBarChartControls(controlsDiv);
  } else if (currentChartType === "line") {
    drawTrendline(
      "active-chart",
      allPlanktonData,
      ["diatoms_hirata", "greenalgae_hirata"],
      [1, 2],
    );
    setupTrendlineControls(controlsDiv);
  }
}

/************************************************************
 * HELPER FUNCTIONS
 ************************************************************/

function nearestJan1(dateStr) {
  //given a date in the form of a string, returns the string version of the Jan 1 of that year
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const jan1 = new Date(year, 0, 1); // January 1 of that year
  return jan1.toISOString().slice(0, 10); // "YYYY-MM-DD"
}

/**
 * Adjusts the brightness of an RGB color by a scaling factor.
 *
 * @param {string} rgb - The input color in the format "rgb(r, g, b)".
 * @param {number} factor - Multiplicative factor to scale each color channel.
 * @returns {string} The adjusted color as an "rgb(r, g, b)" string.
 */
function adjustColor(rgb, factor) {
  //
  const [r, g, b] = rgb.match(/\d+/g).map(Number);

  const clamp = (v) => Math.max(0, Math.min(255, v));

  return `rgb(${clamp(r * factor)}, ${clamp(
    g * factor,
  )}, ${clamp(b * factor)})`;
}

/**
 * Generates year-based annotations for a time series chart.
 * Each annotation is placed at mid-year (July 1st) and positioned
 * relative to the plot paper coordinates.
 *
 * @param {Array<{date: string|Date}>} data - Array of records containing a date field.
 * @param {number} [yoffset=-0.2] - Vertical offset in paper coordinates for label placement.
 * @returns {Array<Object>} Array of annotation objects for charting libraries (e.g., Plotly).
 */
function getYearAnnotations(data, yoffset = -0.2) {
  const years = [
    ...new Set(
      data
        .map((r) => new Date(r.date))
        .filter((d) => !isNaN(d)) // 🚨 remove invalid dates
        .map((d) => d.getFullYear()),
    ),
  ];
  return years.map((year) => ({
    x: `${year}-07-01`, // middle of year so it centers nicely
    y: yoffset, // below axis
    xref: "x",
    yref: "paper",
    text: year.toString(),
    showarrow: false,
    xanchor: "center",
    font: { size: 12 },
  }));
}

/************************************************************
 * Setup Controls
 ************************************************************/

function setupBarChartControls(controlsDiv) {
  //initialize all the options
  const maxYInput = createNumberInput("max-y", "max-y-input");

  const startDateInput = document.createElement("input");
  startDateInput.type = "date";
  startDateInput.id = "start-date";

  const endDateInput = document.createElement("input");
  endDateInput.type = "date";
  endDateInput.id = "end-date";

  const regionInput = document.createElement("select");
  regionInput.id = "region-num";
  [1, 2, 3, 4].forEach((n) => {
    const opt = document.createElement("option");
    opt.value = n;
    opt.textContent = n;
    regionInput.appendChild(opt);
  });

  const monthContainer = createMonthSelector();

  const applyButton = document.createElement("button");
  applyButton.textContent = "Apply";

  //sets what to do when Apply is clicked
  applyButton.onclick = function () {
    const updates = {};
    const start = startDateInput.value;
    const end = endDateInput.value;
    const maxY = maxYInput.value;
    const regionNum = Number(regionInput.value);
    const yearSpan =
      (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24 * 365);

    let dtick = "M3";
    if (yearSpan < 5) dtick = "M1";
    else dtick = "M3";
    if (start && end) {
      updates["xaxis.range"] = [start, end];
      updates["xaxis.dtick"] = dtick;
    }

    if (maxY) {
      const maxYFloat = parseFloat(maxY);
      if (!isNaN(maxYFloat) && maxYFloat > 0) {
        updates["yaxis.range"] = [0, maxYFloat];
      }
    }

    if (regionNum) {
      drawStackedBar("active-chart", allPlanktonData, regionNum);
    }

    Plotly.relayout("active-chart", updates);
  };

  // Pre-fill start date with min date
  const dates = allPlanktonData.map((r) => r.date);
  startDateInput.value = nearestJan1(dates[0]);

  // Appends chart control inputs and labels to the controls container
  controlsDiv.append(
    document.createTextNode("Max Y: "),
    maxYInput,
    document.createTextNode("Start: "),
    startDateInput,
    document.createTextNode(" End: "),
    endDateInput,
    document.createTextNode(" Region: "),
    regionInput,
    document.createTextNode(" Months: "),
    monthContainer,
    applyButton,
  );
}

function setupTrendlineControls(controlsDiv) {
  //initialize all the options
  const maxYInput = createNumberInput("max-y", "max-y-input");

  const applyButton = document.createElement("button");
  applyButton.textContent = "Apply";

  //sets what to do when Apply is clicked
  applyButton.onclick = function () {
    const updates = {};
    const maxY = maxYInput.value;

    if (maxY) {
      const maxYFloat = parseFloat(maxY);
      if (!isNaN(maxYFloat) && maxYFloat > 0) {
        updates["yaxis.range"] = [0, maxYFloat];
      }
    }
    Plotly.relayout("active-chart", updates);
  };

  // Appends chart control inputs and labels to the controls container
  controlsDiv.appendChild(document.createTextNode("Max Y: "));
  controlsDiv.appendChild(maxYInput);
  controlsDiv.appendChild(applyButton);
}

function createMonthSelector() {
  // Creates a set of checkboxes for each month and updates the selectedMonths set when toggled.
  const container = document.createElement("div");
  container.style.marginTop = "8px";

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  months.forEach((m, i) => {
    const label = document.createElement("label");

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = true;

    selectedMonths.add(i);

    cb.onchange = () => {
      cb.checked ? selectedMonths.add(i) : selectedMonths.delete(i);
    };

    label.append(cb, document.createTextNode(" " + m));
    container.appendChild(label);
  });

  return container;
}

function createNumberInput(id, className = "") {
  // Creates and returns a number input element with optional id and CSS class.
  const input = document.createElement("input");
  input.type = "number";
  input.id = id;
  if (className) input.className = className;
  return input;
}

/************************************************************
 * Trendline
 ************************************************************/

function drawTrendline(targetDiv, allPlanktonData, speciesList, regionList) {
  const traces = [];
  const regionShifts = [1, 0.6, 1.2, 1.8];
  regionList.forEach((regionNum) => {
    const regionRows = allPlanktonData.filter(
      (r) => parseInt(r.region) === regionNum,
    );

    const dates = regionRows.map((r) => r.date);

    speciesList.forEach((species) => {
      const avg = regionRows.map((r) => parseFloat(r[species + "_avg"]));
      const min = regionRows.map((r) => parseFloat(r[species + "_min"]));
      const max = regionRows.map((r) => parseFloat(r[species + "_max"]));

      // max line (hidden)
      traces.push({
        x: dates,
        y: max,
        line: { width: 0 },
        showlegend: false,
        hoverinfo: "skip",
      });

      // min-max band
      traces.push({
        x: dates,
        y: min,
        fill: "tonexty",
        fillcolor: PLANKTON_CONFIG[species].color
          .replace("rgb", "rgba")
          .replace(")", ",0.2)"),
        line: { width: 0 },
        name: `${PLANKTON_CONFIG[species].name} Range (Region ${regionNum})`,
      });

      // avg line
      traces.push({
        x: dates,
        y: avg,
        mode: "lines+markers",
        name: `${PLANKTON_CONFIG[species].name} (Region ${regionNum})`,
        hovertemplate:
          "%{x|%Y-%m-%d}<br>" + "%{fullData.name}: %{y:.2f}<extra></extra>",
        line: {
          color: adjustColor(
            PLANKTON_CONFIG[species].color,
            regionShifts[regionNum - 1],
          ),
        },
        marker: { size: 4 },
      });
    });
  });

  const layout = {
    title: `Plankton Trendlines`,
    xaxis: {
      type: "date",
      showgrid: true,
      dtick: "M3",
      tickformat: "%b",
    },
    annotations: getYearAnnotations(allPlanktonData, -0.1),
    yaxis: { title: "mg/m³" },
    legend: {
      orientation: "h",
      x: 0,
      y: -0.3,
      xanchor: "left",
      yanchor: "bottom",
      bgcolor: "rgba(255,255,255,0.6)",
      bordercolor: "rgba(0,0,0,0.2)",
      borderwidth: 1,
    },
  };
  Plotly.newPlot(targetDiv, traces, layout);
}

/************************************************************
 * Stacked Bar Graph
 ************************************************************/

function drawStackedBar(targetDiv, allPlanktonData, regionNum) {
  const regionRows = allPlanktonData.filter(
    (r) =>
      parseInt(r.region) === regionNum &&
      selectedMonths.has(new Date(r.date).getMonth()),
  );

  const traces = Object.keys(PLANKTON_CONFIG)
    .filter((key) => key !== "chlor_a")
    .map((key) => {
      return {
        x: regionRows.map((r) => r.date),
        y: regionRows.map((r) => parseFloat(r[key + "_avg"])),
        name: PLANKTON_CONFIG[key].name,
        type: "bar",
        marker: { color: PLANKTON_CONFIG[key].color },
        hovertemplate:
          "%{x|%Y-%m-%d}<br>" + "%{fullData.name}: %{y:.2f}<extra></extra>",
      };
    });

  const layout = {
    barmode: "stack",
    title: `Region ${regionNum}: Phytoplankton Concentration`,
    yaxis: { title: "mg per m^3", hoverformat: ".2f" },
    xaxis: {
      type: "date",
      showgrid: true,
      dtick: "M3",
      tickformat: "%b",
      range: [
        nearestJan1(regionRows[0].date),
        new Date(
          new Date(regionRows[regionRows.length - 1].date).setDate(
            new Date(regionRows[regionRows.length - 1].date).getDate() + 5,
          ),
        )
          .toISOString()
          .slice(0, 10),
      ],
    },
    annotations: getYearAnnotations(allPlanktonData, -0.15),
    legend: {
      orientation: "h",
      x: 0,
      y: -0.3,
      xanchor: "left",
      yanchor: "bottom",
      bgcolor: "rgba(255,255,255,0.6)",
      bordercolor: "rgba(0,0,0,0.2)",
      borderwidth: 1,
    },
    showlegend: true,
  };

  Plotly.newPlot(targetDiv, traces, layout);
}

/************************************************************
 * INIT
 ************************************************************/

loadData();
