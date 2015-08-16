#pragma strict

class DamageOnHit extends MonoBehaviour {
  public var secondsToLive = 0.8;
  public var speed : float = 100;
 
  public var projectileOptions: ProjectileOptions;

  function hit(other: Character) {
    if (projectileOptions.damage > 0) {
      other.takeDamage(projectileOptions.damage, projectileOptions.character);
    }

    SendMessageUpwards('hitDamageDone');
  }

  function processHit(
    victim: Character, newProjectileOptions: ProjectileOptions
  ) {
    projectileOptions = newProjectileOptions;
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
