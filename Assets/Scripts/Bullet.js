#pragma strict

import System.Collections.Generic;

public var player: Player;
public var damage = 0;
public var secondsToLive = 0.8;
public var DamageText: GameObject;

function Start () {
  yield WaitForSeconds(secondsToLive);
  Destroy(gameObject);
}

function Update () {

}

function hit(other: Character) {
  other.health -= damage;
  Debug.Log('Hit ' + other + ' for ' + damage + '. ' + 'HP: ' + other.health);

  yield showPopupDamage(damage, other.transform.position);

  if (other.health <= 0) {
    player.gainExperience(other.worthExperience);
    player.kills++;
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

