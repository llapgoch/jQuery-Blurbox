;(function($){
	var BlurBox = function(el, sett){
		var $element = $(el);
		var defaults = {
			'width': 30,
			'color': '#000',
			'opacity': 0.5,
			'blur': 10,
			'background': '' 
		}
		
		var els = {};
		var ints = {};
		var settings = $.extend({}, defaults, sett);
		
		
		this.init = function(){
			var self = this;
			
			this.remove();
			
			els.top 	= $('<div class="bbox bbox-t"></div>');
			els.left 	= $('<div class="bbox bbox-l"></div>');
			els.right 	= $('<div class="bbox bbox-r"></div>');
			els.bottom 	= $('<div class="bbox bbox-b"></div>');
			
			els.top.css({
				'height':settings.width,
				'left':settings.width,
				'top':0
			});
			
			els.left.css({
				'width': settings.width,
				'left':0,
				'top': 0
			});
			
			els.right.css({
				'width': settings.width,
				'right': 0,
				'top': 0
			});
			
			els.bottom.css({
				'height': settings.width,
				'bottom': 0,
				'left': settings.width
			});
			
			$element.append(els.top)
					.append(els.left)
					.append(els.bottom)
					.append(els.right);
			
			
			
			if(settings.background){
				$.each(els, function(){
					this.css('background', 'url(' + settings.background + ')');
				});
			}
			
			
			this.updateSize();
			
			$(window).on('resize', function(){
				if(ints.resize){
					window.clearTimeout(ints.resize);
					ints.resize = null;
				}
				
				ints.resize = window.setTimeout(function(){
					self.updateSize();
				}, 1);
			});
		}
		
		this.updateBackground = function(background){
			settings.background = background;

			$.each(els, function(){
				this.css('background', 'url(' + settings.background + ')');
			});
			
			this.updateSize();
		}
		
		this.updateSize = function(){
			if(!els.top){
				return;
			}
			
			var containerWidth = $element.width() - (settings.width * 2);
			var containerHeight = $element.height(); 
			
			els.top.css('width', containerWidth);
			els.bottom.css('width', containerWidth);
			els.left.css('height', containerHeight);
			els.right.css('height', containerHeight);
			
			if(settings.background){
				els.top.css('background-position', -settings.width + 'px 0');
				els.bottom.css('background-position', -settings.width + 'px -' + (($element.height() - settings.width) + 'px'));
				els.right.css('background-position', -($element.width() - settings.width) + 'px 0');
			}
			
			var $inner = $element.find('.inner-border');

			if($inner){
				$inner.css({
					'width': containerWidth,
					'height': containerHeight - (settings.width * 2),
					'top': settings.width,
					'left': settings.width
				});
			}
		}
		
		this.remove = function(){
			jQuery.each(els, function(i, item){
				item.remove();
			});
			
			els = {};
		}
	}

    $.fn.blurbox = function(settings){
		return this.each(function(){
			var element = $(this);
      
			// Return early if this element already has a plugin instance
			if (element.data('blurbox')) return;

			var myplugin = new BlurBox(this, settings);

			// Store plugin object in this element's data
			element.data('blurbox', myplugin);
			
			myplugin.init();
		});
	};	
}(jQuery));