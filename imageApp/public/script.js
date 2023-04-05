var editModal;

function start()
{
    document.getElementById("accountInfo").innerHTML = "Welcome, " + userObj.local.email;
    var elems = document.querySelectorAll('.modal');
    editModal = M.Modal.init(elems, {});
}

function menuBtnClicked(index){
    $("body").removeClass().addClass("col1");
    $("#column0 .menuBtn").removeClass("selected");
    $("#column0 .menuBtn").eq(index).addClass("selected");
    $("#column1 .canvas").fadeOut();
    $("#column1 .canvas").eq(index).fadeIn();
}

function goBack(){
    var cl = $("body").attr("class");
    if(cl == "col2"){
        $("body").removeClass().addClass("col1");
        $("#column1 .menuBtn").removeClass("selected");

    }
    else if(cl == "col1"){
        $("body").removeClass();
        $("#column0 .menuBtn").removeClass("selected");
    }

}

function uploadFile()
{
    var file = document.getElementById("file").files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(){
        var img = new Image();
        document.getElementById("image").src = reader.result;
        editModal[0].open()
        $("#image").cropper({aspectRatio: 1/1})



        


    }
}

function saveImage()
{
    var base64Image = $("#image").cropper("getCroppedCanvas").toDataURL("image/png");
    
    //send base64Image to server
    editModal[0].close();
    document.getElementById("file").value = "";

    $("#image").cropper('destroy');


    var fileInput = userObj.local.email + "-s3Upload_" + new Date().getTime().toString() + ".png";


    /*
   var fd = new FormData();
   fd.append('data', base64Image);
   fd.append('intname', fileInput);
   fd.append('date', (new Date()).toString());

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e) {  
      if (xhr.readyState != 4) { return; }
        // callback logic
      // document.getElementById("preview").src = "https://bucket470570.s3-us-west-2.amazonaws.com/" + fileInput;
    };
    xhr.open("POST", "/uploadBase64", true);
    xhr.send(fd);
    */


    $.post("/uploadBase64", {data: base64Image, intname: fileInput, date: (new Date()).toString()}, function(data){
        console.log("https://bucket470570.s3-us-west-2.amazonaws.com/" + fileInput);
    });
}