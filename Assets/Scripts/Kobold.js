#pragma strict

class Kobold extends Character {
  private var nextFire : float = 0;
  private var bulletSpeed : float = 100;
  private var fireRate : float = 0.8;

  function Start () {
    worthExperience = 55;
    health = 15;
    moveSpeed = 5;
    moveRate = 0.8;
    super.Start();
  }

  function Update () {
    if (Time.time > nextFire) {
      nextFire = Time.time + fireRate;
      var bulletPrefab = Instantiate(
        bulletPrefab, transform.position, Quaternion.identity
      );
      var bullet = bulletPrefab.GetComponent.<Bullet>();
      bullet.character = this;
      var fireDirection = new Vector2(
        Random.Range(-1F, 1F),
        Random.Range(-1F, 1F)
      );
      bullet.fire(fireDirection, damage); }
  }
}
