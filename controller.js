// basic functionalities
var client;

var btnPublish = $("#Btn-Publish")

$('#Btn_connect').on('click', function () {
  // connect
  console.log("connect button clicked..")
  client = mqtt.connect("wss://test.mosquitto.org:8081/mqtt")
  $("#Status").text("Connecting....")
  $("#Status").css("color", "yellow")
  $("#Status").css("font-style", "italic")
  $("#Status").css("font-weight", "bold")
  client.on("connect", function () {
    console.log("succ")
    $("#Status").text("Connected!!")
    $("#Status").css("color", "green")
    $("#Status").css("font-style", "italic")
    $("#Status").css("font-weight", "bold")
    
  });

  $(".Btn_disConnect").click(function () {
    client.end();
    $("#Status").text("DisConnected")
    $("#Status").css("color", "red")
  })

  
  $("#Btn_Pub").click(function () {
    var topic = $("#topic").val();
    var message = $("#message").val();
    if (topic == "" || message == "") {
      Swal.fire({
        type: 'error',
        title: 'All Input is Required',
      })
    } else {
      console.log("Published Topic: "+topic+ " Message: " + message)
      client.publish(topic, message);
      Swal.fire({
        type: 'success',
        title: 'Publish Successfully!',
      })
    }
  })

  $("#Btn_Sub").click(function () {
    var topsub = $("#topic-sub").val();
    if (topsub == "") {
      Swal.fire({
        type: 'error',
        title: 'Topic is Required',
      })
    } else {
      console.log("Subcribed Topic: "+topsub)
      client.subscribe(topsub);
      Swal.fire({
        type: 'success',
        title: 'Subscribe Successfully',
      })
    }
  })
  $("#Btn_UnSub").click(function () {
    var topsub = $("#topic-sub").val();
    if (topsub == "") {
      Swal.fire({
        type: 'error',
        title: 'Topic is Required',
      })
    } else {
      client.unsubscribe(topsub);
      Swal.fire({
        type: 'success',
        title: 'Unsubscribe Successfully',
      })
    }
    $("#Btn_UnSub").removeClass("alert-success")
    $("#Btn_UnSub").addClass("alert-secondary")
  })
  client.on("message", function (topic, payload) {
    console.log("Recieved Topic: "+topic+"Payload: "+payload)
    var row = $("<tr>")
    $("<td>" ).text(topic).appendTo($(row))
    $("<td>").text(payload).appendTo($(row))
    $("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row))
    $("tbody").append($(row))
    
  })
})



