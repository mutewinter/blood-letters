#pragma strict

import System.Collections.Generic;

class Bullet extends MonoBehaviour {
  public var character: Character;
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
    // Can't hit the firee.
    if (other == character) { return; }

    other.health -= damage;
    Debug.Log('Hit ' + other + ' for ' + damage + '. ' + 'HP: ' + other.health);

    yield showPopupDamage(damage, other.transform.position);

    if (other.health <= 0) {
      character.gainExperience(other.worthExperience);
      character.kills++;
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
}
