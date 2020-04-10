var encode = document.getElementById("encode");
var decode = document.getElementById("decode");
var input = document.getElementById("input");
var output = document.getElementById("output");
var clearstyles = document.getElementById("clearstyles");

encode.addEventListener("click", function() {
  output.value = encodeString(input.value);
  output.focus();
  output.select();
});

decode.addEventListener("click", function() {
  output.value = decodeString(input.value);
  output.focus();
  output.select();
});

clearstyles.addEventListener("click", function() {
  input.value = '';
  output.value = '';
  input.focus();
});

function encodeString(string) {
  return string
    .replace(/&?&/g, "&")
    .replace(/"/g, """)
    .replace(/'/g, "'")
    .replace(/</g, "<")
    .replace(/>/g, ">")
}

function decodeString(string) {
  return string
    .replace(/"/g, "\"")
    .replace(/'/g, "'")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/&/g, "&")
}