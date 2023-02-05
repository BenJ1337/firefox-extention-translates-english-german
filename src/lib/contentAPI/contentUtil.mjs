let getSelectedText = () => {
  let selection = window.getSelection();
  let x = selection.anchorOffset;
  let y = selection.focusOffset;
  let text = selection.focusNode.nodeValue;
  let selectedText = text.substring(x, y).trim();
  console.debug(`Text ermittelt: ${selectedText}`);
  return selectedText;
};

export { getSelectedText };
