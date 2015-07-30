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
     *  Child class of student to contain all jweb related functions and classes
     *
     *  @class KU.Student.JWEB
     ******************************************************************************/
    Student.JWEB = {
        
        
        /******************************************************************************
         *  Contains all information for a course entry in a Kettering catalog
         *
         *  @class KU.Student.JWEB.CatalogEntry
         ******************************************************************************/
        CatalogEntry: function(status, crn, courseId, section, campus, credits, title,
            days, time, capacity, active, professor, startDate, room){
            
            
            /******************************************************************************
             *  Status of the course (e.g NR for no registration, C for closed)
             *
             *  @attribute status
             *  @type string
             *  @for KU.Student.JWEB.CatalogEntry
            ******************************************************************************/
            this.status = status;
            
            
            /******************************************************************************
             *  The unqiue crn for the course (used for registering)
             *
             *  @attribute crn
             *  @type string
             *  @for KU.Student.JWEB.CatalogEntry
            ******************************************************************************/
            this.crn = crn;
            
            
            /******************************************************************************
             *  The course identifier including subject and number
             *
             *  @attribute courseId
             *  @type string
             *  @for KU.Student.JWEB.CatalogEntry
            ******************************************************************************/
            this.courseId = courseId;
            
            
            /******************************************************************************
             *  Section of the course as a number
             *
             *  @attribute section
             *  @type string
             *  @for KU.Student.JWEB.CatalogEntry
            ******************************************************************************/
            this.section = section;
            
            
            /******************************************************************************
             *  Campus the course takes place on
             *
             *  @attribute campus
             *  @type string
             *  @for KU.Student.JWEB.CatalogEntry
            ******************************************************************************/
            this.campus = campus;
            
            
            /******************************************************************************
             *  Credits the course is worth
             *
             *  @attribute credits
             *  @type string
             *  @for KU.Student.JWEB.CatalogEntry
            ******************************************************************************/
            this.credits = credits;
            
            
            /******************************************************************************
             *  Title of the course
             *
             *  @attribute title
             *  @type string
             *  @for KU.Student.JWEB.CatalogEntry
            ******************************************************************************/
            this.title = title;
            
            
            /******************************************************************************
             *  Days the course takes place in (e.g MT for monday, tuesday)
             *
             *  @attribute days
             *  @type string
             *  @for KU.Student.JWEB.CatalogEntry
            ******************************************************************************/
            this.days = days;
            
            
            /******************************************************************************
             *  Time the course takes place at (e.g 10:15 am-12:20 pm)
             *
             *  @attribute time
             *  @type string
             *  @for KU.Student.JWEB.CatalogEntry
            ******************************************************************************/
            this.time = time;
            
            
            /******************************************************************************
             *  Student capacity for the course
             *
             *  @attribute capacity
             *  @type string
             *  @for KU.Student.JWEB.CatalogEntry
            ******************************************************************************/
            this.capacity = capacity;
            
            
            /******************************************************************************
             *  Number of active students registered for course
             *
             *  @attribute active
             *  @type string
             *  @for KU.Student.JWEB.CatalogEntry
            ******************************************************************************/
            this.active = active;
            
            
            /******************************************************************************
             *  Professor teaching the course
             *
             *  @attribute professor
             *  @type string
             *  @for KU.Student.JWEB.CatalogEntry
            ******************************************************************************/
            this.professor = professor;
            
            
            /******************************************************************************
             *  Start date for the course
             *
             *  @attribute startDate
             *  @type string
             *  @for KU.Student.JWEB.CatalogEntry
            ******************************************************************************/
            this.startDate = startDate;
            
            
            /******************************************************************************
             *  Room the course takes place in 
             *
             *  @attribute room
             *  @type string
             *  @for KU.Student.JWEB.CatalogEntry
            ******************************************************************************/
            this.room = room;
            
            
        },
        
        
        /******************************************************************************
         *  Contains all the award information for a year at Kettering.
         *
         *  @class KU.Student.JWEB.AwardYear
         ******************************************************************************/
        AwardYear: function(years, entries){
            
            
            /******************************************************************************
             *  Year range represented (July 2014 to June 2015)
             *
             *  @attribute years
             *  @type string
             *  @for KU.Student.JWEB.AwardYear
            ******************************************************************************/
            this.years = years;
            
            
            /******************************************************************************
             *  Award entries. Type is <code><span class="type">
             *  <a class="crosslink" href="../classes/KU.Student.JWEB.AwardEntry.html">
             *  KU.Student.JWEB.AwardEntry</a>[]</span></code>;
             *
             *  @attribute entries
             *  @type Array
             *  @for KU.Student.JWEB.AwardYear
            ******************************************************************************/
            this.entries = entries;
            
        },
        
        
        /******************************************************************************
         *  Contains all the information for an award year
         *
         *  @class KU.Student.JWEB.AwardEntry
         ******************************************************************************/
        AwardEntry: function(name, offered, accepted, declined, cancelled, paidToDate){
            
            
            /******************************************************************************
             *  Name of the fund
             *
             *  @attribute name
             *  @type string
             *  @for KU.Student.JWEB.AwardEntry
            ******************************************************************************/
            this.name = name;
            
            
            /******************************************************************************
             *  Amount of award offered 
             *
             *  @attribute offered
             *  @type string
             *  @for KU.Student.JWEB.AwardEntry
            ******************************************************************************/
            this.offered = offered;
            
            
            /******************************************************************************
             *  Amount of award accepted 
             *
             *  @attribute accepted
             *  @type string
             *  @for KU.Student.JWEB.AwardEntry
            ******************************************************************************/
            this.accepted = accepted;
            
            
            /******************************************************************************
             *  Amount of award declined 
             *
             *  @attribute declined
             *  @type string
             *  @for KU.Student.JWEB.AwardEntry
            ******************************************************************************/
            this.declined = declined;
            
            
            /******************************************************************************
             *  Amount of award cancelled 
             *
             *  @attribute cancelled
             *  @type string
             *  @for KU.Student.JWEB.AwardEntry
            ******************************************************************************/
            this.cancelled = cancelled;
            
            
            /******************************************************************************
             *  Amount of award paid to date 
             *
             *  @attribute paidToDate
             *  @type string
             *  @for KU.Student.JWEB.AwardEntry
            ******************************************************************************/
            this.paidToDate = paidToDate;
            
        },
        
        
        /******************************************************************************
         *  Contains all the account information for a single term at Kettering.
         *
         *  @class KU.Student.JWEB.AccountTerm
         ******************************************************************************/
        AccountTerm: function(term, totalCharges, totalCredits, balance, entries){
            
            
            /******************************************************************************
             *  Term represented (formatted in words, e.g Winter 2015)
             *
             *  @attribute term
             *  @type string
             *  @for KU.Student.JWEB.AccountTerm
            ******************************************************************************/
            this.term = term;
                        
            
            /******************************************************************************
             *  Total charges for the term
             *
             *  @attribute totalCharges
             *  @type string
             *  @for KU.Student.JWEB.AccountTerm
            ******************************************************************************/
            this.totalCharges = totalCharges;
                        
            
            /******************************************************************************
             *  Total credits for the term 
             *
             *  @attribute totalCredits
             *  @type string
             *  @for KU.Student.JWEB.AccountTerm
            ******************************************************************************/
            this.totalCredits = totalCredits;
                        
            
            /******************************************************************************
             *  Net balance for the term
             *
             *  @attribute balance
             *  @type string
             *  @for KU.Student.JWEB.AccountTerm
            ******************************************************************************/
            this.balance = balance;
                        
            
            /******************************************************************************
             *  Account entries. Type is <code><span class="type">
             *  <a class="crosslink" href="../classes/KU.Student.JWEB.AccountEntry.html">
             *  KU.Student.JWEB.AccountEntry</a>[]</span></code>;
             *
             *  @attribute entries
             *  @type Array
             *  @for KU.Student.JWEB.AccountTerm
            ******************************************************************************/
            this.entries = entries;
            
        },
        
        
        /******************************************************************************
         *  Contains all the information for a single account charge(-) or credit(+)
         *
         *  @class KU.Student.JWEB.AccountEntry
         ******************************************************************************/
        AccountEntry: function(code, description, total){
            
            
            /******************************************************************************
             *  Code used by Kettering to distinguish the account entry
             *
             *  @attribute code
             *  @type string
             *  @for KU.Student.JWEB.AccountEntry
            ******************************************************************************/
            this.code = code;
            
            
            /******************************************************************************
             *  Account entry description
             *
             *  @attribute description
             *  @type string
             *  @for KU.Student.JWEB.AccountEntry
            ******************************************************************************/
            this.description = description;
            
            
            /******************************************************************************
             *  The total dollar amount for the account entry: charge(-) or credit(+).
             *
             *  @attribute total
             *  @type string
             *  @for KU.Student.JWEB.AccountEntry
            ******************************************************************************/
            this.total = total;
            
        },
        
        
        /******************************************************************************
         *  Contains all information regarding an evaluation program
         *
         *  @class KU.Student.JWEB.EvalProgram
         ******************************************************************************/
        EvalProgram: function(name, sourceId, programId){
            
            
            /******************************************************************************
             *  Readable name for the available program
             *
             *  @attribute name
             *  @type string
             *  @for KU.Student.JWEB.EvalProgram
            ******************************************************************************/
            this.name = name;
            
            
            /******************************************************************************
             *  The source which the evaluation program is meant to use
             *
             *  @attribute sourceId
             *  @type string
             *  @for KU.Student.JWEB.EvalProgram
            ******************************************************************************/
            this.sourceId = sourceId;
            
            
            /******************************************************************************
             *  The program term which the evaluation should be generated against (e.g P201501)
             *
             *  @attribute programId
             *  @type string
             *  @for KU.Student.JWEB.EvalProgram
            ******************************************************************************/
            this.programId = programId;
            
        },
        
        
        /******************************************************************************
         *  Contains all information for a final grade
         *
         *  @class KU.Student.JWEB.FinalGrade
         ******************************************************************************/
        FinalGrade: function(crn, courseId, section, title, campus, grade, earnedCredits){
            
            
            /******************************************************************************
             *  Unique identifier for course
             *
             *  @attribute crn
             *  @type string
             *  @for KU.Student.JWEB.FinalGrade
            ******************************************************************************/
            this.crn = crn;
            
            
            /******************************************************************************
             *  Course identifier in format SUBJ-NUM
             *
             *  @attribute courseId
             *  @type string
             *  @for KU.Student.JWEB.FinalGrade
            ******************************************************************************/
            this.courseId = courseId;
            
            
            /******************************************************************************
             *  Section number for course
             *
             *  @attribute section
             *  @type string
             *  @for KU.Student.JWEB.FinalGrade
            ******************************************************************************/
            this.section = section;
            
            
            /******************************************************************************
             *  Title of the course
             *
             *  @attribute title
             *  @type string
             *  @for KU.Student.JWEB.FinalGrade
            ******************************************************************************/
            this.title = title;
            
            
            /******************************************************************************
             *  Campus the course took place on 
             *
             *  @attribute campus
             *  @type string
             *  @for KU.Student.JWEB.FinalGrade
            ******************************************************************************/
            this.campus = campus;
            
            
            /******************************************************************************
             *  Letter grade received for course
             *
             *  @attribute grade
             *  @type string
             *  @for KU.Student.JWEB.FinalGrade
            ******************************************************************************/
            this.grade = grade;
            
            
            /******************************************************************************
             *  Earned credits for the course
             *
             *  @attribute earnedCredits
             *  @type string
             *  @for KU.Student.JWEB.FinalGrade
            ******************************************************************************/
            this.earnedCredits = earnedCredits;
            
        },
        
        
        /******************************************************************************
         *  Contains an evaluation area of required courses and their current status
         *  for the student
         *
         *  @class KU.Student.JWEB.EvalArea
         ******************************************************************************/
        EvalArea: function(met, name, requiredCredits, earnedCredits, gpa, requiredCourses){
            
            
            /******************************************************************************
             *  Whether or not the requirement is met for this area
             *
             *  @attribute met
             *  @type boolean
             *  @for KU.Student.JWEB.EvalArea
            ******************************************************************************/
            this.met = met;
            
            
            /******************************************************************************
             *  The name of the area (general education, math, science etc)
             *
             *  @attribute name
             *  @type string
             *  @for KU.Student.JWEB.EvalArea
            ******************************************************************************/
            this.name = name;
            
            
            /******************************************************************************
             *  The number of required credits in order to satisfy this area
             *
             *  @attribute requiredCredits
             *  @type string
             *  @for KU.Student.JWEB.EvalArea
            ******************************************************************************/
            this.requiredCredits = requiredCredits;

            
            /******************************************************************************
             *  The number of earned credits towards this area
             *
             *  @attribute earnedCredits
             *  @type string
             *  @for KU.Student.JWEB.EvalArea
            ******************************************************************************/
            this.earnedCredits = earnedCredits;
            
            
            /******************************************************************************
             *  The total GPA for this area only
             *
             *  @attribute gpa
             *  @type string
             *  @for KU.Student.JWEB.EvalArea
            ******************************************************************************/
            this.gpa = gpa;
            
            
            /******************************************************************************
             *  List of all required courses. Type is <code><span class="type">
             *  <a class="crosslink" href="../classes/KU.Student.JWEB.EvalCourse.html">
             *  KU.Student.JWEB.EvalCourse</a>[]</span></code>;
             *
             *  @attribute requiredCourses
             *  @type Array
             *  @for KU.Student.JWEB.EvalArea
            ******************************************************************************/
            this.requiredCourses = requiredCourses;
            
        },
        
        
        /******************************************************************************
         *  Contains a required course according to degree evaluation on jweb.
         *
         *  @class KU.Student.JWEB.EvalCourse
         ******************************************************************************/
        EvalCourse: function(met, name, takenCourseId, takenCourseTitle, takenTerm,
            takenCredits, takenGrade, details){
            
            
            /******************************************************************************
             *  Whether or not the requirement is met
             *
             *  @attribute met
             *  @type boolean
             *  @for KU.Student.JWEB.EvalCourse
            ******************************************************************************/
            this.met = met;
            
            
            /******************************************************************************
             *  The course id or general name of the required course
             *
             *  @attribute name
             *  @type string
             *  @for KU.Student.JWEB.EvalCourse
            ******************************************************************************/
            this.name = name;
            
            
            /******************************************************************************
             *  The course id of the satisfying course
             *
             *  @attribute takenCourseId
             *  @type string
             *  @for KU.Student.JWEB.EvalCourse
            ******************************************************************************/
            this.takenCourseId = takenCourseId;
            
            
            /******************************************************************************
             *  The course title of the satisfying course
             *
             *  @attribute takenCourseTitle
             *  @type string
             *  @for KU.Student.JWEB.EvalCourse
            ******************************************************************************/
            this.takenCourseTitle = takenCourseTitle;
            
            
            /******************************************************************************
             *  The term which the course was taken
             *
             *  @attribute takenTerm
             *  @type string
             *  @for KU.Student.JWEB.EvalCourse
            ******************************************************************************/
            this.takenTerm = takenTerm;
            
            
            /******************************************************************************
             *  The number of credits the satisfying course is worth
             *
             *  @attribute takenCredits
             *  @type string
             *  @for KU.Student.JWEB.EvalCourse
            ******************************************************************************/
            this.takenCredits = takenCredits;
            
            
            /******************************************************************************
             *  The grade received  for the taken course
             *
             *  @attribute takenGrade
             *  @type string
             *  @for KU.Student.JWEB.EvalCourse
            ******************************************************************************/
            this.takenGrade = takenGrade;
            
            
            /******************************************************************************
             *  The details of the course requirement (when available)
             *
             *  @attribute details
             *  @type string
             *  @for KU.Student.JWEB.EvalCourse
            ******************************************************************************/
            this.details = details;
            
        },
        
        
        /******************************************************************************
         *  Holds all the information for a degree evaluation
         *
         *  @class KU.Student.JWEB.Evaluation
         ******************************************************************************/
        Evaluation: function(fullName, idNumber, college, degree, level, majors, catalog, expectedGraduation, date,
             minors, concentrations, creditsMet, requiredCredits, usedCredits, transferCredits, 
             programGPAMet, overallGPAMet, programGPA, overallGPA, evalAreas){
            
                        
            /******************************************************************************
             *  Full name of student
             *
             *  @attribute fullName
             *  @type string
             *  @for KU.Student.JWEB.Evaluation
            ******************************************************************************/
            this.fullName = fullName;
            
            
            /******************************************************************************
             *  User id number of student
             *
             *  @attribute idNumber
             *  @type string
             *  @for KU.Student.JWEB.Evaluation
            ******************************************************************************/
            this.idNumber = idNumber;

            
            
            /******************************************************************************
             *  College the student is classified under
             *
             *  @attribute college
             *  @type string
             *  @for KU.Student.JWEB.Evaluation
            ******************************************************************************/
            this.college = college;
            
            
            /******************************************************************************
             *  Degree type the student is pursuing (e.g Bachelors of Science)
             *
             *  @attribute degree
             *  @type string
             *  @for KU.Student.JWEB.Evaluation
            ******************************************************************************/
            this.degree = degree;
                        
            
            /******************************************************************************
             *  The level of the student (e.g undergraduate or graduate)
             *
             *  @attribute level
             *  @type string
             *  @for KU.Student.JWEB.Evaluation
            ******************************************************************************/
            this.level = level;
                        
            
            /******************************************************************************
             *  The majors the student is enrolled in (comma separated)
             *
             *  @attribute majors
             *  @type string
             *  @for KU.Student.JWEB.Evaluation
            ******************************************************************************/
            this.majors = majors;
                        
            
            /******************************************************************************
             *  The catalog the students requirements come from (e.g Summer 2011)
             *
             *  @attribute catalog
             *  @type string
             *  @for KU.Student.JWEB.Evaluation
            ******************************************************************************/
            this.catalog = catalog;
                        
            
            /******************************************************************************
             *  The date the student is expected to graduate on
             *
             *  @attribute expectedGraduation
             *  @type string
             *  @for KU.Student.JWEB.Evaluation
            ******************************************************************************/
            this.expectedGraduation = expectedGraduation;
                        
            
            /******************************************************************************
             *  The date the evaluation was generated on
             *
             *  @attribute date
             *  @type string
             *  @for KU.Student.JWEB.Evaluation
            ******************************************************************************/
            this.date = date;
                        
            
            /******************************************************************************
             *  The minors the student is taking (comma separated)
             *
             *  @attribute minors
             *  @type string
             *  @for KU.Student.JWEB.Evaluation
            ******************************************************************************/
            this.minors = minors;
                        
            
            /******************************************************************************
             *  The concentrations the student is taking (comma separated)
             *
             *  @attribute concentrations
             *  @type string
             *  @for KU.Student.JWEB.Evaluation
            ******************************************************************************/
            this.concentrations = concentrations;
                        
            
            /******************************************************************************
             *  Whether or not the overall credit requirement is met
             *
             *  @attribute creditsMet
             *  @type boolean
             *  @for KU.Student.JWEB.Evaluation
            ******************************************************************************/
            this.creditsMet = creditsMet;
                        
            
            /******************************************************************************
             *  The number of required credits to graduate
             *
             *  @attribute requiredCredits
             *  @type string
             *  @for KU.Student.JWEB.Evaluation
            ******************************************************************************/
            this.requiredCredits = requiredCredits;
                        
            
            /******************************************************************************
             *  The number of satisfied credits by the student
             *
             *  @attribute usedCredits
             *  @type string
             *  @for KU.Student.JWEB.Evaluation
            ******************************************************************************/
            this.usedCredits = usedCredits;
                        
            
            /******************************************************************************
             *  The number of transferred credits to Kettering
             *
             *  @attribute transferCredits
             *  @type string
             *  @for KU.Student.JWEB.Evaluation
            ******************************************************************************/
            this.transferCredits = transferCredits;
                        
            
            /******************************************************************************
             *  Whether or not the overall GPA requirement is met
             *
             *  @attribute overallGPAMet
             *  @type boolean
             *  @for KU.Student.JWEB.Evaluation
            ******************************************************************************/
            this.overallGPAMet = overallGPAMet;

            
            /******************************************************************************
             *  Whether or not the program GPA requirement is met
             *
             *  @attribute programGPAMet
             *  @type boolean
             *  @for KU.Student.JWEB.Evaluation
            ******************************************************************************/
            this.programGPAMet = programGPAMet;
            
            
            /******************************************************************************
             *  Program GPA
             *
             *  @attribute programGPA
             *  @type string
             *  @for KU.Student.JWEB.Evaluation
            ******************************************************************************/
            this.programGPA = programGPA;
                        
            
            /******************************************************************************
             *  Overall GPA
             *
             *  @attribute overallGPA
             *  @type string
             *  @for KU.Student.JWEB.Evaluation
            ******************************************************************************/
            this.overallGPA = overallGPA;
            
            
            /******************************************************************************
             *  List of all required areas (general education, math, science etc).  
             *  Type is <code><span class="type"><a class="crosslink" 
             *  href="../classes/KU.Student.JWEB.EvalArea.html">KU.Student.JWEB.EvalArea
             *  </a>[]</span></code>;
             *
             *  @attribute evalAreas
             *  @type Array
             *  @for KU.Student.JWEB.Evaluation
            ******************************************************************************/
            this.evalAreas = evalAreas;

        },
        

    
        /******************************************************************************
         *  Holds all information for a required book
         *
         *  @class KU.Student.JWEB.Book
         ******************************************************************************/
        Book: function(title, edition, imgUrl, author, isbn){
            
            
            /******************************************************************************
             *  Title of book
             *
             *  @attribute title
             *  @type string
             *  @for KU.Student.JWEB.Book
            ******************************************************************************/
            this.title = title;
            
            
            /******************************************************************************
             *  Edition of book
             *
             *  @attribute edition
             *  @type string
             *  @for KU.Student.JWEB.Book
            ******************************************************************************/
            this.edition = edition;
            
            
            /******************************************************************************
             *  Url image for the book
             *
             *  @attribute imgUrl
             *  @type string
             *  @for KU.Student.JWEB.Book
            ******************************************************************************/
            this.imgUrl = imgUrl;
            
            
            /******************************************************************************
             *  Author of book
             *
             *  @attribute author
             *  @type string
             *  @for KU.Student.JWEB.Book
            ******************************************************************************/
            this.author = author
            
            
            /******************************************************************************
             *  ISBN of book
             *
             *  @attribute isbn
             *  @type string
             *  @for KU.Student.JWEB.Book
            ******************************************************************************/
            this.isbn = isbn;
            
        },
        
    
        /******************************************************************************
         *  Holds course information from banner web
         *
         *  @class KU.Student.JWEB.Course
         ******************************************************************************/
        Course: function(courseTitle, courseId, section, term, crn, professor, credits,
            campus, type, time, days, location){
            
            
            /******************************************************************************
             *  Title of given course
             *
             *  @attribute courseTitle
             *  @type string
             *  @for KU.Student.JWEB.Course
            ******************************************************************************/
            this.courseTitle = courseTitle;
            
            
            /******************************************************************************
             *  Identifier for given course
             *
             *  @attribute courseId
             *  @type string
             *  @for KU.Student.JWEB.Course
            ******************************************************************************/
            this.courseId = courseId;
            
            
            /******************************************************************************
             *  Section of course
             *
             *  @attribute section
             *  @type string
             *  @for KU.Student.JWEB.Course
            ******************************************************************************/
            this.section = section;
            
            
            /******************************************************************************
             *  Term the course is being taken in
             *
             *  @attribute term
             *  @type string
             *  @for KU.Student.JWEB.Course
            ******************************************************************************/
            this.term = term;
            
            
            /******************************************************************************
             *  CRN for the course
             *
             *  @attribute crn
             *  @type string
             *  @for KU.Student.JWEB.Course
            ******************************************************************************/
            this.crn = crn;
            
            
            /******************************************************************************
             *  Professor who is assigned to teach the course
             *
             *  @attribute professor
             *  @type string
             *  @for KU.Student.JWEB.Course
            ******************************************************************************/
            this.professor = professor;
            
            
            /******************************************************************************
             *  Amount of credits the course is worth
             *
             *  @attribute credits
             *  @type string
             *  @for KU.Student.JWEB.Course
            ******************************************************************************/
            this.credits = credits;
            
            
            /******************************************************************************
             *  Campus the course takes place on
             *
             *  @attribute campus
             *  @type string
             *  @for KU.Student.JWEB.Course
            ******************************************************************************/
            this.campus = campus;
            
            
            /******************************************************************************
             *  Type of course (i.e lab, lecture)
             *
             *  @attribute type
             *  @type string
             *  @for KU.Student.JWEB.Course
            ******************************************************************************/
            this.type = type;
            
            
            /******************************************************************************
             *  Time the course is held from
             *
             *  @attribute time
             *  @type string
             *  @for KU.Student.JWEB.Course
            ******************************************************************************/
            this.time = time;
            
            
            /******************************************************************************
             *  Days the course is held on 
             *
             *  @attribute days
             *  @type string
             *  @for KU.Student.JWEB.Course
            ******************************************************************************/
            this.days = days;
            
            
            /******************************************************************************
             *  Location the course takes place on
             *
             *  @attribute location
             *  @type string
             *  @for KU.Student.JWEB.Course
            ******************************************************************************/
            this.location = location;
            
        },
    
    
        /******************************************************************************
         *  Holds basic curriculum information for a student 
         *
         *  @class KU.Student.JWEB.StudentInfo
         ******************************************************************************/
        StudentInfo: function(fullName, idNumber, standing, transferCredits, 
            regularCredits, program, college, major, concentration, minor, specialty){
            
            
            /******************************************************************************
             *  Full name of student
             *
             *  @attribute fullName
             *  @type string
             *  @for KU.Student.JWEB.StudentInfo
            ******************************************************************************/
            this.fullName = fullName;
            
            
            /******************************************************************************
             *  User id number of student
             *
             *  @attribute idNumber
             *  @type string
             *  @for KU.Student.JWEB.StudentInfo
            ******************************************************************************/
            this.idNumber = idNumber;

            
            /******************************************************************************
             *  Class standing of student
             *
             *  @attribute standing
             *  @type string
             *  @for KU.Student.JWEB.StudentInfo
            ******************************************************************************/
            this.standing = standing;
            
            
            /******************************************************************************
             *  Transfer credits of student
             *
             *  @attribute transferCredits
             *  @type string
             *  @for KU.Student.JWEB.StudentInfo
            ******************************************************************************/
            this.transferCredits = transferCredits;
            
            
            /******************************************************************************
             *  Regular credits of student
             *
             *  @attribute regularCredits
             *  @type string
             *  @for KU.Student.JWEB.StudentInfo
            ******************************************************************************/
            this.regularCredits = regularCredits;
            
            
            /******************************************************************************
             *  Program title (e.g Bachelors of Science)
             *
             *  @attribute program
             *  @type string
             *  @for KU.Student.JWEB.StudentInfo
            ******************************************************************************/
            this.program = program;
            
            
            /******************************************************************************
             *  College category attended
             *
             *  @attribute college
             *  @type string
             *  @for KU.Student.JWEB.StudentInfo
            ******************************************************************************/
            this.college = college;
            
            
            /******************************************************************************
             *  Major(s) of the student
             *
             *  @attribute major
             *  @type string
             *  @for KU.Student.JWEB.StudentInfo
            ******************************************************************************/
            this.major = major;
            
            
            /******************************************************************************
             *  Concentration(s) of the student
             *
             *  @attribute concentration
             *  @type string
             *  @for KU.Student.JWEB.StudentInfo
            ******************************************************************************/
            this.concentration = concentration;
            
            
            /******************************************************************************
             *  Minor(s) of the student
             *
             *  @attribute minor
             *  @type string
             *  @for KU.Student.JWEB.StudentInfo
            ******************************************************************************/
            this.minor = minor;
            
            
            /******************************************************************************
             *  Specialty(s) of the student
             *
             *  @attribute specialty
             *  @type string
             *  @for KU.Student.JWEB.StudentInfo
            ******************************************************************************/
            this.specialty = specialty;
            
        },
    
        
        /******************************************************************************
         *  Logs the user into banner web
         * 
         *  @method login
         *  @param {string} user - the Kettering user Id
         *  @param {string} pass - password used to login to banner
         *  @param {function} successCallback - Called after successful login into banner. 
         *      Function Header: <code>void successCallback()</code>;
         *  @param {function} failureCallback - Called after a failure at logging into
         *      banner. Function Header: void <code>failureCallback(String errMsg)</code>;
         *  @for KU.Student.JWEB
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
         *      KU.Student.JWEB.login("user","pass", success, failure);
         *****************************************************************************/
        login: function(user, pass, successCallback, failureCallback){
            
            var initialUrl = "https://jweb.kettering.edu/cku1/twbkwbis.P_ValLogin"
            
            // Load jweb initially so the proper cookies exist
            $.ajax({
                url: initialUrl,
                type: 'POST',
                dataType: 'html',
                success: function(message, text, data){
                    
                    // Compile url
                    var url = "https://jweb.kettering.edu/cku1/twbkwbis.P_ValLogin";
                    
                    $.ajax({
                        url: url,
                        type: 'POST',
                        dataType: 'html',
                        data:{
                            "sid": user,
                            "PIN": pass
                        },
                        success: function(message, text, data){
                            
                            // Success pattern is a redirect to GenMenu page!
                            var successPattern = /.*<meta.*url=\/cku1\/twbkwbis\.P_GenMenu.*>.*/
                            
                            // Good login!
                            if(successPattern.test(message)) successCallback();
                            
                            // Bad login! 
                            else failureCallback("Bad user id / password");
                            
                        },
                        error: function(xhr, status, errorThrown){

                            // Failed
                            failureCallback(errorThrown);
                        }
                    });
                },
                error: function(xhr, status, errorThrown){

                    // Failed
                    failureCallback(errorThrown);
                }
            });
        },
        
        
        /******************************************************************************
         *  Logs the user out of banner web
         * 
         *  @method logout
         *  @param {function} successCallback - Called after successful logout of banner. 
         *      Function Header: <code>void successCallback()</code>;
         *  @param {function} failureCallback - Called after a failure at logging out of
         *      banner. Function Header: void <code>failureCallback(String errMsg)</code>;
         *  @for KU.Student.JWEB
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
         *      // Logout !
         *      KU.Student.JWEB.logout(success, failure);
         *****************************************************************************/
        logout: function(successCallback, failureCallback){
            
            
            // Compile url
            var url = "https://jweb.kettering.edu/cku1/twbkwbis.P_Logout";
            
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'html',
                success: function(message, text, data){
                    
                    // All done
                    successCallback();  
                },
                error: function(xhr, status, errorThrown){
                    
                    // Failed
                    failureCallback(errorThrown);
                }
            });
            
        },
        
        
        /******************************************************************************
         *  Retrieves the logged in student's account summary by term
         * 
         *  @method retrieveAccountSummary
         *  @param {function} successCallback - Called after successful retrieval. 
         *      Function Header: <code>void successCallback(int overallBalance, 
         *      <span class="type"><a class="crosslink" href=
         *      "../classes/KU.Student.JWEB.AccountTerm.html">KU.Student.JWEB.AccountTerm</a>
         *      []</span> terms</code>;)</code>;
         *  @param {function} failureCallback - Called after a failure to retrieve.
         *      Function Header: void <code>failureCallback(String errMsg)</code>;
         *  @for KU.Student.JWEB
         *  @return {void}
         *  @example  
         *      var success = function(overallBalance, terms){
         *          ...
         *      }
         *     
         *      var failure = function(errMsg){
         *          ...
         *      }
         *      
         *      // Get account summary
         *      KU.Student.JWEB.retrieveAccountSummary(success, failure);
         *****************************************************************************/
        retrieveAccountSummary: function(successCallback, failureCallback){
            
            
            // Compile url
            var url = "https://jweb.kettering.edu/cku1/bwskoacc.P_ViewAcct";
            
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'html',
                success: function(data, text, response){
                    
                    if(KU.Student.JWEB.isErrorPage(data)){ failureCallback("Request failed"); return; }
                    
                    // Load downloaded document
                    var doc = $("<div>").html(data);
                    
                    // Helper function for getting
                    // neutral text from elements
                    var neutral = function(elem){
                        
                        // Get text and neutralize!
                        return elem.text().trim().toLowerCase();
                    }
                    
                    var termPattern = /[a-zA-Z]+\s+\d\d\d\d/;
                    var zeroPattern = /\$0+(\.0+)?/;

                    // Defaults
                    var balance = "0", accountTerms = [], entries = [],
                        term = "", termTotalCharges = "", termTotalCredits = "", 
                        termBalance = "", termEntries = "", entryCode = "", 
                        entryDescription = "", entryTotal = "";
                    
                    $(".datadisplaytable", doc).find("tr").each(function(i){
                        
                        /** Label / Info Structure **/
                        if ($("th", this).size() == 1 && $("td", this).size() == 1){
                            
                            // Get info
                            var label = neutral($("th", this).eq(0));
                            var info = $("td", this).eq(0).text().trim();
                            
                            // Store if label matches balance
                            if(label === "account balance:") balance = info;
                            else if(label === "term charges:") termTotalCharges = info;
                            else if(label === "term credits and payments:") termTotalCredits = info;
                            else if(label === "term balance:"){
                                
                                // Store term balance, then add a new term
                                termBalance = info;
                                accountTerms[accountTerms.length] = new Student.JWEB.AccountTerm(
                                    term, termTotalCharges, termTotalCredits, termBalance, entries
                                );
                                
                                // Defaults
                                entries = [], term = "", termTotalCharges = "", termTotalCredits = "", 
                                termBalance = "", termEntries = "", entryCode = "", 
                                entryDescription = "", entryTotal = "";
                            }
                            
                        }
                        
                        /** Term Structure **/
                        else if ($("th", this).size() == 1 && $("td", this).size() == 0){
                            
                            // Get info
                            var label = $("th", this).eq(0).text().trim();
                            
                            // Store if label matches balance
                            if(termPattern.test(label)) term = label;
                            
                        }
                        
                        /** Entry Structure **/
                        else if ($("td", this).size() == 5){
                            
                            // Get info
                            entryCode = $("td", this).eq(0).text().trim();
                            entryDescription = $("td", this).eq(1).text().trim();
                            charge = $("td", this).eq(2).text().trim();
                            credit = $("td", this).eq(3).text().trim();
                            
                            // Store proper total 
                            if (charge == "") entryTotal = credit;
                            else if(zeroPattern.test(charge)) entryTotal = charge;
                            else entryTotal = "-" + charge;

                            entries[entries.length] = new Student.JWEB.AccountEntry(
                                entryCode, entryDescription, entryTotal
                            );
                            
                        }
                        
                        /** Entry Structure **/
                        else if ($("td", this).size() == 5){
                            
                            // Get info
                            entryCode = $("td", this).eq(0).text().trim();
                            entryDescription = $("td", this).eq(1).text().trim();
                            charge = $("td", this).eq(2).text().trim();
                            credit = $("td", this).eq(3).text().trim();
                            
                            // Store proper total 
                            if (charge == "") entryTotal = credit;
                            else if(zeroPattern.test(charge)) entryTotal = charge;
                            else entryTotal = "-" + charge;

                            entries[entries.length] = new Student.JWEB.AccountEntry(
                                entryCode, entryDescription, entryTotal
                            );    
                        }
                        
                    });
                    
                    
                    // All done
                    successCallback(balance, accountTerms);  
                },
                error: function(xhr, status, errorThrown){
                    
                    // Failed
                    failureCallback(errorThrown);
                }
            });
            
        },
        
        
        /******************************************************************************
         *  Retrieves the logged in student's current holds as an html string
         * 
         *  @method retrieveCurrentHolds
         *  @param {function} successCallback - Called after successful retrieval. 
         *      Function Header: <code>void successCallback(String holdsHtml)</code>;
         *  @param {function} failureCallback - Called after a failure to retrieve.
         *      Function Header: void <code>failureCallback(String errMsg)</code>;
         *  @for KU.Student.JWEB
         *  @return {void}
         *  @example  
         *      var success = function(holdsHtml){
         *          ...
         *      }
         *     
         *      var failure = function(errMsg){
         *          ...
         *      }
         *      
         *      // Get current holds
         *      KU.Student.JWEB.retrieveCurrentHolds(success, failure);
         *****************************************************************************/
        retrieveCurrentHolds: function(successCallback, failureCallback){
            
            
            // Compile url
            var url = "http://jweb.kettering.edu/cku1/bwskoacc.P_ViewHold";
            
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'html',
                success: function(data, text, response){
                    
                    if(KU.Student.JWEB.isErrorPage(data)){ failureCallback("Request failed"); return; }
                    
                    // Load downloaded document
                    var doc = $("<div>").html(data);
                    
                    // Find the summary?
                    var found = false;
                    
                    // All done
                    $("table.plaintable", doc).each(function(i){
                       
                        // Correct holds?
                        if(!found && $(this).attr("summary").trim() == "This layout table holds message information"){
                            
                            // Callback
                            successCallback($(this).html());
                            found = true; 
                        }
                    });
                    
                    // Send back nothing!
                    if (!found) successCallback("Nothing to show!");
                    
                },
                error: function(xhr, status, errorThrown){
                    
                    // Failed
                    failureCallback(errorThrown);
                }
            });
            
        },
        
        
        /******************************************************************************
         *  Retrieves the logged in student's unofficial transcript as an html string
         * 
         *  @method retrieveTranscript
         *  @param {function} successCallback - Called after successful retrieval. 
         *      Function Header: <code>void successCallback(String transcriptHtml)</code>;
         *  @param {function} failureCallback - Called after a failure to retrieve transcript.
         *      Function Header: void <code>failureCallback(String errMsg)</code>;
         *  @for KU.Student.JWEB
         *  @return {void}
         *  @example  
         *      var success = function(transcriptHtml){
         *          ...
         *      }
         *     
         *      var failure = function(errMsg){
         *          ...
         *      }
         *      
         *      // Get transcript
         *      KU.Student.JWEB.retrieveTranscript(success, failure);
         *****************************************************************************/
        retrieveTranscript: function(successCallback, failureCallback){
            
            
            // Compile url
            var url = "https://jweb.kettering.edu/cku1/ku_web_trans.view_transcript?tprt=SHRTRTC&levl=U";
            
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'html',
                success: function(data, text, response){
                    
                    if(KU.Student.JWEB.isErrorPage(data)){ failureCallback("Request failed"); return; }
                    
                    // Load downloaded document
                    var doc = $("<div>").html(data);
                    
                    // All done
                    successCallback(doc.html());  
                },
                error: function(xhr, status, errorThrown){
                    
                    // Failed
                    failureCallback(errorThrown);
                }
            });
            
        },
        
        
        /******************************************************************************
         *  Retrieves the logged in student's award history by year
         * 
         *  @method retrieveAwardHistory
         *  @param {function} successCallback - Called after successful retrieval. 
         *      Function Header: <code>void successCallback(<span class="type">
         *      <a class="crosslink" href="../classes/KU.Student.JWEB.AwardYear.html">
         *      KU.Student.JWEB.AwardYear</a>[]</span> awardYears</code>;)</code>;
         *  @param {function} failureCallback - Called after a failure to retrieve.
         *      Function Header: void <code>failureCallback(String errMsg)</code>;
         *  @for KU.Student.JWEB
         *  @return {void}
         *  @example  
         *      var success = function(awardYears){
         *          ...
         *      }
         *     
         *      var failure = function(errMsg){
         *          ...
         *      }
         *      
         *      // Get award history
         *      KU.Student.JWEB.retrieveAwardHistory(success, failure);
         *****************************************************************************/
        retrieveAwardHistory: function(successCallback, failureCallback){
            
            // Award url 
            var url = "https://jweb.kettering.edu/cku1/bwrkrhst.P_DispAwdHst";
            
            
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'html',
                success: function(data, text, response){
                    
                    if(KU.Student.JWEB.isErrorPage(data)){ failureCallback("Request failed"); return; }
                    
                    // Load downloaded document
                    var doc = $("<div>").html(data);
                    
                    // Helper function for getting
                    // neutral text from elements
                    var neutral = function(elem){
                        
                        // Get text and neutralize!
                        return elem.text().trim().toLowerCase();
                    }
                    
                    // Patterns
                    var namePattern = /[a-zA-Z\s]+\s([a-zA-Z]+\s\d\d\d\d\sto\s[a-zA-Z]+\s\d\d\d\d)/;
                    
                    // Defaults
                    var awardYears = [];
                    
                    // Go through all years
                    doc.find("table.datadisplaytable").each(function(i){
                        
                        // Defaults
                        var years = "", entries = [];
                        
                        // Get years name
                        groups = namePattern.exec($("caption.captiontext", this).text().trim())
                        if(groups.length == 2) years = groups[1];
                        
                        // Go through each row of the table
                        $("tr", this).each(function(rowIndex){
                            
                            var children = $("td", this);
                            
                            /** Award entry **/
                            if (children.size() == 7){
                                
                                // Defaults
                                var name = "", offered = "", accepted = "", 
                                   declined = "", cancelled = "", paidToDate = "";
                                
                                // Store info
                                name = children.eq(0).text().trim(); 
                                offered = children.eq(1).text().trim();
                                accepted = children.eq(2).text().trim();
                                declined = children.eq(3).text().trim();
                                cancelled = children.eq(4).text().trim();
                                paidToDate = children.eq(6).text().trim();

                                // Make and insert new award entry
                                entries[entries.length] = new Student.JWEB.AwardEntry(
                                    name, offered, accepted, declined, cancelled, paidToDate
                                );
                            }
                            
                        });
                        
                        // Make and add award years
                        awardYears[awardYears.length] = new Student.JWEB.AwardYear(
                            years, entries
                        );
                        
                    });
                    
                    
                    // All done
                    successCallback(awardYears);
                    
                },
                error: function(xhr, status, errorThrown){
                    
                    // Failed, so throw!
                    failureCallback(errorThrown);
                }
            });
            
            
        },
        
        
        /******************************************************************************
         *  Retrieve schedule catalog for all courses based on term provided
         * 
         *  @method retrieveScheduleCatalog
         *  @param {string} term - year and quarter (e.g 201501 for winter 2015)
         *  @param {function} successCallback - Called after successful gathering of 
         *      catalog. Function Header: <code>void successCallback(<span class="type">
         *      <a class="crosslink" href="../classes/KU.Student.JWEB.CatalogEntry.html">
         *      KU.Student.JWEB.CatalogEntry</a>[]</span> entries)</code>;
         *  @param {function} failureCallback - Called after a failure at getting catalog 
         *      Function Header: void <code>failureCallback(String errMsg)</code>;
         *  @for KU.Student.JWEB
         *  @return {void}
         *  @example  
         *      var success = function(entries){
         *          ...
         *      }
         *     
         *      var failure = function(errMsg){
         *          ...
         *      }
         *      
         *      // Get course catalog
         *      KU.Student.JWEB.retrieveScheduleCatalog("201501", success, failure);
         *****************************************************************************/
        retrieveScheduleCatalog: function(term, successCallback, failureCallback){
        
            // Url for all courses
            var url = "https://jweb.kettering.edu/cku1/bwskfcls.P_GetCrse_Advanced?"
                + "rsts=dummy&crn=dummy&term_in=" + term + "&sel_subj=dummy&sel_day=dummy"
                + "&sel_schd=dummy&sel_insm=dummy&sel_camp=dummy&sel_levl=dummy"
                + "&sel_sess=dummy&sel_instr=dummy&sel_ptrm=dummy&sel_attr=dummy"
                + "&sel_subj=SSCI&sel_subj=ACCT&sel_subj=BINF&sel_subj=BIOL"
                + "&sel_subj=BUSN&sel_subj=CHME&sel_subj=CHEM&sel_subj=CHN"
                + "&sel_subj=COMM&sel_subj=CE&sel_subj=CS&sel_subj=CUE&sel_subj=ECON"
                + "&sel_subj=ECE&sel_subj=EE&sel_subj=FINC&sel_subj=FYE&sel_subj=GER"
                + "&sel_subj=HIST&sel_subj=HUMN&sel_subj=IME&sel_subj=ISYS"
                + "&sel_subj=INEN&sel_subj=MFGO&sel_subj=LS&sel_subj=LIT&sel_subj=MGMT"
                + "&sel_subj=MRKT&sel_subj=MATH&sel_subj=MECH&sel_subj=MEDI"
                + "&sel_subj=PHIL&sel_subj=PHYS&sel_subj=SSCI&sel_subj=SOC"
                + "&sel_crse=&sel_title=&sel_from_cred=&sel_to_cred="
                + "&sel_instr=%25&begin_hh=0&begin_mi=0&begin_ap=0&end_hh=0&end_mi=0"
                + "&end_ap=a&SUB_BTN=Section+Search&path=1"
            
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'html',
                success: function(data, text, response){
                    
                    if(KU.Student.JWEB.isErrorPage(data)){ failureCallback("Request failed"); return; }
                    
                    // Load downloaded document
                    var doc = $("<div>").html(data);
                    
                    // Helper function for getting
                    // neutral text from elements
                    var neutral = function(elem){
                        
                        // Get text and neutralize!
                        return elem.text().trim().toLowerCase();
                    }
                    
                    // Defaults
                    var entries = [], status = "", crn = "", courseId = "", 
                        section = "", campus = "", credits = "", title = "", 
                        days = "", time = "", capacity = "", active = "", 
                        professor = "", startDate = "", room = "";
                        
                    // Go through all course rows
                    doc.find("table.datadisplaytable tr").each(function(i){
                       
                        var children = $("td", this);
                       
                        /** Course structure  **/
                        if (children.size() == 17){
                            
                            // Valid course information (otherwise use previous information)
                            if (children.eq(1).text().trim() != ""){
                            
                                // Get information
                                status = children.eq(0).text().trim();
                                crn = children.eq(1).text().trim();
                                courseId = children.eq(2).text().trim() + "-" + children.eq(3).text().trim();
                                section = children.eq(4).text().trim();
                                campus = children.eq(5).text().trim();
                                credits = children.eq(6).text().trim();
                                title = children.eq(7).text().trim();
                            }
                            
                            days = children.eq(8).text().trim();
                            time = children.eq(9).text().trim();
                            capacity = children.eq(10).text().trim();
                            active = children.eq(11).text().trim();
                            professor = children.eq(13).text().trim();
                            startDate = children.eq(14).text().trim();
                            room = children.eq(15).text().trim();
                            
                            // Make new course entry and insert
                            entries[entries.length] = new Student.JWEB.CatalogEntry(
                                status, crn, courseId, section, campus, credits, title,
                                days, time, capacity, active, professor, startDate, room
                            );
                            
                        }
                        
                    });
                    
                    // All done!
                    successCallback(entries);
                    
                },
                error: function(xhr, status, errorThrown){
                    
                    // Failed, so throw!
                    failureCallback(errorThrown);
                }
            });
            
        },
        
        
        /******************************************************************************
         *  Retrieve available terms for schedule
         * 
         *  @method retrieveScheduleTerms
         *  @param {function} successCallback - Called after successful gathering of 
         *      schedule terms. Function Header: <code>void successCallback(String[] terms)</code>;
         *  @param {function} failureCallback - Called after a failure at getting schedule terms 
         *      Function Header: void <code>failureCallback(String errMsg)</code>;
         *  @for KU.Student.JWEB
         *  @return {void}
         *  @example  
         *      var success = function(terms){
         *          ...
         *      }
         *     
         *      var failure = function(errMsg){
         *          ...
         *      }
         *      
         *      // Get schedule terms
         *      KU.Student.JWEB.retrieveScheduleTerms(success, failure);
         *****************************************************************************/
        retrieveScheduleTerms: function(successCallback, failureCallback){
            
            var url = "https://jweb.kettering.edu/cku1/bwskflib.P_SelDefTerm";
            
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'html',
                success: function(data, text, response){
                    
                    if(KU.Student.JWEB.isErrorPage(data)){ failureCallback("Request failed"); return; }
                    
                    // Load downloaded document
                    var doc = $("<div>").html(data);

                    // Defaults
                    var terms = [];
                    
                    doc.find("#term_id option").each(function(i){
                       
                       // Add new term
                       terms[terms.length] = $(this).val();
                       
                    });
                
                    successCallback(terms);
                
                },
                error: function(xhr, status, errorThrown){
                    
                    // Failed, so throw!
                    failureCallback(errorThrown);
                }
            });
            
            
        },
        
        
        /******************************************************************************
         *  Retrieve available terms for final grades
         * 
         *  @method retrieveFinalTerms
         *  @param {function} successCallback - Called after successful gathering of 
         *      final terms. Function Header: <code>void successCallback(String[] terms)</code>;
         *  @param {function} failureCallback - Called after a failure at getting final terms 
         *      Function Header: void <code>failureCallback(String errMsg)</code>;
         *  @for KU.Student.JWEB
         *  @return {void}
         *  @example  
         *      var success = function(terms){
         *          ...
         *      }
         *     
         *      var failure = function(errMsg){
         *          ...
         *      }
         *      
         *      // Get final terms
         *      KU.Student.JWEB.retrieveFinalTerms(success, failure);
         *****************************************************************************/
        retrieveFinalTerms: function(successCallback, failureCallback){
            
            var url = "https://jweb.kettering.edu/cku1/wbwskogrd.P_ViewTermGrde";
            
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'html',
                success: function(data, text, response){
                    
                    if(KU.Student.JWEB.isErrorPage(data)){ failureCallback("Request failed"); return; }
                    
                    // Load downloaded document
                    var doc = $("<div>").html(data);

                    // Defaults
                    var terms = [];
                    
                    doc.find("#term_id option").each(function(i){
                       
                       // Add new term
                       terms[terms.length] = $(this).val();
                       
                    });
                
                    successCallback(terms);
                
                },
                error: function(xhr, status, errorThrown){
                    
                    // Failed, so throw!
                    failureCallback(errorThrown);
                }
            });
            
            
        },
        
        
        /******************************************************************************
         *  Retrieve final grades for a given term at Kettering University
         * 
         *  @method retrieveFinalGrades
         *  @param {string} term - year and quarter (e.g 201501 for winter 2015)
         *  @param {function} successCallback - Called after successful gathering of 
         *      final grades. Function Header: <code>void successCallback(String term, 
         *      String termGpa, String overallGpa, <span class="type">
         *      <a class="crosslink" href="../classes/KU.Student.JWEB.FinalGrade.html">
         *      KU.Student.JWEB.FinalGrade</a>[]</span> grades)</code>;
         *  @param {function} failureCallback - Called after a failure at getting finals. 
         *      Function Header: void <code>failureCallback(String errMsg)</code>;
         *  @for KU.Student.JWEB
         *  @return {void}
         *  @example  
         *      var success = function(term, termGpa, overallGpa, grades){
         *          ...
         *      }
         *     
         *      var failure = function(errMsg){
         *          ...
         *      }
         *      
         *      // Get final grades
         *      KU.Student.JWEB.retrieveFinalGrades("201501", success, failure);
         *****************************************************************************/
        retrieveFinalGrades: function(term, successCallback, failureCallback){
        
            var url = "https://jweb.kettering.edu/cku1/wbwskogrd.P_ViewGrde?term_in=" + term + "&inam=on&snam=on&sgid=on";
            
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'html',
                success: function(data, text, response){
                    
                    if(KU.Student.JWEB.isErrorPage(data)){ failureCallback("Request failed"); return; }
                    
                    // Load downloaded document
                    var doc = $("<div>").html(data);
                    
                    // Helper function for getting
                    // neutral text from elements
                    var neutral = function(elem){
                        
                        // Get text and neutralize!
                        return elem.text().trim().toLowerCase();
                    }
                    
                    // Defaults
                    var term = "", termGpa = "", overallGpa = "", grades = [];
                    
                    // Go through all tables (there should be 3)
                    doc.find("table.datadisplaytable").each(function(i){
                        
                        $(this).find("tr").each(function(rowIndex){
                            
                            /** Student Information Structure **/
                            if ($("th", this).size() == 1 && $("td", this).size() == 1){
                                
                                // Get information
                                label = neutral($("th", this).eq(0));
                                info = $("td", this).eq(0).text().trim()
                                
                                // Store if it is term info!
                                if (label === "term:") term = info;
                            }
                            
                            /** Course Structure **/
                            if ($("td", this).size() == 12){
                                
                                children = $("td", this);
                                
                                // Store information
                                var crn = children.eq(0).text().trim();
                                var courseId = children.eq(1).text().trim() + "-" + children.eq(2).text().trim();
                                var section = children.eq(3).text().trim();
                                var title = children.eq(4).text().trim();
                                var campus = children.eq(5).text().trim();
                                var grade = children.eq(6).text().trim();
                                var earnedCredits = children.eq(8).text().trim();
                                
                                // Insert new final grade
                                grades[grades.length] = new Student.JWEB.FinalGrade(
                                    crn, courseId, section, title, campus, grade, earnedCredits
                                );
                                
                                
                            }
                            
                            /** Summary Structure **/
                            if ($("th", this).size() == 1 && $("td", this).size() == 5){
                                
                                // Get information
                                label = neutral($("th", this).eq(0));
                                gpaInfo = $("td", this).eq(4).text().trim()
                                
                                // Store information in proper place
                                if (label === "current term:") termGpa = gpaInfo;
                                if (label === "overall:") overallGpa = gpaInfo;
                                
                            }                            
                            
                            
                        });
                        
                    });
                    
                    // All done
                    successCallback(term, termGpa, overallGpa, grades);
                    
                },
                error: function(xhr, status, errorThrown){
                    
                    // Failed, so throw!
                    failureCallback(errorThrown);
                }
            });
            
        },
        
        
        /******************************************************************************
         *  Generates new evaluation for a student
         * 
         *  @method generateEvaluation
         *  @param {string} sourceId - The source to generate the evaluation from.
         *      Use <code>retrieveEvalPrograms</code> to find this information.
         *  @param {string} programId - The program to use for the generation.
         *      Use <code>retrieveEvalPrograms</code> to find this information.
         *  @param {string} term - Year and quarter (e.g 201501 for winter 2015)
         *  @param {function} successCallback - Called after successful generation of 
         *      evaluation. Function Header: <code>void successCallback()</code>;
         *  @param {function} failureCallback - Called after a failure at generating evaluation.
         *      Function Header: void <code>failureCallback(String errMsg)</code>;
         *  @for KU.Student.JWEB
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
         *      // Generate evaluation
         *      KU.Student.JWEB.generateEvaluation("sourceId", "programId", "201501", success, failure);
         *****************************************************************************/
        generateEvaluation: function(sourceId, programId, term, successCallback, failureCallback){
            
            // Generate url
            var url = "https://jweb.kettering.edu/cku1/bwckcapp.P_Submit?source1=" 
                + sourceId + "&program=" + programId + "&ctlg_term=" + term + "&eval_term=999999&dflt_ip=Y";
                
            // First set the terms
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'html',
                success: function(data, text, response){
                    
                    if(KU.Student.JWEB.isErrorPage(data)){ failureCallback("Request failed"); return; }
                  
                    // All done!
                    successCallback();
                    
                },
                error: function(xhr, status, errorThrown){
                    
                    // Failed, so throw!
                    failureCallback(errorThrown);
                }
            });
            
        },
        
        
        /******************************************************************************
         *  Retrieves available evaluation programs and corresponding information.
         *  Mainly used to generate new evaluations with.
         * 
         *  @method retrieveEvalPrograms
         *  @param {string} term - Year and quarter (e.g 201501 for winter 2015)
         *  @param {function} successCallback - Called after successful gathering of 
         *      eval programs. Function Header: <code>void successCallback(<span class="type">
         *      <a class="crosslink" href="../classes/KU.Student.JWEB.EvalProgram.html">
         *      KU.Student.JWEB.EvalProgram</a>[]</span> evalPrograms)</code>;
         *  @param {function} failureCallback - Called after a failure at getting eval 
         *      programs. Function Header: void <code>failureCallback(String errMsg)</code>;
         *  @for KU.Student.JWEB
         *  @return {void}
         *  @example  
         *      var success = function(evalPrograms){
         *          ...
         *      }
         *     
         *      var failure = function(errMsg){
         *          ...
         *      }
         *      
         *      // Get evaluation programs
         *      KU.Student.JWEB.retrieveEvalPrograms("201501", success, failure);
         *****************************************************************************/
        retrieveEvalPrograms: function(term, successCallback, failureCallback){
            
            // Generate url
            var url = "https://jweb.kettering.edu/cku1/bwckcapp.P_DispEvalTerm?term_in=" + term;
                
            // First set the terms
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'html',
                success: function(data, text, response){
                  
                    if(KU.Student.JWEB.isErrorPage(data)){ failureCallback("Request failed"); return; }
                  
                    // Load downloaded document
                    var doc = $("<div>").html(data);
                  
                    // Defaults
                    programs = [];
                  
                    // Get global source 
                    var sourceId = doc.find("input[name=source1]").attr("value");
                  
                    // Go through all program option tables
                    doc.find("table.dataentrytable").each(function(i){
                       
                        // Get information
                        programId = $("input[name=program]", this).attr("value");
                        name = $("tr:first td:last", this).text().trim();
                        
                        // Insert new evaluation program into list
                        programs[programs.length] = new Student.JWEB.EvalProgram(
                            name, sourceId, programId
                        );
                        
                    });
                  
                    // All done!
                    successCallback(programs);
                    
                },
                error: function(xhr, status, errorThrown){
                    
                    // Failed, so throw!
                    failureCallback(errorThrown);
                }
            });
            
            
        },
        
        
        /******************************************************************************
         *  Retrieve evaluation for student based on given request number
         * 
         *  @method retrieveEvaluation
         *  @param {string} term - year and quarter (e.g 201501 for winter 2015)
         *  @param {string} requestNum - request number for already generated degree evaluation
         *  @param {function} successCallback - Called after successful gathering of 
         *      evaluation. Function Header: <code>void successCallback(<span class="type">
         *      <a class="crosslink" href="../classes/KU.Student.JWEB.Evaluation.html">
         *      KU.Student.JWEB.Evaluation</a></span> evaluation)</code>;
         *  @param {function} failureCallback - Called after a failure at getting evaluation. 
         *      Function Header: void <code>failureCallback(String errMsg)</code>;
         *  @for KU.Student.JWEB
         *  @return {void}
         *  @example  
         *      var success = function(evaluation){
         *          ...
         *      }
         *     
         *      var failure = function(errMsg){
         *          ...
         *      }
         *      
         *      // Get eval
         *      KU.Student.JWEB.retrieveEvaluation("201501", "1", success, failure);
         *****************************************************************************/
        retrieveEvaluation: function(term, requestNum, successCallback, failureCallback){
            
            
            // Terms url
             var termUrl = "https://jweb.kettering.edu/cku1/bwckcapp.P_DispCurrent?term_in=" + term
            
            // First set the terms
            $.ajax({
                url: termUrl,
                type: 'GET',
                dataType: 'html',
                success: function(data, text, response){
                    
                    if(KU.Student.JWEB.isErrorPage(data)){ failureCallback("Request failed"); return; }
                    
                     // Evaluation url
                    var url = "https://jweb.kettering.edu/cku1/bwckcapp.P_VerifyDispEvalViewOption?request_no=" 
                        + requestNum + "&program_summary=3";
               
                    $.ajax({
                        url: url,
                        type: 'GET',
                        dataType: 'html',
                        success: function(data, text, response){
                            
                            if(KU.Student.JWEB.isErrorPage(data)){ failureCallback("Request failed"); return; }
                            
                            // Load downloaded document
                            var doc = $("<div>").html(data);
                            
                            // Helper function for getting
                            // neutral text from elements
                            var neutral = function(elem){
                                
                                // Get text and neutralize!
                                return elem.text().trim().toLowerCase();
                            }
                            
                            // Not enough tables for bare minimum?
                            // there must be at least two tables since the first
                            // two tables always contain basic curriculum information
                            if (doc.find("table.datadisplaytable").size() < 2){
                                
                                // Error
                                failureCallback("Invalid evaluation page found.");
                                return;
                            }
                    
                            // Defaults
                            var college = "", degree = "", level = "", majors = "", catalog = "",
                                expectedGraduation, date = "", minors = "", concentrations = "",
                                fullName = "", idNumber = "";
                             
                            
                            // Patterns
                            var headerPattern = /(\d\d\d\d+)\s(.*)\n.*/;
                            var standingPattern = /Your\sClass\sfor\sregistration\spurposes\sis\s([a-zA-Z]+\s\d)\..*/;
                            
                            // Header info
                            var headerGroups = headerPattern.exec($(".staticheaders", doc).text().trim());
                            fullName = (headerGroups.length === 3)? headerGroups[2] : "";
                            idNumber = (headerGroups.length === 3)? headerGroups[1] : "";
                             
                            
                            // Parse all rows from 1st Table
                            // this table contains the overview information
                            doc.find("table.datadisplaytable").eq(0).find("tr").each(function(i){
                               
                                // Go through all children
                                var children = $("th.ddlabel, td.dddefault", this);
                                
                                // Go through all children
                                for (i = 0; i + 1 < children.size(); i += 2){
                                    
                                    /** Parse all types! **/
                                    if(neutral(children.eq(i)) === "college :") college = children.eq(i + 1).text().trim();
                                    if(neutral(children.eq(i)) === "degree :") degree = children.eq(i + 1).text().trim();
                                    if(neutral(children.eq(i)) === "level :") level = children.eq(i + 1).text().trim();
                                    if(neutral(children.eq(i)) === "majors :") majors = children.eq(i + 1).text().trim().replace(/\n+/g, ", ");;
                                    if(neutral(children.eq(i)) === "catalog term :") catalog = children.eq(i + 1).text().trim();
                                    if(neutral(children.eq(i)) === "expected graduation date :") expectedGraduation = children.eq(i + 1).text().trim();
                                    if(neutral(children.eq(i)) === "results as of :") date = children.eq(i + 1).text().trim();
                                    if(neutral(children.eq(i)) === "minors :") minors = children.eq(i + 1).text().trim().replace(/\n+/g, ", ");;
                                    if(neutral(children.eq(i)) === "concentrations :") concentrations = children.eq(i + 1).text().trim().replace(/\n+/g, ", ");;
                                    
                                    // Fix concentrations
                                    concentrations = concentrations.replace(/\n+/g, ", ");
                                    
                                }
                                
                            });
                            
                            // Defaults
                            var creditsMet = "", requiredCredits = "", usedCredits = "", transferCredits = "", 
                                programGPAMet = "", overallGPAMet = "", programGPA = "", overallGPA = "";
                                
                            
                            // Parse all rows from 2nd Table
                            // this table contains GPA and credit information
                            doc.find("table.datadisplaytable").eq(1).find("tr").each(function(i){
                                
                                // Enough elements?
                                if($("th", this).size() == 1 && $("td", this).size() == 5 ){
                                    
                                    /** Total Required **/
                                    if ( neutral($("th", this)) === "total required :" ){
                                        
                                        creditsMet = neutral($("td", this).eq(0)) === "yes";
                                        requiredCredits = $("td", this).eq(1).text().trim();
                                        usedCredits = $("td", this).eq(2).text().trim();
                                    }
                                    
                                    /** Program GPA **/
                                    if ( neutral($("th", this)) === "program gpa :" ){
                                        
                                        // Only work for yes or no.. otherwise not applicable
                                        if (neutral($("td", this).eq(0)) === "yes") programGPAMet = true;
                                        else if(neutral($("td", this).eq(0)) === "no") programGPAMet = false;
                                        programGPA = $("td", this).eq(2).text().trim();
                                    }
                                    
                                    /** Overall GPA **/
                                    if ( neutral($("th", this)) === "overall gpa :" ){
                                        
                                        // Only work for yes or no.. otherwise not applicable
                                        if (neutral($("td", this).eq(0)) === "yes") overallGPAMet = true;
                                        else if(neutral($("td", this).eq(0)) === "no") overallGPAMet = false;
                                        overallGPA = $("td", this).eq(2).text().trim();
                                    }
                                    
                                    /** Transfer **/
                                    if ( neutral($("th", this)) === "transfer :" ){
                                        
                                        transferCredits = $("td", this).eq(2).text().trim();
                                    }
                                    
                                }
                                
                            });
                            
                            // Defaults
                            var evalAreas = [];
                            
                            // Patterns
                            var areaPattern = /([a-zA-Z\s]+)\s*\(\s*(\d+\.\d+)\scredits\s*\)\s*-\s*(.*)/;

                            
                            // Go through all other tables
                            // these contain area and detailed course information
                            for (var i = 2; i < doc.find("table.datadisplaytable").size(); i++){
                                
                                // Defaults
                                var courseMet = "", courseName = "", takenCourseId = "", takenCourseTitle = "", 
                                    takenTerm = "", takenCredits = "", details = "", takenGrade = "", met = "", 
                                    name = "", requiredCredits = "", earnedCredits = "", gpa = "", 
                                    requiredCourses = [], specialCourseQueue = [];
                                
                                // Go through each row looking for information
                                doc.find("table.datadisplaytable").eq(i).find("tr").each(function(rowIndex){
                                    
                                    /** Area Information **/
                                    if( $("th", this).size() == 1 && $("td", this).size() == 1
                                        && areaPattern.test($("td", this).eq(0).text().trim())){
                                            
                                        groups = areaPattern.exec($("td", this).eq(0).text().trim());

                                        // Flush all special courses
                                        for (var specialIndex in specialCourseQueue){
                                            
                                            // Get course and update details
                                            var specialCourse = specialCourseQueue[specialIndex];
                                            specialCourse.details = details;
                                            
                                            // Add to real array!
                                            requiredCourses[requiredCourses.length] = specialCourse;
                                        }
                                        
                                        // Defaults
                                        specialCourseQueue = [];
                                        courseMet = "", courseName = "", takenCourseId = "", takenCourseTitle = "", 
                                        takenTerm = "", takenCredits = "", takenGrade = "", details = "";
                                        
                                        // Store info!
                                        name = groups[1];
                                        requiredCredits = groups[2];
                                        met = groups[3] == "Met";
                                        
                                    }
                                    
                                    /** Full Course information **/
                                    else if( $("td", this).size() == 17 ){
                                        
                                        children = $("td", this);
                                        
                                        // Get condition
                                        var condition = neutral(children.eq(1));
                                        
                                        // Flush all special courses
                                        for (var specialIndex in specialCourseQueue){
                                            
                                            // Get course and update details
                                            var specialCourse = specialCourseQueue[specialIndex];
                                            specialCourse.details = details;
                                            
                                            // Add to real array!
                                            requiredCourses[requiredCourses.length] = specialCourse;
                                        }
                                        
                                        // Defaults
                                        specialCourseQueue = [];
                                        courseMet = "", courseName = "", takenCourseId = "", takenCourseTitle = "", 
                                        takenTerm = "", takenCredits = "", takenGrade = "", details = "";
                                        
                                        // Store info!
                                        courseMet = neutral(children.eq(0)) === "yes";
                                        courseName = children.eq(3).text().trim() + "-" + children.eq(5).text().trim();
                                        takenCourseId = children.eq(10).text().trim() + "-" + children.eq(11).text().trim();
                                        takenCourseTitle = children.eq(12).text().trim();
                                        takenTerm = children.eq(9).text().trim();
                                        takenCredits = children.eq(14).text().trim();
                                        takenGrade = children.eq(15).text().trim();
                                        
                                        // Fix course name to use the rule as a fallback
                                        if (courseName === "" || courseName === "-") courseName = children.eq(2).text().trim();
                                        
                                        // Check if condition is normal concatenation 'and'
                                        // which implies that we need to add a new course
                                        if(courseName != ""){
                                            
                                            // Add new evaluation course to the list
                                            requiredCourses[requiredCourses.length] = new Student.JWEB.EvalCourse(
                                                courseMet, courseName, takenCourseId, takenCourseTitle, takenTerm,
                                                takenCredits, takenGrade, details
                                            );
                                            
                                            // Defaults
                                            courseMet = "", courseName = "", takenCourseId = "", takenCourseTitle = "", 
                                            takenTerm = "", takenCredits = "", takenGrade = "", details = "";
                                            
                                        }
                                        
                                    }
                                    
                                    /** Special Course (electives) start **/
                                    else if( $("td", this).size() == 12 ){
                                        
                                        children = $("td", this);
                                        
                                        // Flush all special courses
                                        for (var specialIndex in specialCourseQueue){
                                            
                                            // Get course and update details
                                            var specialCourse = specialCourseQueue[specialIndex];
                                            specialCourse.details = details;
                                            
                                            // Add to real array!
                                            requiredCourses[requiredCourses.length] = specialCourse;
                                        }
                                        
                                        // Defaults
                                        specialCourseQueue = [];
                                        courseMet = "", courseName = "", takenCourseId = "", takenCourseTitle = "", 
                                        takenTerm = "", takenCredits = "", takenGrade = "", details = "";
                                        
                                        // Store info!
                                        courseMet = neutral(children.eq(0)) === "yes";
                                        courseName = children.eq(3).text().trim();
                                        takenCourseId = children.eq(5).text().trim() + "-" + children.eq(6).text().trim();
                                        takenCourseTitle = children.eq(7).text().trim();
                                        takenTerm = children.eq(4).text().trim();
                                        takenCredits = children.eq(9).text().trim();
                                        takenGrade = children.eq(10).text().trim();
                                        
                                        // Fix course name to use the rule as a fallback
                                        if (courseName === "" || courseName === "-") courseName = children.eq(2).text().trim();
                                        
                                        // Valid information?
                                        if(courseName != ""){
                                            
                                            // Add new evaluation course to the list
                                            specialCourseQueue[specialCourseQueue.length] = new Student.JWEB.EvalCourse(
                                                courseMet, courseName, takenCourseId, takenCourseTitle, takenTerm,
                                                takenCredits, takenGrade, details
                                            );
                                            
                                            // Defaults
                                            courseMet = "", takenCourseId = "", takenCourseTitle = "", 
                                            takenTerm = "", takenCredits = "", takenGrade = "", details = "";
                                            
                                        }
                                        
                                    }
                                    
                                    
                                    /** Regular unsatisfied course **/
                                    else if( $("td", this).size() == 10 && $("td", this).eq(9).attr("colspan") == "8"){
                                        
                                        children = $("td", this);
                                        
                                        // Get condition
                                        var condition = neutral(children.eq(1));
                                        
                                        // Flush all special courses
                                        for (var specialIndex in specialCourseQueue){
                                            
                                            // Get course and update details
                                            var specialCourse = specialCourseQueue[specialIndex];
                                            specialCourse.details = details;
                                            
                                            // Add to real array!
                                            requiredCourses[requiredCourses.length] = specialCourse;
                                        }
                                        
                                        // Defaults
                                        specialCourseQueue = [];
                                        courseMet = "", courseName = "", takenCourseId = "", takenCourseTitle = "", 
                                        takenTerm = "", takenCredits = "", takenGrade = "", details = "";
                                        
                                        // Store info!
                                        courseMet = neutral(children.eq(0)) === "yes";
                                        courseName = children.eq(3).text().trim() + "-" + children.eq(5).text().trim();
                                        
                                        // Fix course name to use the rule as a fallback
                                        if (courseName === "" || courseName === "-") courseName = children.eq(2).text().trim();
                                        
                                        // Check if condition is normal concatenation 'and'
                                        // which implies that we need to add a new course
                                        if(courseName != "" && (condition === "(" || condition === ")" || condition === ")and(" || condition === "and")){
                                            
                                            // Add new evaluation course to the list
                                            requiredCourses[requiredCourses.length] = new Student.JWEB.EvalCourse(
                                                courseMet, courseName, takenCourseId, takenCourseTitle, takenTerm,
                                                takenCredits, takenGrade, details
                                            );
                                            
                                            // Defaults
                                            courseMet = "", courseName = "", takenCourseId = "", takenCourseTitle = "", 
                                            takenTerm = "", takenCredits = "", takenGrade = "", details = "";
                                            
                                        }   
                                    }
                                    
                                    
                                    /** Special Course (electives) with details **/
                                    else if( $("td", this).size() == 10 ){
                                        
                                        children = $("td", this);
                                        
                                        // Store info!
                                        courseMet = null;
                                        details = children.eq(1).text().trim();
                                        takenCourseId = children.eq(3).text().trim() + "-" + children.eq(4).text().trim();
                                        takenCourseTitle = children.eq(5).text().trim();
                                        takenTerm = children.eq(2).text().trim();
                                        takenCredits = children.eq(7).text().trim();
                                        takenGrade = children.eq(8).text().trim();
                                        
                                        // Valid information?
                                        if(courseName != ""){
                                            
                                            // Add new evaluation course to the list
                                            specialCourseQueue[specialCourseQueue.length] = new Student.JWEB.EvalCourse(
                                                courseMet, courseName, takenCourseId, takenCourseTitle, takenTerm,
                                                takenCredits, takenGrade, details
                                            );
                                            
                                            // Defaults
                                            courseMet = "", takenCourseId = "", takenCourseTitle = "", 
                                            takenTerm = "", takenCredits = "", takenGrade = "";
                                            
                                        }
                                        
                                    }
                                    
                                    /** Details only **/
                                    else if( $("td", this).size() == 3 && $("td", this).eq(2).attr("colspan") == "8"){
                                        
                                        children = $("td", this);
                                        
                                        // Store details only
                                        details = children.eq(1).text().trim();
                                        
                                    }
                                    
                                    /** Special Course (electives) without details **/
                                    else if( $("td", this).size() == 8 ){
                                        
                                        children = $("td", this);
                                        
                                        // Store info!
                                        courseMet = null;
                                        takenCourseId = children.eq(1).text().trim() + "-" + children.eq(2).text().trim();
                                        takenCourseTitle = children.eq(3).text().trim();
                                        takenTerm = children.eq(0).text().trim();
                                        takenCredits = children.eq(5).text().trim();
                                        takenGrade = children.eq(6).text().trim();
                                        
                                        // Valid information?
                                        if(courseName != ""){
                                            
                                            // Add new evaluation course to the list
                                            specialCourseQueue[specialCourseQueue.length] = new Student.JWEB.EvalCourse(
                                                courseMet, courseName, takenCourseId, takenCourseTitle, takenTerm,
                                                takenCredits, takenGrade, details
                                            );
                                            
                                            // Defaults
                                            courseMet = "", takenCourseId = "", takenCourseTitle = "", 
                                            takenTerm = "", takenCredits = "", takenGrade = "";
                                            
                                        }
                                        
                                    }

                                    /** Special Course (electives) end **/
                                    else if( $("td", this).size() == 2 ){
                                        
                                        children = $("td", this);
                                        
                                        if (children.eq(1).text().trim() === ")"){
                                        
                                            // Go through all special courses
                                            for (var specialIndex in specialCourseQueue){
                                                
                                                // Get course and update details
                                                var specialCourse = specialCourseQueue[specialIndex];
                                                specialCourse.details = details;
                                                
                                                // Add to real array!
                                                requiredCourses[requiredCourses.length] = specialCourse;
                                            }
                                        }
                                        
                                        // Defaults
                                        specialCourseQueue = [];
                                        courseMet = "", courseName = "", takenCourseId = "", takenCourseTitle = "", 
                                        takenTerm = "", takenCredits = "", takenGrade = "", details = "";
                                        
                                    }
                                    
                                     /** Special course start (unsatisfied) **/
                                    else if( $("td", this).size() == 5 && $("td", this).eq(4).attr("colspan") == "8" ){
                                        
                                        children = $("td", this);
                                        
                                        // Flush all special courses
                                        for (var specialIndex in specialCourseQueue){
                                            
                                            // Get course and update details
                                            var specialCourse = specialCourseQueue[specialIndex];
                                            specialCourse.details = details;
                                            
                                            // Add to real array!
                                            requiredCourses[requiredCourses.length] = specialCourse;
                                        }
                                        
                                        // Defaults
                                        specialCourseQueue = [];
                                        courseMet = "", courseName = "", takenCourseId = "", takenCourseTitle = "", 
                                        takenTerm = "", takenCredits = "", takenGrade = "", details = "";
                                        
                                        // Store info!
                                        courseMet = neutral(children.eq(0)) === "yes";
                                        courseName = children.eq(3).text().trim();
                                        takenCourseId = children.eq(5).text().trim() + "-" + children.eq(6).text().trim();
                                        
                                        // Fix course name to use the rule as a fallback
                                        if (courseName === "" || courseName === "-") courseName = children.eq(2).text().trim();
                                        
                                        // Valid information?
                                        if(courseName != ""){
                                            
                                            // Add new evaluation course to the list
                                            specialCourseQueue[specialCourseQueue.length] = new Student.JWEB.EvalCourse(
                                                courseMet, courseName, takenCourseId, takenCourseTitle, takenTerm,
                                                takenCredits, takenGrade, details
                                            );
                                            
                                            // Defaults
                                            courseMet = "", takenCourseId = "", takenCourseTitle = "", 
                                            takenTerm = "", takenCredits = "", takenGrade = "", details = "";
                                            
                                        }
                                    }
                                    
                                    /** End information **/
                                    else if( $("td", this).size() == 4 ){
                                        
                                        children = $("td", this);
                                        
                                        // Flush all special courses
                                        for (var specialIndex in specialCourseQueue){
                                            
                                            // Get course and update details
                                            var specialCourse = specialCourseQueue[specialIndex];
                                            specialCourse.details = details;
                                            
                                            // Add to real array!
                                            requiredCourses[requiredCourses.length] = specialCourse;
                                        }
                                        
                                        // Defaults
                                        specialCourseQueue = [];
                                        courseMet = "", courseName = "", takenCourseId = "", takenCourseTitle = "", 
                                        takenTerm = "", takenCredits = "", takenGrade = "", details = "";
                                        
                                        // Store information
                                        earnedCredits = children.eq(1).text().trim();
                                        gpa = children.eq(2).text().trim();
                                    }
                                    
                                   
                                });
                                
                                // Valid evaluation area?
                                if (name != ""){
                                    
                                    // Add evaluation area to the list
                                    evalAreas[evalAreas.length] = new Student.JWEB.EvalArea(
                                        met, name, requiredCredits, earnedCredits, gpa, requiredCourses
                                    )
                                }   
                            }
                            
                    
                            // Make the evaluation object
                            evaluation = new Student.JWEB.Evaluation(
                                fullName, idNumber, college, degree, level, majors, catalog, 
                                expectedGraduation, date, minors, concentrations, creditsMet, 
                                requiredCredits, usedCredits, transferCredits, programGPAMet, 
                                overallGPAMet, programGPA, overallGPA, evalAreas
                            )
                            
                    
                            // All done
                            successCallback(evaluation);
                            
                        },
                        
                        // Failed to get evaluation
                        error: function(xhr, status, errorThrown){
                            
                            // Failed, so throw!
                            failureCallback(errorThrown);
                        }
                    });
                    
                },
                
                // Failed to retrieve the terms
                error: function(xhr, status, errorThrown){
                    
                    // Failed, so throw!
                    failureCallback(errorThrown);
                }
            });
            
        },
        
        
        /******************************************************************************
         *  Get evaluation list for student. This represents all possible evaluations
         *  that are already generated in order of their generated date.
         * 
         *  @method retrieveEvaluationList
         *  @param {string} term - year and quarter (e.g 201501 for winter 2015)
         *  @param {function} successCallback - Called after successful gathering of 
         *      evaluation possibilities. Function Header: <code>void successCallback(<span class="type">
         *      String[]</span> possibilities)</code>;
         *  @param {function} failureCallback - Called after a failure at getting evaluation 
         *      possibilities. Function Header: void <code>failureCallback(String errMsg)</code>;
         *  @for KU.Student.JWEB
         *  @return {void}
         *  @example  
         *      var success = function(possibilities){
         *          ...
         *      }
         *     
         *      var failure = function(errMsg){
         *          ...
         *      }
         *      
         *      // Get eval possibilities !
         *      KU.Student.JWEB.retrieveEvaluationList("201501", success, failure);
         *****************************************************************************/
        retrieveEvaluationList: function(term, successCallback, failureCallback){
            
            
            // Terms url
            var url = "https://jweb.kettering.edu/cku1/bwcksmmt.P_DispPrevEval?term_in=" + term;
            
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'html',
                success: function(data, text, response){
                    
                    if(KU.Student.JWEB.isErrorPage(data)){ failureCallback("Request failed"); return; }
                    
                    // Load downloaded document
                    var doc = $("<div>").html(data);
                    
                    // Helper function for getting
                    // neutral text from elements
                    var neutral = function(elem){
                        
                        // Get text and neutralize!
                        return elem.text().trim().toLowerCase();
                    }
                    
                    // Improper row count?
                    if(doc.find(".datadisplaytable tr").size() < 2){
                        
                        // Assume there is no evaluations!
                        successCallback(0);
                        return;
                    }
                    
                    var possibilities = [];
                    
                    // Check each row
                    doc.find(".datadisplaytable tr").each(function(i){
                        
                        var children = $("td", this);
                        
                        // Correct size?
                        if (children.size() == 3){
                            
                            // Store as a possibilities
                            possibilities[possibilities.length] = children.eq(1).text().trim();
                        }
                    });
                    
                    
                    // All done
                    successCallback(possibilities);
                    
                },
                error: function(xhr, status, errorThrown){
                    
                    // Failed
                    failureCallback(errorThrown);
                }
            });
            
        },
        
        
        /******************************************************************************
         *  Checks if incoming data is actually a banner error page
         * 
         *  @method isErrorPage
         *  @param {string} data - the html data for a page
         *  @for KU.Student.JWEB
         *  @return {boolean}
         *  @example  
         *      
         *      // Check for error !
         *      var isError = KU.Student.JWEB.isErrorPage(htmlData);
         *****************************************************************************/
        isErrorPage: function(data){
          
            // Check if login fields exist, if so assume we have been redirected to login page
            var doc = $("<div></div>").html(data);
            return ($("#UserID", doc).length > 0 && $("#PIN", doc).length > 0);
            
        },
        
        
        /******************************************************************************
         *  Downloads the latest student curriculum information
         * 
         *  @method retrieveStudentInfo
         *  @param {string} term - year and quarter (e.g 201501 for winter 2015)
         *  @param {function} successCallback - Called after successful gathering of 
         *      information. Function Header: <code>void successCallback(<span class="type">
         *      <a class="crosslink" href="../classes/KU.Student.JWEB.StudentInfo.html">
         *      KU.Student.JWEB.StudentInfo</a></span> studentInfo)</code>;
         *  @param {function} failureCallback - Called after a failure at getting information
         *      from banner. Function Header: void <code>failureCallback(String errMsg)</code>;
         *  @for KU.Student.JWEB
         *  @return {void}
         *  @example  
         *      var success = function(studentInfo){
         *          ...
         *      }
         *     
         *      var failure = function(errMsg){
         *          ...
         *      }
         *      
         *      // Get info !
         *      KU.Student.JWEB.retrieveStudentInfo("201501", success, failure);
         *****************************************************************************/
        retrieveStudentInfo: function(term, successCallback, failureCallback){
            
            // Terms url
            var url = "https://jweb.kettering.edu/cku1/bwskrsta.P_RegsStatusDisp?term_in=" + term;
            
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'html',
                success: function(data, text, response){
                    
                    if(KU.Student.JWEB.isErrorPage(data)){ failureCallback("Request failed"); return; }
                    
                    // Load downloaded document
                    var doc = $("<div>").html(data);
                    
                    // Properties
                    var fullName, idNumber, standing, transferCredits, regularCredits, 
                        program, college, major, concentration, minor, specialty;
                    
                    // Patterns
                    var headerPattern = /(\d\d\d\d+)\s(.*)\n.*/;
                    var standingPattern = /Your\sClass\sfor\sregistration\spurposes\sis\s([a-zA-Z]+\s\d)\..*/;
                    
                    // Header
                    var headerGroups = headerPattern.exec($(".staticheaders", doc).text().trim());
                    
                    // Full Name
                    if (headerGroups != null && headerGroups.length === 3) fullName = headerGroups[2];
                    else fullName = "";
                    
                    // Id Number
                    if (headerGroups != null && headerGroups.length === 3) idNumber = headerGroups[1];
                    else idNumber = "";
                    
                    // Default standing
                    standing = "";
                    
                    // Look for class standing!
                    $(".pldefault", doc).each(function(i){

                        // Check if message is class standing
                        var message = $(this).text().trim();
                        if(standingPattern.test(message)) standing = standingPattern.exec(message)[1];
                       
                    });
                    
                    // Defaults
                    transferCredits = "";
                    regularCredits = "";
                    program = "";
                    college = "";
                    major = "";
                    concentration = "";
                    minor = "";
                    specialty = "";
                    
                    // Helper function for getting
                    // neutral text from elements
                    var neutral = function(elem){
                        
                        // Get text and neutralize!
                        return elem.text().trim().toLowerCase();
                    }
                    
                    // Check all table elements for useful information!
                    $(".datadisplaytable tr", doc).each(function(i){
                        
                    
                        /** Credits **/
                        if ($("td", this).size() === 3){
                            
                            // Get table elements
                            var elems = $("td", this);
                            
                            // Transfer credits
                            if( neutral(elems.eq(0)) === "undergraduate" &&
                                neutral(elems.eq(1)) === "transfer"){
                                
                                // Store transfer credits!
                                transferCredits = elems.eq(2).text().trim();
                            }
                            
                            // Regular credits
                            if( neutral(elems.eq(0)) === "undergraduate" &&
                                neutral(elems.eq(1)) === "institutional"){
                                
                                // Store regular credits!
                                regularCredits = elems.eq(2).text().trim();
                            }
                            
                        }
                        
                        /** Current Program **/
                        else if (neutral($(this)) === "current program" &&
                            (i + 1) < $(".datadisplaytable tr", doc).size()){
                            
                            // Program immediately follows the label for "current program"
                            program = $(".datadisplaytable tr", doc).eq(i + 1).text().trim();
                        }
                        
                        // Other information
                        else if(($("td", this).size() === 1) && ($("th", this).size() === 1)){
                               
                            /** College **/
                            if(neutral($("th", this).eq(0)) === "college:"){
                                
                                // Store college!
                                college = $("td", this).text().trim();
                            }
                            
                            /** Major **/
                            else if(neutral($("th", this).eq(0)) === "major:"){
                                
                                // Store major(s)!
                                if(major != "") major += ", ";
                                major += $("td", this).text().trim();
                            }
                            
                            /** Minor **/
                            else if(neutral($("th", this).eq(0)) === "minor:"){
                                
                                // Store minor(s)!
                                if(minor != "") minor += ", ";
                                minor += $("td", this).text().trim();
                            }
                            
                            /** Concentration **/
                            else if(neutral($("th", this).eq(0)) === "concentration:"){
                                
                                // Store concentration(s)!
                                if(concentration != "") concentration += ", ";
                                concentration += $("td", this).text().trim();
                            }
                            
                            /** Specialty **/
                            else if(neutral($("th", this).eq(0)) === "major concentration:"){
                                
                                // Store specialty(s)!
                                if(specialty != "") specialty += ", ";
                                specialty += $("td", this).text().trim();
                            }
                            
                        }
                        
                    });
                    
                    
                    // Make student info object!
                    var info = new KU.Student.JWEB.StudentInfo(fullName, idNumber, standing,
                        transferCredits, regularCredits, program, college, major, 
                        concentration, minor, specialty);
                    
                    // All done
                    successCallback(info);  
                    
                },
                error: function(xhr, status, errorThrown){
                    
                    // Failed
                    failureCallback(errorThrown);
                }
            });
            
        },
        
        
        /******************************************************************************
         *  Downloads the required books for a given course and term.
         * 
         *  @method retrieveRequiredBooks
         *  @param {string} term - name of the desired term (e.g Winter 2015)
         *  @param {string} courseId - name of the course id (e.g CS-101)
         *  @param {string} section - section of the desired course (e.g 1)
         *  @param {function} successCallback - Called after successful gathering of 
         *      books. Function Header: <code>void successCallback(<span class="type">
         *      <a class="crosslink" href="../classes/KU.Student.JWEB.Book.html">
         *      KU.Student.JWEB.Book</a>[]</span> required, <span class="type">
         *      <a class="crosslink" href="../classes/KU.Student.JWEB.Book.html">
         *      KU.Student.JWEB.Book</a>[]</span> optional)</code>;
         *  @param {function} failureCallback - Called after a failure at getting required
         *      books. Function Header: void <code>failureCallback(String errMsg)</code>;
         *  @for KU.Student.JWEB
         *  @return {void}
         *  @example  
         *      var success = function(required, optional){
         *          ...
         *      }
         *     
         *      var failure = function(errMsg){
         *          ...
         *      }
         *      
         *      // Get required books !
         *      KU.Student.JWEB.retrieveRequiredBooks("Winter 2015", "CS-101", "01", success, failure);
         *****************************************************************************/
        retrieveRequiredBooks: function(term, courseId, section, successCallback, failureCallback){
            
            // First url
            var firstUrl = "http://www.bkstr.com/webapp/wcs/stores/servlet/en/ketteringstore/textbooks-and-course-materials"
            
            // Terms url
            var url = "https://www.bkstr.com/webapp/wcs/stores/servlet/LocateCourseMaterialsServlet?"
                + "requestType=TERMS&storeId=345405&demoKey=d&programId=3663";
                
            
            // Pattern for course
            var coursePattern = /([a-zA-Z]+)[\-\s](\d+)/;
            
            // Defaults
            var dept = "";
            var idNum = "";
            
            // Proper course passed in?
            if(coursePattern.test(courseId)){
                
                // Extract dept and id
                groups = coursePattern.exec(courseId);
                dept = groups[1];
                idNum = groups[2];
            }
            
            // Invalid course id
            else{
                
                // Failed to give course id
                failureCallback("Please provide valid course id");
                return;
            }
            
            // Fix section
            section = parseInt(section);
            
            // First url is loaded for proper cookies only
            $.ajax({
                url: firstUrl,
                type: 'GET',
                dataType: 'html',
                timeout: 25000,
                success: function(data, text, response){
            
                $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'html',
                    timeout: 25000,
                    success: function(data, text, response){
                        
                        // Fix the returned script to be a json object instead
                        data = data.replace("<script>parent.doneLoaded('", "").replace("')</script>", "");
                        
                        // Parse json
                        termObj = JSON.parse(data);
                        
                        // Invalid termObj?
                        if ( termObj == null || termObj == undefined ){
                            
                            // Failed to parse
                            failureCallback("Failure to get terms for required books.");
                            return;
                        }
                        
                        // Found or not?
                        var found = false;
                        
                        // Search for correct term
                        for(var i = 0; i < termObj.data.length; i++){
                            
                            // Valid term?
                            if (termObj.data[i][term] != undefined){
                               
                                // Get value of term (some integer from bkstr.com)
                                var termVal = termObj.data[i][term];
                                found = true;
                                
                                // Compile full url
                                var fullUrl = "http://www.bkstr.com/webapp/wcs/stores/servlet/CourseMaterialsResultsView?" 
                                    + "catalogId=10001&categoryId=9604&storeId=345405&langId=-1&programId=3663"
                                    + "&termId=" + termVal + "&divisionDisplayName=%20"
                                    + "&departmentDisplayName=" + dept 
                                    + "&courseDisplayName=" + dept + "%20" + idNum 
                                    + "&sectionDisplayName=" + section 
                                    + "&demoKey=d&purpose=browse";
                                
                                // Download the actual course data
                                $.ajax({
                                    url: fullUrl,
                                    type: 'GET',
                                    dataType: 'html',
                                    timeout: 25000,
                                    success: function(data, text, response){
                                        
                                        // Load downloaded document
                                        var doc = $("<div>").html(data);
                                        
                                        // Initialize book array
                                        var books = [], optional = [];
                                        
                                        // Go through all required books!
                                        $("#material-group-list_REQUIRED_1_1 li", doc).each(function(bookIndex){
                                           
                                            // Remove extra spans and then get title
                                            $("h3.material-group-title", this).find("span").remove();
                                            var title = $("h3.material-group-title", this).text().trim();
                                            
                                            // Remove strong and get author
                                            $("span#materialAuthor", this).find("strong").remove();
                                            var author = $("span#materialAuthor", this).text().trim();
                                            
                                            // Remove strong and get edition
                                            $("span#materialEdition", this).find("strong").remove();
                                            var edition = $("span#materialEdition", this).text().trim();
                                            
                                            // Remove strong and get isbn
                                            $("span#materialISBN", this).find("strong").remove();
                                            var isbn = $("span#materialISBN", this).text().trim();

                                            // Get image url
                                            var imgUrl = $("span#materialTitleImage img:first", this).attr("src");
                                            
                                            books[books.length] = new KU.Student.JWEB.Book(title, edition, imgUrl, author, isbn);
                                            
                                        });
                                        
                                        
                                        // Go through all required books!
                                        $("#material-group-list_RECOMMENDED_1_1 li", doc).each(function(bookIndex){
                                            
                                            // Remove extra spans and then get title
                                            $("h3.material-group-title", this).find("span").remove();
                                            var title = $("h3.material-group-title", this).text().trim();
                                            
                                            // Remove strong and get author
                                            $("span#materialAuthor", this).find("strong").remove();
                                            var author = $("span#materialAuthor", this).text().trim();
                                            
                                            // Remove strong and get edition
                                            $("span#materialEdition", this).find("strong").remove();
                                            var edition = $("span#materialEdition", this).text().trim();
                                            
                                            // Remove strong and get isbn
                                            $("span#materialISBN", this).find("strong").remove();
                                            var isbn = $("span#materialISBN", this).text().trim();

                                            // Get image url
                                            var imgUrl = $("span#materialTitleImage img:first", this).attr("src");
                                            
                                            optional[optional.length] = new KU.Student.JWEB.Book(title, edition, imgUrl, author, isbn);
                                            
                                        });
                                        
                                        successCallback(books, optional);
                                        
                                    },
                                    error: function(xhr, status, errorThrown){
                                        
                                        // Failed
                                        failureCallback(errorThrown);
                                    }
                                });
                            }
                        }
                        
                        // Couldn't find term so return blank!
                        if(!found) { 
                            successCallback([]);
                            return;
                        }
                        
                        
                    },
                    error: function(xhr, status, errorThrown){
                        
                        // Failed
                        failureCallback(errorThrown);
                    }
                });
            
            },
                error: function(xhr, status, errorThrown){
                    
                    // Failed
                    failureCallback(errorThrown);
                }
            });
        },   
        
        /******************************************************************************
         *  Downloads the student schedule information for specified term.
         * 
         *  @method retrieveSchedule
         *  @param {string} term - year and quarter (e.g 201501 for winter 2015)
         *  @param {function} successCallback - Called after successful gathering of 
         *      schedule. Function Header: <code>void successCallback(<span class="type">
         *      <a class="crosslink" href="../classes/KU.Student.JWEB.Course.html">
         *      KU.Student.JWEB.Course</a>[]</span> courses)</code>;
         *  @param {function} failureCallback - Called after a failure at getting schedule
         *      from banner. Function Header: void <code>failureCallback(String errMsg)</code>;
         *  @for KU.Student.JWEB
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
         *      // Get courses !
         *      KU.Student.JWEB.retrieveSchedule(success, failure);
         *****************************************************************************/
        retrieveSchedule: function(term, successCallback, failureCallback){
            
            
            // Schedule url
            var url = "https://jweb.kettering.edu/cku1/bwskfshd.P_CrseSchdDetl?term_in=" + term;
            
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'html',
                success: function(data, text, response){
                    
                    if(KU.Student.JWEB.isErrorPage(data)){ failureCallback("Request failed"); return; }

                    // Load downloaded document
                    var doc = $("<div>").html(data);
                    
                    // Course tables
                    var tables = $("table.datadisplaytable", doc);
                    
                    // Initialize courses
                    var courses = [];
                    
                    // Go through each course
                    // each course has two consecutive tables 
                    for(var i = 0; i + 1 < tables.size(); i += 2){
                        
                        // Properties
                        var courseTitle, courseId, section, term, crn, professor, credits,
                            campus, type, time, days, location;
                            
                        // Get proper tables
                        var headerTable = tables.eq(i);
                        var meetingTable = tables.eq(i + 1);
                        
                        // Pattern for title - courseid - section
                        courseTitlePattern = /(.*)\s-\s(.*\s.*)\s-\s(\d\d)/;
                        
                        // Helper function for getting
                        // neutral text from elements
                        var neutral = function(elem){
                            
                            // Get text and neutralize!
                            return elem.text().trim().toLowerCase();
                        }
                        
                        // Parse title info
                        if(courseTitlePattern.test(headerTable.find("caption:first").text().trim())){
                            
                            // Get groups
                            var groups = courseTitlePattern.exec(headerTable.find("caption:first").text().trim());
                            
                            // Extract information
                            courseTitle = groups[1];
                            courseId = groups[2].replace(' ', '-');
                            section = groups[3];
                            
                            // Defaults
                            term = "";
                            crn = "";
                            professor = "";
                            credits = "";
                            campus = "";
                         
                            // Check all rows of header
                            $("tbody tr", headerTable).each(function(index){
                               
                                // Valid row?
                                if( $("th", this).size() == 1 && $("td", this).size() == 1 ){
                                    
                                    /** Term **/
                                    if(neutral($("th", this)) === "associated term:"){
                                        
                                        // Store term
                                        term = $("td", this).text().trim();
                                    }
                                    
                                    /** CRN **/
                                    else if(neutral($("th", this)) === "crn:"){
                                        
                                        // Store crn
                                        crn = $("td", this).text().trim();
                                    }
                                    
                                    /** Professor **/
                                    else if(neutral($("th", this)) === "assigned instructor:"){
                                        
                                        // Store professor
                                        professor = $("td", this).text().trim();
                                    }

                                    /** Credits **/
                                    else if(neutral($("th", this)) === "credits:"){
                                        
                                        // Store credits
                                        credits = $("td", this).text().trim();
                                    }
                                    
                                    /** Campus **/
                                    else if(neutral($("th", this)) === "campus:"){
                                        
                                        // Store credits
                                        campus = $("td", this).text().trim();
                                    }
                                }
                                
                            });
                            
                            // Defaults
                            type = "";
                            time = "";
                            days = "";
                            location = "";
                            
                            // Valid meeting table?
                            if(meetingTable.find("tr").size() > 1){
                                
                                for (var meetingIndex = 1; meetingIndex < meetingTable.find("tr").size(); meetingIndex++){
                                
                                    // Get rows
                                    var headerRow = meetingTable.find("tr").eq(0);
                                    var infoRow = meetingTable.find("tr").eq(meetingIndex);
                                    
                                    // Header columns and info columns size match?
                                    if(headerRow.find("th").size() == infoRow.find("td").size()){
                                                                            
                                    
                                        // Check all columns of meeting table
                                        // note: this only accounts for a single meeting time
                                        // per each course
                                        $("th", headerRow).each(function(column){
                                 
                                            /** Type **/
                                            if ( neutral($(this)) === "schedule type") {
                                                
                                                // Store type
                                                type = $("td", infoRow).eq(column).text().trim();
                                            }
                                            
                                            /** Time **/
                                            else if ( neutral($(this)) === "time") {
                                                
                                                // Store time
                                                time = $("td", infoRow).eq(column).text().trim();
                                            }
                                            
                                            /** Days **/
                                            else if ( neutral($(this)) === "days") {
                                                
                                                // Store time
                                                days = $("td", infoRow).eq(column).text().trim();
                                            }
                                            
                                            /** Location **/
                                            else if ( neutral($(this)) === "where") {
                                                
                                                // Store time
                                                location = $("td", infoRow).eq(column).text().trim();
                                            }
                                            
                                        });
                                    }
                                    
                                    // Add new course
                                    courses[courses.length] = new KU.Student.JWEB.Course(courseTitle, courseId,
                                        section, term, crn, professor, credits, campus, type, time, days, location);
                                }
                            }
                            
                            
                            
                        }
                        
                    }
                    
                    // Success!
                    successCallback(courses);
                    
                },
                error: function(xhr, status, errorThrown){
                    
                    // Failed
                    failureCallback(errorThrown);
                }
            });
        }
       
    };
    
    
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
            ******************************************************************************/
            this.firstName = firstName;
            
            
            /******************************************************************************
             *  Last name of contact
             *
             *  @attribute lastName
             *  @type string
             *  @for KU.Student.BB.Contact
            ******************************************************************************/
            this.lastName = lastName;
            
            
            /******************************************************************************
             *  Email address of the contact (when available).
             *
             *  @attribute email
             *  @optional
             *  @type string
             *  @for KU.Student.BB.Contact
            ******************************************************************************/
            this.email = email;
            
        },
        
      
        /******************************************************************************
         *  Holds all the information for a Blackboard grade
         *
         *  @class KU.Student.BB.Grade
         ******************************************************************************/
        Grade: function(title, grade, pointsPossible, dueDate, postedDate, status, additionalInfo){
            
            
            /******************************************************************************
             *  Title of grade
             *
             *  @attribute title
             *  @type string
             *  @for KU.Student.BB.Grade
            ******************************************************************************/
            this.title = title;
            
            
            /******************************************************************************
             *  Grade as a letter, percent or raw number
             *
             *  @attribute grade
             *  @type string
             *  @for KU.Student.BB.Grade
            ******************************************************************************/
            this.grade = grade;
            
            
            /******************************************************************************
             *  Points possible for the grade (when available).
             *
             *  @attribute pointsPossible
             *  @optional
             *  @type string
             *  @for KU.Student.BB.Grade
            ******************************************************************************/
            this.pointsPossible = pointsPossible;
            
            
            /******************************************************************************
             *  Due date for the assignment (when available).
             *
             *  @attribute dueDate
             *  @optional
             *  @type string
             *  @for KU.Student.BB.Grade
            ******************************************************************************/
            this.dueDate = dueDate;
            
            
            /******************************************************************************
             *  The date the grade was last updated (when available).
             *
             *  @attribute postedDate
             *  @optional
             *  @type string
             *  @for KU.Student.BB.Grade
            ******************************************************************************/
            this.postedDate = postedDate;
            
            
            /******************************************************************************
             *  Status the assignment (when available).
             *
             *  @attribute status
             *  @optional
             *  @type string
             *  @for KU.Student.BB.Grade
            ******************************************************************************/
            this.status = status;
            
            
            /******************************************************************************
             *  Additional information on the course grade (when available)
             *
             *  @attribute additionalInfo
             *  @optional
             *  @type string
             *  @for KU.Student.BB.Grade
            ******************************************************************************/
            this.additionalInfo = additionalInfo;
            
        },
      
      
        /******************************************************************************
         *  Holds all the folders and files within a single layer of a content tree
         *  for a course.
         *
         *  @class KU.Student.BB.Tree
         ******************************************************************************/
        Tree: function(bbId, contentId, folders, items){

        
            /******************************************************************************
             *  Course id for Blackboard 
             *
             *  @attribute bbId
             *  @type string
             *  @for KU.Student.BB.Tree
            ******************************************************************************/
            this.bbId = bbId;
            
            
            /******************************************************************************
             *  Content id for root folder on blackboard (when available)
             *
             *  @optional
             *  @attribute contentId
             *  @type string
             *  @for KU.Student.BB.Tree
            ******************************************************************************/
            this.contentId = contentId;
            
        
            /******************************************************************************
             *  Folders found inside the blackboard folder! Type is <code><span class="type">
             *      <a class="crosslink" href="../classes/KU.Student.BB.Folder.html">
             *      KU.Student.BB.Folder</a>[]</span></code>;
             *
             *  @attribute folders
             *  @type Array
             *  @for KU.Student.BB.Tree
            ******************************************************************************/
            this.folders = folders;
            
            
            /******************************************************************************
             *  Items found inside the blackboard folder! Type is <code><span class="type">
             *  <a class="crosslink" href="../classes/KU.Student.BB.Item.html">
             *  KU.Student.BB.Item</a>[]</span></code>;
             *
             *  @attribute items
             *  @type Array
             *  @for KU.Student.BB.Tree
            ******************************************************************************/
            this.items = items;
            
            
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
            ******************************************************************************/
            this.bbId = bbId;
            
            
            /******************************************************************************
             *  Blackboard content folder identifier
             *
             *  @attribute contentId
             *  @type string
             *  @for KU.Student.BB.Folder
            ******************************************************************************/
            this.contentId = contentId;
        

            /******************************************************************************
             *  The name of the folder as it appears on Blackboard
             *
             *  @attribute name
             *  @type string
             *  @for KU.Student.BB.Folder
            ******************************************************************************/
            this.name = name;

            
            /******************************************************************************
             *  Details html for the folder as they appear on Blackboard
             *
             *  @attribute details
             *  @type string
             *  @for KU.Student.BB.Folder
            ******************************************************************************/
            this.details = details;
            
            
            /******************************************************************************
             *  Gets the content tree for a folder
             * 
             *  @method getContentTree
             *  @param {function} successCallback - Called after the content tree has been
             *      downloaded. Function Header: <code>void successCallback(<span class="type">
             *      <a class="crosslink" href="../classes/KU.Student.BB.Tree.html">
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
        Item: function(name, details, fullBBId){


            /******************************************************************************
             *  The name of the content item as it appears on Blackboard
             *
             *  @attribute name
             *  @type string
             *  @for KU.Student.BB.Item
            ******************************************************************************/
            this.name = name;

            
            /******************************************************************************
             *  Details html for the item as they appear on Blackboard
             *
             *  @attribute details
             *  @type string
             *  @for KU.Student.BB.Item
            ******************************************************************************/
            this.details = details;
            
            
            /******************************************************************************
             *  The full blackboard id for the item usually CourseId-BBid-Content-id
             *
             *  @attribute fullBBId
             *  @type string
             *  @for KU.Student.BB.Item
            ******************************************************************************/
            this.fullBBId = fullBBId;
            
            
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
            ******************************************************************************/
            this.courseId = courseId;
            
            
            /******************************************************************************
             *  Term for the course. This is represented by the year and quarter (e.g 201501)
             *
             *  @attribute term
             *  @type string
             *  @for KU.Student.BB.Course
            ******************************************************************************/
            this.term = term;

            
            /******************************************************************************
             *  Crn for the course
             *
             *  @attribute crn
             *  @type string
             *  @for KU.Student.BB.Course
            ******************************************************************************/
            this.crn = crn;
            
            
            /******************************************************************************
             *  Section for the course
             *
             *  @attribute section
             *  @type string
             *  @for KU.Student.BB.Course
            ******************************************************************************/
            this.section = section;
            
            
            /******************************************************************************
             *  Title for the course
             *
             *  @attribute courseTitle
             *  @type string
             *  @for KU.Student.BB.Course
            ******************************************************************************/
            this.courseTitle = courseTitle;
            
            
            /******************************************************************************
             *  Days string for the course (e.g "MTR" for Monday Tuesday Thursday)
             *
             *  @attribute days
             *  @type string
             *  @for KU.Student.BB.Course
            ******************************************************************************/
            this.days = days;
            
            
            /******************************************************************************
             *  Meeting time for the course (e.g 3:35-5:40)
             *
             *  @attribute time
             *  @type string
             *  @for KU.Student.BB.Course
            ******************************************************************************/
            this.time = time;
            
            
            /******************************************************************************
             *  Blackboard course Id
             *
             *  @attribute bbId
             *  @type string
             *  @for KU.Student.BB.Course
            ******************************************************************************/
            this.bbId = bbId;
            
            
            /******************************************************************************
             *  Gets the content tree for a course containing a list of folders and files.
             * 
             *  @method getContentTree
             *  @param {function} successCallback - Called after the content tree has been
             *      downloaded. Function Header: <code>void successCallback(<span class="type">
             *      <a class="crosslink" href="../classes/KU.Student.BB.Tree.html">
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
            };
            
            
            /******************************************************************************
             *  Gets the entire class roster
             * 
             *  @method getRoster
             *  @param {function} successCallback - Called after the class roster has been
             *      downloaded. Function Header: <code>void successCallback(<span class="type">
             *      <a class="crosslink" href="../classes/KU.Student.BB.Contact.html">
             *      KU.Student.BB.Contact</a>[]</span> contacts)</code>;
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
                
                
                // Retrieve the roster for this course!
                KU.Student.BB.retrieveRoster(this.bbId, successCallback, failureCallback);
                
            };
            
            
            /******************************************************************************
             *  Downloads the current grades for a course
             * 
             *  @method getGrades
             *  @param {function} successCallback - Called after the course grades has been
             *      downloaded. Function Header: <code>void successCallback(<span class="type">
             *      <a class="crosslink" href="../classes/KU.Student.BB.Grade.html">
             *      KU.Student.BB.Grade</a>[]</span> grades)</code>;
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
                
                // Retrieve the grades for this course!
                KU.Student.BB.retrieveGrades(this.bbId, successCallback, failureCallback);
            }
            
            
            return this;
        },
        
        
        /******************************************************************************
         *  Downloads the current grades for a specified blackboard course
         * 
         *  @method retrieveGrades
         *  @param {string} bbId - blackboard course identifier
         *  @param {function} successCallback - Called after the course grades has been
         *      downloaded. Function Header: <code>void successCallback(<span class="type">
         *      <a class="crosslink" href="../classes/KU.Student.BB.Grade.html">
         *      KU.Student.BB.Grade</a>[]</span> grades)</code>;
         *  @param {function} failureCallback - Called if the course grades failed to
         *      download. Function Header: void <code>failureCallback(String errMsg)</code>;
         *  @for KU.Student.BB
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
         *      KU.Student.BB.retrieveGrades("bbId", success, failure);
         *****************************************************************************/
        retrieveGrades: function(bbId, successCallback, failureCallback){
            
            // Make url for Blackboard grades
            var url = "https://kettering.blackboard.com/webapps/bb-mygrades-BBLEARN/"
                + "myGrades?course_id=" + bbId + "&stream_name=mygrades";
            
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
                        
                        var title, grade, pointsPossible, dueDate, postedDate, status, additionalInfo;
                        
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
                        additionalInfo = "";
                        
                        $(".eval-links input.genericButton", this).each(function(linkIndex){
                            
                            // Get onclick and pattern
                            var onclick = $(this).attr("onclick");
                            var pattern = /mygrades\.showInLightBox.*div.*<p>(.*)<\/p>.*/
                            
                            // Match for blackboard popup?
                            if(pattern.test(onclick)){
                                
                                // Get extra info and separate by new lines as needed
                                if(additionalInfo != "") additionalInfo += "\n";
                                additionalInfo += pattern.exec(onclick)[1];
                            }
                            
                        });
                        
                        // Make grade
                        grades[grades.length] = new Student.BB.Grade(
                            title, 
                            grade, 
                            pointsPossible, 
                            dueDate, 
                            postedDate, 
                            status, 
                            additionalInfo
                        );
                        
                    });
                    
                    // Call back
                    successCallback(grades);
                    
                },
                
                error: function(xhr, status, errorThrown){
                    
                    // Failed
                    failureCallback(errorThrown);
                }
            });
            
        },
        
        
        /******************************************************************************
         *  Retrieves the entire class roster for a given course
         * 
         *  @method retrieveRoster
         *  @param {function} successCallback - Called after the class roster has been
         *      downloaded. Function Header: <code>void successCallback(<span class="type">
         *      <a class="crosslink" href="../classes/KU.Student.BB.Contact.html">
         *      KU.Student.BB.Contact</a>[]</span> contacts)</code>;
         *  @param {function} failureCallback - Called if the class roster was failed to
         *      download. Function Header: void <code>failureCallback(String errMsg)</code>;
         *  @for KU.Student.BB
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
         *      KU.Student.BB.retrieveRoster("bbId", success, failure);
         *****************************************************************************/     
        retrieveRoster: function(bbId, successCallback, failureCallback){
            
            
            // Make url for Blackboard grades
            var url = "https://kettering.blackboard.com/webapps/blackboard/execute/searchRoster"
                + "?showAll=true&action=sort&userInfoSearchOperatorString=Contains"
                + "&courseId=" + bbId + "&sortCol=column1&sortDir=ASCENDING"
                + "&course_id=" + bbId + "&userInfoSearchKeyString=FIRSTNAME&startIndex=0";
            
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
                        var info = $("th, td", this);
                        var first, last, email;
                        
                        // Valid?
                        if(info.size() == 3){
                        
                            last  = info.eq(0).find("span:first").text().trim();
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
            
            
        },
        
        
        /******************************************************************************
         *  Gets the content tree for a course containing a list of folders and files
         *  based on a specified bbId and contentId. This is meant to be a generic function
         *  used by KU.Student.BB.Course and KU.Student.BB.Folder.
         * 
         *  @method retrieveContentTree
         *  @param {string} bbId - blackboard course identifier
         *  @param {string} contentId - blackboard folder identifier
         *  @param {function} successCallback - Called after the content tree has been
         *      downloaded. Function Header: <code>void successCallback(<span class="type">
         *      <a class="crosslink" href="../classes/KU.Student.BB.Tree.html">
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
         *      KU.Student.BB.getContentTree("bbId", "contentId", success, failure);
         *****************************************************************************/
        retrieveContentTree: function(bbId, contentId, successCallback, failureCallback){
            
            
            // Properties
            var url, usesJson;
            var id = contentId;
            
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
                        var json, root;
                        
                        // Try to parse
                        try { json = JSON.parse(data); }
                        catch(exception){
                            
                            // Make tree from folders and items
                            tree = new Student.BB.Tree(bbId, id, folders, items);
                            
                            successCallback(tree);
                            return;
                        }
                        
                        
                        // Valid tree?
                        if(json.children.length > 0){
                             
                            // First element is simply 1x1 root!
                            // so take the second set of children
                            root = json.children[0].children;
                            
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
                        var textBookPattern = /.*textbookLogo.*/;
                        var contentIdPattern = /contentListItem:(_\d\d+_\d+)/;
                        
                        // Get full course id
                        // usually courseid-bbid-content-id
                        var fullBBId = $(".courseId", doc).text();
                        
                        doc.find("#content_listContainer > li").each(function(i){
                           
                           
                            // Valid ?
                            if (contentIdPattern.test($(this).attr("id"))){
                                
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
                                else if ((itemPattern.test(src) || textBookPattern.test(src))){
                                    
                                    items[items.length] = new Student.BB.Item(name, details, fullBBId);
                                }
                                
                                // No image? Assume it is normal..
                                else if ($("> img", this).size() == 0){
                                    items[items.length] = new Student.BB.Item(name, details, fullBBId);
                                }
                                
                            }
                            
                        });
                        
                    }
                    
                    // Make tree from folders and items
                    tree = new Student.BB.Tree(bbId, id, folders, items);
                    
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
         *  Logs any user out of blackboard
         * 
         *  @method logout
         *  @param {function} successCallback - Called after successful log out of blackboard. 
         *      Function Header: <code>void successCallback()</code>;
         *  @param {function} failureCallback - Called after a failure at logging out of
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
         *      // Logout !
         *      KU.Student.BB.logout(success, failure);
         *****************************************************************************/
        logout: function(successCallback, failureCallback){
            
            
            // Compile url
            var url = "https://kettering.blackboard.com/webapps/login?action=logout";
            
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'html',
                success: function(data) {
                
                    // Load downloaded document
                    var doc = $("<div>").html(data);
                    
                    // Check to see if it worked
                    if(!Student.BB.isLoggedIn(doc)){
                        
                        // Success
                        successCallback();

                        
                    }
                    else{
                        
                        // Failed
                        failureCallback("Does not appear to have logged out!");
                        
                    }
                    
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
            var url = "https://kettering.blackboard.com/webapps/login/";
            
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'html',
                data:{
                    "user_id": user,
                    "password": pass,
                    "login": "Login",
                    "action": "login",
                    "new_loc":""
                },
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
         *      Function Header: <code>void successCallback(boolean loggedIn, String user)</code>;
         *  @param {function} failureCallback - Called if the check failed to execute
         *      Function Header: void <code>failureCallback(String errMsg)</code>;
         *  @for KU.Student.BB
         *  @return {void}
         *  @example  
         *      var success = function(loggedIn, user){
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
            
            // Basic url for blackboard user info
            var url = "https://kettering.blackboard.com/webapps/blackboard/execute/"
                + "editUser?context=self_modify";
            
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'html',
                success: function(data) {
                
                    // Load downloaded document
                    var doc = $("<div>").html(data);
                    
                    // Make sure logged in firstly
                    if(Student.BB.isLoggedIn(doc)){
                        
                        // Send user account name as well
                        successCallback(true, $("#userName",doc).attr("value"));
                    }
                    
                    else{
                        
                        // Check to see if it worked
                        successCallback(false, "");
                    }
                    
                    
                    
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
         *      <a class="crosslink" href="../classes/KU.Student.BB.Course.html">
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
                       
                        // Pattern to match a BB graduate course (does not have time/days in BB)
                        // e.g MECH-545-201501-262252: MECH-545: Hybrid Elec.Vehicle Propulsion - WINTER
                        //  1  course id
                        //  2  CRN
                        //  3  term
                        //  4  course title
                        var graduatePattern = /([a-zA-Z]+-\d\d\d)-(\d\d\d\d\d\d)-(\d\d\d\d+):\s[a-zA-Z]+-\d\d\d:\s(.+)\s-\s[a-zA-Z]+/;
                       
                        // Regular course
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
                           
                            // Add new course
                            courses[courses.length] = new Student.BB.Course(
                                courseId, term, 
                                crn, section, 
                                courseTitle, days, 
                                time, bbId
                            );
                        }
                        
                        // Graduate course
                        else if( graduatePattern.test(fullTitle) && bbIdPattern.test(courseUrl) ){
                            
                            // Blackboard course id
                            var bbId = bbIdPattern.exec(courseUrl)[1];
                            
                            // Course items
                            var courseResult, courseId, term, crn, section, courseTitle, days, time;
                            courseResult = graduatePattern.exec(fullTitle);
                            courseId = courseResult[1];
                            term = courseResult[2];
                            crn = courseResult[3];
                            courseTitle = courseResult[4];
                            section = "TBD"
                            days = "TBD";
                            time = "TBD";
                            
                            // Make course
                            var bbCourse = new Student.BB.Course(
                                courseId, term, 
                                crn, section, 
                                courseTitle, days, 
                                time, bbId
                            );
                            
                            // Add course
                            if(courseId != "COOP") courses[courses.length] = bbCourse;
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