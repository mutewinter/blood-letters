#pragma strict

public var health = 5;

function Start () {

}

function Update () {

}

function OnTriggerEnter2D(other: Collider2D) {
  var r = GetComponent.<Renderer>();
  health--;

  if (health <= 0 ) {
    r.material.color = Color.grey;
  } else {
    var originalColor = r.material.color;
    r.material.color = Color.red;
    yield WaitForSeconds(.5);
    r.material.color = originalColor;
  }
}
