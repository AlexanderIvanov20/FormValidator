/* eslint-disable no-undef */
$(document).ready(function () {
  $('a[href="#next"], button[id="next"]').on("click", function (e) {
    e.preventDefault();
    var currentStep = $(this).closest(".steps");

    currentStep.removeClass("current");
    currentStep.next().addClass("current");
  });

  $('.login__steps a[href="#next"]').on("click", function (e) {
    e.preventDefault();
    var currentStep = $(this).closest(".login__steps");

    currentStep.removeClass("current");
    currentStep.next().addClass("current");
  });
});

$("#idForm").submit(function (e) {
  e.preventDefault();

  var currentStep = $(this).closest(".steps");
  currentStep.removeClass("current");
  currentStep.next().addClass("current");

  var form = $(this);
  var url = form.attr("action");

  $.ajax({
    url: url,
    type: "POST",
    data: form.serialize(),
    success: function (json) {},
    error: function (xhr, errmsg, err) {
      console.log(xhr.status + ": " + xhr.responseText);
    },
  });
});

function getTelephone(phone) {
  $.ajax({
    type: "POST",
    url: "/form/phone",
    data: {
      phone: phone,
    },
    success: function (json) {},
    error: function (xhr, errmsg, err) {
      console.log(xhr.status + ": " + xhr.responseText);
    },
  });
}

function getCode(code) {
  $.ajax({
    type: "POST",
    url: "/form/code",
    data: {
      code: +code,
    },
    success: function (json) {
      document.getElementById("errorOrSuccess").innerHTML = json.msg;
    },
    error: function (xhr, errmsg, err) {
      // console.log(xhr.status + ": " + xhr.responseText);
      document.getElementById("errorOrSuccess").innerHTML =
        xhr.responseText.msg;
    },
  });
}

function getLogin(phone) {
  $.ajax({
    type: "POST",
    url: "/login",
    data: {
      phone,
    },
    success: function (json) {},
    error: function (xhr, errmsg, err) {
      console.log(xhr.status + ": " + xhr.responseText);
    },
  });
}

function getCodeLogin(code) {
  $.ajax({
    type: "POST",
    url: "/login/code",
    data: {
      code: +code,
    },
    success: function (json) {
      document.getElementById("errorOrSuccess").innerHTML = json.msg;
    },
    error: function (xhr, errmsg, err) {
      // console.log(xhr.status + ": " + xhr.responseText);
      document.getElementById("errorOrSuccess").innerHTML =
        xhr.responseText.msg;
    },
  });
}
