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
 *  The events class contains properties and functions related to Kettering
 *  University's events. It should provide an easy and structured 
 *  access to the latest events on campus.
 *
 *  @class KU.Events
 ******************************************************************************/
(function (lib) {
	
	
    // Default object
    var Events = {};
	
    
    // Private
    var page = null;
    
    
    /******************************************************************************
     *  Holds the detailed information about a Kettering event.
     *
     *  @class KU.Events.Event
     ******************************************************************************/
    function Event(title, mainHtml){


        /******************************************************************************
         *  Title of the event
         *
         *  @attribute title
         *  @type string
         *  @for KU.Events.Event
        ******************************************************************************/
        this.title = title;

      
        /******************************************************************************
         *  Event main HTML content
         *  
         *  @attribute mainHtml
         *  @type string
         *  @for KU.Events.Event
        ******************************************************************************/
        this.mainHtml = mainHtml;
        
      
        return this;
    };
    
	
    /******************************************************************************
     *  Holds all the basic information for a Kettering event. 
     *
     *  @class KU.Events.Caption
     ******************************************************************************/
    function Caption(title, location, time, month, dayOfTheMonth, dayOfTheWeek, tags, imgUrl, detailsUrl){

    
        /******************************************************************************
         *  Title of the event
         *
         *  @attribute title
         *  @type string
         *  @for KU.Events.Caption
        ******************************************************************************/
        this.title = title;
        
        
        /******************************************************************************
         *  Location of the event
         *
         *  @attribute location
         *  @type string
         *  @for KU.Events.Caption
        ******************************************************************************/
        this.location = location;

        
        /******************************************************************************
         *  Time of the event
         *
         *  @attribute time
         *  @type string
         *  @for KU.Events.Caption
        ******************************************************************************/
        this.time = time;
        
        
        /******************************************************************************
         *  Month of the event
         *
         *  @attribute month
         *  @type string
         *  @for KU.Events.Caption
        ******************************************************************************/
        this.month = month;
        
        
        /******************************************************************************
         *  Day of the month for the event
         *
         *  @attribute dayOfTheMonth
         *  @type string
         *  @for KU.Events.Caption
        ******************************************************************************/
        this.dayOfTheMonth = dayOfTheMonth;
        
        
        /******************************************************************************
         *  Day of the week for the event
         *
         *  @attribute dayOfTheWeek
         *  @type string
         *  @for KU.Events.Caption
        ******************************************************************************/
        this.dayOfTheWeek = dayOfTheWeek;
        
        
        /******************************************************************************
         *  Kettering's tags for the event
         *
         *  @attribute tags
         *  @type string
         *  @for KU.Events.Caption
        ******************************************************************************/
        this.tags = tags;
        
        
        /******************************************************************************
         *  Web address for the image/icon corresponding with the article. 
         *
         *  @attribute imgUrl
         *  @type string
         *  @for KU.Events.Caption
        ******************************************************************************/
        this.imgUrl = imgUrl;
        

        /******************************************************************************
         *  The web address to the detail article page.
         *
         *  @attribute detailsUrl
         *  @type string
         *  @for KU.Events.Caption
        ******************************************************************************/
        this.detailsUrl = detailsUrl;
        
    
        /******************************************************************************
         *  Retrieves the detailed contents of an event.
         * 
         *  @method getEvent
         *  @param {function} successCallback - Called after successful gathering of 
         *      the event. Function Header: <code>void successCallback(<span 
         *      class="type"><a class="crosslink" href="../classes/KU.Events.Event.html">
         *      KU.Events.Event</a></span> event)</code>;
         *  @param {function} failureCallback - Called after a failure at gathering the
         *      event. Function Header: void <code>failureCallback(String errMsg)</code>;
         *  @for KU.Events.Caption
         *  @return {void}
         *  @example  
         *      var success = function(event){
         *          ...
         *      }
         *     
         *      var failure = function(errMsg){
         *          ...
         *      }
         *      
         *      // Get article from first events caption
         *      captions[0].getEvent(success, failure);
         *****************************************************************************/
        this.getEvent = function(successCallback, failureCallback){
            
            
            Events.downloadEventDetails(detailsUrl, successCallback, failureCallback);
            
        };
	
        return this;

    };
    
    
    /******************************************************************************
     *  Retrieves the detailed contents of an event.
     * 
     *  @method downloadEventDetails
     *  @param {string} eventUrl - the web address of where to download the event from
     *  @param {function} successCallback - Called after successful gathering of 
     *      the event. Function Header: <code>void successCallback(<span 
     *      class="type"><a class="crosslink" href="../classes/KU.Events.Event.html">
     *      KU.Events.Event</a></span> event)</code>;
     *  @param {function} failureCallback - Called after a failure at gathering the
     *      event. Function Header: void <code>failureCallback(String errMsg)</code>;
     *  @for KU.Events.Caption
     *  @return {void}
     *  @example  
     *      var success = function(event){
     *          ...
     *      }
     *     
     *      var failure = function(errMsg){
     *          ...
     *      }
     *      
     *      // Get article from first events caption
     *      KU.Events.downloadEventDetails("http://www.kettering.edu/events/example",success, failure);
     *****************************************************************************/
    Events.downloadEventDetails = function(url, successCallback, failureCallback){
        
        // Properties used
        var url = 'http://www.kettering.edu/' + url;
        
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'html',
            success: function(data) {
            
                // Load downloaded document
                var doc = $("<div>").html(data);
                
                // Get necessary information
                var main = doc.find('.content.clearfix');
                var title = doc.find('.title.inside').text();
                
                // Make event
                var event = new Event(title, main)    
                
                // Callback!
                successCallback(event);
                
            },
            
            error: function(xhr, status, errorThrown){
                
                // Callback!
                failureCallback(errorThrown);
            }
        });
        
    };
    
    
    /******************************************************************************
     *  Retrieves a list of Caption grabbed and parsed from the specified page number
     * 
     *  @method retrieve
     *  @param {int} pageNumber - the index page to retrieve
     *  @param {function} successCallback - Called after successful gathering of 
     *      the list of Caption. Function Header: <code>void successCallback(<span 
     *      class="type"><a class="crosslink" href="../classes/KU.Events.Caption.html">
     *      KU.Events.Caption</a>[]</span> items)</code>;
     *  @param {function} failureCallback - Called after a failure at gathering the
     *      list of Caption. Function Header: void <code>failureCallback(String errMsg)</code>;
     *  @for KU.Events
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
     *      // Get events list from page 0
     *      KU.Events.retrieve(0, success, failure);
     *****************************************************************************/
    Events.retrieve = function( pageNumber, successCallback, failureCallback ){
      
      
        // Properties used
        var url;
      
        // Found at least one occasion where page=0 was different than default
		// site, /events seems more reliable without a page in this case
        if( pageNumber != 0 ) url = 'http://www.kettering.edu/events?page=' + pageNumber;
        else url = 'http://www.kettering.edu/events';
        
        page = pageNumber;
        
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'html',
            success: function(data) {
                
                // Start events list as blank
                var eventsList = [];
                
                // Declare most recent day!
                var recentMonth, recentDayOfTheMonth, recentDayOfTheWeek;
                
                // Go through each events item
                $("<div>").html(data).find('.views-row').each(
                    function(index){
                        
                        // Get first image
                        if($('img',this).length > 0) var source = $('img',this).eq(0).attr('src');
                        else var source = '';
                        
                        // Fix relative path
                        if(source[0] == "/"){
                            source = "http://www.kettering.edu" + source;
                        }
                        
                        // Setup item information
                        var title = $('h3', this).text();
                        var location = $('.info .location', this).text();
                        var tags = $('.tags', this).text();
                        var article_link = $('h3 a', this).attr('href');
                        
                        
    
                        // If there is more than one single day grab both..
                        // this actually accommodates a bug on Kettering's site
                        // where location actually gets put under time... oops
                        if($('.info .date-display-single', this).length == 2){
                            var time = $('.info .date-display-single', this).eq(0).text()
                                + " - " + $('.info .date-display-single', this).eq(1).text();
                        }
                        
                        // Only use a single time
                        else {
                            var time = $('.info .date-display-single', this).eq(0).text();
                        }
                        
                        // First event on that day? The update recent info!
                        if($(this).hasClass('views-row-1')){
                        
                            // Get month, day
                            recentMonth = $('.datebox',this).find('.month').text();
                            recentDayOfTheWeek = $('.datebox',this).find('.lower .dow').text();
                            recentDayOfTheMonth = $('.datebox',this).find('.day').text();
                            
                            // Replace (funny way to do this...)
                            recentMonth = recentMonth.replace('Jan','January');
                            recentMonth = recentMonth.replace('Feb','February');
                            recentMonth = recentMonth.replace('Mar','March');
                            recentMonth = recentMonth.replace('Apr','April');
                            recentMonth = recentMonth.replace('Jun','June');
                            recentMonth = recentMonth.replace('Jul','July');
                            recentMonth = recentMonth.replace('Aug','August');
                            recentMonth = recentMonth.replace('Sep','September');
                            recentMonth = recentMonth.replace('Oct','October');
                            recentMonth = recentMonth.replace('Nov','Novemeber');
                            recentMonth = recentMonth.replace('Dec','December');
                        
                        }
                        
                        
                        // Store events item
                        eventsList[index] = new Caption(title, location, time, 
                            recentMonth, recentDayOfTheMonth, recentDayOfTheWeek, 
                            tags, source, article_link);
                        
                    }	
                );
                
                // Callback!
                successCallback(eventsList);
            },
            
            error: function(xhr, status, errorThrown){
            
                // Callback!
                failureCallback(errorThrown);
            }
        });	
        
    };
    
    
    /******************************************************************************
     *  Retrieves the next page of event captions. Note this is a courtesy function 
     *  that is the same as calling retrieve on the next page number! 
     * 
     *  @method nextPage
     *  @param {function} successCallback - Called after successful gathering of 
     *      the list of Caption. Function Header: <code>void successCallback(<span 
     *      class="type"><a class="crosslink" href="../classes/KU.Events.Caption.html">
     *      KU.Events.Caption</a>[]</span> items)</code>;
     *  @param {function} failureCallback - Called after a failure at gathering the
     *      list of Caption. Function Header: void <code>failureCallback(String errMsg)</code>;
     *  @for KU.Events
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
     *      // Get events list from the next page
     *      KU.Events.nextPage(success, failure);
     *****************************************************************************/
    Events.nextPage = function (successCallback, failureCallback){
        
        // Adjust page number
        if(page == null) page = 0;
        else page++;

        // Retrieve!        
        Events.retrieve(page, successCallback, failureCallback);
        
    };
    
    
    /******************************************************************************
     *  Retrieves the previous page of event captions. Note this is a courtesy function 
     *  that is the same as calling retrieve on the previous page number! 
     * 
     *  @method previousPage
     *  @param {function} successCallback - Called after successful gathering of 
     *      the list of Caption. Function Header: <code>void successCallback(<span 
     *      class="type"><a class="crosslink" href="../classes/KU.Events.Caption.html">
     *      KU.Events.Caption</a>[]</span> items)</code>;
     *  @param {function} failureCallback - Called after a failure at gathering the
     *      list of Caption. Function Header: void <code>failureCallback(String errMsg)</code>;
     *  @for KU.Events
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
     *      // Get events list from the previous page
     *      KU.Events.previousPage(success, failure);
     *****************************************************************************/
    Events.previousPage = function (successCallback, failureCallback){
        
        // Adjust page number
        if(page == null) page = 0;
        else if ((page - 1) < 0) page = 0;
        else page--;

        // Retrieve!        
        Events.retrieve(page, successCallback, failureCallback);
        
    };
    
    
    // Save class to module
    lib.Events = Events;
    
}(KU));