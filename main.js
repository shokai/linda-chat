var io = new RocketIO().connect("http://linda.shokai.org");
var linda = new Linda(io);
var ts = new linda.TupleSpace("chatroom_1");

io.on("connect", function(){
  $("#status").text(io.type+" connect");
  ts.watch({type: "chat"}, function(tuple){
    $("#log").prepend( $("<p>").text(tuple.name+" : "+tuple.message) );
  });
});

io.on("disconnect", function(){
  $("#status").text("disconnect");
});

var send = function(){
  ts.write({
    type:    "chat",
    name:    $("#name").val(),
    message: $("#message").val()
  });
  $("#message").val("");
};

$(function(){
  $("#btn_send").click(send);
  $("#message").keydown(function(e){
    if(e.keyCode == 13) send();
  });
})
