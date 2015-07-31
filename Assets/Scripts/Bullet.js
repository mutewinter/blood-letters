#pragma strict

public var player: Player;
public var damage = 0;

function Start () {

}

function Update () {

}

function hit(other: Character) {
  other.health -= damage;
  Debug.Log('Hit ' + other + ' for ' + damage + '. ' + 'HP: ' + other.health);
  if (other.health <= 0) {
    player.gainExperience(other.worthExperience);
    player.kills++;
  }
  Destroy(gameObject);
}
