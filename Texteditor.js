(function () {
  var addMarkdown, buttonFunctions, buttonTypes, generatePenEmbed, matchString;

  buttonTypes = {
    addCode: "Enter code here",
    addInlineCode: "Enter inline code here",
    addStrong: "Strong text",
    addEmphasis: "Emphasized text",
    addLink: "https://www.codehive.io" };


  buttonFunctions = {
    addCode: `\`\`\`\n${buttonTypes.addCode}\n\`\`\`\n\n`,
    addInlineCode: `\`${buttonTypes.addInlineCode}\` `,
    addStrong: `**${buttonTypes.addStrong}** `,
    addEmphasis: `*${buttonTypes.addEmphasis}* `,
    addLink: `[Link title](${buttonTypes.addLink}) ` };


  matchString = function (target, textAreaElement, limit) {
    var highlight, textArea;
    textArea = document.getElementById(textAreaElement.attr('id'));
    highlight = textArea.value.lastIndexOf(target, limit);
    if (highlight >= 0) {
      textArea.focus();
      textArea.selectionStart = highlight;
      return textArea.selectionEnd = highlight + target.length;
    }
  };

  generatePenEmbed = function (link) {
    var embed, name, nameBeg, nameEnd, pen, penBeg, penEnd;
    nameBeg = /.*codepen.io\//;
    nameEnd = /\/pen.*/;
    penBeg = /.*\/pen\//;
    penEnd = /\//;
    name = link.replace(nameBeg, "");
    name = name.replace(nameEnd, "");
    pen = link.replace(penBeg, "");
    pen = pen.replace(penEnd, "");
    embed = `<p data-height='350' data-theme-id='0' data-slug-hash='${pen}' data-default-tab='result' data-user='${name}' class='codepen'>See the <a href='https://codepen.io/${name}/pen/${pen}/'>Pen</a> by <a href='https://codepen.io/${name}'>@${name}</a> on <a href='https://codepen.io'>CodePen</a>.</p>`;
    return embed;
  };

  addMarkdown = function (buttonType, textArea) {
    var caretPosition, penLink, text;
    text = textArea.val();
    caretPosition = document.getElementById(textArea.attr('id')).selectionStart;
    if (buttonType === "embedCodePen") {
      penLink = prompt("Link to Pen");
      //TODO: Add some validation for CodePen link
      if (penLink) {
        generatePenEmbed(penLink);
        textArea.val(text.substring(0, caretPosition) + generatePenEmbed(penLink) + text.substring(caretPosition, text.length - 1));
      }
    }
    if (buttonType in buttonTypes) {
      textArea.val(text.substring(0, caretPosition) + buttonFunctions[buttonType] + text.substring(caretPosition, text.length - 1));
      return matchString(buttonTypes[buttonType], textArea, caretPosition + buttonTypes[buttonType].length - 1);
    }
  };

  $('.form-controls .button').on('click', function () {
    var buttonType, textArea;
    buttonType = $(this).data('button-type');
    textArea = $(this).parent().parent().find('textarea');
    return addMarkdown(buttonType, textArea);
  });

}).call(this);


//# sourceURL=coffeescript