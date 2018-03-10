# BrowserDomTracing
This Javascript plugin is using for capture user events in browser which you can use those data for UI/UX Desgin, Business Strategy, Big Data Statistic.

  
### Limitation

  - Needs Jquery ( > 1.1 )to support
  Jquery: http://api.jquery.com/
- Less Events to Support

| Support |
| -------- |
| click |
| change |
| mouseenter |
| mouseleave |
| dblclick |
| pause |
| play |
| copy |
| cut |
| paste |

 
### How to Use
You need to include Jquery and giving 2 parameters
- Disabeld Tags (which tags that you do not want to captures) 
- URL of Receiving Tracing Data

Before User leaving the webpage, it will send those captured data with JSON format to your server.

```html
<script type="text/javascript" src="./jquery-1.x.x.js"></script>
<script type="text/javascript" src="./BrowserDomTracing.js"></script>
<script>
$(document).ready(function(){
	getAllEvent.init(["div","tr","table","footer","ul","ol","li","nav","header"],"https://[Your URL]");
});
</script>
```

JSON Sample
```
{
	"PageStartTime": "2018-3-10 11:47:56",
	"PageEndTime": "2018-3-10 11:48:00",
	"CurrentURL": "URL",
	"AllEvents": [{
			"ObjTag": "IMG",
			"ObjDisabled": false,
			"ObjReadOnly": false,
			"ObjEvents": "mouseover",
			"ObjText": "",
			"ObjValue": "",
			"ObjURL": "URL/Image.jpg",
			"ObjContentHTML": "",
			"ObjFullHTML": "<img  src=\"URL\/Image.jpg\" >",
			"Time": "2018-3-10 11:47:57"
		},
		{
			"ObjTag": "A",
			"ObjDisabled": false,
			"ObjReadOnly": false,
			"ObjEvents": "mouseover",
			"ObjText": "",
			"ObjValue": "",
			"ObjURL": "URL/TESTING",
			"ObjContentHTML": "",
			"ObjFullHTML": "<a  href=\"URL\/TESTING\" >",
			"Time": "2018-3-10 11:47:58"
		},
		{
			"ObjTag": "H2",
			"ObjDisabled": false,
			"ObjReadOnly": false,
			"ObjEvents": "mouseover",
			"ObjText": "HI There",
			"ObjValue": "",
			"ObjURL": "",
			"ObjContentHTML": "",
			"ObjFullHTML": "",
			"Time": "2018-3-10 11:47:59"
		}

	]
}
```

###  Release :
- Version 1 - basic functions to caputure user events and send it back to server.