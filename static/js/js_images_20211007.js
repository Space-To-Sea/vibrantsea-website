function truecolor(){
    document.getElementById('zoom').src = "static/images/original/" + document.getElementById('zoom').alt +"/truecolor.jpg";
    document.getElementById('colorbar').src="";
    document.getElementById('colorbar').width=0;
    document.getElementById('colorbar name').innerHTML="";
    document.getElementById('title').innerHTML="Ocean Phytoplankton: Truecolor";
  }
  function chlor_a(){
    document.getElementById('zoom').src = "static/images/original/" + document.getElementById('zoom').alt +"/chlor_a.jpg";
    document.getElementById('colorbar').src="static/images/chlor_a_colorbar.png";
    document.getElementById('colorbar').width=80;
    document.getElementById('colorbar').height=500;
    document.getElementById('colorbar name').style="position: fixed; right: -20px; bottom: 52%; color: white; background-color: rgba(2, 17, 27, .7); z-index: 5; padding: 8px; border-radius: 10px; font-size: small;";
    document.getElementById('colorbar name').innerHTML="Chlorophyll-a Concentration (mg/m<sup>3</sup>)";
    document.getElementById('title').innerHTML="Ocean Phytoplankton: Chlorophyll-a";
  }
  function diatoms(){
    document.getElementById('zoom').src = "static/images/original/" + document.getElementById('zoom').alt +"/diatoms.jpg";
    document.getElementById('colorbar').src="static/images/diatoms_colorbar.png";
    document.getElementById('colorbar').width=70;
    document.getElementById('colorbar name').style="position: fixed; right: 30px; bottom: 52%; color: white; background-color: rgba(2, 17, 27, .7); z-index: 5; padding: 8px; border-radius: 10px; font-size: small;";
    document.getElementById('colorbar name').innerHTML="Diatoms (% Chl-a)";
    document.getElementById('title').innerHTML="Ocean Phytoplankton: Diatoms";
  }
  function dinoflagellates(){
    document.getElementById('zoom').src = "static/images/original/" + document.getElementById('zoom').alt +"/dinoflagellates.jpg";
    document.getElementById('colorbar').src="static/images/dinoflagellates_colorbar.png";
    document.getElementById('colorbar').width=70;
    document.getElementById('colorbar name').style="position: fixed; right: 5px; bottom: 52%; color: white; background-color: rgba(2, 17, 27, .7); z-index: 5; padding: 8px; border-radius: 10px; font-size: small;";
    document.getElementById('colorbar name').innerHTML="Dinoflagellates (% Chl-a)";
    document.getElementById('title').innerHTML="Ocean Phytoplankton: Dinoflagellates";
  }
  function greenalgae(){
    document.getElementById('zoom').src = "static/images/original/" + document.getElementById('zoom').alt +"/greenalgae.jpg";
    document.getElementById('colorbar').src="static/images/greenalgae_colorbar.png";
    document.getElementById('colorbar').width=70;
    document.getElementById('colorbar name').style="position: fixed; right: 10px; bottom: 52%; color: white; background-color: rgba(2, 17, 27, .7); z-index: 5; padding: 8px; border-radius: 10px; font-size: small;";
    document.getElementById('colorbar name').innerHTML="Green Algae (% Chl-a)";
    document.getElementById('title').innerHTML="Ocean Phytoplankton: Green Algae";
  }
  function haptophytes(){
    document.getElementById('zoom').src = "static/images/original/" + document.getElementById('zoom').alt +"/prymnesiophytes.jpg";
    document.getElementById('colorbar').src="static/images/prymnesiophytes_colorbar.png";
    document.getElementById('colorbar').width=70;
    document.getElementById('colorbar name').style="position: fixed; right: 10px; bottom: 52%; color: white; background-color: rgba(2, 17, 27, .7); z-index: 5; padding: 8px; border-radius: 10px; font-size: small;";
    document.getElementById('colorbar name').innerHTML="Haptophytes (% Chl-a)";
    document.getElementById('title').innerHTML="Ocean Phytoplankton: Haptophytes";
  }

  function Jan1417(){
    document.getElementById('zoom').src = "static/images/original/01.14.2017/truecolor.jpg";
    document.getElementById('zoom').alt = "01.14.2017"
    document.getElementById('colorbar').src="";
    document.getElementById('colorbar').width=0;
    document.getElementById('colorbar name').innerHTML="";
    document.getElementById('date').innerHTML="Jan 14, 2017"
    document.getElementById('truecolor_thumb').src='static/images/original/01.14.2017/truecolor.jpg';
    document.getElementById('chlor_a_thumb').src='static/images/original/01.14.2017/chlor_a.jpg';
    document.getElementById('diatoms_thumb').src='static/images/original/01.14.2017/diatoms.jpg';
    document.getElementById('dinoflagellates_thumb').src='static/images/original/01.14.2017/dinoflagellates.jpg';
    document.getElementById('greenalgae_thumb').src='static/images/original/01.14.2017/greenalgae.jpg';
    document.getElementById('prymnesiophytes_thumb').src='static/images/original/01.14.2017/prymnesiophytes.jpg';
    document.getElementById('date').innerHTML="Jan 14, 2017";
  }
  function Mar0317(){
    document.getElementById('zoom').src = "static/images/original/03.03.2017/truecolor.jpg";
    document.getElementById('zoom').alt = "03.03.2017"
    document.getElementById('colorbar').src="";
    document.getElementById('colorbar').width=0;
    document.getElementById('colorbar name').innerHTML="";
    document.getElementById('truecolor_thumb').src='static/images/original/03.03.2017/truecolor.jpg';
    document.getElementById('chlor_a_thumb').src='static/images/original/03.03.2017/chlor_a.jpg';
    document.getElementById('diatoms_thumb').src='static/images/original/03.03.2017/diatoms.jpg';
    document.getElementById('dinoflagellates_thumb').src='static/images/original/03.03.2017/dinoflagellates.jpg';
    document.getElementById('greenalgae_thumb').src='static/images/original/03.03.2017/greenalgae.jpg';
    document.getElementById('prymnesiophytes_thumb').src='static/images/original/03.03.2017/prymnesiophytes.jpg';
    document.getElementById('date').innerHTML="Mar 3, 2017";
  }
  function Jul0917(){
    document.getElementById('zoom').src = "static/images/original/07.09.2017/truecolor.jpg";
    document.getElementById('zoom').alt = "07.09.2017"
    document.getElementById('colorbar').src="";
    document.getElementById('colorbar').width=0;
    document.getElementById('colorbar name').innerHTML="";
    document.getElementById('truecolor_thumb').src='static/images/original/07.09.2017/truecolor.jpg';
    document.getElementById('chlor_a_thumb').src='static/images/original/07.09.2017/chlor_a.jpg';
    document.getElementById('diatoms_thumb').src='static/images/original/07.09.2017/diatoms.jpg';
    document.getElementById('dinoflagellates_thumb').src='static/images/original/07.09.2017/dinoflagellates.jpg';
    document.getElementById('greenalgae_thumb').src='static/images/original/07.09.2017/greenalgae.jpg';
    document.getElementById('prymnesiophytes_thumb').src='static/images/original/07.09.2017/prymnesiophytes.jpg';
  }
  function Aug1017(){
    document.getElementById('zoom').src = "static/images/original/08.10.2017/truecolor.jpg";
    document.getElementById('zoom').alt = "08.10.2017"
    document.getElementById('colorbar').src="";
    document.getElementById('colorbar').width=0;
    document.getElementById('colorbar name').innerHTML="";
    document.getElementById('truecolor_thumb').src='static/images/original/08.10.2017/truecolor.jpg';
    document.getElementById('chlor_a_thumb').src='static/images/original/08.10.2017/chlor_a.jpg';
    document.getElementById('diatoms_thumb').src='static/images/original/08.10.2017/diatoms.jpg';
    document.getElementById('dinoflagellates_thumb').src='static/images/original/08.10.2017/dinoflagellates.jpg';
    document.getElementById('greenalgae_thumb').src='static/images/original/08.10.2017/greenalgae.jpg';
    document.getElementById('prymnesiophytes_thumb').src='static/images/original/08.10.2017/prymnesiophytes.jpg';
  }
  function Oct1317(){
    document.getElementById('zoom').src = "static/images/original/10.13.2017/truecolor.jpg";
    document.getElementById('zoom').alt = "10.13.2017"
    document.getElementById('colorbar').src="";
    document.getElementById('colorbar').width=0;
    document.getElementById('colorbar name').innerHTML="";
    document.getElementById('truecolor_thumb').src='static/images/original/10.13.2017/truecolor.jpg';
    document.getElementById('chlor_a_thumb').src='static/images/original/10.13.2017/chlor_a.jpg';
    document.getElementById('diatoms_thumb').src='static/images/original/10.13.2017/diatoms.jpg';
    document.getElementById('dinoflagellates_thumb').src='static/images/original/10.13.2017/dinoflagellates.jpg';
    document.getElementById('greenalgae_thumb').src='static/images/original/10.13.2017/greenalgae.jpg';
    document.getElementById('prymnesiophytes_thumb').src='static/images/original/10.13.2017/prymnesiophytes.jpg';
  }
  function Nov3017(){
    document.getElementById('zoom').src = "static/images/original/11.30.2017/truecolor.jpg";
    document.getElementById('zoom').alt = "11.30.2017"
    document.getElementById('colorbar').src="";
    document.getElementById('colorbar').width=0;
    document.getElementById('colorbar name').innerHTML="";
    document.getElementById('truecolor_thumb').src='static/images/original/11.30.2017/truecolor.jpg';
    document.getElementById('chlor_a_thumb').src='static/images/original/11.30.2017/chlor_a.jpg';
    document.getElementById('diatoms_thumb').src='static/images/original/11.30.2017/diatoms.jpg';
    document.getElementById('dinoflagellates_thumb').src='static/images/original/11.30.2017/dinoflagellates.jpg';
    document.getElementById('greenalgae_thumb').src='static/images/original/11.30.2017/greenalgae.jpg';
    document.getElementById('prymnesiophytes_thumb').src='static/images/original/11.30.2017/prymnesiophytes.jpg';
  }
  function Dec1617(){
    document.getElementById('zoom').src = "static/images/original/12.16.2017/truecolor.jpg";
    document.getElementById('zoom').alt = "12.16.2017"
    document.getElementById('colorbar').src="";
    document.getElementById('colorbar').width=0;
    document.getElementById('colorbar name').innerHTML="";
    document.getElementById('truecolor_thumb').src='static/images/original/12.16.2017/truecolor.jpg';
    document.getElementById('chlor_a_thumb').src='static/images/original/12.16.2017/chlor_a.jpg';
    document.getElementById('diatoms_thumb').src='static/images/original/12.16.2017/diatoms.jpg';
    document.getElementById('dinoflagellates_thumb').src='static/images/original/12.16.2017/dinoflagellates.jpg';
    document.getElementById('greenalgae_thumb').src='static/images/original/12.16.2017/greenalgae.jpg';
    document.getElementById('prymnesiophytes_thumb').src='static/images/original/12.16.2017/prymnesiophytes.jpg';
  }
  function Jan0118(){
    document.getElementById('zoom').src = "static/images/original/01.01.2018/truecolor.jpg";
    document.getElementById('zoom').alt = "01.01.2018"
    document.getElementById('colorbar').src="";
    document.getElementById('colorbar').width=0;
    document.getElementById('colorbar name').innerHTML="";
    document.getElementById('truecolor_thumb').src='static/images/original/01.01.2018/truecolor.jpg';
    document.getElementById('chlor_a_thumb').src='static/images/original/01.01.2018/chlor_a.jpg';
    document.getElementById('diatoms_thumb').src='static/images/original/01.01.2018/diatoms.jpg';
    document.getElementById('dinoflagellates_thumb').src='static/images/original/01.01.2018/dinoflagellates.jpg';
    document.getElementById('greenalgae_thumb').src='static/images/original/01.01.2018/greenalgae.jpg';
    document.getElementById('prymnesiophytes_thumb').src='static/images/original/01.01.2018/prymnesiophytes.jpg';
  }
  function Feb0218(){
    document.getElementById('zoom').src = "static/images/original/02.18.2018/truecolor.jpg";
    document.getElementById('zoom').alt = "02.18.2018"
    document.getElementById('colorbar').src="";
    document.getElementById('colorbar').width=0;
    document.getElementById('colorbar name').innerHTML="";
    document.getElementById('truecolor_thumb').src='static/images/original/02.18.2018/truecolor.jpg';
    document.getElementById('chlor_a_thumb').src='static/images/original/02.18.2018/chlor_a.jpg';
    document.getElementById('diatoms_thumb').src='static/images/original/02.18.2018/diatoms.jpg';
    document.getElementById('dinoflagellates_thumb').src='static/images/original/02.18.2018/dinoflagellates.jpg';
    document.getElementById('greenalgae_thumb').src='static/images/original/02.18.2018/greenalgae.jpg';
    document.getElementById('prymnesiophytes_thumb').src='static/images/original/02.18.2018/prymnesiophytes.jpg';
  }
  function Apr2318(){
    document.getElementById('zoom').src = "static/images/original/04.23.2018/truecolor.jpg";
    document.getElementById('zoom').alt = "04.23.2018"
    document.getElementById('colorbar').src="";
    document.getElementById('colorbar').width=0;
    document.getElementById('colorbar name').innerHTML="";
    document.getElementById('truecolor_thumb').src='static/images/original/04.23.2018/truecolor.jpg';
    document.getElementById('chlor_a_thumb').src='static/images/original/04.23.2018/chlor_a.jpg';
    document.getElementById('diatoms_thumb').src='static/images/original/04.23.2018/diatoms.jpg';
    document.getElementById('dinoflagellates_thumb').src='static/images/original/04.23.2018/dinoflagellates.jpg';
    document.getElementById('greenalgae_thumb').src='static/images/original/04.23.2018/greenalgae.jpg';
    document.getElementById('prymnesiophytes_thumb').src='static/images/original/04.23.2018/prymnesiophytes.jpg';
  }
  function Jun2618(){
    document.getElementById('zoom').src = "static/images/original/06.26.2018/truecolor.jpg";
    document.getElementById('zoom').alt = "06.26.2018"
    document.getElementById('colorbar').src="";
    document.getElementById('colorbar').width=0;
    document.getElementById('colorbar name').innerHTML="";
    document.getElementById('truecolor_thumb').src='static/images/original/06.26.2018/truecolor.jpg';
    document.getElementById('chlor_a_thumb').src='static/images/original/06.26.2018/chlor_a.jpg';
    document.getElementById('diatoms_thumb').src='static/images/original/06.26.2018/diatoms.jpg';
    document.getElementById('dinoflagellates_thumb').src='static/images/original/06.26.2018/dinoflagellates.jpg';
    document.getElementById('greenalgae_thumb').src='static/images/original/06.26.2018/greenalgae.jpg';
    document.getElementById('prymnesiophytes_thumb').src='static/images/original/06.26.2018/prymnesiophytes.jpg';
  }
  function Jul1218(){
    document.getElementById('zoom').src = "static/images/original/07.12.2018/truecolor.jpg";
    document.getElementById('zoom').alt = "07.12.2018"
    document.getElementById('colorbar').src="";
    document.getElementById('colorbar').width=0;
    document.getElementById('colorbar name').innerHTML="";
    document.getElementById('truecolor_thumb').src='static/images/original/07.12.2018/truecolor.jpg';
    document.getElementById('chlor_a_thumb').src='static/images/original/07.12.2018/chlor_a.jpg';
    document.getElementById('diatoms_thumb').src='static/images/original/07.12.2018/diatoms.jpg';
    document.getElementById('dinoflagellates_thumb').src='static/images/original/07.12.2018/dinoflagellates.jpg';
    document.getElementById('greenalgae_thumb').src='static/images/original/07.12.2018/greenalgae.jpg';
    document.getElementById('prymnesiophytes_thumb').src='static/images/original/07.12.2018/prymnesiophytes.jpg';
  }
  function Aug2918(){
    document.getElementById('zoom').src = "static/images/original/08.29.2018/truecolor.jpg";
    document.getElementById('zoom').alt = "08.29.2018"
    document.getElementById('colorbar').src="";
    document.getElementById('colorbar').width=0;
    document.getElementById('colorbar name').innerHTML="";
    document.getElementById('truecolor_thumb').src='static/images/original/08.29.2018/truecolor.jpg';
    document.getElementById('chlor_a_thumb').src='static/images/original/08.29.2018/chlor_a.jpg';
    document.getElementById('diatoms_thumb').src='static/images/original/08.29.2018/diatoms.jpg';
    document.getElementById('dinoflagellates_thumb').src='static/images/original/08.29.2018/dinoflagellates.jpg';
    document.getElementById('greenalgae_thumb').src='static/images/original/08.29.2018/greenalgae.jpg';
    document.getElementById('prymnesiophytes_thumb').src='static/images/original/08.29.2018/prymnesiophytes.jpg';
  }
  function Mar0919(){
    document.getElementById('zoom').src = "static/images/original/03.09.2019/truecolor.jpg";
    document.getElementById('zoom').alt = "03.09.2019"
    document.getElementById('colorbar').src="";
    document.getElementById('colorbar').width=0;
    document.getElementById('colorbar name').innerHTML="";
    document.getElementById('truecolor_thumb').src='static/images/original/03.09.2019/truecolor.jpg';
    document.getElementById('chlor_a_thumb').src='static/images/original/03.09.2019/chlor_a.jpg';
    document.getElementById('diatoms_thumb').src='static/images/original/03.09.2019/diatoms.jpg';
    document.getElementById('dinoflagellates_thumb').src='static/images/original/03.09.2019/dinoflagellates.jpg';
    document.getElementById('greenalgae_thumb').src='static/images/original/03.09.2019/greenalgae.jpg';
    document.getElementById('prymnesiophytes_thumb').src='static/images/original/03.09.2019/prymnesiophytes.jpg';
  }
  



  document.addEventListener('DOMContentLoaded', function () {
    var imageElement = document.getElementById('myContent').querySelector('img');
    
    if (imageElement.complete) {
      init();
    } else {
        imageElement.onload = init;
    }
    
    function init() {
        var rangeElement = document.querySelector('[data-zoom-range]');

        var wzoom = WZoom.create('#myContent', {
            type: 'html',
            width: imageElement.naturalWidth,
            height: imageElement.naturalHeight,
            dragScrollableOptions: {
                onGrab: function () {
                    document.getElementById('myWindow').style.cursor = 'grabbing';
                },
                onDrop: function () {
                    document.getElementById('myWindow').style.cursor = 'grab';
                }
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
                document.getElementById('altitude').innerHTML="Camera Altitude: " + (227 - Math.round(rangeElement.value*120)) + " km"
            }
        });
        window.addEventListener('resize', function () {
            wzoom.prepare();
        });
        rangeElement.addEventListener('input', function () {
            let newScale = Number(rangeElement.value);

            if (newScale > wzoom.content.currentScale) {
                wzoom.zoomUp();
            } else {
                wzoom.zoomDown();
            }
        });
    }
});