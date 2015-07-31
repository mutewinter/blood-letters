#pragma strict

private var nextFire : float = 0;
private var bulletSpeed : float = 100;

function Start () {
}

function Update () {
  var player = GetComponent.<Player>();

  if (Input.GetMouseButton(0) && Time.time > nextFire) {
    nextFire = Time.time + player.fireRate;

    var targetPos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
    // Ensure we fire relative to the player, not the camera.
    targetPos -= transform.position;

    targetPos.x += targetPos.x * bulletSpeed;
    targetPos.y += targetPos.y * bulletSpeed;

    var bulletPrefab = Instantiate(
      player.bulletPrefab, transform.position, Quaternion.identity
    );

    var bullet = bulletPrefab.GetComponent.<Bullet>();
    bullet.player = player;
    bullet.damage = player.damage;

    bulletPrefab.GetComponent.<Rigidbody2D>().AddForce(targetPos);
  }

  if (Input.GetButton('Horizontal') || Input.GetButton('Vertical')) {
    var xTranslation = Input.GetAxis('Horizontal');
    var yTranslation = Input.GetAxis('Vertical');

    var target = transform.position + Vector2(xTranslation, yTranslation);

    transform.position = Vector2.MoveTowards(
      transform.position, target, player.moveSpeed * Time.deltaTime
    );
  }
}
