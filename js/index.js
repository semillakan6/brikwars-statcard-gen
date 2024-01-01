//Setup FilePond
const myPond = $('.my-pond').filepond({
    allowMultiple: false,
});

document.addEventListener('DOMContentLoaded', function () {
    let inputElement1 = document.querySelector('.my-pond1');
    let pond1 = FilePond.create(inputElement1);

    pond1.on('addfile', function (error, fileItem) {
        if (error) {
            console.error('Oh no!', error);
            return;
        }

        statcard.titleImage.handleImageChange(fileItem);
    });

    let inputElement2 = document.querySelector('.my-pond2');
    let pond2 = FilePond.create(inputElement2);

    pond2.on('addfile', function (error, fileItem) {
        if (error) {
            console.error('Oh no!', error);
            return;
        }

        statcard.watermarkImage.handleImageChange(fileItem);
    });
});

let moc, statcard;

function calculate() {
    var form = document.forms[0];
    moc.applyFrom(form);
    moc.calculate();

    moc.updateForm(form);
    statcard.drawForeground();
};

function changeLayout() {
    var form = document.forms[0];
    var selection = form.statcard_format.options[form.statcard_format.selectedIndex].value;
    var layout = layouts[selection];
    var name = layout.name;
    var dimensions = layout.dimensions;

    // update html/css part
    changeLayoutFor(document.getElementById("statcard_div_front"), name, dimensions);
    changeLayoutFor(document.getElementById("statcard_div_back"), name, dimensions);

    // update and redraw
    statcard.changeLayout(layout);
}

function changeLayoutFor(element, name, dimensions) {
    for (var i = 0; i < element.childNodes.length; i++) {
        var node = element.childNodes[i];
        if (node.nodeType != 1) continue;
        if (node.tagName.toLowerCase() != "canvas") continue;

        node.width = dimensions.wdt;
        node.height = dimensions.hgt;
    }

    element.className = name;
}

function clearForm() {
    moc = new Moc();
    moc.init(document.forms[0]);
    statcard = new Statcard();
    statcard.init();
    statcard.drawForeground();
    document.forms[0].moc_image2_opacity.value = 100;
    document.forms[0].statcard_format.selectedIndex = 0;
    statcard.updateHelp(document.forms[0]);
}

function downloadImage(name, url) {
    // Create invisible link
    var invisibleLink = document.createElement('a');
    invisibleLink.style.display = 'none';
    document.body.appendChild(invisibleLink);

    // Set attributes and click
    invisibleLink.href = url;
    invisibleLink.download = name;
    invisibleLink.click();

    // Clean up document body
    document.body.removeChild(invisibleLink);
}

function openDownload() {
    //document.getElementById("print_format").style.display = "table";
    Swal.fire({
        title: 'Which format?',
        html: `
          <table>
              <tbody>
                  <tr>
                      <td>
                          <img src="images/printyourself.jpg" class="img-fluid" />
                          <div>One file for front and back side, foldable and with a black frame.</div>
                          <button class="btn btn-outline-dark" type="button" id="foldable">Download Foldable</button>
                      </td>
                      <td>
                          <img src="images/printprofessionally.jpg" class="img-fluid" />
                          <div>Two separate files for front and back, with bleed.</div>
                          <button class="btn btn-outline-dark" type="button" id="front">Download Front</button>
                          <button class="btn btn-outline-dark" type="button" id="back">Download Back</button>
                      </td>
                  </tr>
              </tbody>
          </table>`,
        showCloseButton: true,
        didOpen: () => {

            document.getElementById('front').onclick = function () {
                var name = "Untitled Statcard - Front";
                if (moc.name) name = moc.name + " Statcard - Front";
                var url = statcard.createFrontImage().toDataURL("image/png");
                downloadImage(name + ".png", url);
            }

            document.getElementById('back').onclick = function () {
                var name = "Untitled Statcard - Back";
                if (moc.name) name = moc.name + " Statcard - Back";
                var url = statcard.createBackImage().toDataURL("image/png");
                downloadImage(name + ".png", url);
            }

            document.getElementById('foldable').onclick = function () {
                var name = "Untitled Statcard";
                if (moc.name) name = moc.name + " Statcard";
                var url = statcard.createFoldableImage().toDataURL("image/png");
                downloadImage(name + ".png", url);
            }

        },
    })
}

function closeDownload() {
    document.getElementById("print_format").style.display = "none";
}

function downloadStatcardFront(link) {
    var name = "Untitled Statcard - Front";
    if (moc.name) name = moc.name + " Statcard - Front";
    var url = statcard.createFrontImage().toDataURL("image/png");
    link.download = name + ".png";
    link.href = url;
}

function downloadStatcardBack(link) {
    var name = "Untitled Statcard - Back";
    if (moc.name) name = moc.name + " Statcard - Back";
    var url = statcard.createBackImage().toDataURL("image/png");
    link.download = name + ".png";
    link.href = url;
}

function downloadStatcardFoldable(link) {
    var name = "Untitled Statcard";
    if (moc.name) name = moc.name + " Statcard";
    var url = statcard.createFoldableImage().toDataURL("image/png");
    link.download = name + ".png";
    link.href = url;
}

function userAgentIsIE() {
    var ua = window.navigator.userAgent;
    return ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
}

function printStatcard() {
    var canvas = statcard.createFoldableImage();
    var layout = statcard.layout;

    canvas.style.width = canvas.width / layout.dpi + "in";
    canvas.style.height = canvas.height / layout.dpi + "in";

    var name = "Untitled Statcard";
    if (moc.name) name = moc.name + " Statcard";
    
    var printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>" + name + "</title></head><body></body></html>");
    printWindow.document.body.appendChild(canvas);
    printWindow.document.close();
    printWindow.print();
}

function updateTitleImage() {
    statcard.titleImage.updateDefaultPicture();
}

function updateStatcardColor1() {
    var form = document.forms[0];
    moc.applyFrom(form);
    statcard.drawColoredArea1();
}

function updateStatcardColor2() {
    var form = document.forms[0];
    moc.applyFrom(form);
    statcard.drawColoredArea2();
}

function updateStatcardColor3() {
    var form = document.forms[0];
    moc.applyFrom(form);
    statcard.drawColoredArea3();
}

function updateWatermarkOpacity() {
    var opacity = document.forms[0].moc_image2_opacity.value / 100;
    document.getElementById("statcard_watermark_image").style.opacity = opacity;
}

function displayIEWarning() {
    if (userAgentIsIE()) {
        document.getElementById("ie_warning").style.display = "block";
    }
}