#pragma strict

function get text() {
  var textMesh = GetComponent.<TextMesh>();
  return textMesh.text;
}
function set text(value: string) {
  var textMesh = GetComponent.<TextMesh>();
  textMesh.text = value;
}

function get color() {
  var textMesh = GetComponent.<TextMesh>();
  return textMesh.color;
}
function set color(value: Color) {
  var textMesh = GetComponent.<TextMesh>();
  textMesh.color = value;
}

function Start () {

}

function Update () {

}
