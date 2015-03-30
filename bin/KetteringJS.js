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
     *  Contains information for a directory contact info message. Which is
     *  generally just a plain message and a boolean for its font-weight bold.
     *
     *  @class KU.Directory.Contact.Info
     ******************************************************************************/    
    function Info(message, weight){
        
        
        this.message = message;
        this.weight = weight;
        
        
        return this;
        
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
         *  will be available. *Note: the array type is <a class="crosslink" 
         *  href="..\classes\KU.Directory.Contact.Info.html">KU.Directory.Contact.Info</a>*.
         *
         *  @attribute info
         *  @type {Array<KU.Directory.Contact.Info>}
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
                        var counter = 0;
                        
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
                                    info[counter++] = new Info(detail, ($(this).hasClass("bold")?("bold"):("")));
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
         *  The web address to the detail article page.
         *
         *  @attribute detailsUrl
         *  @type string
         *  @for KU.Events.Caption
         *  @readOnly
        ******************************************************************************/
        Object.defineProperty(this, "detailsUrl" , { 
        
            // Getter and Setter
            get: function() { return detailsUrl; },
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
 *  The student class will allow KetteringJS to gather information
 *  on a student at Kettering University through banner web and blackboard
 ******************************************************************************/
(function (lib) {

    
    // Default object
    var Student = {};
    
    
    /******************************************************************************
     *  Child class of student to contain all Blackboard related functions and classes
     *
     *  @class KU.Student.BB
     ******************************************************************************/
    Student.BB = {
        
        
        /******************************************************************************
         *  Holds the information for a Blackboard contact
         *
         *  @class KU.Student.BB.Contact
         ******************************************************************************/
        Contact: function(firstName, lastName, email){
            
            
            /******************************************************************************
             *  First name of contact
             *
             *  @attribute firstName
             *  @type string
             *  @for KU.Student.BB.Contact
             *  @readOnly
            ******************************************************************************/
            Object.defineProperty(this, "firstName" , { 
            
                // Getter and Setter
                get: function() { return firstName; },
                set: function(val) { /* Read only!! */ }
            });
            
            
            /******************************************************************************
             *  Last name of contact
             *
             *  @attribute lastName
             *  @type string
             *  @for KU.Student.BB.Contact
             *  @readOnly
            ******************************************************************************/
            Object.defineProperty(this, "lastName" , { 
            
                // Getter and Setter
                get: function() { return lastName; },
                set: function(val) { /* Read only!! */ }
            });
            
            
            /******************************************************************************
             *  Email address of the contact (when available).
             *
             *  @attribute email
             *  @optional
             *  @type string
             *  @for KU.Student.BB.Contact
             *  @readOnly
            ******************************************************************************/
            Object.defineProperty(this, "email" , { 
            
                // Getter and Setter
                get: function() { return email; },
                set: function(val) { /* Read only!! */ }
            });
            
        },
        
      
        /******************************************************************************
         *  Holds all the information for a Blackboard grade
         *
         *  @class KU.Student.BB.Grade
         ******************************************************************************/
        Grade: function(title, grade, pointsPossible, dueDate, postedDate, status){
            
            
            /******************************************************************************
             *  Title of grade
             *
             *  @attribute title
             *  @type string
             *  @for KU.Student.BB.Grade
             *  @readOnly
            ******************************************************************************/
            Object.defineProperty(this, "title" , { 
            
                // Getter and Setter
                get: function() { return title; },
                set: function(val) { /* Read only!! */ }
            });
            
            
            /******************************************************************************
             *  Grade as a letter, percent or raw number
             *
             *  @attribute grade
             *  @type string
             *  @for KU.Student.BB.Grade
             *  @readOnly
            ******************************************************************************/
            Object.defineProperty(this, "grade" , { 
            
                // Getter and Setter
                get: function() { return grade; },
                set: function(val) { /* Read only!! */ }
            });
            
            
            /******************************************************************************
             *  Points possible for the grade (when available).
             *
             *  @attribute pointsPossible
             *  @optional
             *  @type string
             *  @for KU.Student.BB.Grade
             *  @readOnly
            ******************************************************************************/
            Object.defineProperty(this, "pointsPossible" , { 
            
                // Getter and Setter
                get: function() { return pointsPossible; },
                set: function(val) { /* Read only!! */ }
            });
            
            
            /******************************************************************************
             *  Due date for the assignment (when available).
             *
             *  @attribute dueDate
             *  @optional
             *  @type string
             *  @for KU.Student.BB.Grade
             *  @readOnly
            ******************************************************************************/
            Object.defineProperty(this, "dueDate" , { 
            
                // Getter and Setter
                get: function() { return dueDate; },
                set: function(val) { /* Read only!! */ }
            });
            
            
            /******************************************************************************
             *  The date the grade was last updated (when available).
             *
             *  @attribute postedDate
             *  @optional
             *  @type string
             *  @for KU.Student.BB.Grade
             *  @readOnly
            ******************************************************************************/
            Object.defineProperty(this, "postedDate" , { 
            
                // Getter and Setter
                get: function() { return postedDate; },
                set: function(val) { /* Read only!! */ }
            });
            
            
            /******************************************************************************
             *  Status the assignment (when available).
             *
             *  @attribute status
             *  @optional
             *  @type string
             *  @for KU.Student.BB.Grade
             *  @readOnly
            ******************************************************************************/
            Object.defineProperty(this, "status" , { 
            
                // Getter and Setter
                get: function() { return status; },
                set: function(val) { /* Read only!! */ }
            });
            
        },
      
      
        /******************************************************************************
         *  Holds all the folders and files within a single layer of a content tree
         *  for a course.
         *
         *  @class KU.Student.BB.Tree
         ******************************************************************************/
        Tree: function(folders, items){


            /******************************************************************************
             *  Folders found inside the blackboard folder! Type is <code><span class="type">
             *      <a class="crosslink" href="..\classes\KU.Student.BB.Folder.html">
             *      KU.Student.BB.Folder[]</a></span></code>;
             *
             *  @attribute folders
             *  @type Array
             *  @for KU.Student.BB.Tree
             *  @readOnly
            ******************************************************************************/
            Object.defineProperty(this, "folders" , { 
            
                // Getter and Setter
                get: function() { return folders; },
                set: function(val) { /* Read only!! */ }
            });
            
            
            /******************************************************************************
             *  Items found inside the blackboard folder! Type is <code><span class="type">
             *  <a class="crosslink" href="..\classes\KU.Student.BB.Item.html">
             *  KU.Student.BB.Item[]</a></span></code>;
             *
             *  @attribute items
             *  @type Array
             *  @for KU.Student.BB.Tree
             *  @readOnly
            ******************************************************************************/
            Object.defineProperty(this, "items" , { 
            
                // Getter and Setter
                get: function() { return items; },
                set: function(val) { /* Read only!! */ }
            });
            
            
            return this;
        },
        
        
        /******************************************************************************
         *  Holds all the basic information for a folder on Blackboard and allows
         *  its own menu tree to be downloaded.
         *
         *  @class KU.Student.BB.Folder
         ******************************************************************************/
        Folder: function(bbId, contentId, name, details){

        
            /******************************************************************************
             *  Blackboard course identifier
             *
             *  @attribute bbId
             *  @type string
             *  @for KU.Student.BB.Folder
             *  @readOnly
            ******************************************************************************/
            Object.defineProperty(this, "bbId" , { 
            
                // Getter and Setter
                get: function() { return bbId; },
                set: function(val) { /* Read only!! */ }
            });
            
            
            /******************************************************************************
             *  Blackboard content folder identifier
             *
             *  @attribute contentId
             *  @type string
             *  @for KU.Student.BB.Folder
             *  @readOnly
            ******************************************************************************/
            Object.defineProperty(this, "contentId" , { 
            
                // Getter and Setter
                get: function() { return contentId; },
                set: function(val) { /* Read only!! */ }
            });
        

            /******************************************************************************
             *  The name of the folder as it appears on Blackboard
             *
             *  @attribute name
             *  @type string
             *  @for KU.Student.BB.Folder
             *  @readOnly
            ******************************************************************************/
            Object.defineProperty(this, "name" , { 
            
                // Getter and Setter
                get: function() { return name; },
                set: function(val) { /* Read only!! */ }
            });

            
            /******************************************************************************
             *  Details html for the folder as they appear on Blackboard
             *
             *  @attribute details
             *  @type string
             *  @for KU.Student.BB.Folder
             *  @readOnly
            ******************************************************************************/
            Object.defineProperty(this, "details" , { 
            
                // Getter and Setter
                get: function() { return details; },
                set: function(val) { /* Read only!! */ }
            });
            
            
            /******************************************************************************
             *  Gets the content tree for a folder
             * 
             *  @method getContentTree
             *  @param {function} successCallback - Called after the content tree has been
             *      downloaded. Function Header: <code>void successCallback(<span class="type">
             *      <a class="crosslink" href="..\classes\KU.Student.BB.Tree.html">
             *      KU.Student.BB.Tree</a></span> tree)</code>;
             *  @param {function} failureCallback - Called if the content tree was failed to
             *      download. Function Header: void <code>failureCallback(String errMsg)</code>;
             *  @for KU.Student.BB.Folder
             *  @return {void}
             *  @example  
             *      var success = function(tree){
             *          ...
             *      }
             *     
             *      var failure = function(errMsg){
             *          ...
             *      }
             *      
             *      // Get the content tree
             *      folder.getContentTree(success, failure);
             *****************************************************************************/     
            this.getContentTree = function(successCallback, failureCallback){
                
                
                // Redirect to generic tree downloader with this objects
                // properties and respective callbacks
                Student.BB.retrieveContentTree(this.bbId, this.contentId, successCallback, failureCallback);
            }
            
            
            return this;
        },
        
        
        /******************************************************************************
         *  Holds all the information for a content item on Blackboard!
         *
         *  @class KU.Student.BB.Item
         ******************************************************************************/
        Item: function(name, details){


            /******************************************************************************
             *  The name of the content item as it appears on Blackboard
             *
             *  @attribute name
             *  @type string
             *  @for KU.Student.BB.Item
             *  @readOnly
            ******************************************************************************/
            Object.defineProperty(this, "name" , { 
            
                // Getter and Setter
                get: function() { return name; },
                set: function(val) { /* Read only!! */ }
            });

            
            /******************************************************************************
             *  Details html for the item as they appear on Blackboard
             *
             *  @attribute details
             *  @type string
             *  @for KU.Student.BB.Item
             *  @readOnly
            ******************************************************************************/
            Object.defineProperty(this, "details" , { 
            
                // Getter and Setter
                get: function() { return details; },
                set: function(val) { /* Read only!! */ }
            });
            
            
            return this;
        },
        
        
        /******************************************************************************
         *  Holds all the information for a course downloaded from Blackboard
         *
         *  @class KU.Student.BB.Course
         ******************************************************************************/
        Course: function (courseId, term, crn, section, courseTitle, days, time, bbId){


            /******************************************************************************
             *  Course identifier
             *
             *  @attribute courseId
             *  @type string
             *  @for KU.Student.BB.Course
             *  @readOnly
            ******************************************************************************/
            Object.defineProperty(this, "courseId" , { 
            
                // Getter and Setter
                get: function() { return courseId; },
                set: function(val) { /* Read only!! */ }
            });
            
            
            /******************************************************************************
             *  Term for the course. This is represented by the year and quarter (e.g 201501)
             *
             *  @attribute term
             *  @type string
             *  @for KU.Student.BB.Course
             *  @readOnly
            ******************************************************************************/
            Object.defineProperty(this, "term" , { 
            
                // Getter and Setter
                get: function() { return term; },
                set: function(val) { /* Read only!! */ }
            });

            
            /******************************************************************************
             *  Crn for the course
             *
             *  @attribute crn
             *  @type string
             *  @for KU.Student.BB.Course
             *  @readOnly
            ******************************************************************************/
            Object.defineProperty(this, "crn" , { 
            
                // Getter and Setter
                get: function() { return crn; },
                set: function(val) { /* Read only!! */ }
            });
            
            
            /******************************************************************************
             *  Section for the course
             *
             *  @attribute section
             *  @type string
             *  @for KU.Student.BB.Course
             *  @readOnly
            ******************************************************************************/
            Object.defineProperty(this, "section" , { 
            
                // Getter and Setter
                get: function() { return section; },
                set: function(val) { /* Read only!! */ }
            });
            
            
            /******************************************************************************
             *  Title for the course
             *
             *  @attribute courseTitle
             *  @type string
             *  @for KU.Student.BB.Course
             *  @readOnly
            ******************************************************************************/
            Object.defineProperty(this, "courseTitle" , { 
            
                // Getter and Setter
                get: function() { return courseTitle; },
                set: function(val) { /* Read only!! */ }
            });
            
            
            /******************************************************************************
             *  Days string for the course (e.g "MTR" for Monday Tuesday Thursday)
             *
             *  @attribute days
             *  @type string
             *  @for KU.Student.BB.Course
             *  @readOnly
            ******************************************************************************/
            Object.defineProperty(this, "days" , { 
            
                // Getter and Setter
                get: function() { return days; },
                set: function(val) { /* Read only!! */ }
            });
            
            
            /******************************************************************************
             *  Meeting time for the course (e.g 3:35-5:40)
             *
             *  @attribute time
             *  @type string
             *  @for KU.Student.BB.Course
             *  @readOnly
            ******************************************************************************/
            Object.defineProperty(this, "time" , { 
            
                // Getter and Setter
                get: function() { return time; },
                set: function(val) { /* Read only!! */ }
            });
            
            
            /******************************************************************************
             *  Blackboard course Id
             *
             *  @attribute bbId
             *  @type string
             *  @for KU.Student.BB.Course
             *  @readOnly
            ******************************************************************************/
            Object.defineProperty(this, "bbId" , { 
            
                // Getter and Setter
                get: function() { return bbId; },
                set: function(val) { /* Read only!! */ }
            });
            
            
            /******************************************************************************
             *  Gets the content tree for a course containing a list of folders and files.
             * 
             *  @method getContentTree
             *  @param {function} successCallback - Called after the content tree has been
             *      downloaded. Function Header: <code>void successCallback(<span class="type">
             *      <a class="crosslink" href="..\classes\KU.Student.BB.Tree.html">
             *      KU.Student.BB.Tree</a></span> tree)</code>;
             *  @param {function} failureCallback - Called if the content tree was failed to
             *      download. Function Header: void <code>failureCallback(String errMsg)</code>;
             *  @for KU.Student.BB.Course
             *  @return {void}
             *  @example  
             *      var success = function(tree){
             *          ...
             *      }
             *     
             *      var failure = function(errMsg){
             *          ...
             *      }
             *      
             *      // Get the content tree
             *      course.getContentTree(success, failure);
             *****************************************************************************/     
            this.getContentTree = function(successCallback, failureCallback){
                
                
                // Redirect to generic tree downloader with this objects
                // properties and respective callbacks
                Student.BB.retrieveContentTree(this.bbId, "", successCallback, failureCallback);
            }
            
            
            /******************************************************************************
             *  Gets the entire class roster
             * 
             *  @method getRoster
             *  @param {function} successCallback - Called after the class roster has been
             *      downloaded. Function Header: <code>void successCallback(<span class="type">
             *      <a class="crosslink" href="..\classes\KU.Student.BB.Contact.html">
             *      KU.Student.BB.Contact[]</a></span> contacts)</code>;
             *  @param {function} failureCallback - Called if the class roster was failed to
             *      download. Function Header: void <code>failureCallback(String errMsg)</code>;
             *  @for KU.Student.BB.Course
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
             *      // Get the content tree
             *      course.getRoster(success, failure);
             *****************************************************************************/     
            this.getRoster = function(successCallback, failureCallback){
                
                
                // Make url for Blackboard grades
                var url = "https://kettering.blackboard.com/webapps/blackboard/execute/searchRoster"
                    + "?showAll=true&action=sort&userInfoSearchOperatorString=Contains"
                    + "&courseId=" + this.bbId + "&sortCol=column1&sortDir=ASCENDING"
                    + "&course_id=" + this.bbId + "&userInfoSearchKeyString=FIRSTNAME&startIndex=0";
                
                $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'html',
                    success: function(data) {
                    
                        // Load downloaded document
                        var doc = $("<div>").html(data);
                        
                        // Init
                        var contacts = [];
                        
                        // Go through each contact
                        doc.find("#listContainer_databody tr").each(function(i){
                            
                            // Init
                            var info = $(this).children();
                            var first, last, email;
                            
                            // Valid?
                            if(info.size() == 3){
                            
                                last  = info.eq(0).text().trim();
                                first = info.eq(1).text().trim();
                                email = info.eq(2).text().trim();
                                
                                contacts[contacts.length] = new Student.BB.Contact(first, last, email);        
                            }
                        
                        });
                        
                        
                        // Call back
                        successCallback(contacts);
                        
                    },
                    
                    error: function(xhr, status, errorThrown){
                        
                        // Failed
                        failureCallback(errorThrown);
                    }
                });
                
                
            }
            
            
            /******************************************************************************
             *  Downloads the current grades for a course
             * 
             *  @method getGrades
             *  @param {function} successCallback - Called after the course grades has been
             *      downloaded. Function Header: <code>void successCallback(<span class="type">
             *      <a class="crosslink" href="..\classes\KU.Student.BB.Grade.html">
             *      KU.Student.BB.Grade[]</a></span> grades)</code>;
             *  @param {function} failureCallback - Called if the course grades failed to
             *      download. Function Header: void <code>failureCallback(String errMsg)</code>;
             *  @for KU.Student.BB.Course
             *  @return {void}
             *  @example  
             *      var success = function(grades){
             *          ...
             *      }
             *     
             *      var failure = function(errMsg){
             *          ...
             *      }
             *      
             *      // Get the course grades
             *      course.getGrades(success, failure);
             *****************************************************************************/     
            this.getGrades = function(successCallback, failureCallback){
                
                
                // Make url for Blackboard grades
                var url = "https://kettering.blackboard.com/webapps/bb-mygrades-BBLEARN/"
                    + "myGrades?course_id=" + this.bbId + "&stream_name=mygrades";
                
                $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'html',
                    success: function(data) {
                    
                        // Load downloaded document
                        var doc = $("<div>").html(data);
                        
                        // Init
                        var grades = [];
                    
                        $("#grades_wrapper > div.row",doc).each(function(i){
                            
                            var title, grade, pointsPossible, dueDate, postedDate, status;
                            
                            // Title could be immediate text
                            title = $(".cell.gradable", this).clone().children().remove().end().text().trim();
                            
                            // Or.. the title could be in the first child
                            if(title == "") title = $(".cell.gradable :first-child", this).text().trim();
                            
                            // Get properties
                            grade = $(".cell.grade > .grade", this).text().trim();
                            pointsPossible = $(".cell.grade > .pointsPossible", this).text().trim().replace("/","");
                            dueDate = $(".cell.gradable > .activityType", this).text().trim().replace("DUE:\s","");
                            postedDate = $(".cell.activity > .lastActivityDate", this).text().trim();
                            status = $(".cell.activity > .activityType", this).text().trim();
                            
                            // Make grade
                            grades[grades.length] = new Student.BB.Grade(title, grade, pointsPossible, dueDate, postedDate, status);
                            
                        });
                        
                        // Call back
                        successCallback(grades);
                        
                    },
                    
                    error: function(xhr, status, errorThrown){
                        
                        // Failed
                        failureCallback(errorThrown);
                    }
                });
                
            }
            
            
            return this;
        },
        
        
        /******************************************************************************
         *  Gets the content tree for a course containing a list of folders and files
         *  based on a specified bbId and contentId. This is meant to be a generic function
         *  used by KU.Student.BB.Course and KU.Student.BB.Folder.
         * 
         *  @method retrieveContentTree
         *  @private
         *  @param {string} bbId - blackboard course identifier
         *  @param {string} contentId - blackboard folder identifier
         *  @param {function} successCallback - Called after the content tree has been
         *      downloaded. Function Header: <code>void successCallback(<span class="type">
         *      <a class="crosslink" href="..\classes\KU.Student.BB.Tree.html">
         *      KU.Student.BB.Tree</a></span> tree)</code>;
         *  @param {function} failureCallback - Called if the content tree was failed to
         *      download. Function Header: void <code>failureCallback(String errMsg)</code>;
         *  @for KU.Student.BB
         *  @return {void}
         *  @example  
         *      var success = function(tree){
         *          ...
         *      }
         *     
         *      var failure = function(errMsg){
         *          ...
         *      }
         *      
         *      // Get the content tree
         *      course.getContentTree(success, failure);
         *****************************************************************************/
        retrieveContentTree: function(bbId, contentId, successCallback, failureCallback){
            
            
            // Properties
            var url, usesJson; 
            
            // First tree?
            // if so then we get JSON object instead
            if(contentId === ""){
            
                // URL for the initial tree
                url = "https://kettering.blackboard.com/webapps/blackboard/execute"
                    + "/course/menuFolderViewGenerator?initTree=true&itemId=&storeScope=Session"
                    + "&course_id=" + bbId + "&displayMode=courseMenu_newWindow&editMode=false"
                    + "&openInParentWindow=true";
                    
                usesJson = true;
            }
            
            else{
                
                // URL for a child folder
                url = "https://kettering.blackboard.com/webapps/blackboard/content/listContent.jsp?"
                    + "course_id=" + bbId + "&content_id=" + contentId;
                
                usesJson = false;
                
            }
            
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'html',
                success: function(data) {
                    
                    // Init
                    var folders, items, tree;
                    folders = [];
                    items = [];
                    
                    // First tree?
                    // then this is JSON!
                    if(usesJson){
                        
                        // Properties
                        var json = JSON.parse(data);
                        var root;
                        
                        // Valid tree?
                        if(json.children.length > 0){
                            
                            // First element is simply 1x1 root!
                            // so take the second set of children
                            root = JSON.parse(data).children[0].children;
                            
                        }
                        
                        // Loop through children
                        for(var i = 0; i < root.length; i++){
                            
                            var child = root[i];
                            
                            // Pattern for any content
                            var contentPattern = /.*ReferredToType:CONTENT:::(_\d\d+_\d+)/
                            
                            
                            // Content?
                            if(child.hasChildren && contentPattern.test(child.id)){
                                
                                var linkElement = $("<div>").html(child.contents).find("a");
                                
                                
                                // Proper size?
                                if(linkElement.size() > 0){
                                    
                                    // Store properties
                                    var name = linkElement.attr("title");
                                    var contentId = contentPattern.exec(child.id)[1];
                                    
                                    // Add new folder
                                    folders[folders.length] = new Student.BB.Folder(bbId, contentId, name, "");
                                    
                                }
                                
                            }
                            
                        }
                        
                    }
                    
                    
                    // Scraped through Blackboard
                    // rather than through JSON
                    else{
                        
                        // Load downloaded document
                        var doc = $("<div>").html(data);
                        
                        // Make sure user is logged on
                        // if no then error out!
                        if(!Student.BB.isLoggedIn(doc)){
                            failureCallback("Check login.");
                            return;
                        }
                        
                        // Quick patterns for items
                        var folderPattern = /.*folder_on.*/;
                        var itemPattern = /.*document_on.*/;
                        var contentIdPattern = /contentListItem:(_\d\d+_\d+)/;
                        
                        doc.find("#content_listContainer > li").each(function(i){
                           
                           
                            // Valid ?
                            if ($("> img", this).size() == 1
                                && contentIdPattern.test($(this).attr("id"))){
                                
                                // Get properties
                                var src = $("> img", this).attr("src");
                                var itemId = contentIdPattern.exec($(this).attr("id"))[1];
                                var name = $("#" + itemId, this).text().trim();
                                var details = $("> div.details", this).html();
                                
                                // Is folder?
                                if (folderPattern.test(src)){
                                    
                                    folders[folders.length] = new Student.BB.Folder(bbId, itemId, name, details);
                                }
                                
                                // Is item?
                                else if (itemPattern.test(src)){
                                    
                                    items[items.length] = new Student.BB.Item(name, details);
                                }
                                
                            }
                            
                        });
                        
                    }
                    
                    
                    // Make tree from folders and items
                    tree = new Student.BB.Tree(folders, items);
                    
                    // Callback!
                    successCallback(tree);
                    
                },
                
                error: function(xhr, status, errorThrown){
                    
                    // Failed
                    failureCallback(errorThrown);
                }
            });
            
        },
        
        
        /******************************************************************************
         *  Logs the user into blackboard
         * 
         *  @method login
         *  @param {string} user - the Kettering user Id
         *  @param {string} pass - password used to login to blackboard
         *  @param {function} successCallback - Called after successful login into blackboard. 
         *      Function Header: <code>void successCallback()</code>;
         *  @param {function} failureCallback - Called after a failure at logging into
         *      blackboard. Function Header: void <code>failureCallback(String errMsg)</code>;
         *  @for KU.Student.BB
         *  @return {void}
         *  @example  
         *      var success = function(){
         *          ...
         *      }
         *     
         *      var failure = function(errMsg){
         *          ...
         *      }
         *      
         *      // Login !
         *      KU.Student.BB.login("user","pass", success, failure);
         *****************************************************************************/
        login: function(user, pass, successCallback, failureCallback){
            
            
            // Compile url
            var url = "https://kettering.blackboard.com/webapps/login/"
                + "?user_id=" + encodeURIComponent(user)
                + "&password=" + encodeURIComponent(pass)
                + "&login=Login"
                + "&action=login"
                + "&new_loc=";
            
            
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'html',
                success: function(data) {
                
                    // Load downloaded document
                    var doc = $("<div>").html(data);
                    
                    // Check to see if it worked
                    if(Student.BB.isLoggedIn(doc)){
                        
                        // Success
                        successCallback();

                        
                    }
                    else{
                        
                        // Failed
                        failureCallback("Incorrect username or password.");                                    
                        
                    }
                    
                },
                
                error: function(xhr, status, errorThrown){
                    
                    // Failed
                    failureCallback(errorThrown);
                }
            });
            
        },
        
        
        /******************************************************************************
         *  Checks to see if browser has any user logged into Blackboard
         * 
         *  @method checkLogIn
         *  @param {function} successCallback - Called after login status is checked. 
         *      Function Header: <code>void successCallback(Boolean loggedIn)</code>;
         *  @param {function} failureCallback - Called if the check failed to execute
         *      Function Header: void <code>failureCallback(String errMsg)</code>;
         *  @for KU.Student.BB
         *  @return {void}
         *  @example  
         *      var success = function(loggedIn){
         *          ...
         *      }
         *     
         *      var failure = function(errMsg){
         *          ...
         *      }
         *      
         *      // Check login
         *      KU.Student.BB.checkLogIn(success, failure);
         *****************************************************************************/
        checkLogIn: function(successCallback, failureCallback){
            
            // Basic url for blackboard
            var url = "https://kettering.blackboard.com/";
            
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'html',
                success: function(data) {
                
                    // Load downloaded document
                    var doc = $("<div>").html(data);
                    
                    // Check to see if it worked
                    successCallback(Student.BB.isLoggedIn(doc));
                    
                },
                
                error: function(xhr, status, errorThrown){
                    
                    // Failed
                    failureCallback(errorThrown);
                }
            });
            
        },
        
        
        /******************************************************************************
         *  Parses an html document to evaluate login status of Blackboard
         * 
         *  @method isLoggedIn
         *  @param {object} dom - jquery object to parse through
         *  @private
         *  @for KU.Student.BB
         *  @return boolean
         *  @example  
         *      // Check login
         *      var loggedIn = KU.Student.BB.isLoggedIn($(htmlStr));
         *****************************************************************************/
        isLoggedIn: function (dom){
            
            // Check for logout action
            return dom.find(".logout-link").size() > 0;
        },
        
        
        /******************************************************************************
         *  Downloads the blackboard courses
         * 
         *  @method downloadCourses
         *  @param {function} successCallback - Called after courses are gathered. 
         *      Function Header: <code>void successCallback(<span class="type">
         *      <a class="crosslink" href="..\classes\KU.Student.BB.Course.html">
         *      KU.Student.BB.Course</a></span> courses)</code>;
         *  @param {function} failureCallback - Called after a failure at logging into either
         *      blackboard. Function Header: void <code>failureCallback(String errMsg)</code>;
         *  @for KU.Student.BB
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
         *      // Download courses
         *      KU.Student.BB.downloadCourses(success, failure);
         *****************************************************************************/
        downloadCourses: function(successCallback, failureCallback){
            
            // Basic course URL for blackboard
            var url = "https://kettering.blackboard.com/webapps/portal/execute/tabs/tabAction"
                + "?action=refreshAjaxModule&modId=_4_1&tabId=_1_1&tab_tab_group_id=_1_1";
            
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'html',
                success: function(data) {
                
                    // Load downloaded document
                    var doc = $("<div>").html(data);
                    
                    // Was real info actually returned?
                    // if not then fail and stop
                    if( doc.find("contents").size() != 1 ){
                        
                        failureCallback("Check login.");
                        return;
                    }
                    
                    var courses = [];
                    
                    // Loop through courses
                    doc.find("contents li a").each(function(i){
                        
                        // Properties
                        var courseUrl = $(this).attr("href");
                        var fullTitle = $(this).text();

                        // Blackboard id pattern
                        var bbIdPattern = /.*&id=(_\d+_\d+).*/;
                        
                        // Pattern to match a BB course title
                        // e.g CS-435-201501-10490: CS-435-01: Functional Lang and Parsing - WINTER TF 3:35-5:40
                        //  1  course id
                        //  2  term
                        //  3  CRN
                        //  4  section
                        //  5  course title
                        //  6  days
                        //  7  time
                        var coursePattern = 
                            /([a-zA-Z]+-\d\d\d)-(\d\d\d\d\d\d)-(\d\d\d\d\d):\s[a-zA-Z]+-\d\d\d-(\d\d[a-zA-Z]?):\s(.+)\s-\s[a-zA-Z]+\s([a-zA-Z]+)\s(\d\d?:\d\d-\d\d?:\d\d).*/;
                       
                        if( coursePattern.test(fullTitle) && bbIdPattern.test(courseUrl) ){
                            
                            // Blackboard course id
                            var bbId = bbIdPattern.exec(courseUrl)[1];
                            
                            // Course items
                            var courseResult, courseId, term, crn, section, courseTitle, days, time;
                            courseResult = coursePattern.exec(fullTitle);
                            courseId = courseResult[1];
                            term = courseResult[2];
                            crn = courseResult[3];
                            section = courseResult[4];
                            courseTitle = courseResult[5];
                            days = courseResult[6];
                            time = courseResult[7];
                           
                            courses[courses.length] = new Student.BB.Course(courseId, term, crn, section, courseTitle, days, time, bbId);
                        }
                        
                    });
                    
                    // Callback!
                    successCallback(courses);
                },
                
                error: function(xhr, status, errorThrown){
                    
                    // Failed
                    failureCallback(errorThrown);
                }
            });
            
        }
      
    };
    
	
	// Save class to module
    lib.Student = Student;
    
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
     *      // Get transfer courses
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
     *      // Get transfer courses
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