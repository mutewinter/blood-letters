#pragma strict

function get text() {
  var textMesh = GetComponent.<TextMesh>();
  return textMesh.text;
}
function set text(value: string) {
  var textMesh = GetComponent.<TextMesh>();
  textMesh.text = value;
}

function Start () {

}

function Update () {

}
