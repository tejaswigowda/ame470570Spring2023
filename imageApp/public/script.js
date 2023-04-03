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