'use strict';

function Horn(hornObject){
  this.image_url = hornObject.image_url;
  this.title = hornObject.title;
  this.description = hornObject.description;
  this.keyword = hornObject.keyword;
  this.horns = hornObject.horns;
}
let dropdownList = [];

Horn.allHorns = [];

Horn.prototype.toHtml = function(){
  let $htmlTemplate = $('#horn-template').html();

  let templateRender = Handlebars.compile($htmlTemplate);

  return templateRender(this);
}

//reads first JSON file then executes loading of horns and list
Horn.readJson = () => {
  $.get('page-1.json', 'json')
    .then(data =>{
      data.forEach( horn =>{
        Horn.allHorns.push( new Horn(horn));
      })
      Horn.allHorns.sort( (a,b) => {
        if (a.title < b.title) return -1;
        else if (a.title > b.title) return 1;
        else return 0;
      })
      Horn.allHorns.forEach(hornObject =>{
        $('#photo-template').append(hornObject.toHtml());
      })
    })
    .then(Horn.loadOptions);
}

//reads second JSON file then executes loading of horns and list
Horn.readJson2 = () => {
  $.get('page-2.json', 'json')
    .then(data =>{
      data.forEach( horn =>{
        Horn.allHorns.push( new Horn(horn));
      })
      Horn.allHorns.sort( (a,b) => {
        if (a.title < b.title) return -1;
        else if (a.title > b.title) return 1;
        else return 0;
      })
      Horn.allHorns.forEach(hornObject =>{
        $('#photo-template').append(hornObject.toHtml());
      })
    })
}

//executes readJSON function
$(() => Horn.readJson());
$(() => Horn.loadOptions());

//loads dropwdown bar with all keyword options
Horn.loadOptions = function() { 
  Horn.allHorns.forEach(horn => {
    if (!dropdownList.includes(horn.keyword)){
      dropdownList.push(horn.keyword);
    }
  })
  dropdownList.forEach(element => {
    $('#horn-select').append('<option class = "optionClone"></option>');
    const optionTag = $('option[class="optionClone"]');
    optionTag.attr('value', element)
    optionTag.text(element);
    optionTag.removeClass('optionClone');
  })
};

$('#page-1').on('click', function () {
  $('select').empty();
  $('section').empty();
  Horn.allHorns = []
  Horn.readJson();
})

$('#page-2').on('click', function () {
  $('select').empty();
  Horn.loadOptions();
  Horn.allHorns = [];
  $('section').empty();
  Horn.readJson2();
})

//event listener for selecting keyword from option list
$('select[id="horn-select"]').on('change', function () {
  let $selection = $(this).val();
  $('div').hide();
  $(`div[class="${$selection}"]`).show();
})

$('#sort-title').on('click', function () {
  Horn.allHorns.sort( (a,b) => {
    if (a.title < b.title) return -1;
    else if (a.title > b.title) return 1;
    else return 0;
  })
  $('select').empty();
  Horn.loadOptions();
  $('section').empty();
  Horn.allHorns.forEach(hornObject =>{
    $('#photo-template').append(hornObject.toHtml());
  })
})

$('#sort-horns').on('click', function () {
  Horn.allHorns.sort( (a,b) => {
    return a.horns - b.horns;
  })
  $('select').empty();
  Horn.loadOptions();
  $('section').empty();
  Horn.allHorns.forEach(hornObject =>{
    $('#photo-template').append(hornObject.toHtml());
  })
})
