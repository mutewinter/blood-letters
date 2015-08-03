#pragma strict

class Tooltip extends MonoBehaviour {
  public var _text = '';
  function get text() {
    var textMesh = GetComponent.<TextMesh>();
    return textMesh.text;
  }
  function set text(value: String) {
    var textMesh = GetComponent.<TextMesh>();
    textMesh.text = value;
  }

  function Start () {
  }

  function Update () {

  }
}
