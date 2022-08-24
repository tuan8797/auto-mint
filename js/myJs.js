const textConfig = {
  text1: "auto mint",
  text2: "Có cc nhé",
  text3: "",
  text4: "",
  text5: "Stop",
  text6: "Run",
  text7: "",
  text8: "",
  text9: "",
  text10: "",
  text11: "",
  text12: "",
};

$(document).ready(function () {
  let timer;
  // process bar
  setTimeout(function () {
    firstQuestion();
    $(".spinner").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
    $("body").delay(350).css({
      overflow: "visible",
    });
  }, 600);

  $("#text3").html(textConfig.text3);
  $("#text4").html(textConfig.text4);
  $("#no").html(textConfig.text5);
  $("#yes").html(textConfig.text6);

  function firstQuestion() {
    $(".content").hide();
    Swal.fire({
      title: textConfig.text1,
      text: textConfig.text2,
      background: '#fff url("img/iput-bg.jpg")',
      imageAlt: "Custom image",
    }).then(async function () {
      $(".content").show(200);
    });
  }

  // switch button position
  function switchButton() {
    var audio = new Audio("sound/duck.mp3");
    audio.play();
    var leftNo = $("#no").css("left");
    var topNO = $("#no").css("top");
    var leftY = $("#yes").css("left");
    var topY = $("#yes").css("top");
    $("#no").css("left", leftY);
    $("#no").css("top", topY);
    $("#yes").css("left", leftNo);
    $("#yes").css("top", topNO);
  }
  // move random button póition
  function moveButton() {
    var audio = new Audio("sound/Swish1.mp3");
    audio.play();
    if (screen.width <= 1200) {
      var x = Math.random() * 800;
      var y = Math.random() * 500;
    } else {
      var x = Math.random() * 500;
      var y = Math.random() * 800;
    }
    var left = x + "px";
    var top = y + "px";
    $("#no").css("left", left);
    $("#no").css("top", top);
  }

  var n = 0;
  $("#no").mousemove(function () {
    if (n < 1) switchButton();
    if (n > 1) moveButton();
    n++;
  });
  $("#no").click(() => {
    clearInterval(timer);
    // if (screen.width >= 900) switchButton();
  });

  // generate text in input
  function textGenerate() {
    var n = "";
    var text = " " + textConfig.text9;
    var a = Array.from(text);
    var textVal = $("#txtReason").val() ? $("#txtReason").val() : "";
    var count = textVal.length;
    if (count < a.length) {
      if (count > 0) {
        for (let i = 1; i <= count; i++) {
          n = n + a[i];
          if (i == text.length + 1) {
            $("#txtReason").val("");
            n = "";
            break;
          }
        }
      }
      $("#txtReason").val(n);
    } else {
      $("#txtReason").val("");
    }
  }

  // show popup
  $("#yes").click(function () {
    const address = document.getElementById("address").value;
    const amount = document.getElementById("amount").value;
    const default_address =
      "0xd1168a91c8c8f6ce002ba443e7a2f8a6cc040c5791806d33e2b7c78dfcdda0f3";
    const default_amount = 5000000;
    timer = setInterval(() => {
      axios.post(
        `https://faucet.devnet.aptoslabs.com/mint?amount=${
          amount > 0 ? amount : default_amount
        }&address=${address || default_address}`
      );
    }, 1000);
    // var audio = new Audio("sound/tick.mp3");
    // audio.play();
    // Swal.fire({
    //   title: textConfig.text7,
    //   html: true,
    //   width: 900,
    //   padding: "3em",
    //   html: "<input type='text' class='form-control' id='txtReason'  placeholder='Whyyy'>",
    //   background: '#fff url("img/iput-bg.jpg")',
    //   backdrop: `
    //                 rgba(0,0,123,0.4)
    //                 url("img/giphy2.gif")
    //                 left top
    //                 no-repeat
    //               `,
    //   showCancelButton: false,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonColor: "#fe8a71",
    //   cancelButtonColor: "#f6cd61",
    //   confirmButtonText: textConfig.text8,
    // }).then((result) => {
    //   if (result.value) {
    //     Swal.fire({
    //       width: 900,
    //       confirmButtonText: textConfig.text12,
    //       background: '#fff url("img/iput-bg.jpg")',
    //       title: textConfig.text10,
    //       text: textConfig.text11,
    //       confirmButtonColor: "#83d0c9",
    //       onClose: () => {
    //         window.location = "";
    //       },
    //     });
    //   }
    // });

    // $("#txtReason").focus(function () {
    //   var handleWriteText = setInterval(function () {
    //     textGenerate();
    //   }, 10);
    //   $("#txtReason").blur(function () {
    //     clearInterval(handleWriteText);
    //   });
    // });
  });
});
