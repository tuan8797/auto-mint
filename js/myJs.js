const textConfig = {
  text1: "Chàooo Míttt Xinhh",
  text2:
    "Chúng ta nói chuyện với nhau cũng được một thời gian rồi nhỉ ??. Vậy thì bắt đầu khám phá điều bất ngờ tiếp nhé",
  text3:
    "Tỏ tình với em theo cách truyền thống không được thì anh chuyển sang cách dân IT vậy :)))",
  text4: "Làm người yêu anh nhé 😊😊❤️",
  text5: "Còn lâu, anh mơ à",
  text6: "Vâng, em đồng ý <3",
  text7: "Vậy là em đã đồng ý rồi nhá 😘😘. Lý do lần này em đồng ý là gì á??",
  text8: "Gửi cho anh <3",
  text9: "Vì anh vui tính, tốt bụng và đẹp trai nữa. Hihi.",
  text10: "Anh biết mà. Yêu em 3000 <3",
  text11:
    "Vậy hẹn em lần đi ăn đồ hàn nhé. Em có thể cho anh gợi ý vê quán được khumm. Qua ib với anh nhé",
  text12: "Dạ okeii lunnn",
};

$(document).ready(function () {
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
      imageUrl: "img/cute-img.jpg",
      imageWidth: 300,
      imageHeight: 550,
      background: '#fff url("img/iput-bg.jpg")',
      imageAlt: "Custom image",
    }).then(function () {
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
    if (screen.width >= 900) switchButton();
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
    var audio = new Audio("sound/tick.mp3");
    audio.play();
    Swal.fire({
      title: textConfig.text7,
      html: true,
      width: 900,
      padding: "3em",
      html: "<input type='text' class='form-control' id='txtReason'  placeholder='Whyyy'>",
      background: '#fff url("img/iput-bg.jpg")',
      backdrop: `
                    rgba(0,0,123,0.4)
                    url("img/giphy2.gif")
                    left top
                    no-repeat
                  `,
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonColor: "#fe8a71",
      cancelButtonColor: "#f6cd61",
      confirmButtonText: textConfig.text8,
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          width: 900,
          confirmButtonText: textConfig.text12,
          background: '#fff url("img/iput-bg.jpg")',
          title: textConfig.text10,
          text: textConfig.text11,
          confirmButtonColor: "#83d0c9",
          onClose: () => {
            window.location =
              "https://www.facebook.com/messages/t/100011582774797";
          },
        });
      }
    });

    $("#txtReason").focus(function () {
      var handleWriteText = setInterval(function () {
        textGenerate();
      }, 10);
      $("#txtReason").blur(function () {
        clearInterval(handleWriteText);
      });
    });
  });
});
