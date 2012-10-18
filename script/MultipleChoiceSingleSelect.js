function buildMultipleChoiceSingleSelect(evalObject)
{

    if ($("#mainContent")) {
       // alert(evalObject.titleText);

        $("#mainContent").html("");
        var load = $('<div id="contentWindow"></div>');
        // load.css("bacground", $("source").css("border"));

        var titleTextDiv = $('<div id="titlecontent"><h1>' + evalObject.titleText + '</h1></div>');
        var questionTextDiv = $('<div id="contentcontainer"><div id="quiz"><h2>' + evalObject.questionText + '</h2></div></div>');
        titleTextDiv.appendTo(load);
        questionTextDiv.appendTo(load);

       // var form = $('<form action=\"javascript:function(){return false;}\" method="post"></form>');
        var form = $('<form action=\"javascript:void(0)\;\" method="post"></form>');
        // href=\"javascript:void(0)\;\"
        
        var choicesContainer = $('<div id="quizchoices"></div>');



        for (var i = 0; i < evalObject.choices.length; i++) {

            var choiceDiv = $('<div id="choiceContainer' + i + '" class="choiceContainer"></div>');
            var feedBackIconDiv = $('<div id="feedbackIcon' + i + '" class="icon"></div>');
            feedBackIconDiv.appendTo(choiceDiv);
            var label = $('<label for="c' + i.toString() + '">' + evalObject.choices[i].text + '</label>');
            label.appendTo(choiceDiv);
            var radioButton = $('<input type="radio"/>');
            radioButton.prependTo(label);
            radioButton.attr("name", "choices");
            radioButton.attr("value", evalObject.choices[i].valueID);
            radioButton.attr("id", "c"+i.toString());
            choiceDiv.appendTo(choicesContainer);
        }



        choicesContainer.appendTo(form);

        var submitBtn = $('<input type="submit"/>');
        submitBtn.attr("value", "Submit");
         submitBtn.appendTo(form);
         submitBtn.click(function (e){

             userSelection = $('[name=choices]:checked');

             if (!userSelection.is(':checked')) {
                 var para = $('<p>');
                 para.text("You must make a selection in order to continue!");
                 feedback.html("");
                 para.appendTo(feedback);
             }
             else {
                 $('[name=choices][value=v1]').parent().prev().addClass('correct').removeClass('icon');
                 $('[name=choices][value=v2]').parent().prev().addClass('incorrect').removeClass('icon');

                 for (var j = 0; j < evalObject.feedback.length; j++) {
                     if (evalObject.feedback[j].valueID == userSelection.val()) {
                         var h = $('<h2>');
                         //if(condition) return someVariable ? doThis : elseDoThis;
                         //alert(userSelection.is('[value=v1]'));
                         userSelection.is('[value=v1]') ? h.text("Correct!") : h.text("Incorrect!");
                        
                         //alert(h.html());
                         var para = $('<p>');
                         evalObject.feedback[j].text.replace(/^[\r\n\t ]+|[\r\n\t ]+$/g, '')
                         evalObject.feedback[j].text.replace(/[ \t]+/g, ' ')
                         evalObject.feedback[j].text.replace(/ ?([\r\n]) ?/g, '$1')
                         para.text(evalObject.feedback[j].text);
                         feedback.html("");
                         h.appendTo(feedback);
                         para.appendTo(feedback);

                     }
                 }
             }
             feedback.show();
             feedback.focus();
         });
        form.appendTo(questionTextDiv);

         var feedback = $('<div id="feedback" tabindex="1"></div>');
         feedback.appendTo(form);
         feedback.hide();
        
       
        load.appendTo("#mainContent");
    }

    
   
               setTimeout(function ()
               {
                   $("#loadAnimation").remove();
               }, 500);
          
}
