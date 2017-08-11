(function()
 {

     var textboxes = []
     var t1 = document.body.querySelectorAll('[contenteditable="true"]')
     var t2 = document.body.querySelectorAll('[type="text"]')
     var t3 = document.getElementsByTagName('textarea')

     t1.forEach(i => textboxes.push(i))
     t2.forEach(i => textboxes.push(i))
     for(let i = 0; i < t3.length; i++) { textboxes.push(t3[i]) }
     
     textboxes.forEach(tb => tb.addEventListener('keyup', function(e)
						 {
						     var text = this.value

						     if(text === undefined)
						     {
							 text = this.innerText
						     }

						     console.log(text)
						 }))
		      
 })();
