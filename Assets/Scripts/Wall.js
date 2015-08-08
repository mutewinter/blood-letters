#pragma strict

function Start () {

}

function Update () {

}

function reflectCollider2D(other: Collider2D) {
  var rigidbody2D = other.GetComponentInParent.<Rigidbody2D>();
  if (rigidbody2D) {
    // Hack to determine angle of wall.
    // TODO we should use some Quaternion functions to determine the angle
    // with more precision. This setup only supports vertical and horizontal
    // walls.
    if (transform.rotation.w < 1) {
      rigidbody2D.velocity = Vector2.Reflect(rigidbody2D.velocity, Vector2.up);
    } else {
      rigidbody2D.velocity = Vector2.Reflect(
        rigidbody2D.velocity, Vector2.right
      );
    }
  }
}

function OnTriggerEnter2D(other: Collider2D) {
  reflectCollider2D(other);
}

function OnTriggerStay2D(other: Collider2D) {
  reflectCollider2D(other);
}
