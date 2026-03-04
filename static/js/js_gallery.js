function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  captionText.innerHTML = dots[slideIndex - 1].alt;
}
function setColorbar(option) {
  if (option === "truecolor") {
    document.getElementById("colorbar").src = "";
    document.getElementById("units").innerHTML = "";
    document.getElementById("colorbar").style =
      "height: 50%; position: absolute; right: -100px; top: 75px; padding-bottom: 50px; z-index: 10;";
  } else if (option === "chlor_a") {
    document.getElementById("colorbar").src =
      "static/images/chlor_a_colorbar.png";
    document.getElementById("units").innerHTML = "(mg/m<sup>3</sup>)";
    document.getElementById("units").style =
      "font-size: 1.6vw; position: absolute; right: 3%; font-weight: bold; top: 46%; color: black; z-index: 11;";
    document.getElementById("colorbar").style =
      "height: 40%; position: absolute; right: 1%; top: 5%; padding-bottom: 20px; z-index: 10; background: rgba(255,255,255,0.4);";
  } else {
    /* regrouping this because all of these have the same units*/
    if (option === "diatoms") {
      document.getElementById("colorbar").src =
        "static/images/diatoms_colorbar.png";
    } else if (option === "dinoflagellates") {
      document.getElementById("colorbar").src =
        "static/images/dinoflagellates_colorbar.png";
    } else if (option === "greenalgae") {
      document.getElementById("colorbar").src =
        "static/images/greenalgae_colorbar.png";
    } else if (option === "prymnesiophytes") {
      document.getElementById("colorbar").src =
        "static/images/prymnesiophytes_colorbar.png";
    }
    document.getElementById("units").innerHTML = "(% Chlor-a)";
    document.getElementById("units").style =
      "font-size: 1.6vw; position: absolute; right: 3%; font-weight: bold; top: 46%; color: black; z-index: 11;";
    document.getElementById("colorbar").style =
      "height: 40%; position: absolute; right: 1%; top: 5%; padding-bottom: 20px; z-index: 10; background: rgba(255,255,255,0.4);";
  }
}
