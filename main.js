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
  var name = $("#name").val();
  var message = $("#message").val();
  if(message.length < 1 || name.length < 1) return;
  ts.write({type: "chat", name: name, message: message});
  $("#message").val("");
};

$(function(){
  $("#btn_send").click(send);
  $("#message").keydown(function(e){
    if(e.keyCode == 13) send();
  });
})
