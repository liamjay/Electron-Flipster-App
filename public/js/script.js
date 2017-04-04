$(function(){
    const electron    = require('electron');
    const os          = require('os');
    const prettyBytes = require('pretty-bytes');

    $('.stats').append('Number of cpu cores: <span>' + os.cpus().length + '</span>');
    $('.stats').append('Free memory: <span>' + prettyBytes(os.freemem())+ '</span>');

    let shell = electron.shell;
    let ul    = $('.flipster ul');

    $.get('http://feeds.feedburner.com/Tutorialzine', function(response){
        let rss = $(response);

        rss.find('item').each(function(){
            let item = $(this);
            
            let content  = item.find('encoded').html().split('</a></div>')[0]+'</a></div>';
            let urlRegex = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g;

            let imageSource = content.match(urlRegex)[1];
            let li          = $('<li><img /><a target="_blank"></a></li>');

            li.find('a')
                .attr('href', item.find('link').text())
                .text(item.find("title").text());

            li.find('img').attr('src', imageSource);

            li.appendTo(ul);
        });

        $('.flipster').flipster({
            style: 'carousel'
        });

        $('.flipster').on('click', 'a', function (e) {
            e.preventDefault();
            
            shell.openExternal(e.target.href);
        });
    });
});