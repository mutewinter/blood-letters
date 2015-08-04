#pragma strict

private var nextFire : float = 0;

function Start () {
}

function Update () {
  var player = GetComponent.<Player>();

  if (Input.GetMouseButton(0) && Time.time > nextFire) {
    nextFire = Time.time + player.fireRate;

    var playerPosition = Camera.main.WorldToScreenPoint(transform.position);
    var fireDirection = (Input.mousePosition - playerPosition).normalized;
    fireDirection.z = 0;

    var bulletPrefab = Instantiate(
      player.bulletPrefab, transform.position, Quaternion.identity
    );
    var bullet = bulletPrefab.GetComponent.<Bullet>();
    bullet.shooter = player;
    bullet.fire(fireDirection, player.damage);
  }

  if (Input.GetButton('Horizontal') || Input.GetButton('Vertical')) {
    var xTranslation = Input.GetAxis('Horizontal');
    var yTranslation = Input.GetAxis('Vertical');

    var target = transform.position + Vector2(xTranslation, yTranslation);

    transform.position = Vector2.MoveTowards(
      transform.position, target, player.moveSpeed * Time.deltaTime
    );

    var mainCamera = GameObject.FindWithTag('MainCamera');
    mainCamera.transform.position = Vector3(
      transform.position.x,
      transform.position.y,
      mainCamera.transform.position.z
    );
  }
}
