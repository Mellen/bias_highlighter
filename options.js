(() =>
 {
     var btn = document.getElementById('btnSave')
     btn.addEventListener('click', function(e)
			  {
			      var badwords_control = document.getElementById('txtBadWords')
			      var badwords = badwords_control.value.split('\n')
			      chrome.storage.sync.set({ badwords: badwords }, function()
						      {
							  var status = document.getElementById('status')
							  status.textContent = 'Options saved.'
							  setTimeout(function() { status.textContent = '' }, 750)
						      })
			  })

     
     chrome.storage.sync.get('badwords', function(items)
			     {
				 var badwords_control = document.getElementById('txtBadWords')
				 var text = '';
				 for(var i = 0; i < items.badwords.length; i++)
				 {
				     text += items.badwords[i] + '\n';
				 }
				 badwords_control.value = text;
			     })
     

 })()
