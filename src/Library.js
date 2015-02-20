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