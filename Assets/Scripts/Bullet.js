#pragma strict

import System.Collections.Generic;

class Bullet extends MonoBehaviour {
  public var shooter: Character;
  public var damage = 0;
  public var secondsToLive = 0.8;
  public var bulletSpeed : float = 100;
  public var DamageText: GameObject;

  function Start () {
    yield WaitForSeconds(secondsToLive);
    Destroy(gameObject);
  }

  function Update () {

  }

  function hit(other: Character) {
    if (shooter.damage > 0) {
      other.takeDamage(shooter);

      // TODO Move into Character
      yield showPopupDamage(damage, other.transform.position);
    }

    Destroy(gameObject);
  }

  function showPopupDamage(amount, target: Vector3) {
    var textPosition = target;
    textPosition.y += 0.3;
    var damageText = Instantiate(
      DamageText, textPosition, Quaternion.identity
    );
    var textMesh = damageText.GetComponent.<TextMesh>();
    textMesh.text = String.Format('-{0}', amount);

    return void;
  }

  function fire(direction: Vector2, bulletDamage: int) {
    damage = bulletDamage;
    GetComponent.<Rigidbody2D>().AddForce(direction * bulletSpeed);
  }

  function processHit(victim: Character) {
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
