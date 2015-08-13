#pragma strict

class Shootable extends MonoBehaviour {
  public var projectileOptions: ProjectileOptions;
  public var secondsToLive = 0.8;
  public var speed : float = 100;
  public var projectile: GameObject;
 
  private var showsPopupDamage: ShowsPopupDamage;

  function Awake() {
    showsPopupDamage = gameObject.AddComponent(ShowsPopupDamage);
  }

  function hit(other: Character) {
    if (projectileOptions.damage > 0) {
      other.takeDamage(projectileOptions.damage, projectileOptions.character);

      // TODO Move into Character
      yield showsPopupDamage.showPopupDamage(
        projectileOptions.damage, other.transform.position
      );
    }

    Destroy(projectile);
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
    var shooter = projectileOptions.character;

    // Victim or shooter were destroyed, don't evalute further
    // Shooter can become destroyed after the shot has left their gun.
    // TODO allow shooter to die, but still have its bullets affect targets.
    if (victim == null || shooter == null) { return; }

    // Can't hit the firee.
    if (victim == shooter) { return; }

    // Enemy bullets can't hit enemies
    if (victim.transform.tag == 'enemy' &&
      shooter.transform.tag == 'enemy') {
      return;
    }

    hit(victim);
  }
}
