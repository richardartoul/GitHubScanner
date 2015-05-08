var getAllFiles = function() {
  var files = [];
  var filesFolders = $('td.content a');
  var domain = "https://github.com";
  var selector = 'td.content a';
  var recurse = function(url) {
    if (url.indexOf(".") > -1) {
      //file case
      files.push(url);
      return;
    }
    else {
      //folder case
      var localResponse = "";
      var localFolder = $.get(domain+url, function(response){
        var localFilesFolders = $(selector, response);
        for (var i = 0; i < localFilesFolders.length; i++) {
          recurse($(localFilesFolders[i]).attr("href"));
        }
        if ($.active === 1) {
          console.log(files);
        }
      });
    }
    // return files;
  }
  for (var i = 0; i < filesFolders.length; i++) {
    recurse($(filesFolders[i]).attr("href"));
  }

  return files;
}

getAllFiles();