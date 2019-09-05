var client;

var btnPublish = $("#publish-btn")


// client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
// client.subscribe("mqtt/demo")




// client.publish("mqtt/demo", "hello world!")
$('#btn-connect').on('click', function () {
  // connect
  console.log("connect button clicked..")
  client = mqtt.connect("wss://test.mosquitto.org:8081/mqtt")
  $("#status").text("Connecting....")
  $("#status").css("color", "yellow")
  $("#status").css("font-style", "italic")
  $("#status").css("font-weight", "bold")
  // $("#status").removeClass("alert-secondary")
  // $("#status").addClass("alert-warning")
  client.on("connect", function () {
    console.log("succ")
    $("#status").text("Connected Successfully!")
    $("#status").css("color", "green")
    $("#status").css("font-style", "italic")
    $("#status").css("font-weight", "bold")
    // $("#status").removeClass("alert-warning")
    // $("#status").addClass("alert-success")
  });// end connect

  $(".btn-disconnect").click(function () {
    client.end();
    $("#status").text("Disconnected")
    $("#status").css("color", "red")
  })//end disconnect

  //Publish 
  
  $("#btn-pub").click(function () {
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

  //Subscribe
  $("#btn-sub").click(function () {
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
  $("#btn-unsub").click(function () {
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
    $("#btn-unsub").removeClass("alert-success")
    $("#btn-unsub").addClass("alert-secondary")
  })//end unsubscribe
  //Message
  client.on("message", function (topic, payload) {
    console.log("Recieved Topic: "+topic+"Payload: "+payload)
    var row = $("<tr>")
    $("<td>").text(topic).appendTo($(row))
    $("<td>").text(payload).appendTo($(row))
    $("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row))
    $("tbody").append($(row))
// basic functionalities
// var btnConnect = document.getElementById("btn-Connect");
// var Status = document.getElementById("btn-Status");
// client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
// client.subscribe("mqtt/demo")

// client.on("connect", function(){
//     console.log("Successfully connected");
// })

// client.on("message", function (topic, payload) {
//   console.log([topic, payload].join(": "));
//   client.end();
// })

// client.publish("mqtt/demo", "hello world!")
// $(document).ready(function () {
//   $("#btn-Connect").click(function () {
//     client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");
//     client.on("connect", function () {
//       $('#connect-Status').text("Connected Successfully!");
//     })
//   })
// for broker
// var btnConnect = document.getElementById('btn-Connect');
// var btnDisconnect = document.getElementById('btn-Disconnect');
// var broker = document.getElementById('address');
// var btnStatus = document.getElementById('status');

// //for publishing
// var btnPublish = document.getElementById('btn-Publish');
// var pubTopic = document.getElementById('Topic');
// var pubPayload = document.getElementById('Payload');

// //subscribing
// var subTopic = document.getElementById('sTopic');
// var btnSubscribe = document.getElementById('btn-Subscribe');
// var btnUnsubscribe = document.getElementById('btn-Unsubscribe');

// btnConnect.addEventListener('click', function (e) {
//   e.preventDefault();
//   //client
//   var client = mqtt.connect(broker.value)
//   // client.subscribe("mqtt/demox")

//   btnSubscribe.addEventListener('click', function (e) {
//     e.preventDefault();
//     console.log("mqtt/" + subTopic.value)
//     client.subscribe("mqtt/" + subTopic.value);
//     btnUnsubscribe.disabled = false;
//     btnSubscribe.disabled = true;
//   })

//   btnUnsubscribe.addEventListener('click', function (e) {
//     e.preventDefault();
//     client.unsubscribe("mqtt/" + subTopic.value);
//     btnUnsubscribe.disabled = true;
//     btnSubscribe.disabled = false;
//     console.log("Unsubscribed to mqtt/" + subTopic.value)
//   })

//   client.on("connect", function () {
//     console.log("Successfully connected");
//     btnStatus.disabled = false;
//     btnDisconnect.disabled = false;
//     btnConnect.disabled = true;
//     btnStatus.setAttribute('value', 'Successfully Connected!')
//     btnStatus.setAttribute('class', 'btn btn-success')
//     btnStatus.disabled = true;
//   });


//   //btnDisconnect
//   btnDisconnect.addEventListener('click', function () {
//     client.end();
//     btnStatus.disabled = true;
//     btnDisconnect.disabled = true;
//     btnConnect.disabled = false;
//     console.log('Disconnected');
//     btnStatus.setAttribute('value', 'Disconnected!')
//     btnStatus.setAttribute('class', 'btn btn-warning')
//   });


//   client.on("message", function (topic, payload) {
//     let finalTopic = topic.slice(5);
//     console.log([finalTopic, payload].join(": "));
//     let tbl = document.getElementById('receiver');
//     let tbody = document.getElementById('msg');
//     let tr = document.createElement('tr');
//     let msgTopic = document.createElement('td');
//     let msgPayload = document.createElement('td');
//     let msgTime = document.createElement('td');
//     msgTopic.appendChild(document.createTextNode(finalTopic));
//     msgPayload.appendChild(document.createTextNode(payload));
//     msgTime.appendChild(document.createTextNode(moment().format('llll')));
//     tr.appendChild(msgTopic);
//     tr.appendChild(msgPayload);
//     tr.appendChild(msgTime);
//     tbody.appendChild(tr);
//     tbl.appendChild(tbody);
//     let tbl = document.getElementById('publishReceiver');
//     let tbody = document.getElementById('msg');
//     let tr = document.createElement('tr');
//     let msgTopic = document.createElement('td');
//     let msgPayload = document.createElement('td');
//     let msgTime = document.createElement('td');
//     msgTopic.appendChild(document.createTextNode(finalTopic));
//     msgPayload.appendChild(document.createTextNode(payload));
//     msgTime.appendChild(document.createTextNode(moment().format('llll')));
//     tr.appendChild(msgTopic);
//     tr.appendChild(msgPayload);
//     tr.appendChild(msgTime);
//     tbody.appendChild(tr);
//     tbl.appendChild(tbody);
//     // $('.broker tbody').append("<tr><td>" + finalTopic + "</td><td>" + payload + "</td><td>" + moment().format('llll') + "</td></tr>");

//   })

//   // client.publish("mqtt/demox", "hello world!")

//   btnPublish.addEventListener('click', function (e) {
//     e.preventDefault();
//     client.publish("mqtt/" + pubTopic.value, pubPayload.value)
//   })
// });
// $('#btn-Connect').click(function(){
// 	client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");
//   client.subscribe($("#topic").val());
  
//   console.log('connect button clicked');
// 	$("#status").text("Connecting");
// 	$("#status").removeClass("alert-secondary");
// 	$("#status").addClass("alert-warning");
// 	client.on("connect", function(){
// 		$("#status").text("Successfully connected");
// 		$("#status").removeClass("alert-warning");
// 		$("#status").addClass("alert-secondary");
// 		Swal.fire({
// 			position: 'top-end',
// 			type: 'success',
// 			title: 'Your successfully connect to the broker!',
// 			showConfirmButton: false,
// 			timer: 1500
// 		  })
// 		console.log("success");
// 	});



// btnConnect.addEventListener('click',function (e){
//   e.preventDefault();
//   onclick = document.write("Connected")
  // console.log("Connecting");
  // client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");

  // Status('onclick',function(a){
  //   a.onclick = document.write("Connected")
  // })
// })

// // advance functionalities
// client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
// client.subscribe("mqtt/demo", function (err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("subscribed")
//   }
// })

// client.on("connect", function(){
//     console.log("Successfully connected");
// })

// client.on("message", function (topic, payload) {
//   console.log([topic, payload].join(": "));
//   client.end();
// })

// client.publish("mqtt/demo", "hello world!", function(err){
//   if (err){
//     console.log(err)
//   } else {
//     console.log("published")
//   }
// })
