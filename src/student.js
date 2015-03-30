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