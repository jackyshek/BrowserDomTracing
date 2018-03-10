/*
* Version: 1
* Author: Jacky Shek Pak Man
* StackOverflow: https://stackoverflow.com/users/2352577/jacky-shek
* GitHub: https://github.com/jackyshek/BrowserDomTracing
*
* Limitation: This Javascript Library needs JQuery to support. 
* Description: 
* You can get this library to capture UI events for Big Data Statistic.
* If you have any questions so please leave a message to GitHub. I will answer you as soon as possible.
*
*
MIT License

Copyright (c) 2018 jackyshek

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*
*/

var BrowserDomTracing = {
	
	PageStartTime:"",
	PageEndTime:"",
	CurrentURL:"",
	htmlObj:{
		ObjName:"",
		ObjTag:"",
		ObjID:"",
		ObjDisabled:"",
		ObjReadOnly:"",
		ObjEvents:"",
		ObjText:"",
		ObjValue:"",
		ObjType:"",
		ObjURL:"",
		ObjContentHTML:"",
		ObjFullHTML:"",
		Time:""
	},
	objTraceLog:[],
	init:function(disabledTags,sendTo){
	
	
		var getAllEventObj = this;
		getAllEventObj.PageStartTime = this.getNowDateTime();
		getAllEventObj.CurrentURL = window.location.href ;
		
		$("body").on("click change mouseenter mouseleave dblclick pause play copy cut paste","*",function(){
			if(!getAllEventObj.arrayContains($(this).prop("tagName"),disabledTags ))
			{
				var newDomEvent = Object.assign({}, getAllEventObj.htmlObj);
				newDomEvent.ObjName = $(this).attr("name");
				newDomEvent.ObjTag = $(this).prop("tagName");
				newDomEvent.ObjID = $(this).attr("id");
				newDomEvent.ObjDisabled = $(this).is(":disabled");
				newDomEvent.ObjReadOnly = $(this).is("[readonly]");
				newDomEvent.ObjEvents = event.type;
				newDomEvent.ObjText = $(this).text();
				console.log($(this).val());
				var objValue = "";
				if(typeof $(this).val()!="undefined")
				{
					if(isNaN($(this).val()))
					{
						objValue = (getAllEventObj.IsHKID($(this).val()))?"":$(this).val();
					}
					else
					{
						objValue = $(this).val();
					}
				}
				
				newDomEvent.ObjValue = objValue;
				newDomEvent.ObjType = $(this).attr("type");
				newDomEvent.ObjURL = (typeof $(this).attr("href") != "undefined")?$(this).attr("href"):$(this).attr("src");
				newDomEvent.ObjContentHTML = $(this).html();
				newDomEvent.ObjFullHTML = $(this)[0].outerHTML;
				newDomEvent.Time = getAllEventObj.getNowDateTime()
			
				getAllEventObj.objTraceLog.push(newDomEvent);
				
			}
		});
		$( window ).on("beforeunload",function() {
			var returnObjToServer = {
				PageStartTime:getAllEventObj.PageStartTime,
				PageEndTime:getAllEventObj.getNowDateTime(),
				CurrentURL:getAllEventObj.CurrentURL,
				AllEvents:getAllEventObj.objTraceLog
			}
			
			$.ajax({
    			url: sendTo,
    			type: "POST",
    			data: JSON.stringify(returnObjToServer),
    			contentType: "application/json",
    			complete: function(){
    			}
			});
			
  			
		});
	},
	getNowDateTime:function(){
		var currentDateTime = new Date(); 

		return	currentDateTime.getFullYear()
			+"-"+(currentDateTime.getMonth()+1)
			+"-"+currentDateTime.getDate()
			+" "+ currentDateTime.getHours() + ":"  
			+ currentDateTime.getMinutes() + ":" 
			+ currentDateTime.getSeconds();
	},
	IsHKID:function(str){
		var strValidChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    	// basic check length
    	if (str.length < 8)
        	return false;
  
    	// handling bracket
    	if (str.charAt(str.length-3) == '(' && str.charAt(str.length-1) == ')')
        	str = str.substring(0, str.length - 3) + str.charAt(str.length -2);

    	// convert to upper case
    	str = str.toUpperCase();

    	// regular expression to check pattern and split
    	var hkidPat = /^([A-Z]{1,2})([0-9]{6})([A0-9])$/;
    	var matchArray = str.match(hkidPat);

    	// not match, return false
    	if (matchArray == null)
        	return false;

    	// the character part, numeric part and check digit part
    	var charPart = matchArray[1];
    	var numPart = matchArray[2];
    	var checkDigit = matchArray[3];

    	// calculate the checksum for character part
    	var checkSum = 0;
    	if (charPart.length == 2) {
        	checkSum += 9 * (10 + strValidChars.indexOf(charPart.charAt(0)));
        	checkSum += 8 * (10 + strValidChars.indexOf(charPart.charAt(1)));
    	} else {
        	checkSum += 9 * 36;
        	checkSum += 8 * (10 + strValidChars.indexOf(charPart));
    	}

    	// calculate the checksum for numeric part
    	for (var i = 0, j = 7; i < numPart.length; i++, j--)
        	checkSum += j * numPart.charAt(i);

    	// verify the check digit
    	var remaining = checkSum % 11;
    	var verify = remaining == 0 ? 0 : 11 - remaining;

    	return verify == checkDigit || (verify == 10 && checkDigit == 'A');
	},
	arrayContains: function (str, arraylist)
	{
    	return (arraylist.indexOf(str.toLowerCase()) > -1);
	}
};