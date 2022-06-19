$(document).ready(function() {
    /*$(".page").droppable({
      accept: ".insertFloatButton",
      activeClass: "ui-state-default",
      hoverClass: "ui-state-hover",
      drop: function (event, ui) {
        var newClone = $(ui.helper).clone();
  
        //$(this).append(newClone);
        var currentDrop = $(this);
        var element = $(".ui-draggable-dragging");
        return element.clone().appendTo(currentDrop);
      },
    });*/
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
        var options = options || { scale: 1 };

        function renderPage(page) {
            var viewport = page.getViewport(options.scale);
            var canvas = document.createElement('canvas');

            var canvas = document.getElementById("the-canvas");
            var contex = canvas.getContext("2d");
            var renderContext = {
                canvasContext: contex,
                viewport: viewport,
            };

            canvas.height = viewport.height;
            canvas.width = viewport.width;
            //canvasContainer.appendChild(canvas);

            page.render(renderContext);
        }

        function pageNumber(pdfDoc) {
            for (var page = 1; page <= pdfDoc.numPages; page++)
                pdfDoc.getPage(page).then(renderPage);
            // pdfDoc.getPage(1).then(renderPage);
            // document.getElementById("pageOf").innerHTML += pdfDoc.numPages;
        }

        pdfdata2 = convertDataBase64ToBinary(pdfdata);
        // alert(pdfdata2);
        // Loaded via <script> tag, create shortcut to access PDF.js exports.
        var pdfjsLib = window["pdfjs-dist/build/pdf"];

        // The workerSrc property shall be specified.
        pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.943/pdf.worker.min.js";

        var setPDF = pdfjsLib.getDocument(pdfdata);
        setPDF.then(pageNumber);
    }

    function getBase64(file, onLoadCallback) {
        return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onload = function() {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    $("#file").change(function() {
        var val = convertToBase64();
        alert(val);

        var BASE64_MARKER = ";base64,";

        renderPDF(pdfData, document.getElementById("documentRender"), {
            scale: 1,
        });
    });

    $(".page3").droppable({
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        accept: ".insertFloatButton",
        drop: function(e, ui) {
            if ($(ui.draggable).hasClass("copied")) return;

            if ($(ui.draggable).hasClass("floatSignature")) {
                alert("has");
                var html =
                    '<div class="assignSignatureborder"><div class="assignSignaturebutton"><span id="assignSignatureicon" class="fas fa-signature"></span><b>Signature</b></div></div>';
            }

            leftPosition = ui.offset.left - $(this).offset().left;
            topPosition = ui.offset.top - $(this).offset().top;

            var containmentid = this.id;

            var droppedItem = $(html)
                .addClass("copied")
                .css({
                    position: "absolute",
                    //top: $(ui.helper).position().top - $(this).position().top,
                    //left: $(ui.helper).position().left - $(this).position().left,
                    top: topPosition,
                    left: leftPosition,
                })
                .draggable({
                    containment: $("#" + containmentid),
                });
            $(this).append(droppedItem);
        },
    });

    $(".page3").sortable({
        accept: ".insertButton",
        revert: true,
        cancel: "input,textarea,button,select,option,[contenteditable],.insertImagebuttonborder",

        update: function(event, ui) {
            if (ui.item.hasClass("imageButton")) {
                var ID = "imageButton" + Math.random().toString(36).substr(2, 9);

                var _template =
                    '<div class="insertImagebuttonborder" ><div class="insertImagebutton"><span id="insertImageicon" class="fas fa-upload"></span>Click to upload an image</div> </div>';
                var template = $.parseHTML(_template);

                var newhtml = $(template).attr("id", ID);

                ui.item.replaceWith(newhtml);
            } else if (ui.item.hasClass("textButton")) {
                ui.item.replaceWith(
                    '<div class="textarea"  contenteditable="true" spellcheck = false></div>'
                );
            } else if (ui.item.hasClass("tableButton")) {
                var ID = "table-" + Math.random().toString(36).substr(2, 9);
                var _template =
                    '<div class="insertTableBorder"> <table class="resizable" id="insertTable" width="100%" > <tr> <th></th> <th class="tableColSelector" ><i class="fas fa-grip-horizontal"></i></th> <th class="tableColSelector"><i class="fas fa-grip-horizontal"></i></th> </tr> <tr> <td class="tableRowSelector" contenteditable="true"><i class="fas fa-grip-vertical"></td> <td contenteditable="true" ></td> <td contenteditable="true"></td> </tr> <tr> <td contenteditable="true" class="tableRowSelector"><i class="fas fa-grip-vertical"></td> <td contenteditable="true" ></td> <td contenteditable="true"></td> </tr> </table> </div>';
                var template = $.parseHTML(_template);

                var newhtml = $(template).attr("id", ID);
                ui.item.replaceWith(newhtml);
            }
        },

        /*update: function (event, ui) {
                // Some code to prevent duplicates
            }*/
    });

    var diagram = [];
    var idArrays = [];
    var canvas = $(".page2");
    $(".page2").droppable({
        drop: function(event, ui) {
            leftPosition = ui.offset.left - $(this).offset().left;
            topPosition = ui.offset.top - $(this).offset().top;
            alert(ui.helper.attr("_id"));

            if ($(ui.draggable).hasClass("copied")) {
                var id = ui.helper.attr("id");
                var index2 = diagram
                    .map(function(o) {
                        return o.node._id;
                    })
                    .indexOf(id);
                console.log("index of 'john': " + index2);
                alert(index2);

                delete diagram[index2];

                var node = {
                    _id: id,
                    position: {
                        left: leftPosition,
                        top: topPosition,
                    },
                };
            } else {
                //alert("New");
                var node = {
                    _id: new Date().getTime(),
                    position: {
                        left: leftPosition,
                        top: topPosition,
                    },
                };
            }
            idArrays.push(node._id);

            if (ui.helper.hasClass("draggable")) {
                node.type = "Button";
            }
            //console.log(node);
            diagram.push(node);
            var parentOffset = jQuery(".page2").offset();
            var off = $(ui.draggable).clone().offset();
            renderDiagram(diagram);
            /*var html = "<h3 class='buttonDrag'> Tool</h3>";
  
        leftPosition = ui.offset.left - $(this).offset().left;
        topPosition = ui.offset.top - $(this).offset().top;
        canvas.append(
          $(html)
            .css({
              position: "absolute",
              left: leftPosition,
              top: topPosition,
            })
            .draggable({
              containment: ".page2",
              scroll: false,
            })
        );*/
        },
    });

    function renderDiagram(diagram) {
        canvas.empty();
        for (var d in diagram) {
            var node = diagram[d];
            var html = "<h3  class='buttonDrag'> Tool</h3>";

            var dom = $(html)
                .css({
                    position: "absolute",
                    top: node.position.top,
                    left: node.position.left,
                })
                .draggable({
                    containment: ".page2",
                    scroll: false,
                })
                .addClass("copied");

            canvas.append(dom);
        }
    }

    $(".insertFloatButton").draggable({
        helper: "clone",
        /*helper: function () {
          return $(
            "<div class='dragger' style='z-index:344;left:5000px'>   A few days ago, Amazon announced the availability of a new set of automatic model tuning capabilities in the AWS SageMaker platform. Specifically, the new releases focuses on tuning and optimizing hyperparameters associated with SageMaker models. The release constitutes a powerful addition in order to streamons.</div>"
          ).append("Hi");
        },*/
        //revert: "invalid",
        /*start: function (e, ui) {
          $(".page3").sortable("disable");
          $(".page3").droppable("enable");
        },
        stop: function (e, ui) {
          $(".page3").sortable("enable");
          $(".page3").droppable("disable");
        },*/
    });

    $(".insertButton").draggable({
        connectToSortable: ".page3",
        cursor: "pointer",
        helper: "clone",
    });

    /*Tool tip initialisations*/
    new jBox("Tooltip", {
        theme: "TooltipDark",
        attach: ".tooltip",
        trigger: "click",
        pointer: false,
        closeOnClick: true,
        content: "<span class='popuptext' id='myPopup'><i class='fa fa-underline'> </i><i class='fas fa-italic'></i><i class='fa fa-align-justify'></i></span>",
    });

    new jBox("Tooltip", {
        attach: ".propertyButton",
        position: {
            y: "bottom",
        },
        offset: {
            y: +10,
        },
        trigger: "click",
        fixed: false,
        pointer: false,
        closeOnClick: true,
        content: '<ul class="pagePropertiesDropdown"><li data-value="val6"><i class="fas fa-clone"></i> Clone</li><li data-value="val7"><i class="fas fa-trash-alt"></i> Delete Page</li></ul>',
    });

    new jBox("Tooltip", {
        theme: "TooltipDark",
        attach: ".textarea",
        trigger: "click",
        pointer: false,
        closeOnClick: true,
        content: "<span class='popuptext' id='myPopup'> <i class='fas fa-file-medical'></i><i class='fas fa-clone'></i><i class='fas fa-trash-alt'></i><i class='fas fa-cog'></i></span>",
    });

    new jBox("Tooltip", {
        theme: "TooltipDark",
        attach: ".imagecontainer",
        trigger: "click",
        pointer: false,
        closeOnClick: "body",
        content: "<span class='popuptext' id='myPopup'> <i id='alignLeft' class='fas fa-align-left'></i>  <i id='alignCenter' class='fas fa-align-center'></i><i id='alignRight'  class='fas fa-align-right'></i> <i class='fas fa-file-medical'></i><i class='fas fa-clone'></i><i class='fas fa-trash-alt'></i><i class='fas fa-cog'></i></span>",
    });

    new jBox("Tooltip", {
        theme: "TooltipDark",
        attach: ".insertTableBorder",
        trigger: "click",
        pointer: false,
        closeOnClick: "body",
        content: "<span class='popuptext' id='myPopup'> <i  id='addRow' class='fas fa-plus-square'></i><i id='addCol' class='far fa-plus-square'></i><i id='removeRow' class='fas fa-minus-circle'></i> <i id='removeCol' class='far fa-minus-square'></i><i id='alignLeft' class='fas fa-align-left'></i> <i id='alignCenter' class='fas fa-align-center'></i><i id='alignRight'  class='fas fa-align-right'></i> <i class='fas fa-file-medical'></i><i class='fas fa-clone'></i><i class='fas fa-trash-alt'></i><i class='fas fa-cog'></i></span>",
    });

    new jBox("Tooltip", {
        theme: "TooltipDark",
        attach: ".insertImagebuttonborder",
        trigger: "click",
        pointer: false,
        closeOnClick: true,
        zIndex: 0,
        content: "<span class='popuptext' id='myPopup'> <i class='fas fa-file-medical'></i><i class='fas fa-clone'></i><i class='fas fa-trash-alt'></i><i class='fas fa-cog'></i></span>",
    });

    $(document).on("click", ".assignSignatureborder", function(event) {
        new jBox("Tooltip", {
            theme: "TooltipDark",
            attach: ".assignSignatureborder",
            trigger: "click",
            pointer: false,
            closeOnClick: "body",
            content: "<span class='popuptext' id='myPopup'><select id='myColors'><option value='Red'>Red</option><option value='Green'>Green</option><option value='White'>White</option><option value='Black'>Black</option></select> <i class='fas fa-file-medical'></i><i class='fas fa-clone'></i><i class='fas fa-trash-alt'></i><i class='fas fa-cog'></i></span>",
        });
    });

    $(document).on("focusin", ".textarea", function(event) {
        var textpopup = new jBox("Tooltip", {
            theme: "TooltipDark",
            attach: ".textarea",
            trigger: "click",
            pointer: false,
            closeOnClick: true,
            content: "<span class='popuptext' id='myPopup'> <i class='fas fa-file-medical'></i><i class='fas fa-clone'></i><i class='fas fa-trash-alt'></i><i class='fas fa-cog'></i></span>",
        });
        textpopup.open();
        $(".texticons").css("visibility", "visible");
        $(".texticons").show();
        //$(".texticons").css("visibility", "visible");
    });

    //$(document).on("focusout", ".textarea", function (event) {
    //  $(".texticons").css("visibility", "visible");
    //  $(".texticons").hide();
    //$(".texticons").css("visibility", "visible");
    //});

    $(document).on("click", ".addPageButton", function(event) {
        var ID = "pageid" + Math.random().toString(36).substr(2, 9);
        var _template =
            '<article class="page"><div class="page3" id="page2"></div></article><div class="pageproperties"><div>CONTENT</div><button  class="addPageButton" type="button"><i class="fas fa-plus "></i></button><button class="propertyButton" type="button"><i class="fas fa-ellipsis-h"/></button></div>';

        var template = $.parseHTML(_template);
        $(template).find(".page3").attr("id", ID);
        var newhtml = $(template);

        var nearestPage = $(this).parent();
        //alert($(this).parent().parent().html());
        nearestPage.after(newhtml);

        $(".page3").droppable({
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            accept: ".insertFloatButton",
            drop: function(e, ui) {
                if ($(ui.draggable).hasClass("copied")) return;

                if ($(ui.draggable).hasClass("floatSignature")) {
                    alert("has");
                    var html =
                        '<div class="assignSignatureborder"><div class="assignSignaturebutton"><span id="assignSignatureicon" class="fas fa-signature"></span><b>Signature</b></div></div>';
                }

                leftPosition = ui.offset.left - $(this).offset().left;
                topPosition = ui.offset.top - $(this).offset().top;

                var containmentid = this.id;

                var droppedItem = $(html)
                    .addClass("copied")
                    .css({
                        position: "absolute",
                        //top: $(ui.helper).position().top - $(this).position().top,
                        //left: $(ui.helper).position().left - $(this).position().left,
                        top: topPosition,
                        left: leftPosition,
                    })
                    .draggable({
                        containment: $("#" + containmentid),
                    });
                $(this).append(droppedItem);
            },
        });

        $(".page3").sortable({
            accept: ".insertButton",
            revert: true,
            cancel: "input,textarea,button,select,option,[contenteditable],.insertImagebuttonborder",

            update: function(event, ui) {
                if (ui.item.hasClass("imageButton")) {
                    var ID = "imageButton" + Math.random().toString(36).substr(2, 9);

                    var _template =
                        '<div class="insertImagebuttonborder" ><div class="insertImagebutton"><span id="insertImageicon" class="fas fa-upload"></span>Click to upload an image</div> </div>';
                    var template = $.parseHTML(_template);

                    var newhtml = $(template).attr("id", ID);

                    ui.item.replaceWith(newhtml);
                } else if (ui.item.hasClass("textButton")) {
                    ui.item.replaceWith(
                        '<div class="textarea"  contenteditable="true" spellcheck = false></div>'
                    );
                } else if (ui.item.hasClass("tableButton")) {
                    var ID = "table-" + Math.random().toString(36).substr(2, 9);
                    var _template =
                        '<div class="insertTableBorder"> <table class="resizable" id="insertTable" width="100%" > <tr> <th></th> <th class="tableColSelector" ><i class="fas fa-grip-horizontal"></i></th> <th class="tableColSelector"><i class="fas fa-grip-horizontal"></i></th> </tr> <tr> <td class="tableRowSelector" contenteditable="true"><i class="fas fa-grip-vertical"></td> <td contenteditable="true" ></td> <td contenteditable="true"></td> </tr> <tr> <td contenteditable="true" class="tableRowSelector"><i class="fas fa-grip-vertical"></td> <td contenteditable="true" ></td> <td contenteditable="true"></td> </tr> </table> </div>';
                    var template = $.parseHTML(_template);

                    var newhtml = $(template).attr("id", ID);
                    ui.item.replaceWith(newhtml);
                }
            },

            /*update: function (event, ui) {
                  // Some code to prevent duplicates
              }*/
        });
    });

    $(document).on("click", ".imageBorder", function(event) {
        var imageTooltip = new jBox("Tooltip", {
            theme: "TooltipDark",
            attach: ".imagecontainer",
            trigger: "click",
            pointer: false,
            closeOnClick: "body",
            content: "<span class='popuptext' id='myPopup'> <i id='alignLeft' class='fas fa-align-left'></i>  <i id='alignCenter' class='fas fa-align-center'></i><i id='alignRight'  class='fas fa-align-right'></i> <i class='fas fa-file-medical'></i><i class='fas fa-clone'></i><i class='fas fa-trash-alt'></i><i class='fas fa-cog'></i></span>",
        });

        $(".imageBorder").append(
            '<div class="ui-resizable-handle ui-resizable-nw" id="nwgrip"></div><div class="ui-resizable-handle ui-resizable-ne" id="negrip"></div><div class="ui-resizable-handle ui-resizable-sw" id="swgrip"></div><div class="ui-resizable-handle ui-resizable-se" id="segrip"></div>'
        );

        $(".imageBorder").resizable({
            handles: {
                nw: "#nwgrip",
                ne: "#negrip",
                sw: "#swgrip",
                se: "#segrip",
            },
        });
        imageTooltip.open();
    });

    $(document).on("click", ".insertTableBorder", function(event) {
        var tableTooltip = new jBox("Tooltip", {
            theme: "TooltipDark",
            attach: ".insertTableBorder",
            trigger: "click",
            pointer: false,
            closeOnClick: "body",
            content: "<span class='popuptext' id='myPopup'> <i  id='addRow' class='fas fa-plus-square'></i><i id='addCol' class='far fa-plus-square'></i><i id='removeRow' class='fas fa-minus-circle'></i> <i id='removeCol' class='far fa-minus-square'></i><i id='alignLeft' class='fas fa-align-left'></i> <i id='alignCenter' class='fas fa-align-center'></i><i id='alignRight'  class='fas fa-align-right'></i> <i class='fas fa-file-medical'></i><i class='fas fa-clone'></i><i class='fas fa-trash-alt'></i><i class='fas fa-cog'></i></span>",
        });
        tableTooltip.open();
    });

    $(document).on("click", ".assignSignatureborder", function(event) {
        $(".assignSignatureborder").append(
            '<div class="ui-resizable-handle ui-resizable-se" id="segrip"></div>'
        );

        var signpopup = new jBox("Tooltip", {
            theme: "TooltipDark",
            attach: ".assignSignatureborder",
            trigger: "click",
            pointer: false,
            closeOnClick: "body",
            content: "<span class='popuptext' id='myPopup'><select id='myColors'><option value='Red'>Red</option><option value='Green'>Green</option><option value='White'>White</option><option value='Black'>Black</option></select> <i class='fas fa-file-medical'></i><i class='fas fa-clone'></i><i class='fas fa-trash-alt'></i><i class='fas fa-cog'></i></span>",
        });

        signpopup.open();

        $(".assignSignatureborder").resizable({
            handles: {
                se: "#segrip",
            },
        });
    });

    $(document).mouseup(function(e) {
        var container = $(".imagecontainer");

        // If the target of the click isn't the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            if ($(".imageBorder").length) {
                //$(".imageBorder").resizable("destroy");
            }
        }
    });

    $(document).on(
        "focus click",
        "article div .insertTableBorder",
        function(event) {
            var ID = $(event.target).closest(".insertTableBorder").attr("id");
            //alert(ID);
            //if ($(event.target).is(".insertTableBorder")) {
            $(".insertTableBorder").removeClass("active");

            $("#" + ID).addClass("active");
        }
    );

    document.addEventListener("selectionchange", (e) => {
        console.log("Archor node - ", window.getSelection().anchorNode);
        console.log("Focus Node - ", window.getSelection().toString());
        e.preventDefault();
    });
    //$(".textarea").summernote({
    //  followingToolbar: false,
    //});alignRight
    $(document).on("click", "#alignRight", function(event) {
        $(".imageBorder").css({
            float: "right",
            display: "",
            "margin-left": "",
            "margin-right": "",
        });
    });

    $(document).on("click", "#alignLeft", function(event) {
        $(".imageBorder").css({
            float: "left",
            display: "",
            "margin-left": "",
            "margin-right": "",
        });
    });

    $(document).on("click", "#alignCenter", function(event) {
        $(".imageBorder").css({
            display: "block",
            "margin-left": "auto",
            "margin-right": "auto",
            float: "",
        });
    });

    $("#boldButton").click(function(event, sel) {
        var range2 = window.getSelection().getRangeAt(0);
        var span = document.createElement("span");
        span.className = "boldtext";
        span.appendChild(range2.extractContents());
        range2.insertNode(span);
        return false;
    });

    $("#italicButton").click(function(event, sel) {
        var range2 = window.getSelection().getRangeAt(0);
        var span = document.createElement("span");
        span.className = "italictext";
        span.appendChild(range2.extractContents());
        range2.insertNode(span);
        return false;
    });

    $("#underlineButton").click(function(event, sel) {
        var range2 = window.getSelection().getRangeAt(0);
        var span = document.createElement("span");
        span.className = "underlinetext";
        span.appendChild(range2.extractContents());
        range2.insertNode(span);
        return false;
    });

    $("#rightButton").click(function(event, sel) {
        var range2 = window.getSelection().getRangeAt(0);
        var span = document.createElement("span");
        span.className = "rightText";
        span.appendChild(range2.extractContents());
        range2.insertNode(span);
        return false;
    });

    $("#centerButton").click(function(event, sel) {
        var range2 = window.getSelection().getRangeAt(0);
        var span = document.createElement("span");
        span.className = "centerText";
        span.appendChild(range2.extractContents());
        range2.insertNode(span);
        return false;
    });

    $("#leftButton").click(function(event, sel) {
        var range2 = window.getSelection().getRangeAt(0);
        var span = document.createElement("span");
        span.className = "leftText";
        span.appendChild(range2.extractContents());
        range2.insertNode(span);
        return false;
    });

    $("#unorderedListButton").click(function(event, sel) {
        var range2 = window.getSelection().getRangeAt(0);
        var list = document.createElement("li");
        list.className = "unorderedList";
        list.appendChild(range2.extractContents());
        range2.insertNode(list);
        return false;
    });

    $("#orderedListButton").click(function(event, sel) {
        var range2 = window.getSelection().getRangeAt(0);
        var list = document.createElement("li");
        list.className = "orderedList";
        list.appendChild(range2.extractContents());
        range2.insertNode(list);
        return false;
    });

    $("#decreaseIndentButton").click(function(event, sel) {
        var range2 = window.getSelection().getRangeAt(0);
        var span = document.createElement("span");
        span.className = "decreaseIndent";
        span.appendChild(range2.extractContents());
        range2.insertNode(span);
        return false;
    });

    $("#select_font").change(function() {
        //alert($(this).val());

        var range2 = window.getSelection().getRangeAt(0);

        var span = document.createElement("span");
        span.className = "fontChange";
        $(span).css("font-family", $(this).val());
        span.appendChild(range2.extractContents());
        range2.insertNode(span);
        return false;
    });

    $("#select_fontsize").change(function() {
        //alert($(this).val());

        var range2 = window.getSelection().getRangeAt(0);

        var span = document.createElement("span");
        span.className = "fontChangeSize";
        $(span).css("font-size", $(this).val());
        span.appendChild(range2.extractContents());
        range2.insertNode(span);
        return false;
    });

    //$(document).click(function (e) {
    // if (
    //   !$(e.target).hasClass("textarea") &&
    //   $(e.target).parents(".texticons").length === 0
    // ) {
    //   $(".texticons").css("visibility", "hidden");
    //}
    //});

    // Image Container Popup

    var myCloseButtonExample = new jBox("Modal", {
        title: "Upload Image",
        content: $(".imageuploadPopup"),
        minWidth: "760px",
        attach: ".insertImagebutton",
        closeButton: false,
        footer: '<button class="close-button">Close me!</button>',
        onCreated: function() {
            this.footer.find(".close-button").on(
                "click",
                function() {
                    this.close();
                }.bind(this)
            );
        },
    });

    // Image Container Upload
    var readURL = function(input, parentID) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $("#" + parentID).append(
                    '<div class="imagecontainer" style="z-index:1"> <div class="imageBorder"><div class="imageBorder2"><img class="insertImage" src=""></img></div></div></div>'
                );

                var childelement = $("#" + parentID).find(".insertImage");

                //alert($("#" + parentID).html());
                //alert($(".insertImage").attr("src"));

                childelement.attr("src", e.target.result);
                childelement.css("display", "block");
                //$(".insertImage").attr("src", e.target.result);
                //$(".insertImage").css("display", "block");
            };
            reader.readAsDataURL(input.files[0]);
        }
    };

    // Image Container on change
    $(".imageuploadinput").on("change", function() {
        var parentID = $(".insertImagebutton.imageActive")
            .closest(".insertImagebuttonborder")
            .attr("id");

        readURL(this, parentID);
        //var childnode = $("#" + parentID).find(".insertImagebutton");
        //alert(childnode);
        $("#" + parentID)
            .find(".insertImagebutton")
            .remove();

        var imageContainer = $("#" + parentID).find(".imagecontainer");
        alert(imageContainer);
        imageContainer.css("display", "block");

        //$(".insertImagebutton").remove();
        //$(".imagecontainer").css("display", "block");
        //myCloseButtonExample.close();
    });

    $(document).on("click", ".insertImagebutton", function(event) {
        $(".imageActive").removeClass("imageActive");
        $(this).addClass("imageActive");
        myCloseButtonExample.open();
    });

    $(".ImagePopupbutton").click(function() {
        $(".imageuploadinput").trigger("click");
    });

    /// Table column resizable
    $(document).on("click", ".tableRowSelector", function(event) {
        $(".rowSelected").removeClass("rowSelected");
        $(".colSelected").removeClass("colSelected");
        var tr = $(this).closest("tr");
        tr.addClass("rowSelected");
    });

    //$(".tableColSelector").on("click", function (event) {
    //$(".colSelected").removeClass("colSelected");
    //var th = $(this).closest("th");
    //th.addClass("colSelected");
    //});

    $(document).on("click", ".tableColSelector", function(event) {
        var th_index = $(this).index();
        var ID = $(this).closest(".insertTableBorder").attr("id");
        //alert(ID);
        $(".colSelected").removeClass("colSelected");
        $(".rowSelected").removeClass("rowSelected");
        $("#" + ID)
            .find("#insertTable")
            .find("th")
            .eq(th_index)
            .toggleClass("colSelected");
        $("#" + ID)
            .find("#insertTable tr")
            .each(function() {
                $(this).find("td").eq(th_index).toggleClass("colSelected");
            });
    });

    $(document).on("click", "#addRow", function(event) {
        var ID = $(".active").attr("id");
        var tr = $("#" + ID)
            .find("#insertTable tr:nth-child(2)")
            .clone();
        $("#" + ID)
            .find("#insertTable")
            .append(tr);
    });

    $(document).on("click", "#addCol", function(event) {
        var ID = $(".active").attr("id");
        //alert(ID);
        $("#" + ID)
            .find("#insertTable")
            .find("tr:not(:first-child)")
            .append("<td></td>");
        $("#" + ID)
            .find("#insertTable tr:first")
            .append(
                "<th class='tableColSelector'><i class='fas fa-grip-horizontal'></i></th>"
            );
    });

    $(document).on("click", "#removeRow", function(event) {
        var tableRow = $("tr.rowSelected");
        if (tableRow.length > 0) {
            tableRow.remove();
            return false;
        } else {
            $("#insertTable tr:last").hide(300, function() {
                this.remove();
            });
        }
    });

    $(document).on("click", "#removeCol", function(event) {
        var tableColIndex = $("th.colSelected").index();
        var tableCol = $("th.colSelected");

        if (tableCol.length > 0) {
            tableCol.remove();
            $("#insertTable tr").each(function() {
                $(this)
                    .children('td:eq("' + tableColIndex + '")')
                    .remove();
            });
        } else {
            $("#insertTable tr").find("th:last, td:last").remove();
        }
        //alert(tableColIndex);
    });

    /*$(init);
    function init() {
      $(".insertButton").draggable({
        helper: "clone",
      });
      var canvas = $(".drop");
      var diagram = [];
  
      $(".drop").droppable({
        drop: function (event, ui) {
          var node = {
            _id: new Date().getTime(),
          };
          diagram.push(node);
          alert("dropp");
          console.log(diagram);
        },
      });
    }*/
});