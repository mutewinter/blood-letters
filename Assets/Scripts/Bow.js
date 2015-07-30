#pragma strict

public var damage = 2;

function Start () {

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
