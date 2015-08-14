#pragma strict

class DamageOnHit extends MonoBehaviour {
  public var secondsToLive = 0.8;
  public var speed : float = 100;
  public var shootable: Shootable;
 
  private var showsPopupDamage: ShowsPopupDamage;

  function get projectileOptions() { return shootable.projectileOptions; }
  function get projectile() { return shootable.projectile; }

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

    if (projectileOptions.shouldDestroyOnHit) {
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
