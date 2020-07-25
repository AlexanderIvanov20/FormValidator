/* eslint-disable no-undef */
$(document).ready(function () {
  $('a[href="#next"]').on('click', function (e) {
    e.preventDefault();
    var currentStep = $(this).closest('.steps');

    currentStep.removeClass('current');
    currentStep.next().addClass('current');
  });
});