var rssReader = {
    container : null,

    // initialization function
    init : function(selector) {
        container = document.getElementById('post_results');
        
        // getting necessary variables
            var rssUrl = document.getElementById('textBoxRSSURL').value;
            var num = 50;
            var id = container.getAttribute('id');

            // creating temp scripts which will help us to transform XML (RSS) to JSON
            var url = encodeURIComponent(rssUrl);
            var googUrl = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+num+'&q='+url+'&callback=rssReader.parse&context='+id;

            var script = document.createElement('script');
            script.setAttribute('type','text/javascript');
            script.setAttribute('charset','utf-8');
            script.setAttribute('src',googUrl);
            container.appendChild(script);
        
    },

    // parsing of results by google
    parse : function(context, data) {
        var container = document.getElementById(context);
        container.innerHTML = '';

        // creating list of elements
        var mainList = document.createElement('table');
        
        // also creating its childs (subitems)
        var entries = data.feed.entries;
        for (var i=0; i<entries.length; i++) {
        	var rowItem = document.createElement('tr');        	
            var listItem = document.createElement('td');
            var title = entries[i].title;
            var contentSnippet = entries[i].contentSnippet;
            var contentSnippetText = document.createTextNode(contentSnippet);

            var link = document.createElement('a');
            link.setAttribute('href', entries[i].link);
            link.setAttribute('target','_blank');
            var text = document.createTextNode(title);
            link.appendChild(text);

            // add link to list item
            listItem.appendChild(link);

            
            var desc = document.createElement('td');
            desc.appendChild(contentSnippetText);

            
            
            // adding list item to main list
            rowItem.appendChild(listItem);
            //add description to list item
            rowItem.appendChild(desc);
            
            
            mainList.appendChild(rowItem);
            
        }
        container.appendChild(mainList);
    }
};

function openFeed() {
    rssReader.init('post_results');
}
