$(document).ready(function(){

  var suggestionBox = $('.suggestion')
  var sidebar = $('.suggestionSidebar');
  var suggestionPage = "suggestions"
  var elementPosition = sidebar.offset();
  var citation = $('.citation');
  var numberRecs = $('.numberRecs');
  var citationHolder = $('.citation_holder');
  var i=$('.text_analysis').attr('example-no');
  var numberSuggestions = 0;

//  $(window).scroll(function(){
//    if($(window).scrollTop() > elementPosition.top){
//      sidebar.addClass('is-sticky');
//    } else {
//      sidebar.removeClass('is-sticky');
//    }
//  });

//  $.ajax({
//    url : suggestionPage+i+".html",
//    success : function (data) {
//      var mydata = $(data);
//      var i=0;
//      mydata.find('.citing_article').parent().each(function(){
//        _this = $(this);
//        citationCount = _this.find('.citing_article').length;
//        var citationOffset = $('.text_analysis').find('.citation').eq(i).offset();
//        ctop = citationOffset.top -192;
//        $('.text_analysis').find('.citation').eq(i).append('<span class="citationCount" style="top:'+ctop+'px">'+citationCount+'</span>');
//        i++;
//      });
//    }
//  });
//
//  $(window).smartresize(function(){
//    $('.citationCount').each(function(){
//      var citationOffset = $(this).offset();
//      var ctop = citationOffset.top -192;
//      $(this).css('top',ctop);
//    })
//  });

  citation.click(
    function(){
      var id = $(this).attr('id');
      citationHolder.fadeOut('fast', function(){
        suggestionBox.load(
          suggestionPage+i+".html" + " " +id, function(){
            var _this = $(this);
            numberSuggestions= _this.find('.citing_article').length;
            _this.fadeIn();
            if(numberSuggestions === 1){
              numberRecs.html(numberSuggestions + ' Recommendation');
            }
            else if (numberSuggestions > 1) {
              numberRecs.html(numberSuggestions + ' Recommendations');
            }
            _this.find('.citing_article').prepend('<span class="fui-plus-circle"></span><span class="fui-check-circle"></span>');
            suggestionBox.fadeIn();
            suggestionBox.find('.citing_article:first').click();
          }
        )
      });
    }
  )

  $('body').on('click', '.citing_article',
    function(){
      var _this = $(this);
      var id = _this.parent().attr('id');
      var citation = _this.find('.citing_text');
      if(_this.hasClass('shown_suggestion')){
        return false
      }
      else {
        $('.shown_suggestion').removeClass('shown_suggestion');
        _this.addClass('shown_suggestion');
        citationPos = $(".citation[id=#"+ id +"]").offset();
        citationHolder.fadeOut('fast',function(){
          citationHolder.empty();
          citationHolder.append('<p><strong>What '+numberSuggestions+' others said when citing this article</strong></p>',citation.clone(),sidebar);
          citationHolder.insertAfter(".citation[id=#"+ id +"]");


          citationHolder.fadeIn('fast',function(){
            $('html, body').animate({scrollTop: citationPos.top - 10},500);
          });

          if(!_this.is(':first-child')){
            _this.prependTo('.suggestions');
          }
        });
      }
    }
  );

  citation.each(function(){
    var _this = $(this);
    var id = $(this).attr('id');
  });

  if($('.text_analysis').length){
    $('.banner').fadeIn();
  }

  $('.export').click(function(){
    $('.exportFail').modal();
  });

  var citingCount;
  $.ajax({
    url : suggestionPage+i+".html",
    success : function (data) {
      var mydata = $(data);
      citingCount = mydata.find('.citing_text').length;
      $('#citingCount').text(citingCount);
      console.log(mydata.find('.citing_text').length,citingCount);
    }
  });

  var sentanceCount = $('.text_analysis').find(citation).length;
  $('#sentanceCount').text(sentanceCount)

});


(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
    var timeout;

    return function debounced () {
      var obj = this, args = arguments;
      function delayed () {
        if (!execAsap)
          func.apply(obj, args);
        timeout = null;
      };

      if (timeout)
        clearTimeout(timeout);
      else if (execAsap)
        func.apply(obj, args);

      timeout = setTimeout(delayed, threshold || 100);
    };
  }
  // smartresize
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');

