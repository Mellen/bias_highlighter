(function()
 {
     var textboxes = document.body.querySelectorAll('[contenteditable="true"], [type="text"], textarea')

     var bad_words = []

     chrome.storage.sync.get('badwords', function(items){ bad_words = items.badwords })

     chrome.storage.onChanged.addListener(function(changes, areaName)
					 {
					     if(areaName === 'sync')
					     {
						 var badwords = changes['badwords'].newValue
						 if(badwords !== undefined)
						 {
						     bad_words = badwords
						 }
					     }
					 });
     
     textboxes.forEach(tb => tb.addEventListener('keyup', function(e)
						 {
						     var tooltip = document.getElementById(this.id+'word_tip')

						     if(tooltip === null)
						     {
							 tooltip = document.createElement('p')
							 tooltip.id = this.id+'word_tip'
							 tooltip.style = 'display: none;'
							 document.body.appendChild(tooltip)
						     }
						     
						     var text = this.value

						     if(text === undefined)
						     {
							 text = this.innerText
						     }
						     
						     var message = ''

						     bad_words.forEach(function(word)
								       {
									   var r = new RegExp('(^|\\W)('+word+')(\\W|$)', 'gim')
									   
									   if(text.match(r) != null)
									   {
									       message += '"' + word + '" '
									   }
								       });

						     if(message !== '')
						     {
							 tooltip.innerHTML = message.trim()
							 var br = this.getBoundingClientRect()
							 tooltip.style = 'display:block;position:absolute;background-color:black;color:white;'
							 tooltip.style.left = br.left + 'px'
							 tooltip.style.top = (br.top - tooltip.clientHeight) + 'px'
						     }
						     else
						     {
							 tooltip.style = 'display: none;';
						     }
						 }))
		      
 })();
