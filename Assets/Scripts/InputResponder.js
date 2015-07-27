#pragma strict

public var moveSpeed = 2.0;  // Units per second

function Start () {
}

function Update () {
  if (Input.GetMouseButton(0)) {
    var targetPos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
    targetPos.z = transform.position.z;

    transform.position = Vector2.MoveTowards(
      transform.position, targetPos, moveSpeed*Time.deltaTime
    );
  }
}
