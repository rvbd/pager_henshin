# Pager Henshin Library #

Pager henshin is a utility for building a site with scrolling div elements with parallax background plus (possibly) infinite numbers of parallax div components. The limit is your imagination.

Originally created for my wedding website, I have decided to open source this library. 

## Features ##
- Slides infinite amount of div "pages" elements
- Set background div to scroll for parallax effects
- Sets infinite amount of additional divs for parallax animations with settable duration and distance
- Ability to "breeze" elements (wobbling an element left and right) with set duration and distance
- Ability to change the position of a background-image within a div, very useful for sprite based states
- The included html sample should work in majority of browsers, however it is very crudely coded, one does not simply use the sample codes for production!

## Requirements
- jQUery 1.7.2 - minimized version included with the sample code
- Knowledge of CSS positioning, layering and the rest of the essential stuff

## FAQ ##
- I can't move my background no matter what I try! 
 - Look at the sample source, the background technique that we use here is absolute positioned div
- Can I load the div contents using AJAX?
 - In theory yes, but this is yet to be implemented directly within the library
- What's with the name?
 - From Wikipedia, the free encyclopedia: Henshin is the Japanese word for "transformation,"[1] literally meaning, "to change or transform the body."  This word is primarily used in manga, anime, and tokusatsu dramas for 
when a character transforms into a superhero. 
 - Since this library enables a whole page to literally transform from one page to another, I gave it this name. Plus those types of shows were my favourite childhood shows.