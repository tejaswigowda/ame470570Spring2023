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