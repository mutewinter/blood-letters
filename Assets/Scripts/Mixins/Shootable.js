#pragma strict

class Shootable extends MonoBehaviour {
  public var projectileOptions: ProjectileOptions;
  public var secondsToLive = 0.8;
  public var speed : float = 100;
  public var projectile: GameObject;
  public var fireCallback: Function;
 
  private var damageOnHit: DamageOnHit;

  function Awake() {
    damageOnHit = gameObject.AddComponent(DamageOnHit);
  }

  function fire(newProjectileOptions: ProjectileOptions) {
    projectileOptions = newProjectileOptions;
    if (fireCallback) {
      // Customizable by implementer.
      fireCallback(projectileOptions);
    } else {
      // Default, just fire in direction.
      projectile.GetComponent.<Rigidbody2D>().AddForce(
        newProjectileOptions.direction * speed
      );
    }
    yield WaitForSeconds(secondsToLive);
    if (this) {
      Destroy(projectile);
    }
  }

  function processHit(victim: Character) {
    damageOnHit.processHit(victim, projectileOptions);
  }

  function hitDamageDone() {
    if (projectileOptions.shouldDestroyOnHit) {
      Destroy(projectile);
    }
  }
}
