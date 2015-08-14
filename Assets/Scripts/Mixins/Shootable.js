#pragma strict

class Shootable extends MonoBehaviour {
  public var projectileOptions: ProjectileOptions;
  public var secondsToLive = 0.8;
  public var speed : float = 100;
  public var projectile: GameObject;
 
  private var damageOnHit: DamageOnHit;

  function Awake() {
    damageOnHit = gameObject.AddComponent(DamageOnHit);
    damageOnHit.shootable = this;
  }

  function fire(newProjectileOptions: ProjectileOptions) {
    projectileOptions = newProjectileOptions;
    projectile.GetComponent.<Rigidbody2D>().AddForce(
      newProjectileOptions.direction * speed
    );
    yield WaitForSeconds(secondsToLive);
    if (this) {
      Destroy(projectile);
    }
  }

  function processHit(victim: Character) {
    damageOnHit.processHit(victim);
  }
}
