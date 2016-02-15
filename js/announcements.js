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
 *  The announcement class contains properties and functions related to Kettering
 *  University's campus announcements. It should provide an easy and structured 
 *  access to the latest announcement captions on campus. 
 *
 *  @class KU.Announcements
 ******************************************************************************/
(function (lib) {
	
	
    // Default object
    var Announcements = {};
	
    // Private
    var page = null;
    
	
    /******************************************************************************
     *  Holds all the very basic information for a Kettering announcement. 
     *
     *  @class KU.Announcements.Caption
     ******************************************************************************/
    function Caption(title, mainHtml){
      
        
        /******************************************************************************
         *  Title of the announcement
         *
         *  @attribute title
         *  @type string
         *  @for KU.Announcements.Caption
        ******************************************************************************/
        this.title = title;
        
	
        /******************************************************************************
         *  The main html for the announcement, containing relevant information, links
         *  and images. 
         *
         *  @attribute mainHtml
         *  @type string
         *  @for KU.Announcements.Caption
        ******************************************************************************/
        this.mainHtml = mainHtml;
        
    
        return this;

    };
    
    
    /******************************************************************************
     *  Retrieves a list of captions grabbed and parsed from the specified page number. 
     * 
     *  @method retrieve
     *  @param {int} pageNumber - the index page to retrieve
     *  @param {function} successCallback - Called after successful gathering of 
     *      the list of captions. Function Header: <code>void successCallback(<span 
     *      class="type"><a class="crosslink" href="../classes/KU.Announcements.Caption.html">
     *      KU.Announcements.Caption</a>[]</span> items)</code>;
     *  @param {function} failureCallback - Called after a failure at gathering the
     *      list of captions. Function Header: void <code>failureCallback(String errMsg)</code>;
     *  @for KU.Announcements
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
     *      // Get announcements list from page 0
     *      KU.Announcements.retrieve(0, success, failure);
     *****************************************************************************/
    Announcements.retrieve = function( pageNumber, successCallback, failureCallback ){
      
      
        // Properties used
        var url;
      
        // Found at least one occasion where page=0 was different than default
		// site, current-announcements seems more reliable without a page in this case
        if( pageNumber != 0 ) url = 'http://my.kettering.edu/announcements?page=' + pageNumber;
        else url = 'http://my.kettering.edu/announcements/';
        
        page = pageNumber;
        
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'html',
            success: function(data) {
                
                // Start list as blank
                var announcementList = [];
                
                // Go through each item
                $("<div>").html(data).find('.views-row').each(
                    function(index){
                        
                        // Setup item information
                        var title = $('h3:first', this).text();
                        var mainHtml = $(this);
                        mainHtml.find("h3:first").remove();
                        
                        // Store item
                        announcementList[index] = new Caption(title, mainHtml.html());
                    }
                );
                
                // Callback!
                successCallback(announcementList);
            },
            
            error: function(xhr, status, errorThrown){
            
                // Callback!
                failureCallback(errorThrown);
            }
        });	
        
    };
    
    
    /******************************************************************************
     *  Retrieves the next page of announcement captions. Note this is a courtesy function 
     *  that is the same as calling retrieve on the next page number! 
     * 
     *  @method nextPage
     *  @param {function} successCallback - Called after successful gathering of 
     *      the list of captions. Function Header: <code>void successCallback(<span 
     *      class="type"><a class="crosslink" href="../classes/KU.Announcements.Caption.html">
     *      KU.Announcements.Caption</a>[]</span> items)</code>;
     *  @param {function} failureCallback - Called after a failure at gathering the
     *      list of captions. Function Header: void <code>failureCallback(String errMsg)</code>;
     *  @for KU.Announcements
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
     *      // Get announcements list from next page
     *      KU.Announcements.nextPage(success, failure);
     *****************************************************************************/
    Announcements.nextPage = function (successCallback, failureCallback){
        
        // Adjust page number
        if(page == null) page = 0;
        else page++;
        
        // Retrieve!
        Announcements.retrieve(page, successCallback, failureCallback);
        
    };
    

    
    /******************************************************************************
     *  Retrieves the previous page of announcements captions. Note this is a courtesy function 
     *  that is the same as calling retrieve on the previous page number! 
     * 
     *  @method previousPage
     *  @param {function} successCallback - Called after successful gathering of 
     *      the list of Caption. Function Header: <code>void successCallback(<span 
     *      class="type"><a class="crosslink" href="../classes/KU.Announcements.Caption.html">
     *      KU.Announcements.Caption</a>[]</span> items)</code>;
     *  @param {function} failureCallback - Called after a failure at gathering the
     *      list of captions. Function Header: void <code>failureCallback(String errMsg)</code>;
     *  @for KU.Announcements
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
     *      // Get announcements list from previous page
     *      KU.Announcements.previousPage(success, failure);
     *****************************************************************************/    
    Announcements.previousPage = function (successCallback, failureCallback){
        
        // Adjust page number
        if(page == null) page = 0;
        else if ((page - 1) < 0) page = 0;
        else page--;

        // Retrieve!        
        Announcements.retrieve(page, successCallback, failureCallback);
        
    };
    
    
    // Save class to module
    lib.Announcements = Announcements;
    
}(KU));