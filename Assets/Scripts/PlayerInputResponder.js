#pragma strict

function Start () {
}

function Update () {
  var player = GetComponent.<Player>();
  if (Input.GetMouseButton(0)) {
    var targetPos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
    targetPos.z = transform.position.z;

    transform.position = Vector2.MoveTowards(
      transform.position, targetPos, player.moveSpeed * Time.deltaTime
    );
  }
}
