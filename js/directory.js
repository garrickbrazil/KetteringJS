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
        ******************************************************************************/
        this.name = name;
        
        
        /******************************************************************************
         *  The value identifier of the department used with the directory API and
         *  specifically the search method. This value is generally an int, but can
         *  also be a string (e.g All)
         *
         *  @attribute valueId
         *  @type string
         *  @for KU.Directory.Department
        ******************************************************************************/
        this.valueId = valueId;
        
        
    }
    
    
    /******************************************************************************
     *  Contains information for a directory contact info message. Which is
     *  generally just a plain message and a boolean for its font-weight bold.
     *
     *  @class KU.Directory.Contact.Info
     ******************************************************************************/    
    function Info(message, weight){
        
        
        /******************************************************************************
         *  Message to be displayed
         *
         *  @attribute message
         *  @type string
         *  @for KU.Directory.Contact.Info
        ******************************************************************************/
        this.message = message;
        
        
        /******************************************************************************
         *  Font-weight for the message
         *
         *  @attribute weight
         *  @type string
         *  @for KU.Directory.Contact.Info
        ******************************************************************************/
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
        ******************************************************************************/
        this.fullName = fullName;
        
        
        /******************************************************************************
         *  Information on the directory contact. Unfortunately the information is
         *  unordered and unclassified so it can only exist for now as an array
         *  of strings. Usually the order is [department, tags, office, phone, email].
         *  Important: this order is NOT guaranteed nor is it that each of these pieces
         *  will be available. *Note: the array type is <a class="crosslink" 
         *  href="../classes/KU.Directory.Contact.Info.html">KU.Directory.Contact.Info</a>*.
         *
         *  @attribute info
         *  @type {Array<KU.Directory.Contact.Info>}
         *  @for KU.Directory.Contact
        ******************************************************************************/
        this.info = info;
        

        /******************************************************************************
         *  The image url corresponding to the faculty/staff member. 
         *
         *  @attribute imgUrl
         *  @type string
         *  @for KU.Directory.Contact
        ******************************************************************************/
        this.imgUrl = imgUrl;
        
      
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
     *      class="type"><a class="crosslink" href="../classes/KU.Directory.Contact.html">
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
        var url = 'http://my.kettering.edu/faculty-staff/directory?' 
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
                            source = "http://my.kettering.edu" + source;
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
     *      class="type"><a class="crosslink" href="../classes/KU.Directory.Contact.html">
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
     *      class="type"><a class="crosslink" href="../classes/KU.Directory.Contact.html">
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
     *      class="type"><a class="crosslink" href="../classes/KU.Directory.Department.html">
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
        var url = "http://my.kettering.edu/faculty-staff/directory?"
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