/* eslint-disable no-undef */
$(document).ready(function () {
  $('a[href="#next"]').on('click', function (e) {
    e.preventDefault();
    var currentStep = $(this).closest('.steps');

    currentStep.removeClass('current');
    currentStep.next().addClass('current');
  });

  $('.login__steps a[href="#next"]').on('click', function(e) {
    e.preventDefault();
    var currentStep = $(this).closest('.login__steps');

    currentStep.removeClass('current');
    currentStep.next().addClass('current');
  });
});

var userOptions = {}

function getActionValue(number) {
  userOptions['actionNumber'] = number
}

function getTelephone(phone) {
  $.ajax({
    type: "POST",
    url: "/form/phone",
    data: {
      phone: phone
    },
    success: function (json) {
      userOptions['rightCode'] = json.rightCode
    },
    error: function (xhr, errmsg, err) {
      console.log(xhr.status + ": " + xhr.responseText);
    }
  })
}

function getCode(code) {
  $.ajax({
    type: "POST",
    url: "/form/code",
    data: {
      code: +code,
      actionNumber: userOptions['actionNumber'],
      rightCode: userOptions['rightCode']
    },
    success: function (json) {
      document.getElementById('errorOrSuccess').innerHTML = json.msg
    },
    error: function (xhr, errmsg, err) {
      console.log(xhr.status + ": " + xhr.responseText);
    }
  })
}