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