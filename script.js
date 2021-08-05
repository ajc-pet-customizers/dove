var features = new Map();
features.set("color",["white","white"]);
features.set("eye","happy");
features.set("wings","flared");
features.set("feathers","curled");
features.set("pattern","none_p");

setColorButtons("color_grid"); 
setEyeButtons();
setOtherButtons();

updateColor("white");
updateSecondary("white");
updateEye("happy");
updatePattern("none_p");
updateWings("flared");
updateFeathers("curled");

document.getElementById("save").addEventListener("click", function() { mergeImages("save"); } );
document.getElementById("new_tab").addEventListener("click", function() { mergeImages("new_tab"); } );
document.getElementById("randomize").addEventListener("click", function() { randomize(); } );
document.getElementById("bg_contrast").addEventListener("click", function() { flip_bg(); } );
light = false;

var myVar;
function loaded() {
  myVar = setTimeout(showPage, 2500);
}

function showPage() {
  document.getElementById("loading_container").style.display = "none";
}

function randomize() {
  var features = [["dark red", "light red", "dark pink", "light pink", "dark purple", "light purple", "black", "white", "dark blue", "teal", "burple", "yellow", "dark green", "forest green", "lime", "medium green", "dark brown", "light brown", "orange", "mustard"],["lash","boy","happy","squint","slit","x"],["thin","teardrop","round","flared"],["none_f","poofy","short","curled"],["none_p","pigeon","underbelly","nosebump"]];
  var randoms = []

  for (var i = 0; i < features.length; i++) {
    if (i==0) {
      randoms.push(features[i][Math.floor(Math.random()*features[i].length)])
    }
    randoms.push(features[i][Math.floor(Math.random()*features[i].length)]);
  }
  updateColor(randoms[0]);
  updateSecondary(randoms[1]);
  updateEye(randoms[2]);
  updateWings(randoms[3]);
  updateFeathers(randoms[4]);
  updatePattern(randoms[5]);
}

function flip_bg() {
  if (!light) {
    document.getElementById("dove_container").style.backgroundImage = "url('misc_assets/light bg.png'"+")";
  }
  else {
    document.getElementById("dove_container").style.backgroundImage = "url('misc_assets/dark bg.png'"+")";
  }
  light = !light;
}

function setColorButtons(className) {
var colorNames = ["dark red", "light red", "dark pink", "light pink", "dark purple", "light purple", "black", "white", "dark blue", "teal", "burple", "yellow", "dark green", "forest green", "lime", "medium green", "dark brown", "light brown", "orange", "mustard"];
var colorRGBs = [[167,45,26], [228,92,70], [228,125,213], [246,187,251], [131,105,186], [187,160,210], [37,37,36], [255, 255, 255], [63,95,213], [88,194,219], [116,127,235], [255,243,141], [53,107,37], [77,171,90], [161,197,96], [133,202,147], [166,97,36], [229,180,110], [231,144,73], [250,213,108]];
for (var i = 0; i < colorNames.length; i++) {
  var b = document.createElement("BUTTON");
  b.className = "color_grid_button";
  b.id = colorNames[i]+"1";
  b.style.backgroundColor = "rgb("+colorRGBs[i].join(",")+")";
  document.getElementById(className+"_1").appendChild(b);
  b.addEventListener("click", function() { updateColor(this.id.substring(0,this.id.length - 1)) } );

  var b2 = document.createElement("BUTTON");
  b2.className = "color_grid_button";
  b2.id = colorNames[i]+"2";
  b2.style.backgroundColor = "rgb("+colorRGBs[i].join(",")+")";
  document.getElementById(className+"_2").appendChild(b2);
  b2.addEventListener("click", function() { updateSecondary(this.id.substring(0,this.id.length - 1)) } );
  }
}

function setEyeButtons() {
var eyeAssets = ["lash","boy","happy","squint","slit","x"];

for (var i = 0; i < eyeAssets.length; i++) {
  var b = document.createElement("BUTTON");
  b.className = "cell_button";
  b.id = ""+eyeAssets[i];
  b.style.backgroundImage = "url('button_assets/"+eyeAssets[i]+" cell.png'"+")";
  b.addEventListener("click", function() { updateEye(this.id) } );
  document.getElementsByClassName("eye_panel_div")[0].appendChild(b);
  }
}

function setOtherButtons() {
var wings = ["thin","teardrop","round","flared"];
var feathers = ["none_f","poofy","short","curled"];
var patterns = ["none_p","pigeon","underbelly","nosebump"];
for (var i = 0; i < 4; i++) {
  var h = document.createElement("BUTTON");
  h.className = "cell_button";
  h.id = ""+wings[i];
  h.style.backgroundImage = "url('button_assets/"+wings[i]+" cell.png'"+")";
  h.addEventListener("click", function() { updateWings(this.id) } );
  document.getElementsByClassName("other_panel_div")[0].appendChild(h);

  var a = document.createElement("BUTTON");
  a.className = "cell_button";
  a.id = ""+feathers[i];
  a.style.backgroundImage = "url('button_assets/"+feathers[i]+" cell.png'"+")";
  document.getElementsByClassName("other_panel_div")[0].appendChild(a);
  a.addEventListener("click", function() { updateFeathers(this.id) } );

  var p = document.createElement("BUTTON");
  p.className = "cell_button";
  p.id = ""+patterns[i];
  p.style.backgroundImage = "url('button_assets/"+patterns[i]+" cell.png'"+")";
  p.addEventListener("click", function() { updatePattern(this.id) } );
  document.getElementsByClassName("other_panel_div")[0].appendChild(p);
  }
}

function updateBorders(buttonId, newButtonId) {
  var oldB = document.getElementById(buttonId);
  var newB = document.getElementById(newButtonId);
  if (oldB != null && newB != null) {
    oldB.style.outline = "none";
    newB.style.outline = "0.3vw solid #FBB148";
    oldB.style.zIndex = 0;
    newB.style.zIndex = 1000;
  }
}

//Functions for color/feature updating below
function updateColor(newColor) {
  updateBorders(features.get("color")[0]+"1",newColor+"1");
  features.set("color",[newColor,features.get("color")[1]]);
  document.getElementById("base").src = "dove_assets/base/"+newColor+".png";
  updateWings(features.get("wings"));
  updatePattern(features.get("pattern"));
  updateFeathers(features.get("feathers"));
}

function updateSecondary(newColor) {
  document.getElementById("tips").src = "dove_assets/tips/"+newColor+".png";
  updateBorders(features.get("color")[1]+"2",newColor+"2");
  features.set("color",[features.get("color")[0],newColor]);
}

function updateEye(newEye) {
  document.getElementById("eye").src = "dove_assets/eye/"+newEye+".png";
  updateBorders(features.get("eye"),newEye);
  features.set("eye",newEye);
}

function updatePattern(newPattern) {
  if (newPattern == "none_p") {
    document.getElementById("pattern").src = "misc_assets/empty.png";
  }
  else { 
    document.getElementById("pattern").src = "dove_assets/pattern/"+newPattern+"/"+features.get("color")[0]+".png";
  }
  updateBorders(features.get("pattern"),newPattern);
  features.set("pattern",newPattern);
  updateWings(features.get("wings"));
  updateFeathers(features.get("feathers"));
}

function updateFeathers(newFeathers) {
  if (newFeathers == "none_f") {
    document.getElementById("feathers").src = "misc_assets/empty.png";
  }
  else if (features.get("pattern") == "nosebump") {
    document.getElementById("feathers").src = "dove_assets/feathers/nosebump feathers/"+newFeathers+"/"+features.get("color")[0]+".png";
  }
  else if (features.get("pattern") == "pigeon") {
    document.getElementById("feathers").src = "dove_assets/feathers/pigeon feathers/"+newFeathers+"/"+features.get("color")[0]+".png";
  }
  else {
    document.getElementById("feathers").src = "dove_assets/feathers/normal feathers/"+newFeathers+"/"+features.get("color")[0]+".png";
  }
  updateBorders(features.get("feathers"),newFeathers);
  features.set("feathers",newFeathers);
}

function updateWings(newWings) {
  if (features.get("pattern") == "pigeon") {
    document.getElementById("wings").src = "dove_assets/wings/pigeon wings/"+newWings+"/"+features.get("color")[0]+".png";
  }
  else {
    document.getElementById("wings").src = "dove_assets/wings/normal wings/"+newWings+"/"+features.get("color")[0]+".png";
  }
  document.getElementById("wings_shadow").src = "dove_assets/wings/"+newWings+" shadow.png";
  updateBorders(features.get("wings"),newWings);
  features.set("wings",newWings);
}

function mergeImages(type) {
  var c = document.getElementById("dove_canvas");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, dove_canvas.width, dove_canvas.height);

  var base = new Image();
  var pattern = new Image();
  var feathers = new Image();
  var wings = new Image();
  var wings_shadow = new Image();
  var tips = new Image();
  var eye = new Image();
  var body_shadow = new Image();
  var watermark = new Image();

  base.src = document.getElementById("base").src;
  base.onload = function() {
    ctx.drawImage(base, 0, 0);
    pattern.src = document.getElementById("pattern").src;
    pattern.onload = function() {
      ctx.drawImage(pattern, 0, 0);
      feathers.src = document.getElementById("feathers").src;
      feathers.onload = function() {
        ctx.drawImage(feathers, 0, 0);
        wings.src = document.getElementById("wings").src;
        wings.onload = function() {
          ctx.drawImage(wings, 0, 0);
          wings_shadow.src = document.getElementById("wings_shadow").src;
          wings_shadow.onload = function() {
            ctx.drawImage(wings_shadow, 0, 0);
            tips.src = document.getElementById("tips").src;
            tips.onload = function() {
              ctx.drawImage(tips, 0, 0);
              eye.src = document.getElementById("eye").src;
              eye.onload = function() {
                ctx.drawImage(eye, 0, 0);
                body_shadow.src = document.getElementById("body_shadow").src;
                body_shadow.onload = function() {
                  ctx.drawImage(body_shadow, 0, 0);
                  watermark.src = document.getElementById("watermark").src;
                  watermark.onload = function() {
                    ctx.drawImage(watermark, 0, 0);
                    var image = dove_canvas.toDataURL("image/png");
                    if (type == "new_tab") {
                      var newTab = window.open();
                      newTab.document.write('<img src="' + image + '" width="1000" height="1000"/>');
                    } else {
                      var a = document.createElement('a');
                      a.href = image;
                      a.download = "dove.png";
                      a.click();
                    }

                  }
                }
              }
            }
          }
        }
      }
    }
  }
}