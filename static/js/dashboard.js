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

function setChartType(chartType) {
  currentChartType = chartType;
  render();
}

function nearestJan1(dateStr) {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const jan1 = new Date(year, 0, 1); // January 1 of that year
  return jan1.toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function render() {
  if (!allPlanktonData) return;

  // Clear any previous rendered elements
  const chartDiv = document.getElementById("active-chart");
  const controlsDiv = document.getElementById("chart-controls");
  controlsDiv.innerHTML = "";
  chartDiv.innerHTML = "";

  if (currentChartType === "bar") {
    drawStackedBar("active-chart", allPlanktonData, 1);

    const startInput = document.createElement("input");
    startInput.type = "date";
    startInput.id = "start-date";

    const endInput = document.createElement("input");
    endInput.type = "date";
    endInput.id = "end-date";

    const maxYInput = document.createElement("input");
    maxYInput.type = "number";
    maxYInput.id = "max-y";

    const applyButton = document.createElement("button");
    applyButton.textContent = "Apply";
    applyButton.onclick = function () {
      const updates = {};
      const start = startInput.value;
      const end = endInput.value;
      const maxY = maxYInput.value;
      if (start && end) {
        updates["xaxis.range"] = [start, end];
      }
      if (maxY) {
        const maxYFloat = parseFloat(maxY);
        if (!isNaN(maxYFloat) && maxYFloat > 0) {
          updates["yaxis.range"] = [0, maxYFloat];
        }
      }
      Plotly.relayout("active-chart", updates);
    };
    // Pre-fill start and end dates with min/max dates
    const dates = allPlanktonData.map((r) => r.date);
    startInput.value = nearestJan1(dates[0]);
    endInput.value = dates[dates.length - 1];

    // Add to controls div
    controlsDiv.appendChild(document.createTextNode("Start: "));
    controlsDiv.appendChild(startInput);
    controlsDiv.appendChild(document.createTextNode(" End: "));
    controlsDiv.appendChild(endInput);
    controlsDiv.appendChild(document.createTextNode("Max Y: "));
    controlsDiv.appendChild(maxYInput);
    controlsDiv.appendChild(applyButton);
  }
}

function calcOtherCategory(rows) {
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

function drawStackedBar(targetDiv, data, regionNum) {
  const regionRows = data.filter((r) => parseInt(r.region) === regionNum);

  const traces = Object.keys(PLANKTON_CONFIG)
    .filter((key) => key !== "chlor_a")
    .map((key) => {
      return {
        x: regionRows.map((r) => r.date),
        y: regionRows.map((r) => parseFloat(r[key + "_avg"])),
        name: PLANKTON_CONFIG[key].name,
        type: "bar",
        marker: { color: PLANKTON_CONFIG[key].color },
      };
    });

  const layout = {
    barmode: "stack",
    title: `Region ${regionNum}: Phytoplankton Concentration`,
    yaxis: { title: "mg per m^3", hoverformat: ".2f" },
    xaxis: {
      type: "date",
      tickformat: "%b %Y",
      showgrid: true,
      range: [
        nearestJan1(regionRows[0].date),
        regionRows[regionRows.length - 1].date,
      ],
    },
    showlegend: true,
  };

  Plotly.newPlot(targetDiv, traces, layout);
}
