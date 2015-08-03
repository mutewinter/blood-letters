#pragma strict

public var damage = 1;
public var damageMin = -2;
public var damageMax = 10;

function Start () {
  // Ensure bow does at least one damage or less
  damage = Random.Range(damageMin, damageMax) || 1;
}

function Update () {

}

function OnTriggerEnter2D(other: Collider2D) {
  var player = other.GetComponentInParent(Player);
  if (player) {
    player.SendMessage('pickUp', this);
    Destroy(gameObject);
  }
}
