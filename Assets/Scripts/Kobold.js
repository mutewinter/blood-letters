#pragma strict

class Kobold extends Character {
  private var nextFire : float = 0;
  private var bulletSpeed : float = 100;
  private var fireRate : float = 0.8;

  function Start () {
    worthExperience = 55;
    health = 15;
  }

  function Update () {
    if (Time.time > nextFire) {
      nextFire = Time.time + fireRate;
      var bulletPrefab = Instantiate(
        bulletPrefab, transform.position, Quaternion.identity
      );
      var bullet = bulletPrefab.GetComponent.<Bullet>();
      bullet.character = this;
      bullet.fire(Vector2.right, damage);
    }
  }
}
