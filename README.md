
___
 
## KetteringJS 

Version-0.0.2

KetteringJS is a library meant to give easy and structured access
to various information and functions through Javascript. 
 
___

### Getting started

Download the latest library file generated in the bin directory. 
JQuery is the only dependency to use the library. Simply import
the file into your project and enjoy! 

___

 
### Requirements
 
Using:
- jQuery

Building/Contributing:
- jQuery
- python
- yuidocjs
- minifier
 
Use the MAKE file to concatenate the source files and minify into the 
bin folder. Use the Build-Documentation-Website to build the docs folder. 
It is suggested to use yuidocjs version 0.3.0 to avoid an @example bug 
where multiple lines get indented. Note also had to hack a fix for a bug 
with using backslashes instead of forward. Changed line 188 in 
yuidocjs/lib/builder.js to something like the following. 
href = (path.join(base, 'classes', item + '.html')).replace(/\\/g,"/");
___
 
### Contact
 
Garrick Brazil - garrick@garrickmail.net