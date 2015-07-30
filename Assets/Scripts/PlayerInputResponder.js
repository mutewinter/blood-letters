#pragma strict

private var nextFire : float = 0.0;
private var bulletSpeed : float = 50.0;

function Start () {
}

function Update () {
  var player = GetComponent.<Player>();

  if (Input.GetMouseButton(0) && Time.time > nextFire) {
    nextFire = Time.time + player.fireRate;

    var targetPos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
    targetPos.x = targetPos.x * bulletSpeed;
    targetPos.y = targetPos.y * bulletSpeed;

    //spawning the bullet at position
    var bulletPrefab = Instantiate(
      player.bulletPrefab, transform.position,transform.rotation
    );

    bulletPrefab.GetComponent.<Bullet>().player = player;

    //add force to the spawned objected
    bulletPrefab.GetComponent.<Rigidbody2D>().AddForce(targetPos);
  }

  if (Input.GetButton('Horizontal') || Input.GetButton('Vertical')) {
    var moveDirection = Vector2(
      Input.GetAxis('Horizontal'), Input.GetAxis('Vertical')
    );

    transform.position = Vector2.MoveTowards(
      transform.position, moveDirection, player.moveSpeed * Time.deltaTime
    );
  }
}
