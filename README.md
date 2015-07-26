
## KetteringJS 

KetteringJS is a library meant to give easy and structured access
to various information and functions through Javascript. 

 
#### Getting started

Download the latest library file generated in the bin directory. 
JQuery is the only dependency to use the library. Simply import
the file into your project and enjoy! 


#### Documentation

Please make sure to respect and use [yuidoc](http://yui.github.io/yuidoc/) 
comment block syntax when contributing to the project!

The documentation is available at [http://ketteringjs.info](http://ketteringjs.info).
To generate new documentation use the Build-Docs script, which is effectively the same
as running "yuidoc -c ./yui-theme/yuidoc.json js -C" relative to the root project folder 
(KetteringJS). 

 
#### Requirements
 
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

 
#### License

The project is licensed with [GPL-3.0](http://www.gnu.org/licenses/gpl-3.0.txt).

 
#### Contact
 
Garrick Brazil - garrick@garrickmail.net