function rssFeed(items){
  $.ajax({
    url: "http://ajax.googleapis.com/ajax/services/feed/load?v=1.08&num=" + items + "&output=json&q=" + encodeURIComponent("http://www.kasuaris.com/feed/") + "&hl=en&callback=?",
    dataType: "json",
    success: function (data) {
      var entries = data.responseData.feed.entries.length;
      var entry = data.responseData.feed.entries;
     
      setEntries(entries,entry);
      setPages(entries,entry);
      $("#rss_ul li").bind("click",function(event){
        $("#email").hide();
        $("#back-button").show();
        $("#logo-kasuaris").show();
      });
    }
  });
}

function setEntries(entries,entry){
  var items= "";
  var item;
  var img;
  var imgurl;
  var title;
  var tmp;
  for (var i=0;i<entries;i++){
    tmp = entry[i].mediaGroups[0].contents[0].url;
    imgurl = tmp.replace("150x150.","50x50.");
    img = '<div style="width:50px;height:100%; float:left"><img src="' + imgurl + '"/></div>';
    title = "<p style='margin-left:60px;font-size:10pt;font-weight:bold'>" + entry[i].title + "</p>";
    items = items + '<li><a href="#page' + i + '">' + img + title; + '</a></li>';
  }
  $("#rss_ul").html(items);
}

function setPages(entries,entry){
  var items= "";
  var item;
  var page;
  var d,cont,page,h;
  
  for (var i=0;i<entries;i++){
    d = new Date(entry[i].publishedDate);
    d = d.toLocaleDateString();
    cont = "#cont" + i;
    page = "#page" + i;
    el = "cont" + i;
    item = "<p style='font-weight:bold;font-size:12pt;margin-top:7pt'>" + entry[i].title + "</p><p style='color:#bbb'>Datum: " + d + "</p><hr>" + entry[i].content + "<br><br><br><br>";
    $(cont).html(item).addClass("change");
    $(page).attr("title",entry[i].categories[0]);
    $(".change a").removeAttr("href").css("color", "blue" );

    $(".change iframe").each(function(){
      if(this.width  > $(window).width()){
        this.height = this.height / (this.width / $(window).width());
        this.width = $(window).width() - 12;
      }
    });

    $(".change img").each(function(){
      if(this.width  > $(window).width()){
        this.height = this.height / (this.width / $(window).width());
        this.width = $(window).width() - 12;
      }
    });
  }
}

function goBack(){
  $("#back-button").hide();
  $("#logo-kasuaris").hide();
  $("#email").show();
  window.history.go(-1);
}

