$(document).ready(function() {

    function convertToBase64() {
        //Read File
        var selectedFile = document.getElementById("file").files;

        //Check File is not Empty

        if (selectedFile.length > 0) {
            // Select the very first file from list
            var fileToLoad = selectedFile[0];
            // FileReader function for read the file.
            var fileReader = new FileReader();
            var base64;
            // Onload of file read the file content
            fileReader.onload = function(fileLoadedEvent) {
                base64 = fileLoadedEvent.target.result;
                // Print data in console
                console.log(base64);
                renderPDF(base64, document.getElementById("documentRender"), {
                    scale: 1.55,
                });
            };
            // Convert data to base64
            fileReader.readAsDataURL(fileToLoad);
        }
    }

    ("use strict");

    var BASE64_MARKER = ";base64,";

    function convertDataBase64ToBinary(dataBase64) {
        var base64Index = dataBase64.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
        var base64 = dataBase64.substring(base64Index);
        var raw = window.atob(base64);
        var rawLength = raw.length;
        var array = new Uint8Array(new ArrayBuffer(rawLength));

        for (var i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i);
        }
        return array;
    }

    function renderPDF(url, canvasContainer, options) {
        var pdfdata = url;
        //alert(pdfdata);
        var pdfjs = window["pdfjs-dist/build/pdf"];
        var options = options || { scale: 0.2 };

        function renderPage(page) {
            var viewport = page.getViewport(options.scale);
            var canvas = document.createElement('canvas');

            // var canvas = document.getElementById("the-canvas");
            var contex = canvas.getContext("2d");
            var renderContext = {
                canvasContext: contex,
                viewport: viewport,
            };

            canvas.height = viewport.height;
            canvas.width = viewport.width;
            canvasContainer.appendChild(canvas);

            page.render(renderContext);
        }

        function pageNumber(pdfDoc) {
            for (var page = 1; page <= pdfDoc.numPages; page++)
                pdfDoc.getPage(page).then(renderPage);
            // pdfDoc.getPage(1).then(renderPage);
            document.getElementById("pageOf").innerHTML += pdfDoc.numPages;
        }

        pdfdata2 = convertDataBase64ToBinary(pdfdata);
        alert(pdfdata2);
        // Loaded via <script> tag, create shortcut to access PDF.js exports.
        var pdfjsLib = window["pdfjs-dist/build/pdf"];

        // The workerSrc property shall be specified.
        pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.943/pdf.worker.min.js";

        var setPDF = pdfjsLib.getDocument(pdfdata);
        setPDF.then(pageNumber);
    }

    $("#file").change(function() {
        var val = convertToBase64();
        alert(val);

        var BASE64_MARKER = ";base64,";

        renderPDF(pdfData, document.getElementById("documentRender"), {
            scale: 0.2,
        });
    });


});