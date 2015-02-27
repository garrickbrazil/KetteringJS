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
 *  KU is the module/namespace used to contain all relevant classes, functions,
 *  and properties of the KetteringJS library.
 *  @module KU
 ******************************************************************************/
var KU = {
    
    // Nothing yet
    
};



/******************************************************************************
 *  The directory class will allow the library to gather information
 *  on faculty/staff members such as name, office, phone number, and email.
 *
 *  @class KU.Directory
 ******************************************************************************/
(function (lib) {
	
	
    // Default object
    var Directory = {};
    
    // Private
    var searchParams = null;
    var latestSearch = null;
    
    
    /******************************************************************************
     *  Deobfuscate a message
     *
     *  @param {string} message - the string which needs to be deobfuscated
     ******************************************************************************/
    function Deobfuscate(message) {

		var aZ = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
		var nM = "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm0123456789"
		
		var map = [];
		var converted = "";

		for (var index = 0; index <= aZ.length; index++) {map[aZ.substr(index, 1)] = nM.substr(index, 1)}

		for (var index = 0; index <= message.length; index++) {
			
			var c = message.charAt(index);
			converted  += (c in map ? map[c] : c);
		}

		return converted;

	}
    
    
    /******************************************************************************
     *  Holds the information for a Kettering department
     *
     *  @class KU.Directory.Department
     ******************************************************************************/
    function Department(name, valueId){


        /******************************************************************************
         *  The name of the department in plain English.
         *
         *  @attribute name
         *  @type string
         *  @for KU.Directory.Department
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "name" , { 
        
            // Getter and Setter
            get: function() { return name; },
            set: function(val) { /* Read only!! */ }
        });
        
        
        /******************************************************************************
         *  The value identifier of the department used with the directory API and
         *  specifically the search method. This value is generally an int, but can
         *  also be a string (e.g All)
         *
         *  @attribute valueId
         *  @type string
         *  @for KU.Directory.Department
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "valueId" , { 
        
            // Getter and Setter
            get: function() { return valueId; },
            set: function(val) { /* Read only!! */ }
        });
        
        
    }
    
    
    /******************************************************************************
     *  Holds all the information for a Kettering faculty/staff member.
     *
     *  @class KU.Directory.Contact
     ******************************************************************************/
    function Contact(fullName, info, imgUrl){


        /******************************************************************************
         *  The full name of the faculty/staff member.
         *
         *  @attribute fullName
         *  @type string
         *  @for KU.Directory.Contact
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "fullName" , { 
        
            // Getter and Setter
            get: function() { return fullName; },
            set: function(val) { /* Read only!! */ }
        });

        
        /******************************************************************************
         *  Information on the directory contact. Unfortunately the information is
         *  unordered and unclassified so it can only exist for now as an array
         *  of strings. Usually the order is [department, tags, office, phone, email].
         *  Important: this order is NOT guaranteed nor is it that each of these pieces
         *  will be available.
         *
         *  @attribute info
         *  @type Array<String>
         *  @for KU.Directory.Contact
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "info" , { 
        
            // Getter and Setter
            get: function() { return info; },
            set: function(val) { /* Read only!! */ }
        });
        

        /******************************************************************************
         *  The image url corresponding to the faculty/staff member. 
         *
         *  @attribute imgUrl
         *  @type string
         *  @for KU.Directory.Contact
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "imgUrl" , { 
        
            // Getter and Setter
            get: function() { return imgUrl; },
            set: function(val) { /* Read only!! */ }
        });
        
      
        return this;
    }
    
    
    /******************************************************************************
     *  Cancels the current search for the directory. 
     * 
     *  @method abort
     *  @return {void}
     *  @for KU.Directory
     *  @example  
     *      // Abort the latest search!
     *      KU.Directory.abort();
     *****************************************************************************/
    Directory.abort = function(){
        
        // Abort the ajax call!!
        if(latestSearch != null) {
            
            latestSearch.abort();
            latestSearch = null;
        }
    }
    
    
    /******************************************************************************
     *  Searches through Kettering directory with the specified parameters.
     * 
     *  @method search
     *  @param {string} firstName - first name to search with
     *  @param {string} lastName - last name to search with
     *  @param {string} ext - extension to use in search
     *  @param {string} departmentId - value identifier for a department used in search
     *  @param {function} successCallback - Called after successful gathering of 
     *      the search results. Function Header: <code>void successCallback(<span 
     *      class="type"><a class="crosslink" href="..\classes\KU.Directory.Contact.html">
     *      KU.Directory.Contact</a>[]</span> items)</code>;
     *  @param {function} failureCallback - Called after a failure at gathering the
     *      search results. Function Header: void <code>failureCallback(String errMsg)</code>;
     *  @for KU.Directory
     *  @return {void}
     *  @example  
     *      var success = function(contacts){
     *          ...
     *      }
     *     
     *      var failure = function(errMsg){
     *          ...
     *      }
     *      
     *      // Search through directory
     *      KU.Directory.search("", "Huggins", "", "All", success, failure);
     *****************************************************************************/
    Directory.search = function (firstName, lastName, ext, departmentId, 
                        successCallback, failureCallback, page){

        // Fix page if not specified
        if(page == undefined) var page = 0;
        
        // Only one search at a time
        if (latestSearch != null){
            
            failureCallback("One search is already occurring. Please cancel first.");
            return;
        }
    
        // Save search parameters
        searchParams = { 
            "page":page, 
            "firstName":firstName, 
            "lastName":lastName,
            "ext":ext, 
            "departmentId":departmentId 
        };
        
        // Setup url
        var url = 'http://www.kettering.edu/faculty-staff/directory?' 
                + 'field_faculty_staff_first_value=' + encodeURIComponent(firstName)
                + '&field_faculty_staff_last_value=' + encodeURIComponent(lastName) 
                + '&field_phone_extension_value=' + ext +  '&tid=' +departmentId
                + '&page=0' + page;
        
        
        latestSearch = $.ajax({
            url: url,
            type: 'GET',
            dataType: 'html',
            success: function(data) {
                
                
                // Setup contact array and find html elements
                var contacts = [];
                var contactList = $("<div>").html(data).find('.directory-caption');
                
        
                // Go through each directory item
                contactList.each(
                    function(index){
                        
                        // Get first image or use default
                        if($('img',this).length > 0) var source = $('img',this).eq(0).attr('src');
                        else var source = 'images/default_directory_icon.jpg';

                        // Fix relative path
                        if(source[0] == "/"){
                            source = "http://www.kettering.edu" + source;
                        }
                        
                        // Gather information
                        var name = $('h3', this).first().text();

                        var info = [];
                        
                        $('.inside span', this).each(
                            function(i){
                                
                                
                                // Fixes a bug with Kettering's html that causes the same element to already be 
                                // added to addition text. 
                                //
                                // Solution: 
                                //  1. Clone yourself so you don't ruin the rest of the html
                                //  2. Find all children then remove
                                //  3. Use end to essentially refresh then get text
                                var detail = $(this).clone().children().remove().end().text();
                                
                                // Obfuscated? Ha!
                                if($(this).hasClass("obfuscated")){
                                    
                                    // Reverse
                                    detail = detail.split("").reverse().join("");
                                    
                                    // Deobfuscate
                                    detail = Deobfuscate(detail);
                                }
                                
                                // Non-empty information?
                                if(!(detail.replace(/\s+/g, '') == "" || $(this).find('.tel').length > 0)){
                                    
                                    // Store detail
                                    info[i] = detail;
                                }
                                
                        });
                        
                        contacts[index] = new Contact(name, info, source);
                        
                    }	
                );

                // Clear search
                latestSearch = null;
                
                // Callback!
                successCallback(contacts);

            },
            
            
            error: function(xhr, status, errorThrown){

                // Clear search
                latestSearch = null;
            
                // Callback!
                if(status != "abort") failureCallback(errorThrown);
                
            }
        });	
        
    };
    
    
    /******************************************************************************
     *  Gathers the next page of the latest search in the directory.
     * 
     *  @method nextPage
     *  @param {function} successCallback - Called after successful gathering of 
     *      the search results. Function Header: <code>void successCallback(<span 
     *      class="type"><a class="crosslink" href="..\classes\KU.Directory.Contact.html">
     *      KU.Directory.Contact</a>[]</span> items)</code>;
     *  @param {function} failureCallback - Called after a failure at gathering the
     *      search results. Function Header: void <code>failureCallback(String errMsg)</code>;
     *  @for KU.Directory
     *  @return {void}
     *  @example  
     *      var success = function(contacts){
     *          ...
     *      }
     *     
     *      var failure = function(errMsg){
     *          ...
     *      }
     *      
     *      // Get next page
     *      KU.Directory.nextPage(success, failure);
     *****************************************************************************/
    Directory.nextPage = function(successCallback, failureCallback){

        // Null search?
        if(searchParams == null) {
            
            // Error
            failureCallback("Please search before you attempt to get Next Page");
            return;
        }
    
        // Reroute to search function!
       Directory.search(searchParams.firstName, searchParams.lastName, 
                searchParams.ext, searchParams.departmentId, 
                successCallback, failureCallback, searchParams.page + 1)
      
    };
    
    
    /******************************************************************************
     *  Gathers the previous page of the latest search in the directory.
     * 
     *  @method previousPage
     *  @param {function} successCallback - Called after successful gathering of 
     *      the search results. Function Header: <code>void successCallback(<span 
     *      class="type"><a class="crosslink" href="..\classes\KU.Directory.Contact.html">
     *      KU.Directory.Contact</a>[]</span> items)</code>;
     *  @param {function} failureCallback - Called after a failure at gathering the
     *      search results. Function Header: void <code>failureCallback(String errMsg)</code>;
     *  @for KU.Directory
     *  @return {void}
     *  @example  
     *      var success = function(contacts){
     *          ...
     *      }
     *     
     *      var failure = function(errMsg){
     *          ...
     *      }
     *      
     *      // Get previous page
     *      KU.Directory.previousPage(success, failure);
     *****************************************************************************/
    Directory.previousPage = function(successCallback, failureCallback){

        // Null search?
        if(searchParams == null) {
            
            // Error
            failureCallback("Please search before you attempt to get Previous Page");
            return;
        }
        
        // Negative?
        else if ((searchParams.page - 1) < 0){
            
            // No negative pages!
            successCallback([]);
            return;
        }
    
        // Reroute to search function!
       Directory.search(searchParams.firstName, searchParams.lastName, 
                searchParams.ext, searchParams.departmentId, 
                successCallback, failureCallback, searchParams.page - 1)
      
    };
    
    
    
    /******************************************************************************
     *  Retrieves a list of valid departments available to search with. 
     * 
     *  @method getDepartments
     *  @param {function} successCallback - Called after successful gathering of 
     *      the list of departments. Function Header: <code>void successCallback(<span 
     *      class="type"><a class="crosslink" href="..\classes\KU.Directory.Department.html">
     *      KU.Directory.Department</a>[]</span> items)</code>;
     *  @param {function} failureCallback - Called after a failure at gathering the
     *      list of departments. Function Header: void <code>failureCallback(String errMsg)</code>;
     *  @for KU.Directory
     *  @return {void}
     *  @example  
     *      var success = function(departments){
     *          ...
     *      }
     *     
     *      var failure = function(errMsg){
     *          ...
     *      }
     *      
     *      // Get department list
     *      KU.Directory.getDepartments(success, failure);
     *****************************************************************************/
    Directory.getDepartments = function(successCallback, failureCallback){
        
        
        // Setup URL
        var url = "http://www.kettering.edu/faculty-staff/directory?"
                + "field_faculty_staff_first_value=&field_faculty_staff_last_value="
                + "&field_phone_extension_value=KUMOBILE&tid=All";
        
        
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'html',
            
            // Success
            success: function(data) {
                
                // Setup departments then query for <option><option/>
                var departments = [];
                var departmentList = $("<div>").html(data).find('#edit-tid option');
                
                departmentList.each(
                    function(index){
                     
                        // Get attributes
                        var value = $(this).attr("value");
                        var name = $(this).text();
                        
                        // Make new department
                        departments[index] = new Department(name, value);
                        
                    }
                );
                
                // Callback!
                successCallback(departments);
                
            },
            
            // Error
            error: function(data){
                
                // Callback!
                failureCallback(data);
                
            }
        });	
        
        
        
    };
    
    
    // Save class to module
    lib.Directory = Directory;
    
}(KU));


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
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "title" , { 
        
            // Getter and Setter
            get: function() { return title; },
            set: function(val) { /* Read only!! */ }
        });

      
        /******************************************************************************
         *  Event main HTML content
         *  
         *  @attribute mainHtml
         *  @type string
         *  @for KU.Events.Event
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "mainHtml" , { 
        
            // Getter and Setter
            get: function() { return mainHtml; },
            set: function(val) { /* Read only!! */ }
        });
      
        return this;
    };
    
	
    /******************************************************************************
     *  Holds all the basic information for a Kettering event. 
     *
     *  @class KU.Events.Caption
     ******************************************************************************/
    function Caption(title, location, time, month, dayOfTheMonth, dayOfTheWeek, tags, imgUrl, detailsUrl){

        // Privates
        var details = null;
    
        /******************************************************************************
         *  Title of the event
         *
         *  @attribute title
         *  @type string
         *  @for KU.Events.Caption
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "title" , { 
        
            // Getter and Setter
            get: function() { return title; },
            set: function(val) { /* Read only!! */ }
        });
        
        
        /******************************************************************************
         *  Location of the event
         *
         *  @attribute location
         *  @type string
         *  @for KU.Events.Caption
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "location" , { 
        
            // Getter and Setter
            get: function() { return location; },
            set: function(val) { /* Read only!! */ }
        });


        /******************************************************************************
         *  Time of the event
         *
         *  @attribute time
         *  @type string
         *  @for KU.Events.Caption
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "time" , { 
        
            // Getter and Setter
            get: function() { return time; },
            set: function(val) { /* Read only!! */ }
        });
        
        
        /******************************************************************************
         *  Month of the event
         *
         *  @attribute month
         *  @type string
         *  @for KU.Events.Caption
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "month" , { 
        
            // Getter and Setter
            get: function() { return month; },
            set: function(val) { /* Read only!! */ }
        });
        
        
        /******************************************************************************
         *  Day of the month for the event
         *
         *  @attribute dayOfTheMonth
         *  @type string
         *  @for KU.Events.Caption
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "dayOfTheMonth" , { 
        
            // Getter and Setter
            get: function() { return dayOfTheMonth; },
            set: function(val) { /* Read only!! */ }
        });
        
        
        /******************************************************************************
         *  Day of the week for the event
         *
         *  @attribute dayOfTheWeek
         *  @type string
         *  @for KU.Events.Caption
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "dayOfTheWeek" , { 
        
            // Getter and Setter
            get: function() { return dayOfTheWeek; },
            set: function(val) { /* Read only!! */ }
        });
        
        
        /******************************************************************************
         *  Kettering's tags for the event
         *
         *  @attribute tags
         *  @type string
         *  @for KU.Events.Caption
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "tags" , { 
        
            // Getter and Setter
            get: function() { return tags; },
            set: function(val) { /* Read only!! */ }
        });
        
        
        /******************************************************************************
         *  Web address for the image/icon corresponding with the article. 
         *
         *  @attribute imgUrl
         *  @type string
         *  @for KU.Events.Caption
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "imgUrl" , { 
        
            // Getter and Setter
            get: function() { return imgUrl; },
            set: function(val) { /* Read only!! */ }
        });
    
    
        /******************************************************************************
         *  Retrieves the detailed contents of an event.
         * 
         *  @method getEvent
         *  @param {function} successCallback - Called after successful gathering of 
         *      the event. Function Header: <code>void successCallback(<span 
         *      class="type"><a class="crosslink" href="..\classes\KU.Events.Event.html">
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
            
            
            // Do we already have details?
            if(details != null){
                
                // Send the details then finish up!
                successCallback(details);
                return;
            }
            
            
            // Properties used
            var url = 'http://www.kettering.edu/' + detailsUrl;
            
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
	
        return this;

    };
    
    
    /******************************************************************************
     *  Retrieves a list of Caption grabbed and parsed from the specified page number
     * 
     *  @method retrieve
     *  @param {int} pageNumber - the index page to retrieve
     *  @param {function} successCallback - Called after successful gathering of 
     *      the list of Caption. Function Header: <code>void successCallback(<span 
     *      class="type"><a class="crosslink" href="..\classes\KU.Events.Caption.html">
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
        if( pageNumber == 0 ) url = 'http://www.kettering.edu/events?page=' + pageNumber;
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
     *      class="type"><a class="crosslink" href="..\classes\KU.Events.Caption.html">
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
     *      class="type"><a class="crosslink" href="..\classes\KU.Events.Caption.html">
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


/******************************************************************************
 *  The library class will allow KetteringJS to gather information
 *  on currently available books available at Ketterings Library!
 *
 *  @class KU.Library
 ******************************************************************************/
(function (lib) {

    
    // Default object
    var Library = {};    
    
    // Private
    var searchParams = null;
    var latestSearch = null;
    
    // Constant
    var LIBRARY_OPTIONS = [
        {"valueId":"GENERAL^SUBJECT^GENERAL^^words or phrase","name":"Words or Phrase"},
        {"valueId":"AU^AUTHOR^AUTHORS^Author Processing^author","name":"Author"},
        {"valueId":"TI^TITLE^SERIES^Title Processing^title","name":"Title"},
        {"valueId":"SU^SUBJECT^SUBJECTS^^subject","name":"Subject"},
        {"valueId":"SER^SERIES^SERIES^Title Processing^series","name":"Series"},
        {"valueId":"PER^PERTITLE^SERIES^Title Processing^periodical title","name":"Periodical"}
    ];


    /******************************************************************************
     *  Contains information for a single Library book in Kettering's database.
     *
     *  @class KU.Library.Book
     ******************************************************************************/    
    function Book(title, author, callNumber, holdings, imgUrl){
        
        
        /******************************************************************************
         *  Title of the book
         *
         *  @attribute title
         *  @type string
         *  @for KU.Library.Book
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "title" , { 
        
            // Getter and Setter
            get: function() { return title; },
            set: function(val) { /* Read only!! */ }
        });
        
        /******************************************************************************
         *  Author of the book
         *
         *  @attribute author
         *  @type string
         *  @for KU.Library.Book
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "author" , { 
        
            // Getter and Setter
            get: function() { return author; },
            set: function(val) { /* Read only!! */ }
        });
        
        
        /******************************************************************************
         *  Call number for the book
         *
         *  @attribute callNumber
         *  @type string
         *  @for KU.Library.Book
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "callNumber" , { 
        
            // Getter and Setter
            get: function() { return callNumber; },
            set: function(val) { /* Read only!! */ }
        });
        
        
        /******************************************************************************
         *  Holdings statement for the book (number of books left / availability).
         *
         *  @attribute holdings
         *  @type string
         *  @for KU.Library.Book
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "holdings" , { 
        
            // Getter and Setter
            get: function() { return holdings; },
            set: function(val) { /* Read only!! */ }
        });
        
        
        /******************************************************************************
         *  Web address for the image corresponding to the book (if there is one)!
         *
         *  @attribute imgUrl
         *  @type string
         *  @for KU.Library.Book
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "imgUrl" , { 
        
            // Getter and Setter
            get: function() { return imgUrl; },
            set: function(val) { /* Read only!! */ }
        });
        
    }
    
    
    /******************************************************************************
     *  Name value pair for a search option 
     *
     *  @class KU.Library.SearchOption
     ******************************************************************************/
    function SearchOption(name, valueId){
    
    
        /******************************************************************************
         *  The name of the search option in plain English
         *
         *  @attribute name
         *  @type string
         *  @for KU.Library.SearchOption
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "name" , { 
        
            // Getter and Setter
            get: function() { return name; },
            set: function(val) { /* Read only!! */ }
        });
        
        
        /******************************************************************************
         *  The value identifier of the search option used with the library API and
         *  specifically the search method. This value is generally a strange string
         *  defined by our 3rd party library system. 
         *
         *  @attribute valueId
         *  @type string
         *  @for KU.Library.SearchOption
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "valueId" , { 
        
            // Getter and Setter
            get: function() { return valueId; },
            set: function(val) { /* Read only!! */ }
        });

    
    };
    
    
    /******************************************************************************
     *  Searches through Kettering library with the specified parameters.
     * 
     *  @method search
     *  @param {string} field - plain text field to search with
     *  @param {string} searchOptionId - option Id for category to search with.
     *  @param {function} successCallback - Called after successful gathering of 
     *      the search results. Function Header: <code>void successCallback(<span 
     *      class="type"><a class="crosslink" href="..\classes\KU.Library.Book.html">
     *      KU.Library.Book</a>[]</span> items)</code>;
     *  @param {function} failureCallback - Called after a failure at gathering the
     *      search results. Function Header: void <code>failureCallback(String errMsg)</code>;
     *  @for KU.Library
     *  @return {void}
     *  @example  
     *      var success = function(books){
     *          ...
     *      }
     *     
     *      var failure = function(errMsg){
     *          ...
     *      }
     *      
     *      // Search through the library
     *      KU.Library.search("Cryptography", "SU^SUBJECT^SUBJECTS^^subject", success, failure);
     *****************************************************************************/
    Library.search = function(field, searchOptionId, successCallback, failureCallback, params){
        
        
        // Send in parameters as well so we can page jump?
        if(params != undefined){
            
            // Compile URL
            var url = "http://catalog.palnet.info" + params.action + "?"
                        + "firsthit=&lasthit=&form_type=" + "JUMP%5E" + ((params.page*20) + 1);
            
            var page = params.page;
        }
        
        // Just a plain search
        else{

            // Compile URL
            var url = 'http://elibrary.palnet.info/uhtbin/cgisirsi/x/0/0/57/5?'
                        + 'library=KU&location=KUMAIN&match_on=KEYWORD&shadow=NO'
                        + '&user_id=kuweb&srchfield1=' + encodeURIComponent(searchOptionId) 
                        + '&searchdata1=' + encodeURIComponent(field);
            
            var page = 0;
        }
        
        // Store ajax (in case we need to cancel later)
        latestSearch = $.ajax({
            url: url,
            type: 'GET',
            dataType: 'html',
            success: function(data) {
                
                // Default
                var books = [];
                
                // Get list!
                var downloaded = $("<div>").html(data);
                var hitlist = downloaded.find('.hit_list_row');
                
                // Session / action
                var action = downloaded.find("#hitlist").first().attr("action");
        
                searchParams = {
                    "action":action, 
                    "field": field, 
                    "searchOptionId": searchOptionId,
                    "page": page
                }
        
                // Go through each library item
                hitlist.each(
                    function(index){
                        
                        // Get first image or use default
                        if($('.hit_list_list_cover script',this).length > 0){
                            
                            // Tricky interpretation of the hitlist script
                            // NOTE: this is usually dynamically loaded by the below script...
                            // we will not do this, instead lets parse the arguments out
                            // then interpret them ourselves..
                            var horribleScript = $('.hit_list_list_cover script',this).eq(0).text()
                                                .replace(/\s/g, '').replace("getHitCover('", '')
                                                .replace("');", '');
                            
                            var source = "";
                            
                            // Get argument list
                            var args = horribleScript.split("','");
                            
                            if(args.length == 8){
                                
                                // Setup source !
                                source = args[0] + "isbn="
                                        + args[2].replace(/,.+/g,'') + "/SC.GIF"
                                        + "&client=" + args[1]
                                        + "&type=xw12&upc=&oclc=" 
                                        + args[4].replace(/,.+/g,'');							
                            }
                        }
                        else {

                            // Use default source
                            var source = "";
                        }

                        // Setup item information
                        var title = $('.title', this).first().text().trim();
                        var author = $(".author",this).first().text().trim();
                        var callNumber = $(".call_number",this).first().text().trim();
                        var holdingsStatement = $(".holdings_statement",this).first().text().trim();
                        
                        books[index] = new Book(title, author, callNumber, holdingsStatement, source);
                    
                    }	
                );
                
                // Callback!
                latestSearch = null;
                successCallback(books);
                
            },
            
            error: function(xhr, status, errorThrown){
            
                // Callback
                latestSearch = null;
                if(status != "abort") failureCallback(errorThrown);
            }
        });
        
    };
    
    /******************************************************************************
     *  Gets the next page for the latest Library search!
     * 
     *  @method nextPage
     *  @param {function} successCallback - Called after successful gathering of 
     *      the search results. Function Header: <code>void successCallback(<span 
     *      class="type"><a class="crosslink" href="..\classes\KU.Library.Book.html">
     *      KU.Library.Book</a>[]</span> items)</code>;
     *  @param {function} failureCallback - Called after a failure at gathering the
     *      search results. Function Header: void <code>failureCallback(String errMsg)</code>;
     *  @for KU.Library
     *  @return {void}
     *  @example  
     *      var success = function(books){
     *          ...
     *      }
     *     
     *      var failure = function(errMsg){
     *          ...
     *      }
     *      
     *      // Search through the library
     *      KU.Library.nextPage(success, failure);
     *****************************************************************************/
    Library.nextPage = function(successCallback, failureCallback){
        
        
        searchParams.page++;
        
        // Redirect the search!
        Library.search(searchParams.field, searchParams.searchOptionId,
                    successCallback, failureCallback, searchParams);
        
    }
    
    
    
    /******************************************************************************
     *  Returns a list of valuable library options to search by. 
     * 
     *  @method getSearchOptions
     *  @return {KU.Library.SearchOption[]}
     *  @for KU.Library
     *  @example  
     *      // Get search options!
     *      var options = KU.Library.getSearchOptions();
     *****************************************************************************/
    Library.getSearchOptions = function(){
    
        return LIBRARY_OPTIONS;
    };
    
    
    /******************************************************************************
     *  Cancels the current search for the library. 
     * 
     *  @method abort
     *  @return {void}
     *  @for KU.Library
     *  @example  
     *      // Abort the latest search!
     *      KU.Library.abort();
     *****************************************************************************/
    Library.abort = function(){
        
        // Abort the ajax call!!
        if(latestSearch != null) {
            
            latestSearch.abort();
            latestSearch = null;
        }
    };
    
    

    // Save class to module
    lib.Library = Library;
    
}(KU));


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
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "title" , { 
        
            // Getter and Setter
            get: function() { return title; },
            set: function(val) { /* Read only!! */ }
        });

        /******************************************************************************
         *  Header info (such as date, category, etc)
         *
         *  @attribute headerInfo
         *  @type string
         *  @for KU.News.Article
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "headerInfo" , { 
        
            // Getter and Setter
            get: function() { return headerInfo; },
            set: function(val) { /* Read only!! */ }
        });
      
        /******************************************************************************
         *  Article main HTML content. This includes all types of elements including
         *  images and videos. 
         *  
         *  @attribute mainHtml
         *  @type string
         *  @for KU.News.Article
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "mainHtml" , { 
        
            // Getter and Setter
            get: function() { return mainHtml; },
            set: function(val) { /* Read only!! */ }
        });
      
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
         *      class="type"><a class="crosslink" href="..\classes\KU.News.Article.html">
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
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "title" , { 
        
            // Getter and Setter
            get: function() { return title; },
            set: function(val) { /* Read only!! */ }
        });
        
        
        /******************************************************************************
         *  Author who wrote the article
         *
         *  @attribute author
         *  @type string
         *  @for KU.News.Caption
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "author" , { 
        
            // Getter and Setter
            get: function() { return author; },
            set: function(val) { /* Read only!! */ }
        });
        

        /******************************************************************************
         *  Date when the article was written
         *
         *  @attribute date
         *  @type string
         *  @for KU.News.Caption
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "date" , { 
        
            // Getter and Setter
            get: function() { return date; },
            set: function(val) { /* Read only!! */ }
        });
        
        
        /******************************************************************************
         *  Web address for the image/icon corresponding with the article. 
         *
         *  @attribute imgUrl
         *  @type string
         *  @for KU.News.Caption
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "imgUrl" , { 
        
            // Getter and Setter
            get: function() { return imgUrl; },
            set: function(val) { /* Read only!! */ }
        });
	
        /******************************************************************************
         *  The web address to the detail article page.
         *
         *  @attribute detailsUrl
         *  @type string
         *  @for KU.News.Caption
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "detailsUrl" , { 
        
            // Getter and Setter
            get: function() { return detailsUrl; },
            set: function(val) { /* Read only!! */ }
        });
        
    
        return this;

    };
    

    /******************************************************************************
     *  Retrieves the detailed contents of a news article.
     * 
     *  @method downloadArticle
     *  @param {string} articleUrl - the full web address where to get the article from
     *  @param {function} successCallback - Called after successful gathering of 
     *      the news article. Function Header: <code>void successCallback(<span 
     *      class="type"><a class="crosslink" href="..\classes\KU.News.Article.html">
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
     *      KU.News.downloadArticle("http://www.kettering.edu/news/example", success, failure);
     *****************************************************************************/
    News.downloadArticle = function(articleUrl, successCallback, failureCallback){
        
        // Properties used
        var url = 'http://www.kettering.edu/' + articleUrl;
        
        
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
     *      class="type"><a class="crosslink" href="..\classes\KU.News.Caption.html">
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
        if( pageNumber != 0 ) url = 'http://www.kettering.edu/news/current-news?page=' + pageNumber;
        else url = 'http://www.kettering.edu/news/current-news';
        
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
                            source = "http://www.kettering.edu" + source;
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
     *      class="type"><a class="crosslink" href="..\classes\KU.News.Caption.html">
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
     *      class="type"><a class="crosslink" href="..\classes\KU.News.Caption.html">
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


/******************************************************************************
 *  The transfer class will allow KetteringJS to gather information
 *  on transferable courses to Kettering!
 *
 *  @class KU.Transfer
 ******************************************************************************/
(function (lib) {

    
    // Default object
    var Transfer = {}
	
	// Private
	var latestSearch = null;
	
	
	/******************************************************************************
     *  Contains information for a college able to transfer credits to Kettering!
     *
     *  @class KU.Transfer.College
     ******************************************************************************/    
    function College(name, code, city, state){
		
		
		/******************************************************************************
         *  Name of the college
         *
         *  @attribute name
         *  @type string
         *  @for KU.Transfer.College
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "name" , { 
        
            // Getter and Setter
            get: function() { return name; },
            set: function(val) { /* Read only!! */ }
        });
		
		
		/******************************************************************************
         *  Search code used against Kettering's database
         *
         *  @attribute code
         *  @type string
         *  @for KU.Transfer.College
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "code" , { 
        
            // Getter and Setter
            get: function() { return code; },
            set: function(val) { /* Read only!! */ }
        });
		
		
		/******************************************************************************
         *  City where college is located (if known).
         *
         *  @attribute city
         *  @type string
		 *  @optional
         *  @for KU.Transfer.College
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "city" , { 
        
            // Getter and Setter
            get: function() { return city; },
            set: function(val) { /* Read only!! */ }
        });
		
		
		/******************************************************************************
         *  State where college is located (if known).
         *
         *  @attribute state
         *  @type string
		 *  @optional
         *  @for KU.Transfer.College
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "state" , { 
        
            // Getter and Setter
            get: function() { return state; },
            set: function(val) { /* Read only!! */ }
        });
	
	};
	
	
	/******************************************************************************
     *  Contains information for a course which is transferable to Kettering!
     *
     *  @class KU.Transfer.Course
     ******************************************************************************/    
    function Course(kuTitle, kuCourseId, transCourseId, transTitle, credits, college){
		
		
		/******************************************************************************
         *  Title for Kettering course
         *
         *  @attribute kuTitle
         *  @type string
         *  @for KU.Transfer.Course
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "kuTitle" , { 
        
            // Getter and Setter
            get: function() { return kuTitle; },
            set: function(val) { /* Read only!! */ }
        });
		
		
		/******************************************************************************
         *  Course Id for Kettering course
         *
         *  @attribute kuCourseId
         *  @type string
         *  @for KU.Transfer.Course
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "kuCourseId" , { 
        
            // Getter and Setter
            get: function() { return kuCourseId; },
            set: function(val) { /* Read only!! */ }
        });
		
		
		/******************************************************************************
         *  Title for transfer course as referenced from other college
         *
         *  @attribute transTitle
         *  @type string
         *  @for KU.Transfer.Course
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "transTitle" , { 
        
            // Getter and Setter
            get: function() { return transTitle; },
            set: function(val) { /* Read only!! */ }
        });
		
		
		/******************************************************************************
         *  Course Id for transfer course as referenced from other college
         *
         *  @attribute transCourseId
         *  @type string
         *  @for KU.Transfer.Course
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "transCourseId" , { 
        
            // Getter and Setter
            get: function() { return transCourseId; },
            set: function(val) { /* Read only!! */ }
        });
		
		
		/******************************************************************************
         *  Number of credits the transfer course is worth
         *
         *  @attribute credits
         *  @type string
         *  @for KU.Transfer.Course
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "credits" , { 
        
            // Getter and Setter
            get: function() { return credits; },
            set: function(val) { /* Read only!! */ }
        });
		
		
		/******************************************************************************
         *  College that corresponds with the transfer course
         *
         *  @attribute college
         *  @type KU.Transfer.College
         *  @for KU.Transfer.Course
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "college" , { 
        
            // Getter and Setter
            get: function() { return college; },
            set: function(val) { /* Read only!! */ }
        });
	
	};
	
    
    /******************************************************************************
     *  Searches for transfer courses by course id
     * 
     *  @method searchByCollege
	 *  @param {int} collegeCode - the college code to be searched by 
     *  @param {function} successCallback - Called after successful gathering of 
     *      the transfer courses. Function Header: <code>void successCallback(<span 
     *      class="type"><a class="crosslink" href="..\classes\KU.Transfer.Course.html">
     *      KU.Transfer.Course</a>[]</span> items)</code>;
     *  @param {function} failureCallback - Called after a failure at gathering the
     *      the transfer courses. Function Header: void <code>failureCallback(String errMsg)</code>;
     *  @for KU.Transfer
     *  @return {void}
     *  @example  
     *      var success = function(courses){
     *          ...
     *      }
     *     
     *      var failure = function(errMsg){
     *          ...
     *      }
     *      
     *      // Get college list
     *      KU.Transfer.searchByCollege(004896, success, failure);
     *****************************************************************************/
    Transfer.searchByCollege = function(collegeCode, successCallback, failureCallback){
        
        // Compile URL
        var url = 'https://okras.kettering.edu/kuapps/apex_apps.transfer_art_pkg.get_json_ces_credits?'
                    + 'as_sbgi=' + collegeCode;
        
        
        var courseList = [];
        
        // Store ajax (in case we need to cancel later)
        latestSearch = $.ajax({
            url: url,
            type: 'GET',
            dataType: 'html',
            success: function(data) {
                        
                var courses = JSON.parse(data).entries;
                
                // Sort by state then by college
                var sorter = function(a,b) {
                    if (a.kucourse < b.kucourse)
                        return -1;
                    else if (a.kucourse > b.kucourse)
                        return 1;
                    else{
                        if (a.kucoursetitle < b.kucoursetitle)
                            return -1;
                        else if (a.kucoursetitle > b.kucoursetitle)
                            return 1;
                        else return 0;
                    } 
                }
                
                // Sort
                courses.sort(sorter);
                
                // Counter
                var courseCounter = 0;
                
                for(var index = 0; index < courses.length; index++){
                    
                    // Course properties
                    var kuTitle, kuCourseId, transCourseId, transTitle, credits, college;
                    
                    // College properties
                    var name, code, city, state;
                    
                    var course = courses[index];
                    
                    if(course.transferableflag == "Y"){
                        
                        // Get properties
                        kuTitle = course.kucoursetitle.trim();
                        kuCourseId = course.kucourse.trim();
                        transCourseId = course.trnscrse.trim();
                        transTitle = course.trnscrsetitle.trim();
                        credits = course.credits.trim();
                        name = course.institution.replace(collegeCode,"").trim();
                        code = collegeCode;
                        
                        college = new College(name, code, city, state);
                        courseList[courseCounter++] = 
                            new Course(kuTitle, kuCourseId, transCourseId, transTitle, credits, college);
                        
                    }
                }
            
                // Callback!
                latestSearch = null;
                successCallback(courseList);
            
            },
            
            error: function(xhr, status, errorThrown){
            
                // Callback
                latestSearch = null;
                if(status != "abort") failureCallback(errorThrown);
            }
            
        });
        
    }
    
	/******************************************************************************
     *  Searches for transfer courses by course id
     * 
     *  @method searchByCourseId
	 *  @param {string} subject - the course prefix, e.g MATH
	 *  @param {string} idNumber - the course number, e.g 101
	 *  @param {string} stateAbr - filter by state abreviation, examples are ALL, MI, FL
     *  @param {function} successCallback - Called after successful gathering of 
     *      the transfer courses. Function Header: <code>void successCallback(<span 
     *      class="type"><a class="crosslink" href="..\classes\KU.Transfer.Course.html">
     *      KU.Transfer.Course</a>[]</span> items)</code>;
     *  @param {function} failureCallback - Called after a failure at gathering the
     *      the transfer courses. Function Header: void <code>failureCallback(String errMsg)</code>;
     *  @for KU.Transfer
     *  @return {void}
     *  @example  
     *      var success = function(courses){
     *          ...
     *      }
     *     
     *      var failure = function(errMsg){
     *          ...
     *      }
     *      
     *      // Get college list
     *      KU.Transfer.searchByCourseId("MATH", 101, "ALL", success, failure);
     *****************************************************************************/
	Transfer.searchByCourseId = function(subject, idNumber, stateAbr, successCallback, failureCallback){
		
		// Compile URL
		var url = 'https://okras.kettering.edu/kuapps/apex_apps.transfer_art_pkg.'
					+ 'get_json_transferable_courses?as_state=ALL'
					+ '&as_subject=' + encodeURIComponent(subject.toUpperCase()) 
					+ '&as_course=' + encodeURIComponent(idNumber);
		
        var courseList = [];
        
		// Store ajax (in case we need to cancel later)
		latestSearch = $.ajax({
			url: url,
			type: 'GET',
			dataType: 'html',
			success: function(data) {
				
				var courses = JSON.parse(data).transfercourses;
				
				// Sort by state then by college
                var sorter = function(a,b) {
                  
                    // Sort by state
                    if (a.course_state < b.course_state) return -1;
                    else if (a.course_state > b.course_state) return 1;
                  
                    // Tie
                    else{
                        
                        // Sort by college
                        if (a.college < b.college) return -1;
                        else if (a.college > b.college) return 1;
                        else{
                        
                            // Sort by course title
                            if (a.course_title < b.course_title) return -1;
                            else if (a.course_title > b.course_title) return 1;
                            else return 0;
                        
                        } 
                    } 
                };
				
                // Sort courses
				courses.sort(sorter);
            
                for(var index = 0; index < courses.length; index++){

                
                    // Course properties
                    var kuTitle, kuCourseId, transCourseId, transTitle, credits, college;
                    
                    // College properties
                    var name, code, city, state;
                    
                    // Get properties
                    var course = courses[index];
                    kuCourseId = subject.toUpperCase() + '-' + idNumber;
                    transCourseId = course.course;
                    transTitle = course.course_title;
                    name = course.college;
                    code = course.college_code;
                    city = course.course_city;
                    state = course.course_state;
                    
                    college = new College(name, code, city, state);
                    courseList[index] = 
                        new Course(kuTitle, kuCourseId, transCourseId, transTitle, credits, college);
                }
                
                
                // Callback!
                latestSearch = null;
                successCallback(courseList);
                
            },
            
            error: function(xhr, status, errorThrown){
            
                // Callback
                latestSearch = null;
                if(status != "abort") failureCallback(errorThrown);
            }
            
        });
                
	};
	
	
	/******************************************************************************
     *  Retrieves a list of valid colleges which can be searched with. 
     * 
     *  @method getColleges
     *  @param {function} successCallback - Called after successful gathering of 
     *      the colleges. Function Header: <code>void successCallback(<span 
     *      class="type"><a class="crosslink" href="..\classes\KU.Transfer.College.html">
     *      KU.Transfer.College</a>[]</span> items)</code>;
     *  @param {function} failureCallback - Called after a failure at gathering the
     *      colleges. Function Header: void <code>failureCallback(String errMsg)</code>;
     *  @for KU.Transfer
     *  @return {void}
     *  @example  
     *      var success = function(colleges){
     *          ...
     *      }
     *     
     *      var failure = function(errMsg){
     *          ...
     *      }
     *      
     *      // Get college list
     *      KU.Transfer.getColleges(success, failure);
     *****************************************************************************/
	Transfer.getColleges = function(successCallback, failureCallback){
	
		
		// Compile URL
		var url = 'https://okras.kettering.edu/kuapps/apex_apps.transfer_art_pkg'
				+ '.get_json_ces_colleges';
		
		var collegeList = [];
		
		$.ajax({
			url: url,
			type: 'GET',
			dataType: 'html',
			
			// Success
			success: function(data) {
				
				var colleges = JSON.parse(data).entries;
				
				// Check all colleges
				for(var index = 0; index < colleges.length; index++){
					
					var college = colleges[index];
					
					// Store college
					collegeList[index] = new College(college.stvsbgi_desc, college.stvsbgi_code);
				}
				
				// Callback
				successCallback(collegeList);
				
			},
			
			// Error
			error: function(data){
			
				// Callback!
				failureCallback(data);
			}
		});	
	
	};
	
	
    /******************************************************************************
     *  Cancels the current search within transfer 
     * 
     *  @method abort
     *  @return {void}
     *  @for KU.Transfer
     *  @example  
     *      // Abort the latest search!
     *      KU.Transfer.abort();
     *****************************************************************************/
    Transfer.abort = function(){
        
        // Abort the ajax call!!
        if(latestSearch != null) {
            
            latestSearch.abort();
            latestSearch = null;
        }
    };
	
	
	// Save class to module
    lib.Transfer = Transfer;
    
}(KU));