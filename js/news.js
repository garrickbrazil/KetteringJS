/*
 	This file is part of KetteringJS.

	KetteringJS is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    KetteringJS is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with KetteringJS.  If not, see <http://www.gnu.org/licenses/>.
*/


/******************************************************************************
 *  The news class contains properties and functions related to Kettering
 *  University's news articles. It should provide an easy and structured 
 *  access to the latest news articles on campus. 
 *
 *  @class KU.News
 ******************************************************************************/
(function (lib) {
	
	
    // Default object
    var News = {};
	
    
    // Private
    var page = null;
    
    
    /******************************************************************************
     *  Holds all the information for a Kettering news article.
     *
     *  @class KU.News.Article
     ******************************************************************************/
    function Article(title, headerInfo, mainHtml){


        /******************************************************************************
         *  Title of the article
         *
         *  @attribute title
         *  @type string
         *  @for KU.News.Article
        ******************************************************************************/
        this.title = title;

        
        /******************************************************************************
         *  Header info (such as date, category, etc)
         *
         *  @attribute headerInfo
         *  @type string
         *  @for KU.News.Article
        ******************************************************************************/
        this.headerInfo = headerInfo;
      
      
        /******************************************************************************
         *  Article main HTML content. This includes all types of elements including
         *  images and videos. 
         *  
         *  @attribute mainHtml
         *  @type string
         *  @for KU.News.Article
        ******************************************************************************/
        this.mainHtml = mainHtml;
      
      
        return this;
    };
    
	
    /******************************************************************************
     *  Holds all the very basic information for a Kettering news article. 
     *
     *  @class KU.News.Caption
     ******************************************************************************/
    function Caption(title, author, date, imgUrl, detailsUrl){
    
    
        /******************************************************************************
         *  Retrieves the detailed contents of a news article.
         * 
         *  @method getArticle
         *  @param {function} successCallback - Called after successful gathering of 
         *      the news article. Function Header: <code>void successCallback(<span 
         *      class="type"><a class="crosslink" href="../classes/KU.News.Article.html">
         *      KU.News.Article</a></span> article)</code>;
         *  @param {function} failureCallback - Called after a failure at gathering the
         *      news article. Function Header: void <code>failureCallback(String errMsg)</code>;
         *  @for KU.News.Caption
         *  @return {void}
         *  @example  
         *      var success = function(article){
         *          ...
         *      }
         *     
         *      var failure = function(errMsg){
         *          ...
         *      }
         *      
         *      // Get article from first news caption
         *      captions[0].getArticle(success, failure);
         *****************************************************************************/
        this.getArticle = function(successCallback, failureCallback){
            
            News.downloadArticle(detailsUrl, successCallback, failureCallback);
            
        };
      
        
        /******************************************************************************
         *  Title of the article
         *
         *  @attribute title
         *  @type string
         *  @for KU.News.Caption
        ******************************************************************************/
        this.title = title;
        
        
        /******************************************************************************
         *  Author who wrote the article
         *
         *  @attribute author
         *  @type string
         *  @for KU.News.Caption
        ******************************************************************************/
        this.author = author;
        

        /******************************************************************************
         *  Date when the article was written
         *
         *  @attribute date
         *  @type string
         *  @for KU.News.Caption
        ******************************************************************************/
        this.date = date;
        
        
        /******************************************************************************
         *  Web address for the image/icon corresponding with the article. 
         *
         *  @attribute imgUrl
         *  @type string
         *  @for KU.News.Caption
        ******************************************************************************/
        this.imgUrl = imgUrl;
        
	
        /******************************************************************************
         *  The web address to the detail article page.
         *
         *  @attribute detailsUrl
         *  @type string
         *  @for KU.News.Caption
        ******************************************************************************/
        this.detailsUrl = detailsUrl;
        
    
        return this;

    };
    

    /******************************************************************************
     *  Retrieves the detailed contents of a news article.
     * 
     *  @method downloadArticle
     *  @param {string} articleUrl - the full web address where to get the article from
     *  @param {function} successCallback - Called after successful gathering of 
     *      the news article. Function Header: <code>void successCallback(<span 
     *      class="type"><a class="crosslink" href="../classes/KU.News.Article.html">
     *      KU.News.Article</a></span> article)</code>;
     *  @param {function} failureCallback - Called after a failure at gathering the
     *      news article. Function Header: void <code>failureCallback(String errMsg)</code>;
     *  @for KU.News
     *  @return {void}
     *  @example  
     *      var success = function(article){
     *          ...
     *      }
     *     
     *      var failure = function(errMsg){
     *          ...
     *      }
     *      
     *      // Get article from first news caption
     *      KU.News.downloadArticle("http://news.kettering.edu/news/example", success, failure);
     *****************************************************************************/
    News.downloadArticle = function(articleUrl, successCallback, failureCallback){
        
        // Properties used
        var url = 'http://news.kettering.edu/' + articleUrl;
        
        
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'html',
            success: function(data) {
            
                // Load downloaded document
                var doc = $("<div>").html(data);
                
                // Get necessary information
                var main = doc.find('.field.field-name-body.field-type-text-with-summary.field-label-hidden');
                var title = doc.find('.news').text();
                var info = doc.find('.info').text();
                
                // Make article
                var article = new Article(title, info, main)    
                
                // Callback!
                successCallback(article);
                
            },
            
            error: function(xhr, status, errorThrown){
                
                // Callback!
                failureCallback(errorThrown);
            }
        });
        
    };
        
    
    
    /******************************************************************************
     *  Retrieves a list of Caption grabbed and parsed from the specified page number. 
     * 
     *  @method retrieve
     *  @param {int} pageNumber - the index page to retrieve
     *  @param {function} successCallback - Called after successful gathering of 
     *      the list of Caption. Function Header: <code>void successCallback(<span 
     *      class="type"><a class="crosslink" href="../classes/KU.News.Caption.html">
     *      KU.News.Caption</a>[]</span> items)</code>;
     *  @param {function} failureCallback - Called after a failure at gathering the
     *      list of Caption. Function Header: void <code>failureCallback(String errMsg)</code>;
     *  @for KU.News
     *  @return {void}
     *  @example  
     *      var success = function(items){
     *          ...
     *      }
     *     
     *      var failure = function(errMsg){
     *          ...
     *      }
     *      
     *      // Get news list from page 0
     *      KU.News.retrieve(0, success, failure);
     *****************************************************************************/
    News.retrieve = function( pageNumber, successCallback, failureCallback ){
      
      
        // Properties used
        var url;
      
        // Found at least one occasion where page=0 was different than default
		// site, current-news seems more reliable without a page in this case
        if( pageNumber != 0 ) url = 'http://news.kettering.edu/news/current-news?page=' + pageNumber;
        else url = 'http://news.kettering.edu/news/current-news';
        
        page = pageNumber;
        
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'html',
            success: function(data) {
                
                // Start news list as blank
                var newsList = [];
                
                // Go through each news item
                $("<div>").html(data).find('.news-caption').each(
                    function(index){
                        
                        // Get first image
                        if($('img',this).length > 0) var source = $('img',this).eq(0).attr('src');
                        else var source = '';
                        
                        // Fix relative path
                        if(source[0] == "/"){
                            source = "http://news.kettering.edu" + source;
                        }
                        
                        // Setup item information
                        var title = $('h3', this).text();
                        var by = $('.info .by', this).text();
                        var date = $('.info .date', this).text();
                        var article_link = $('.more', this).attr('href');
                        
                        // Store news item
                        newsList[index] = new Caption(title, by, date, source, article_link);
                    }	
                );
                
                // Callback!
                successCallback(newsList);
            },
            
            error: function(xhr, status, errorThrown){
            
                // Callback!
                failureCallback(errorThrown);
            }
        });	
        
    };
    
    
    /******************************************************************************
     *  Retrieves the next page of news captions. Note this is a courtesy function 
     *  that is the same as calling retrieve on the next page number! 
     * 
     *  @method nextPage
     *  @param {function} successCallback - Called after successful gathering of 
     *      the list of Caption. Function Header: <code>void successCallback(<span 
     *      class="type"><a class="crosslink" href="../classes/KU.News.Caption.html">
     *      KU.News.Caption</a>[]</span> items)</code>;
     *  @param {function} failureCallback - Called after a failure at gathering the
     *      list of Caption. Function Header: void <code>failureCallback(String errMsg)</code>;
     *  @for KU.News
     *  @return {void}
     *  @example  
     *      var success = function(items){
     *          ...
     *      }
     *     
     *      var failure = function(errMsg){
     *          ...
     *      }
     *      
     *      // Get news list from next page
     *      KU.News.nextPage(success, failure);
     *****************************************************************************/
    News.nextPage = function (successCallback, failureCallback){
        
        // Adjust page number
        if(page == null) page = 0;
        else page++;
        
        // Retrieve!
        News.retrieve(page, successCallback, failureCallback);
        
    };
    

    
    /******************************************************************************
     *  Retrieves the previous page of news captions. Note this is a courtesy function 
     *  that is the same as calling retrieve on the previous page number! 
     * 
     *  @method previousPage
     *  @param {function} successCallback - Called after successful gathering of 
     *      the list of Caption. Function Header: <code>void successCallback(<span 
     *      class="type"><a class="crosslink" href="../classes/KU.News.Caption.html">
     *      KU.News.Caption</a>[]</span> items)</code>;
     *  @param {function} failureCallback - Called after a failure at gathering the
     *      list of Caption. Function Header: void <code>failureCallback(String errMsg)</code>;
     *  @for KU.News
     *  @return {void}
     *  @example  
     *      var success = function(items){
     *          ...
     *      }
     *     
     *      var failure = function(errMsg){
     *          ...
     *      }
     *      
     *      // Get news list from previous page
     *      KU.News.previousPage(success, failure);
     *****************************************************************************/    
    News.previousPage = function (successCallback, failureCallback){
        
        // Adjust page number
        if(page == null) page = 0;
        else if ((page - 1) < 0) page = 0;
        else page--;

        // Retrieve!        
        News.retrieve(page, successCallback, failureCallback);
        
    };
    
    
    // Save class to module
    lib.News = News;
    
}(KU));