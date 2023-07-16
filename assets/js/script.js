$("#form").on("submit", (e) => {
  e.preventDefault();
  
  const file_list = $("#file").prop("files");
  if (_.isEmpty(file_list)) {
    alert("file Empty");
    return;
  }
  const file = file_list[0];
  if (file.type.indexOf("image") === -1) {
    alert("Image");
    return;
  }

  let status = {};
  Tesseract.recognize(file, { lang: $("#lang").val() })
    .progress((result) => {
      let p = result.progress * 100;
      if (!status[result.status]) {
        status[result.status] = true;
        $("#progress").append(`
          <p>${result.status}</p>
          <div class="progress">
            <div class="progress-bar progress-bar${_.size(status)}"></div>
          <div>
        `);
      }
      if (_.isNaN(p)) {
        p = 100;
      }
      $(`.progress-bar${_.size(status)}`)
        .css({ width: `${p}%` })
        .text(parseFloat(p).toFixed(2));
    })
    .catch(() => {
      $(".progress-bar").addClass("progress-bar-error");
      alert("処理に失敗しました");
    })        
    .then((result) => {
      $(".progress-bar").addClass("progress-bar-success");
      $("#result").text(result.text);
        // var result = result.text.split(',');
        var myStr = result.text
        var newStr = myStr.replace(/\ /g,',');
        

   
    alert("OCR Scan complete, please scroll to view result");
    
     
    });

});


var doc = new jsPDF();
var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
};

//margins.left, // x coord   margins.top, { // y coord
$('#generatePDF').click(function () {
    doc.fromHTML($('#htmlContent').html(), 15, 15, {
        'width': 100,
        'elementHandlers': specialElementHandlers
    });
    doc.save('sample_file.pdf');
});