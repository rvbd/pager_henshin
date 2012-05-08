/* 
 * Author: Arvy <arvy@rvbd.net>
 * Version 1.0
 * 
 * Pager Henshin
 * <pager_henshin.js>
 * 
 * A JS class to simply slide contents elements to the left
 * This requires the correct css and structures to be implemented.
 * 
 * We transform the boring html into a parallax design!
 * 
 * Why this name? Fun facts:
 *    From Wikipedia, the free encyclopedia
 *    Henshin is the Japanese word for "transformation,"[1] literally meaning, 
 *     "to change or transform the body." 
 *    This word is primarily used in manga, anime, and tokusatsu dramas for 
 *    when a character transforms into a superhero.
 */

function Henshin() {
    this.x = 0;
    this.bg_x = 0;
    this.container_css_class = ""; //container class name so we can identify what we are trying to switch around
    this.background_css_class = false; //the css background that we want to move, this is so that we can do the parallax effect
    this.max_page_count = 0;
	this.page_count = 1;
	this.container_width = 0;
	this.background_positions = new Array();
	this.background_layers_positions = new Array();
}

/**
 * Returns the current page number
 */
Henshin.prototype.get_current_page_number = function() {
	return this.page_count;
}

/**
 * Sets the container css class name
 * this is the container that is to be shifted around most likely
 * the divs followed by other divs acting as pages
 */
Henshin.prototype.set_container_css_class = function(container_css_class_name) {
    this.container_css_class = container_css_class_name;
}

/**
 * Sets the classname of the div that holds the background
 * this is needed to do parallax effects. If not set then the animate function
 * would simply ignore the background animation
 */
Henshin.prototype.set_background_css_class = function(background_css_class_name) {
    this.background_css_class = background_css_class_name;
}

/**
 * Sets the number of pages that this site will ever have
 * This is important to make sure the object does not try to scroll divs ouside the viewport
 * @int max_page_number
 */
Henshin.prototype.set_max_page = function(max_page_number) {
	this.max_page_count = max_page_number;
}

/**
 * Sets the width of the content container
 * Essentially this is one page width and it affects the scrolling distance.
 * See the sample code provided for more understanding
 * @int container_width_px
 */
Henshin.prototype.set_container_width = function(container_width_px) {
	this.container_width = container_width_px;
}

/**
 * Jump directly to a page, future implementation
 * @int page_number
 */
Henshin.prototype.change_page = function(page_number) {


}

/**
 * Animate
 * This moves the containers based on the set distance
 * Do not call this function directly, this is an internal function used by next and prev
 */
Henshin.prototype.animate = function() {
	//the background stuff
    var self = this; //make sure we preserve this current object pointer, 'this' is now the jquery element not the object itself
    
	//animate the first container, and let the next container follows with the same position of the first element
	$("." + this.container_css_class + ":first").animate({
		left: this.x
    }, {
		duration: 1000,
		step: function( now, fx ) {
			$("." + self.container_css_class + ":gt(0)").css( "left", now );

		}
    });

	/**
	 * OK only animate the background if this is indeed set
	 */
	if (this.background_css_class) {
		$( "." + this.background_css_class ).animate({
			left: this.bg_x
		}, {
			duration: 1800,
			step: function( now, fx ){
				//nothing yet
			}
		});
	}
    
}

/**
 * Slides the page container to the next page, along with triggering background animation if it's set
 */
Henshin.prototype.next = function() {
	if (this.page_count == this.max_page_count) {
		return false;
	} else {
		this.page_count = this.page_count + 1; 
	
		this.x = this.x - this.container_width; //move it to left essentially flipping the page
		this.bg_x = this.bg_x - 100;

		this.animate();
		return true;
	}	
}

/**
 * Slides the page container to the previous page if it exists, along with triggering background animation if it's set
 */
Henshin.prototype.prev = function() {
	if (this.page_count == 1) {
		return false;
	} else {
		this.page_count = this.page_count - 1;
	
		this.x = this.x + this.container_width;
		this.bg_x = this.bg_x + 100;

		this.animate();
		return true;
	}
	
}

/**
 * Little extra to allow object being moved back and forth a bit
 * In a sense it wobbles an element left to right
 * @string object_id - if of the object to breeze
 * @int distance - how far are we breezing
 * @int speed - how fast are we breezing
 * @direction - which way are we pushing it to
 */
Henshin.prototype.breeze = function(object_id, distance, speed, direction) {
	//get the current left position
	var current_left = distance;
	
	if (direction == 'left') {
		current_left = 0 - distance;
	}
	
	var current_speed = speed;
	$("#" + object_id).animate({
		marginLeft: current_left
    }, {
		duration: current_speed,
		complete: function() {
			$("#" + object_id).animate({
				marginLeft: 0
			}, {
				duration: current_speed
			});
		}
    });
}

/**
 * 
 * This will be used to move multiple backgrounds in one hit
 * Useful for moving horizontal sprites around use with move_background
 * 
 * @string object_id
 * @int distance - how many pixels we aer moving the background image of this object
 * @int speed - how fast will this object move - this is jquery animate speed values
 */
Henshin.prototype.add_background_position = function(object_id, distance) {
	this.background_positions[object_id] = new Array();
	this.background_positions[object_id]["distance"] = distance;
	this.background_positions[object_id]["current_position_x"] = 0;
}

/**
 * Using the set backgrounds from add_background_position we should be able to move
 * the background of ccrtain div
 * 
 * This is really for changing sprite positions, we cannot animate background for now
 */
Henshin.prototype.move_background = function(object_id, direction) {
	var target_distance = this.background_positions[object_id]["distance"];
	
	if (direction == 'right') {
		this.background_positions[object_id]["current_position_x"] = parseInt(this.background_positions[object_id]["current_position_x"]) - parseInt(target_distance);
	} else {
		this.background_positions[object_id]["current_position_x"] = parseInt(this.background_positions[object_id]["current_position_x"]) + parseInt(target_distance);
	}
	
	
	var target_background_position = this.background_positions[object_id]["current_position_x"] + "px " + 0 + "px";
	
	$("#" + object_id).css('backgroundPosition', target_background_position);

}

/**
 * Untested function basically takes in the object id of additional background div layer!
 * in addition to the main background css 
 * This will be used to scroll multiple backgrounds with different velocities in
 * one hit
 * 
 * @string object_id
 * @int distance - how many pixels we aer moving the background image of this object
 * @int speed - how fast will this object move - this is jquery animate speed values
 */
Henshin.prototype.add_background_layer_position = function(object_id, distance, speed) {
	this.background_layers_positions[object_id] = new Array();
	this.background_layers_positions[object_id]["distance"] = distance;
	this.background_layers_positions[object_id]["speed"] = speed;
	this.background_layers_positions[object_id]["current_position_x"] = 0; //always start at 0
}

/**
 * Using the set backgrounds from add_background_position we should be able to move
 * the background of ccrtain div
 * 
 * This is really for changing sprite positions, we cannot animate background for now
 */
Henshin.prototype.animate_background_layer = function(object_id, direction) {
	var target_distance = this.background_layers_positions[object_id]["distance"];
	var target_speed = parseInt(this.background_layers_positions[object_id]["speed"]);
	
	if (direction == 'right') {
		this.background_layers_positions[object_id]["current_position_x"] = parseInt(this.background_layers_positions[object_id]["current_position_x"]) - parseInt(target_distance);
	} else {
		this.background_layers_positions[object_id]["current_position_x"] = parseInt(this.background_layers_positions[object_id]["current_position_x"]) + parseInt(target_distance);
	}
	
	
	var target_background_position = parseInt(this.background_layers_positions[object_id]["current_position_x"]);
	
	$( "#" + object_id ).animate({
		left: target_background_position
	}, {
		duration: target_speed
	});
}