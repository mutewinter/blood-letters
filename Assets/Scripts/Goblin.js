#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter2D(other: Collider2D) {
  var r = GetComponent.<Renderer>();
  var originalColor = r.material.color;
  r.material.color = Color.red;
  yield WaitForSeconds(.5);
  r.material.color = originalColor;
}
