#pragma strict

function Start () {

}

function Update () {

}

function stopCollider2D(other: Collider2D) {
  var rigidbody2D = other.GetComponentInParent.<Rigidbody2D>();
  if (rigidbody2D) {
    rigidbody2D.velocity = Vector2.zero;
    rigidbody2D.angularVelocity = 0;
  }
  // TODO send force in opposite direction away from wall
}

function OnTriggerEnter2D(other: Collider2D) {
  stopCollider2D(other);
}

function OnTriggerStay2D(other: Collider2D) {
  stopCollider2D(other);
}
