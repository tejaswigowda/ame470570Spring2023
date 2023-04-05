var editModal;

var bucketURL = "https://bucket470570.s3-us-west-2.amazonaws.com/";

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

    if(index == 0){
        makeUserImageList();
    }
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

    $.post("/uploadBase64", {data: base64Image, intname: fileInput, date: (new Date()).toString()}, function(data){
        console.log("https://bucket470570.s3-us-west-2.amazonaws.com/" + fileInput);

        makeUserImageList();
    });
}


function makeUserImageList(){
  loadURL("/getUserImages", function(data){
    var allImages = JSON.parse(data);
    var html = "";
    for(var i = 0; i < allImages.length; i++){
        html += "<div class='col s4'><h1>" + allImages[i].intname + "</h1><img class='responsive-img' src='" + bucketURL + allImages[i].url + "'></div>";
    }
    $("#imageList").html(html);
  });
}